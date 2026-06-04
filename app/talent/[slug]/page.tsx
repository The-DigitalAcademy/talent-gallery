import { createClient } from "@/app/lib/supabase/server";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient();
    const { data: talent, error: talentError } = await supabase.from("talents").select("id, fullname, bio").eq("slug", slug).single()
    return (
        <div>
            <h1 className="text-2xl ml-10 mt-10 mb-5 font-semibold">Talent</h1>
            <div className="ml-10 flex flex-col">
                <h2>{talent?.fullname}</h2>
                <p>{talent?.bio}</p>
            </div>
        </div>
    )
}
