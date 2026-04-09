"use client"

import * as React from "react"
import {
  LayoutDashboard,
  LayoutTemplate,
  Plus,
  Search,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSettings } from "@/components/nav-settings"
import { Logo } from "@/components/Logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/home/workflows",
      icon: LayoutDashboard,
      isActive: true,
    },
  ],
  footer: [
    {
      title: "Templates",
      url: "/home/templates",
      icon: LayoutTemplate,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-4 px-2 py-2">
              {/* Expanded Branding */}
              <div className="flex h-12 items-center justify-between group-data-[collapsible=icon]:hidden w-full">
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Logo className="size-6 text-sidebar-foreground" />
                  </div>
                  <span className="truncate font-semibold text-sidebar-foreground">Axonix</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <SidebarMenuButton size="sm" className="h-8 w-8 text-sidebar-foreground/70" tooltip="New">
                    <Plus className="size-4" />
                  </SidebarMenuButton>
                  <SidebarMenuButton size="sm" className="h-8 w-8 text-sidebar-foreground/70" tooltip="Search">
                    <Search className="size-4" />
                  </SidebarMenuButton>
                  <SidebarTrigger className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground" />
                </div>
              </div>
              
              {/* Collapsed Vertical Stack */}
              <div className="hidden group-data-[collapsible=icon]:flex flex-col items-center gap-2 py-2">
                <SidebarMenuButton size="sm" className="h-8 w-8 text-sidebar-foreground/70" tooltip="New">
                  <Plus className="size-4" />
                </SidebarMenuButton>
                <SidebarMenuButton size="sm" className="h-8 w-8 text-sidebar-foreground/70" tooltip="Search">
                  <Search className="size-4" />
                </SidebarMenuButton>
                <SidebarTrigger className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground" />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:p-2">
        <SidebarMenu>
          {data.footer.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <NavSettings />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
