"use server";

import { createClient } from "@/app/lib/supabase/server";
import { Talent } from "../interface-types/talent";

export interface FilterParams {
  cohort?: string;
  programme?: string;
  capability?: string;
  status?: string;
  location?: string;
  page?: string;
  role?: string;
}

export async function getFilteredTalents(filters: FilterParams) {
  const page = Math.max(1, parseInt(filters.page || "1", 10));

  // Changing this to 12 to match the itemsPerPage math in your main frontend page grid!
  const itemsPerPage = 12;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const supabase = await createClient();

  // 💡 THE JSON FIX: Filter the embedded collection array down to just the requested tag if active
  const capabilitySelectFilter = filters.capability
    ? `(capability:capabilities!inner(id, name))`
    : `(capability:capabilities(id, name))`;

  // 💡 THE INFINITE PAGINATION FIX: Added { count: 'exact' } options block here
  let query = supabase.from("talents").select(`
    id,
    fullname,
    bio,
    slug,
    profile_image_url,
    role:roles${filters.role ? '!inner' : ''} (name),
    location:locations${filters.location ? '!inner' : ''}(city, country),
    cohort:cohorts${filters.cohort ? '!inner' : ''}(name),
    program:programs${filters.programme ? '!inner' : ''}(name),
    talent_status:talent_statuses${filters.status ? '!inner' : ''}(name),
    capabilities${filters.capability ? '!inner' : ''}(name),
    work_experiences(id, role, company, duration, description),
    projects:talent_projects(
      project:projects(id, name, description)
    ),
    endorsements(id, endorser_name, message)
  `, { count: 'exact' });

  // Case-insensitive filtering
  if (filters.cohort) {
    query = query.ilike("cohorts.name", filters.cohort);
  }
  if (filters.role) {
    query = query.ilike("roles.name", filters.role);
  }
  if (filters.programme) {
    query = query.ilike("programs.name", filters.programme);
  }
  if (filters.location) {
    query = query.ilike("locations.city", filters.location);
  }
  if (filters.capability) {
    query = query.ilike("capabilities.name", filters.capability);
  }
  if (filters.status) {
    query = query.ilike("talent_statuses.name", filters.status);
  }

  // Dynamic range tracking
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("Database Query Breakdown: check Supabase or SQL syntax", error);
    return { data: [], count: 0 };
  }

  // Return both data and count so your frontend knows when to stop paginating
  return {
    data: (data ?? []) as unknown as Talent[],
    count: count ?? 0,
  };
}