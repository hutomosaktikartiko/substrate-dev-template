import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function DashboardLayout ({ children }: { children: React.ReactNode }) {
    // // Cek apakah ada token autentikasi (misal, di cookies)
    // const token = cookies().get("auth_token")?.value

    // // Jika tidak ada token, redirect ke halaman login
    // if (!token) {
    //     redirect("/auth/login")
    // }

    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
        >
            <AppSidebar variant="inset" />

            <SidebarInset>
                <SiteHeader />

                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}