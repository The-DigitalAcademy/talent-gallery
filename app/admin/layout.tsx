import Sidebar from "@/components/admin/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <main className="p-6 w-full flex-1 min-h-0 overflow-y-scroll">
                {children}
            </main>
        </div>
    )
}
