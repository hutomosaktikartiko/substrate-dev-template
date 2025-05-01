import { ClientLayoutGuard } from "@/app/dashboard/client-layout-guard";

export default function DashboardLayout ({ children }: { children: React.ReactNode }) {
    return (
        <ClientLayoutGuard>{children}</ClientLayoutGuard>
    )
}
