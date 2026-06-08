import Sidebar from "@/components/admin/sidebar";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { createClient } from "../lib/supabase/server";


const inter = Inter({
    display: "swap",
    subsets: ["latin"]
})

export default async function Layout({ children }: { children: ReactNode }) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    const userMetadata = data.user?.user_metadata
    return (
        <div className={`${inter.className} h-screen flex overflow-hidden`}>
            <Sidebar user={{ name: userMetadata?.full_name, email: userMetadata?.email, avatarUrl: userMetadata?.avatar_url }} />
            <main className="px-18 pb-6 pt-12 w-full bg-gray-50/50 flex-1 min-h-0 overflow-y-scroll">
                {children}
            </main>
        </div>
    )
}
