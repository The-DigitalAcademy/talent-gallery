import { createClient } from "@/app/lib/supabase/server";
import ItemCountsMetricCard from "@/components/admin/item-counts-metric-card";

export default async function Page() {

    const supabase = await createClient();
    const { data: _capabilitiesData } = await supabase.from("capabilities").select("name, talent_capabilities(count)").order('count', { referencedTable: 'talent_capabilities', ascending: false })
    const { data: _programsData } = await supabase.from("programs").select("name, talents(count)").order('count', { referencedTable: 'talents', ascending: false })
    const { data: _locationsData } = await supabase.from("locations").select("city, talents(count)").order('count', { referencedTable: 'talents', ascending: false })
    const { data: _statusesData } = await supabase.from("talent_statuses").select("name, talents(count)").order('count', { referencedTable: 'talents', ascending: false })

    const capabilitiesData = _capabilitiesData?.map(({ name, talent_capabilities }) => ({ name, count: talent_capabilities[0].count }))
    capabilitiesData?.sort((a, b) => b.count - a.count)

    const programsData = _programsData?.map(({ name, talents }) => ({ name, count: talents[0].count }))
    programsData?.sort((a, b) => b.count - a.count)

    const locationsData = _locationsData?.map(({ city, talents }) => ({ name: city, count: talents[0].count }))
    locationsData?.sort((a, b) => b.count - a.count)
    const statusesData = _statusesData?.map(({ name, talents }) => ({ name, count: talents[0].count }))
    statusesData?.sort((a, b) => b.count - a.count)

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-2xl font-bold">Talent Admin Dashboard</h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <ItemCountsMetricCard
                    title="Capabilities"
                    subTitle="Number of talents possessing each capability"
                    items={capabilitiesData || []} />
                <ItemCountsMetricCard
                    title="Programs"
                    subTitle="Number of talents enrolled in each program"
                    items={programsData || []} />
                <ItemCountsMetricCard
                    title="Locations"
                    subTitle="Number of talents from each location"
                    items={locationsData || []} />
                <ItemCountsMetricCard
                    title="Statuses"
                    subTitle="Number of talents in each status"
                    items={statusesData || []} />
            </div>
        </div>
    )
}
