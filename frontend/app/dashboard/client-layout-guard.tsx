"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePolkadot } from "@/components/providers/polkadot-provider"
import { useWallet } from "@/components/providers/wallet-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ConnectWallet } from "@/components/ui/connect-wallet"
import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar"

export function ClientLayoutGuard ({ children }: { children: React.ReactNode }) {
    const { isConnected } = usePolkadot()
    const { selectedAccount } = useWallet()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected) {
            router.replace("/connect")
        }
    }, [isConnected, router])

    if (!isConnected) {
        return <div className="flex flex-col items-center justify-center min-h-screen">Connection to Polkadot...</div>
    }

    if (!selectedAccount) {
        return <ConnectWallet />
    }

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
