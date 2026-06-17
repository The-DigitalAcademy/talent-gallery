import { createClient } from "@/app/lib/supabase/server";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import BasicInfoForm from "../forms/basic-info-form";
import EnrolmentForm from "../forms/enrolment-form";
import URLsForm from "../forms/urls-form";
import WorkExperienceForm from "../forms/work-experience-form";
import EndorsementsForm from "../forms/endorsements-form";
import { TalentCapabilitiesSection } from "@/components/admin/talent-capabilities-section";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient();
    const { data: talent, error: talentError } = await supabase.from("talents")
        .select("id, fullname, bio, profile_image_url, program_id, cohort_id, location_id, talent_status_id, youtube_url, linkedin_url, portfolio_url, github_url")
        .eq("id", id)
        .single()

    const { data: cohorts, error: cohortsError } = await supabase.from("cohorts").select()
    const { data: locations, error: locationsError } = await supabase.from("locations").select()
    const { data: programs, error: programsError } = await supabase.from("programs").select()
    const { data: statuses, error: statusesError } = await supabase.from("talent_statuses").select()
    const { data: workExperiences, error: workExperiencesError } = await supabase.from("work_experiences").select().eq("talent_id", id)
    const { data: endorsements, error: endorsementsError } = await supabase.from("endorsements").select().eq("talent_id", id)
    const { data: capabilities, error: capabilitiesError } = await supabase.from("capabilities").select()
    const { data: talentCapabilities, error: talentCapabilitiesError } = await supabase.from("talent_capabilities").select("id, capabilities (id, name)").eq("talent_id", id)

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
    type TalentCapabilityType = { id: string, capabilityId: string, capabilityName: string }
    const talentCapabilityData: TalentCapabilityType[] = talentCapabilities?.map(({ id, capabilities }) => ({
        id,
        capabilityId: capabilities?.id,
        capabilityName: capabilities.name
    })) || []
    return (
        <div>
            <div className="mb-5">
                <Link href="/admin/collections/talents" className="flex gap-2 text-gray-500 mb-3 hover:text-gray-800">
                    <ChevronLeftIcon className="w-4" /> <span className="text-base">Talents</span>
                </Link>
                <h1 className="text-2xl font-bold mb">{talent?.fullname}</h1>
            </div>
            <div className="flex w-full flex-col gap-5">
                <BasicInfoForm values={talent!} />
                <EnrolmentForm values={enrolmentValues} data={enrolmentData} />
                <URLsForm values={urlValues} />
                <TalentCapabilitiesSection
                    capabilities={capabilities || []}
                    talentCapabilities={talentCapabilityData}
                    talentId={id} />
                <WorkExperienceForm talentId={talent?.id} workExperiences={workExperiences!} />
                <EndorsementsForm talentId={talent?.id} endorsements={endorsements!} />
            </div >
        </div >
    )
}
