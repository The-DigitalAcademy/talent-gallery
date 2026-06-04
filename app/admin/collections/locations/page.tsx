import { createClient } from "@/app/lib/supabase/server";
import CollectionTable from "@/components/admin/collection-table";
import { columns } from "./columns";
import CollectionFilter from "@/components/admin/collection-filter";
import CollectionHeader from "@/components/admin/collection-header";
import CollectionSearch from "@/components/admin/collection-search";

type PageProps = {
    searchParams?: Promise<{
        city?: string;
    }>
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();
    const { data, error } = await supabase.from("locations").select("id, city, country, created_at").ilike('city', `%${searchParams?.city || ""}%`);

    return (
        <div className="flex flex-col gap-5">
            <CollectionHeader title="Cohorts" totalEntries={data?.length || 0} slug="locations" />
            <div className="flex gap-5">
                <CollectionSearch title="City" keyName="city" />
            </div>
            <CollectionTable data={data || []} columns={columns} />
        </div>
    )
}
