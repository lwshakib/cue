import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@repo/ui/components/ui/sidebar"

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex-1 p-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
