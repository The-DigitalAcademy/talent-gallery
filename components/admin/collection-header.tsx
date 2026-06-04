import Link from "next/link";

export default function CollectionHeader({ title, totalEntries, slug }: { title: string, totalEntries: number, slug: string }) {
    return (
        <div className="flex justify-between items-start mb-5">
            <div>
                <h1 className="text-3xl font-semibold mb">{title}</h1>
                <p className="text-slate-500">{totalEntries} entries</p>
            </div>
            <Link href={`/admin/collections/${slug}/create`}>
                <button
                    className="flex items-center text-center border bg-white px-3 py-1.5 text-sm cursor-pointer hover:bg-neutral-100 active:bg-slate-200">
                    Add New
                </button>
            </Link>
        </div>

    )
}
