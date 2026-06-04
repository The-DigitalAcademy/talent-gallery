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
    const { data, error } = await supabase.from("programs").select("id, name, created_at").ilike('name', `%${searchParams?.name || ""}%`);

    return (
        <div className="flex flex-col gap-5">
            <CollectionHeader title="Programs" totalEntries={data?.length || 0} slug="programs" />
            <div className="flex gap-5">
                <CollectionSearch title="Name" keyName="name" />
            </div>
            <CollectionTable data={data || []} columns={columns} />
        </div>
    )
}
