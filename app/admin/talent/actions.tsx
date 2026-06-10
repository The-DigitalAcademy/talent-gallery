
import { createClient } from "@/app/lib/supabase/server";
export interface FilterParams {
  cohort?: string;
  programme?: string;
  capability?: string;
  status?: string;
  location?: string;
}

export async function getFilteredTalents(filters: FilterParams) {
  const supabase = createClient();

  // Base query with relational inner joins for filtering
  let query =  await supabase.from("talents")
    .select(`
      *,
      locations!inner(*),
      programs!inner(*),
      cohorts!inner(*),
      talent_capabilities!inner(
        capabilities!inner(*)
      )
    `);

  // Dynamically chain filters if they exist in the URL
  if (filters.cohort) {
    query = query.eq("cohorts.name", filters.cohort);
  }
  if (filters.programme) {
    query = query.eq("programs.name", filters.programme);
  }
  if (filters.status) {
    query = query.eq("employment_status", filters.status);
  }
  if (filters.location) {
    query = query.eq("locations.city", filters.location);
  }
  if (filters.capability) {
    query = query.eq("talent_capabilities.capabilities.name", filters.capability);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching talents:", error);
    return [];
  }

  return data;
}