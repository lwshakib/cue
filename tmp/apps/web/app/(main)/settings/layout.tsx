"use client"

import * as React from "react"
import {
  ArrowLeft,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@repo/ui/components/ui/sidebar"

const settingsNav = [
  { title: "Personal", icon: User, isActive: true },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-svh w-full bg-background overflow-hidden relative">
        <Sidebar className="w-64 border-r bg-sidebar">
          <SidebarHeader className="h-14 px-2 py-4 border-none">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="hover:bg-transparent active:bg-transparent focus-visible:ring-0 data-[active=true]:bg-transparent"
                >
                  <a href="/home/workflows" className="flex items-center gap-2 group">
                    <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent className="px-2">
            <SidebarMenu>
              {settingsNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
                    <a href="#">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
