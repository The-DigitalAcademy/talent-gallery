"use server";

import { createClient } from "@/app/lib/supabase/server";
import { Talent } from "@/app/interface-types/talent";
import {
  sendAdminEnquiryEmail,
  sendSubmitterConfirmationEmail,
} from "@/app/lib/brevo";

// ─── Fetch talent details by IDs ─────────────────────────────────────────────
export async function getTalentsByIds(ids: string[]): Promise<Talent[]> {
  if (!ids || ids.length === 0) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("talents")
    .select(`
      id,
      fullname,
      bio,
      slug,
      profile_image_url,
      role:roles(name),
      location:locations(city, country),
      cohort:cohorts(name),
      program:programs(name),
      talent_status:talent_statuses(name),
      capabilities(name)
    `)
    .in("id", ids)
    .eq("is_published", true);

  if (error) {
    console.error("getTalentsByIds error:", error);
    return [];
  }

  return (data ?? []) as unknown as Talent[];
}

// ─── Form state ───────────────────────────────────────────────────────────────
export interface EnquiryFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

// ─── Submit enquiry ───────────────────────────────────────────────────────────
export async function submitEnquiryAction(payload: {
  email: string;
  companyName: string;
  contactName: string;
  message: string;
  talentIds: string[];
}): Promise<EnquiryFormState> {
  // ── Validation ────────────────────────────────────────────────────────────
  const errors: Record<string, string> = {};

  if (!payload.email?.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (!payload.companyName?.trim())
    errors.companyName = "Company name is required.";

  if (!payload.contactName?.trim())
    errors.contactName = "Contact name is required.";

  if (payload.talentIds.length === 0)
    errors.general = "Your shortlist is empty. Please add candidates first.";

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  const supabase = await createClient();

  // ── Insert enquiry ────────────────────────────────────────────────────────
  const { data: enquiry, error: enquiryError } = await supabase
    .from("enquiries")
    .insert({
      email: payload.email.trim(),
      company_name: payload.companyName.trim(),
      contact_name: payload.contactName.trim(),
      message: payload.message?.trim() || null,
    })
    .select("id")
    .single();

  if (enquiryError || !enquiry) {
    console.error("enquiry insert error:", enquiryError);
    return { success: false, message: "Something went wrong. Please try again." };
  }

  // ── Link enquiry → talents ────────────────────────────────────────────────
  const joins = payload.talentIds.map((talentId) => ({
    enquiry_id: enquiry.id,
    talent_id: talentId,
  }));

  const { error: joinError } = await supabase
    .from("enquiry_talents")
    .insert(joins);

  if (joinError) {
    console.error("enquiry_talents insert error:", joinError);
  }

  // ── Fetch talent details for emails ──────────────────────────────────────
  const talents = await getTalentsByIds(payload.talentIds);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://talent-gallery.vercel.app";

  const candidates = talents.map((t) => ({
    fullname: t.fullname,
    role: t.role?.name ?? null,
    location: t.location
      ? `${t.location.city}, ${t.location.country}`
      : null,
    status: t.talent_status?.name ?? null,
    profileUrl: `${baseUrl}/talent/${t.slug}`,
  }));

  const emailPayload = {
    contactName: payload.contactName.trim(),
    companyName: payload.companyName.trim(),
    email: payload.email.trim(),
    message: payload.message?.trim() || null,
    candidates,
  };

  // ── Send both emails (non-blocking on failure) ────────────────────────────
  await Promise.allSettled([
    sendAdminEnquiryEmail(emailPayload).catch((e) =>
      console.error("Admin email failed:", e?.message ?? e)
    ),
    sendSubmitterConfirmationEmail(emailPayload).catch((e) =>
      console.error("Confirmation email failed:", e?.message ?? e)
    ),
  ]);

  return {
    success: true,
    message: "Your enquiry has been submitted successfully!",
  };
}
