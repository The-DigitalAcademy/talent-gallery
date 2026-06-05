import { createClient } from "./supabase/server";

type TalentFilters = {
    program?: string,
    cohort?: string,
    status?: string,
    fullname?: string
}
export async function fetchTalents(filters: TalentFilters = {}) {
    const { program, cohort, status, fullname } = filters
    const supabase = await createClient();

    let query = supabase.from("talents")
        .select("id, fullname, profile_image_url, programs!inner (id, name), cohorts!inner (id, name), talent_statuses!inner (id, name), created_at")

    if (fullname)
        query = query.ilike('fullname', `%${fullname || ""}%`)

    if (program) {
        query = query.eq('programs.id', program);
    }
    if (cohort) {
        query = query.eq('cohorts.id', cohort);
    }
    if (status) {
        query = query.eq('talent_statuses.id', status);
    }

    return await query;

}