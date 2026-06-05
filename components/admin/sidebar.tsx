"use client";
import clsx from "clsx"
import { BoxesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    {
        name: "Talent Statuses",
        href: "/admin/collections/talent-statuses"
    },
]

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <aside className="w-55 px-2 border-r border-gray-200 bg-gray-100/75 flex flex-col md:flex shrink-0 h-full overflow-y-auto">
            <div className="py-4">
                <Link href="/admin" className="flex gap-2 items-center">
                    <Image src='/shaper-logo-sm.png' width={50} height={50} alt="shaper logo" className="size-5" />
                    <span className="font-semibold text-lg">Talent</span>
                    <span className="text-lg font-light">Admin</span>
                </Link>
            </div>
            <div className="text-gray-500">
                <div className="font-medium px-2 flex text-sm items-center gap-2 h-8">
                    <BoxesIcon className="w-4" />
                    <span>Collections</span>
                </div>
                <ul className="text-sm border-l border-gray-300 ml-4 pl-3 flex flex-col gap-1">
                    {mainNav.map(item => (
                        <li key={item.name} className="flex">
                            <a href={item.href}
                                className={clsx("px-3 py-1 font-medium w-full hover:bg-gray-200/50 hover:text-gray-800 rounded-xl transition",
                                    { "bg-gray-200 text-gray-800": pathname == item.href }
                                )}
                            > {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
