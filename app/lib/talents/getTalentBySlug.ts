import 'server-only';

import { createClient } from '../supabase/server';

const TALENT_SELECT = `
    *,
    location,
    cohort:cohorts(name),
    program:programs(name),
    talent_status:talent_statuses(name),
    capabilities,
    education(*),
    work_experiences(*),
    projects(
        id,
        name,
        description,
        project_url
    ),
    endorsements(
        id,
        endorser_name,
        message
    ),
    role,
    isPublished:is_published
`;

export async function getTalentBySlug(slug: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('talents')
        .select(TALENT_SELECT)
        .eq('slug', slug)
        .single();

    return { data, error };
}