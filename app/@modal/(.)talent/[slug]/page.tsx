import { Modal } from "@/app/components/ui/Modal";
import { createClient } from "@/app/lib/supabase/server";
import { TalentProfile } from "@/app/talent/[slug]/_components/TalentProfile";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
        projects(
        id,
        name,
        description,
        capabilities:project_capabilities(
            capability:capabilities(name)
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

    if (error) {
        return (
        <main className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Failed to load talent profile.</p>
        </main>
        );
    }

  return (
    <Modal>
      {/* <div className="bg-blue-500 mx-44"> */}
        <TalentProfile talent={talent} />
      {/* </div> */}
    </Modal>
  )
}
