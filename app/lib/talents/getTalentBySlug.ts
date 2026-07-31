import 'server-only';

import { createClient } from '../supabase/server';

const TALENT_SELECT = `
    *,
    location:locations(city, country),
    cohort:cohorts(name),
    program:programs(name),
    talent_status:talent_statuses(name),
    capabilities:talent_capabilities(
        capability:capabilities(id, name)
    ),
    work_experiences(*),
    projects(
        id,
        name,
        description,
        capabilities:project_capabilities(
        capability:capabilities(name)
        ),
        project_url
    ),
    endorsements(
        id,
        endorser_name,
        message
    ),
    role:roles(name)
`;

export async function getTalentBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('talents')
    .select(TALENT_SELECT)
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  return { data, error };
}