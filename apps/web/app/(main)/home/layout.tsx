import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@repo/ui/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardTabs } from "@/components/dashboard-tabs"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <div className="mx-auto w-full max-w-[1400px]">
          <DashboardHeader />
          <div className="flex flex-1 flex-col overflow-y-auto">
            <DashboardStats />
            <DashboardTabs />
            <div className="flex-1 p-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
