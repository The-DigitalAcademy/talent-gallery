import Sidebar from "@/components/admin/sidebar";
import { Inter } from "next/font/google";
import { ReactNode } from "react";


const inter = Inter({
    display: "swap",
    subsets: ["latin"]
})

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className={`${inter.className} h-screen flex overflow-hidden`}>
            <Sidebar />
            <main className="px-18 pb-6 pt-12 w-full bg-gray-50/50 flex-1 min-h-0 overflow-y-scroll">
                {children}
            </main>
        </div>
    )
}
