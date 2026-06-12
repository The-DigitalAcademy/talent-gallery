// app/talents/talent/actions.ts
import { createClient } from "@/app/lib/supabase/server";

export interface FilterParams {
  cohort?: string;
  programme?: string;
  capability?: string;
  status?: string;
  location?: string;
}

export async function getFilteredTalents(filters: FilterParams) {
  const supabase = await createClient();

  // Using !inner tells Supabase to drop the core talent row if the joined filter doesn't match
  let query = supabase.from("talents").select(`
    id,
    fullname,
    bio,
    slug,
    profile_image_url,
    location:locations${filters.location ? '!inner' : ''}(city, country),
    cohort:cohorts${filters.cohort ? '!inner' : ''}(name),
    program:programs${filters.programme ? '!inner' : ''}(name),
    talent_status:talent_statuses${filters.status ? '!inner' : ''}(name),
    capabilities:talent_capabilities${filters.capability ? '!inner' : ''}(
      capability:capabilities(id, name)
    ),
    work_experiences(id, role, company, duration, description),
    projects:talent_projects(
      project:projects(id, name, description)
    ),
    endorsements(id, endorser_name, message)
  `);

  //  EVERY filter now completely ignores uppercase vs lowercase strings
  if (filters.cohort) {
    query = query.ilike("cohorts.name", filters.cohort);
  }
  if (filters.programme) {
    query = query.ilike("programs.name", filters.programme);
  }
  if (filters.location) {
    query = query.ilike("locations.city", filters.location);
  }
  if (filters.capability) {
    query = query.ilike("talent_capabilities.capabilities.name", filters.capability);
  }
  if (filters.status) {
    query = query.ilike("talent_statuses.name", filters.status);
  }
query = query.range(0, 11);
  const { data, error } = await query;

  if (error) {
    console.error("Database Query Breakdown:", error);
    return [];
  }

  return data || [];
}