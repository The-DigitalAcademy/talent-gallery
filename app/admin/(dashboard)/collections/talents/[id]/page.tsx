import { createClient } from "@/app/lib/supabase/server";
import { ChevronLeftIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import BasicInfoForm from "../_forms/basic-info-form";
import EnrolmentForm from "../_forms/enrolment-form";
import URLsForm from "../_forms/urls-form";
import WorkExperienceForm from "../_forms/work-experience-form";
import EndorsementsForm from "../_forms/endorsements-form";
import ProjectsForm from "../_forms/projects-form";
import { TalentCapabilitiesForm } from "../_forms/capability-form";
import { PublishedStatusForm } from "../_forms/published-status-form";
import { DeleteTalentFormDialog } from "../_forms/delete-talent-form";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient();
    const { data: talent, error: talentError } = await supabase.from("talents")
        .select("id, fullname, bio, profile_image_url, program_id, cohort_id, location_id, talent_status_id, youtube_url, linkedin_url, portfolio_url, github_url, is_published, capabilities(id, name)")
        .eq("id", id)
        .single()

    const { data: cohorts, error: cohortsError } = await supabase.from("cohorts").select()
    const { data: locations, error: locationsError } = await supabase.from("locations").select()
    const { data: programs, error: programsError } = await supabase.from("programs").select()
    const { data: statuses, error: statusesError } = await supabase.from("talent_statuses").select()
    const { data: workExperiences, error: workExperiencesError } = await supabase.from("work_experiences").select().eq("talent_id", id)
    const { data: endorsements, error: endorsementsError } = await supabase.from("endorsements").select().eq("talent_id", id)
    const { data: projects, error: projectsError } = await supabase.from("projects").select().eq("talent_id", id)
    const { data: capabilities, error: capabilitiesError } = await supabase.from("capabilities").select()

    const enrolmentData = {
        cohorts: cohorts || [],
        locations: locations || [],
        programs: programs || [],
        statuses: statuses || []
    }
    const enrolmentValues = {
        id: talent?.id,
        cohort: talent?.cohort_id,
        program: talent?.program_id,
        location: talent?.location_id,
        status: talent?.talent_status_id
    }
    const urlValues = {
        id: talent?.id,
        youtube: talent?.youtube_url,
        portfolio: talent?.portfolio_url,
        linkedin: talent?.linkedin_url,
        github: talent?.github_url,
    }

    return (
        <div>
            <div className="mb-5">
                <Link href="/admin/collections/talents" className="flex gap-2 text-gray-500 mb-3 hover:text-gray-800">
                    <ChevronLeftIcon className="w-4" /> <span className="text-base">Talents</span>
                </Link>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb">{talent?.fullname}</h1>
                    <PublishedStatusForm talentId={talent?.id} isPublished={talent?.is_published} />
                </div>
            </div>
            <div className="flex w-full flex-col gap-5">
                <BasicInfoForm values={talent!} />
                <EnrolmentForm values={enrolmentValues} data={enrolmentData} />
                <URLsForm values={urlValues} />
                <TalentCapabilitiesForm
                    capabilities={capabilities || []}
                    talentCapabilities={talent?.capabilities || []}
                    talentId={id} />
                <WorkExperienceForm talentId={talent?.id} workExperiences={workExperiences!} />
                <EndorsementsForm talentId={talent?.id} endorsements={endorsements!} />
                <ProjectsForm talentId={talent?.id} projects={projects || []} />
                <DeleteTalentFormDialog id={talent?.id} name={talent?.fullname}>
                    <div className="rounded-lg bg-red-600 w-30 hover:bg-red-800 justify-center border border-gray-300 text-base px-5 h-8 flex gap-1 text-white font-semibold shadow-sm cursor-pointer transition items-center">
                        <Trash2Icon className='size-4' /> Delete
                    </div>
                </DeleteTalentFormDialog>
            </div >
        </div >
    )
}
