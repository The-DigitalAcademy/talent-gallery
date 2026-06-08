"use client";
import { createClient } from "@/app/lib/supabase/client";
import { Avatar, Button } from "@base-ui/react";
import clsx from "clsx"
import { BoxesIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"

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

export default function Sidebar({ user }: { user: { name: string, email: string, avatarUrl: string } }) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <aside className="w-55 px-2 border-r border-gray-200 bg-gray-100/75 flex flex-col md:flex shrink-0 h-full overflow-y-auto">
            <div className="py-4">
                <Link href="/admin" className="flex gap-2 items-center">
                    <Image src='/shaper-logo-sm.png' width={50} height={50} alt="shaper logo" className="size-5" />
                    <span className="font-semibold text-lg">Talent</span>
                    <span className="text-lg font-light">Admin</span>
                </Link>
            </div>
            <div className="text-gray-500 flex-1">
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
            <div className="flex items-center gap-2 mb-3">
                <Avatar.Root className="inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-200 align-middle text-sm leading-none font-normal text-neutral-950 select-none dark:bg-neutral-800 dark:text-white">
                    <Avatar.Image
                        src={user.avatarUrl}
                        width="48"
                        height="48"
                        className="w-10"
                    />
                    <Avatar.Fallback delay={600} className="flex size-7 items-center justify-center text-xs ">
                        {user.name
                            .trim()
                            .split(/\s+/) // Splits by any amount of whitespace
                            .map(part => part[0].toUpperCase())
                            .join('')}
                    </Avatar.Fallback>
                </Avatar.Root>
                <div title={user.email} className="text-sm cursor-default text-gray-500 whitespace-nowrap truncate">{user.email}</div>
            </div>
            <div className="pb-5">
                <Button onClick={async () => {
                    const supabase = createClient()
                    await supabase.auth.signOut()
                    router.push('/admin/auth/login')
                }} className="border flex justify-center items-center gap-2 border-gray-200 rounded-xl text-sm py-1 shadow transition-lg w-full bg-white hover:bg-gray-100 cursor-pointer text-sm">
                    <LogOutIcon className="w-4" /> <span>logout</span>
                </Button>
            </div>
        </aside>
    )
}
