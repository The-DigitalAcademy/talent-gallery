export default function CollectionHeader({ title, totalEntries }: { title: string, totalEntries: number }) {
    return (
        <div className="mb-5">
            <h1 className="text-2xl font-bold mb">{title}</h1>
            <p className="text-slate-500">{totalEntries} entries</p>
        </div>
    )
}
