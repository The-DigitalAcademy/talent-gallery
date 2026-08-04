import { createClient } from "@/app/lib/supabase/server";
import CollectionTable from "@/components/admin/collection-table";
import { columns } from "./columns";
import CollectionHeader from "@/components/admin/collection-header";
import CollectionSearch from "@/components/admin/collection-search";
import { CreateFormDialog } from "./forms";

type PageProps = {
    searchParams?: Promise<{
        name?: string;
    }>
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();
    const { data, error } = await supabase.from("roles")
        .select("id, name, created_at")
        .ilike('name', `%${searchParams?.name || ""}%`)
        .order('created_at', { ascending: false });

    return (
        <>
            <div className="flex justify-between items-start">
                <CollectionHeader title="Roles" totalEntries={data?.length || 0} />
                <CreateFormDialog />
            </div>
            <CollectionSearch title="Name" keyName="name" />
            <CollectionTable data={data || []} columns={columns} />
        </>
    )
}
