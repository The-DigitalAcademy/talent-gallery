import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import BasicInfoForm from "../_forms/basic-info-form";
import EnrolmentFormPlaceholder from "@/components/admin/enrolment-form-placeholder";
import ProfileLinksFormPlaceholder from "@/components/admin/profile-links-form-placeholder";
import ProjectsFormPlaceholder from "@/components/admin/projects-form-placeholder";
import EndorsementsFormPlaceholder from "@/components/admin/endorsements-form-placeholder";
import WorkExperienceFormPlaceholder from "@/components/admin/work-experience-form-placeholder";
import CapabilitiesFormPlaceholder from "@/components/admin/capabilities-form-placeholder";
import { createClient } from "@/app/lib/supabase/server";

export default async function Page() {
    const supabase = await createClient();
    const { data: capabilities, error: capabilitiesError } = await supabase.from("capabilities").select()
    return (
        <div>
            <div className="mb-5">
                <Link href="/admin/collections/talents" className="flex gap-2 text-gray-500 mb-3 hover:text-gray-800">
                    <ChevronLeftIcon className="w-4" /> <span className="text-base">Talents</span>
                </Link>
                <h1 className="text-2xl font-bold mb">Create a new Talent</h1>
            </div>
            <div className="flex w-full flex-col gap-5">
                <BasicInfoForm />
                <EnrolmentFormPlaceholder />
                <ProfileLinksFormPlaceholder />
                <CapabilitiesFormPlaceholder capabilities={capabilities!} />
                <WorkExperienceFormPlaceholder />
                <EndorsementsFormPlaceholder />
                <ProjectsFormPlaceholder />
            </div >
        </div >
    )
}
