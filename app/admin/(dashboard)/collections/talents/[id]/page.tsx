import { createClient } from "@/app/lib/supabase/server";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import BasicInfoForm from "../forms/basic-info-form";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient();
    const { data: talent, error: talentError } = await supabase.from("talents").select("id, fullname, bio, profile_image_url").eq("id", id).single()

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
            </div >
        </div >
    )
}
