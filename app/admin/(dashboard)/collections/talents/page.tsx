import { createClient } from "@/app/lib/supabase/server";
import CollectionTable from "@/components/admin/collection-table";
import { columns } from "./columns";
import CollectionFilter from "@/components/admin/collection-filter";
import CollectionHeader from "@/components/admin/collection-header";
import CollectionSearch from "@/components/admin/collection-search";
import { fetchTalents } from "@/app/lib/data";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

type PageProps = {
    searchParams?: Promise<{
        fullname?: string;
        program?: string;
        cohort?: string;
        status?: string;
    }>
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();
    const { data, error } = await fetchTalents(searchParams)
    const { data: programs, error: programsError } = await supabase.from("programs").select("id, name")
    const { data: cohorts, error: cohortsError } = await supabase.from("cohorts").select("id, name")
    const { data: statuses, error: statusesError } = await supabase.from("talent_statuses").select("id, name")

    return (
        <>
            <div className="flex justify-between items-start">
                <CollectionHeader title="Talents" totalEntries={data?.length || 0} />
                <Link href="/admin/collections/talents/create" className="text-black px-3 text-sm font-medium flex items-center gap-2 rounded-lg cursor-pointer hover:bg-gray-200 shadow h-8 border border-gray-300">
                    <PlusIcon className='w-4' /> <span>Add Item</span>
                </Link>
            </div>
            <div className="flex gap-5">
                <CollectionSearch title="Name" keyName="fullname" />
                <CollectionFilter title="Program" keyName="program" options={programs?.map(i => ({ label: i.name, value: i.id })) || []} />
                <CollectionFilter title="Cohort" keyName="cohort" options={cohorts?.map(i => ({ label: i.name, value: i.id })) || []} />
                <CollectionFilter title="Status" keyName="status" options={statuses?.map(i => ({ label: i.name, value: i.id })) || []} />
                <CollectionFilter title="Published status" keyName="published" options={[{ label: 'published', value: 'true' }, { label: 'not published', value: 'false' }]} />
            </div>
            <CollectionTable data={data || []} columns={columns} />
        </>
    )
}
