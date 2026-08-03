"use server";

import { createClient } from "@/app/lib/supabase/server";
import { Talent } from "@/app/interface-types/talent";

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

export interface EnquiryFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitEnquiryAction(
  payload: {
    email: string;
    companyName: string;
    contactName: string;
    message: string;
    talentIds: string[];
  }
): Promise<EnquiryFormState> {
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

  // Insert the enquiry
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
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  // Link enquiry to each shortlisted talent
  const joins = payload.talentIds.map((talentId) => ({
    enquiry_id: enquiry.id,
    talent_id: talentId,
  }));

  const { error: joinError } = await supabase
    .from("enquiry_talents")
    .insert(joins);

  if (joinError) {
    console.error("enquiry_talents insert error:", joinError);
    // Non-blocking — enquiry was still saved
  }

  return {
    success: true,
    message: "Your enquiry has been submitted successfully!",
  };
}
