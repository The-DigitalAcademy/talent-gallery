import { createClient } from "@/app/lib/supabase/server";
import ItemCountsMetricCard from "@/components/admin/item-counts-metric-card";

export default async function Page() {

    const supabase = await createClient();
    const { data: _programsData } = await supabase.from("programs").select("name, talents(count)").order('count', { referencedTable: 'talents', ascending: false })
    const { data: _statusesData } = await supabase.from("talent_statuses").select("name, talents(count)").order('count', { referencedTable: 'talents', ascending: false })

    const programsData = _programsData?.map(({ name, talents }) => ({ name, count: talents[0].count }))
    programsData?.sort((a, b) => b.count - a.count)

    const statusesData = _statusesData?.map(({ name, talents }) => ({ name, count: talents[0].count }))
    statusesData?.sort((a, b) => b.count - a.count)

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-2xl font-bold">Talent Admin Dashboard</h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <ItemCountsMetricCard
                    title="Programs"
                    subTitle="Number of talents enrolled in each program"
                    items={programsData || []} />
                <ItemCountsMetricCard
                    title="Statuses"
                    subTitle="Number of talents in each status"
                    items={statusesData || []} />
            </div>
        </div>
    )
}
