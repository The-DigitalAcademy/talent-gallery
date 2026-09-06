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

  // ── Validate the shortlist server-side ────────────────────────────────────
  // Never trust the talentIds the client sends. Resolve every one against the
  // talents table (published only) BEFORE recording anything: this fixes the
  // bug where bogus/unpublished ids still returned success, and gives us the
  // talent details for the notification emails in the same round-trip.
  const uniqueIds = Array.from(new Set(payload.talentIds));
  const talents = await getTalentsByIds(uniqueIds);

  const resolvedIds = new Set(talents.map((t) => t.id));
  const unknownIds = uniqueIds.filter((id) => !resolvedIds.has(id));
  if (unknownIds.length > 0) {
    return {
      success: false,
      message:
        "One or more selected candidates are no longer available. Please refresh your shortlist and try again.",
      errors: {
        general: "Your shortlist contains candidates that could not be found.",
      },
    };
  }

  // ── Insert enquiry ────────────────────────────────────────────────────────
  // Generate the id in application code instead of relying on
  // `INSERT ... RETURNING` (`.select("id")`). The public form submits as the
  // anonymous role, which now holds INSERT-only rights on enquiries -- a
  // returning clause would need SELECT and would fail. See
  // supabase/migrations/20260828_lockdown_enquiries_authz.sql.
  const enquiryId = crypto.randomUUID();
  const { error: enquiryError } = await supabase.from("enquiries").insert({
    id: enquiryId,
    email: payload.email.trim(),
    company_name: payload.companyName.trim(),
    contact_name: payload.contactName.trim(),
    message: payload.message?.trim() || null,
  });

  if (enquiryError) {
    console.error("enquiry insert error:", enquiryError);
    return { success: false, message: "Something went wrong. Please try again." };
  }

  // ── Link enquiry → talents ────────────────────────────────────────────────
  const joins = uniqueIds.map((talentId) => ({
    enquiry_id: enquiryId,
    talent_id: talentId,
  }));

  const { error: joinError } = await supabase
    .from("enquiry_talents")
    .insert(joins);

  if (joinError) {
    console.error("enquiry_talents insert error:", joinError);
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://talent.shaper.co.za";

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
