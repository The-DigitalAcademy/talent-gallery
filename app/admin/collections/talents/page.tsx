import { createClient } from "@/app/lib/supabase/server";
import CollectionTable from "@/components/admin/collection-table";
import { columns } from "./columns";
import CollectionFilter from "@/components/admin/collection-filter";
import CollectionHeader from "@/components/admin/collection-header";
import CollectionSearch from "@/components/admin/collection-search";

type PageProps = {
    searchParams?: Promise<{
        fullname?: string;
    }>
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();
    const { data, error } = await supabase.from("talents").select("id, fullname, profile_image_url, programs (name), cohorts (name), talent_statuses (name), created_at").ilike('fullname', `%${searchParams?.fullname || ""}%`);
    const { data: programs, error: programsError } = await supabase.from("programs").select("id, name")
    const { data: cohorts, error: cohortsError } = await supabase.from("cohorts").select("id, name")
    const { data: statuses, error: statusesError } = await supabase.from("talent_statuses").select("id, name")

    return (
        <div className="flex flex-col gap-5">
            <CollectionHeader title="Capabilities" totalEntries={data?.length || 0} slug="capabilities" />

            <div className="flex gap-5">
                <CollectionSearch title="Name" keyName="fullname" />
                <CollectionFilter title="Program" keyName="program" options={programs?.map(i => ({ label: i.name, value: i.id })) || []} />
                <CollectionFilter title="Cohort" keyName="cohorts" options={cohorts?.map(i => ({ label: i.name, value: i.id })) || []} />
                <CollectionFilter title="Status" keyName="status" options={statuses?.map(i => ({ label: i.name, value: i.id })) || []} />
            </div>

            <CollectionTable data={data || []} columns={columns} />
        </div>
    )
}
