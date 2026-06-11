import { createClient } from "@/app/lib/supabase/server";
import { TalentProfile } from "./_components/TalentProfile";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: talent, error } = await supabase
  .from("talents")
  .select(`
    *,
    location:locations(city, country),
    cohort:cohorts(name),
    program:programs(name),
    talent_status:talent_statuses(name),
    capabilities:talent_capabilities(
      capability:capabilities(id, name)
    ),
    work_experiences(*),
    projects:talent_projects(
      project:projects(
        id,
        name,
        description,
        capabilities:project_capabilities(
          capability:capabilities(name)
        )
      )
    ),
    endorsements(
      id,
      endorser_name,
      message
    )
  `)
  .eq("slug", slug)
  .eq("is_published", true)
  .single();
    console.log(talent)

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Failed to load talent profile.</p>
      </main>
    );
  }

  return <TalentProfile talent={talent} />;
}