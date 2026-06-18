import { createClient } from "@/app/lib/supabase/server";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient();
    const { data: cohort, error: cohortError } = await supabase.from("cohorts").select("id, name").eq("slug", slug).single()
    return (
        <div>
            <h1 className="text-2xl ml-10 mt-10 mb-5 font-semibold">Cohort</h1>
            <div className="ml-10 flex flex-col">
                <h2>{cohort?.name}</h2>
            </div>
        </div>
    )
}
