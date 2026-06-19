export default function ItemCountsMetricCard({ items, title, subTitle }: { items: { name: string, count: number }[], title: string, subTitle: string }) {

    return (
        <div className="border rounded-xl border-gray-200 h-75 p-6 overflow-hidden flex flex-col gap-5">
            <div>
                <div className="text-lg font-semibold mb-1">{title}</div>
                <p className="text-sm text-gray-400">{subTitle}</p>
            </div>
            <div className="flex flex-col gap-3 overflow-y-scroll pr-3">
                {items?.map(({ name, count }) =>
                    <div style={{ width: `${(count / items[0].count) * 100}%` }}
                        className="bg-blue-500/75 h-4 text-white/75 flex justify-between px-3 rounded-lg text-center text-xs">
                        <span>{name}</span>
                        <span> {count}</span>
                    </div>)}
            </div>
            <div className="text-sm text-gray-500 mt-auto">Number of {title}: {items.length}</div>
        </div>
    )
}
