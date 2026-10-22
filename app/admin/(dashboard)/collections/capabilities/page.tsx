import { createClient } from "@/app/lib/supabase/server";
import CollectionHeader from "@/components/admin/collection-header";
import CollectionSearch from "@/components/admin/collection-search";
import CapabilityPill from "./_components/capability-pill";
import CapabilityInput from "./_components/capability-input";

type PageProps = {
    searchParams?: Promise<{
        name?: string;
    }>
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();
    const { data, error } = await supabase.from("capabilities").select("id, name, created_at").ilike('name', `%${searchParams?.name || ""}%`).order('name', { ascending: true });

    return (
        <>
            <div className="flex justify-between items-start">
                <CollectionHeader title="Capabilities" totalEntries={data?.length || 0} />
            </div>
            <div className="flex mb-5">
                <CollectionSearch title="Capabilities" keyName="name" />
            </div>
            <div className="flex gap-x-4 gap-y-3 flex-wrap mb-5">
                <CapabilityInput />
                {data?.map(cap => <CapabilityPill id={cap.id} label={cap.name} />)}
            </div>
        </>
    )
}
