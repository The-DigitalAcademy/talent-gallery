"use client";
import clsx from "clsx"
import { usePathname } from "next/navigation"

const mainNav = [
    {
        name: "Talents",
        href: "/admin/collections/talents"
    },
    {
        name: "Programs",
        href: "/admin/collections/programs"
    },
    {
        name: "Cohorts",
        href: "/admin/collections/cohorts"
    },
    {
        name: "Locations",
        href: "/admin/collections/locations"
    },
    {
        name: "Capabilities",
        href: "/admin/collections/capabilities"
    },
]

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col md:flex shrink-0 h-full overflow-y-auto">
            <div className="p-6">
                <div className="mb-8">
                    <span className="font-semibold text-lg text-slate-800">Talent Admin</span>
                </div>
                <div className="">
                    <div className="text-slate-500 py-1 text-sm">Collections</div>
                    <ul className="text-[15px]">
                        {mainNav.map(item => (
                            <li key={item.name} className="flex mb-1">
                                <a href={item.href}
                                    className={clsx("px-3 py-1  w-full hover:bg-slate-50 transition border",
                                        { "bg-slate-50 border-slate-200": pathname == item.href },
                                        { "border-transparent": pathname != item.href }
                                    )}
                                > {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </aside>
    )
}
