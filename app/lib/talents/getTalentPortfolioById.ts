import 'server-only';

import { createClient } from '../supabase/server';

const TALENT_PORTFOLIO_SELECT = `
    *,
    location:locations(city, country),
    cohort:cohorts(name),
    program:programs(name),
    talent_status:talent_statuses(name),
    capabilities:talent_capabilities(
        capability:capabilities(id, name),
        sortPosition:sort_position
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
    role:roles(name),
    isPublished:is_published
`;

export async function getTalentPortfolioById(idOrSlug: string) {
  const supabase = await createClient();

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

  const query = supabase.from('talents').select(TALENT_PORTFOLIO_SELECT);
  const { data, error } = await (isUuid ? query.eq('id', idOrSlug) : query.eq('slug', idOrSlug)).single();

  if (error || !data) {
    return { data: null, error };
  }

  const talentId = data.id;

  // Future-proof education data check
  let educations: any[] = [];
  try {
    const { data: eduData, error: eduError } = await supabase
      .from('educations')
      .select('*')
      .eq('talent_id', talentId);

    if (!eduError && Array.isArray(eduData)) {
      educations = eduData;
    }
  } catch {
    // If the educations table does not exist yet, safely continue
  }

  // Check if talent already has an education column or field
  if (educations.length === 0 && (data as any).education) {
    const rawEdu = (data as any).education;
    if (Array.isArray(rawEdu)) {
      educations = rawEdu;
    } else if (typeof rawEdu === 'string' && rawEdu.trim()) {
      educations = [{ qualification: rawEdu }];
    }
  }

  const enrichedTalent = {
    ...data,
    educations,
  };

  return { data: enrichedTalent, error: null };
}
