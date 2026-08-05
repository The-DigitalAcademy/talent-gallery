import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import BasicInfoForm from "../_forms/basic-info-form";
import { CapabilitiesFormPlaceholder, EndorsementsFormPlaceholder, EnrolmentFormPlaceholder, ProfileLinksFormPlaceholder, ProjectsFormPlaceholder, WorkExperienceFormPlaceholder } from "@/components/admin/form-placeholders";
import { createClient } from "@/app/lib/supabase/server";

export default async function Page() {
    const supabase = await createClient();
    const { data: roles, error: rolesError } = await supabase.from("roles").select("id, name")
    return (
        <div>
            <div className="mb-5">
                <Link href="/admin/collections/talents" className="flex gap-2 text-gray-500 mb-3 hover:text-gray-800">
                    <ChevronLeftIcon className="w-4" /> <span className="text-base">Talents</span>
                </Link>
                <h1 className="text-2xl font-bold mb">Create a new Talent</h1>
            </div>
            <div className="flex w-full flex-col gap-5">
                <BasicInfoForm roles={roles || []} />
                <EnrolmentFormPlaceholder />
                <ProfileLinksFormPlaceholder />
                <CapabilitiesFormPlaceholder />
                <WorkExperienceFormPlaceholder />
                <EndorsementsFormPlaceholder />
                <ProjectsFormPlaceholder />
            </div >
        </div >
    )
}
