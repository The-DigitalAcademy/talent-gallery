import { createClient } from "@/app/lib/supabase/server";
import CollectionTable from "@/components/admin/collection-table";
import { columns } from "./columns";
import CollectionHeader from "@/components/admin/collection-header";
import CollectionSearch from "@/components/admin/collection-search";

type PageProps = {
    searchParams?: Promise<{
        name?: string;
    }>
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();
    const { data, error } = await supabase.from("talent_statuses").select("id, name, description, created_at").ilike('name', `%${searchParams?.name || ""}%`);

    return (
        <>
            <CollectionHeader title="Talent Statuses" totalEntries={data?.length || 0} />
            <CollectionSearch title="Name" keyName="name" />
            <CollectionTable data={data || []} columns={columns} />
        </>
    )
}
