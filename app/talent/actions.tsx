import { createClient } from "@/app/lib/supabase/server";

// Update interface to include the page property
export interface FilterParams {
  cohort?: string;
  programme?: string;
  capability?: string;
  status?: string;
  location?: string;
  page?: string; 
}

export async function getFilteredTalents(filters: FilterParams) {
  // 1. Parse and fall back to page 1 safely
  const page = Math.max(1, parseInt(filters.page || "1", 10));
  
  // 2. Calculate dynamic pagination range indices
  const itemsPerPage = 9;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

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

  // EVERY filter now completely ignores uppercase vs lowercase strings
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

  // THE FIX: Use dynamic calculation instead of static (0, 11)
  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    console.error("Database Query Breakdown: check superbase or SQL syntax", error);
    return [];
  }

  return data || [];
}