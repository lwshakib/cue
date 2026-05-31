"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"

const tabs = [
  { name: "Workflows", href: "/home/workflows" },
  { name: "Credentials", href: "/home/credentials" },
  { name: "Executions", href: "/home/executions" },
  { name: "Variables", href: "/home/variables" },
  { name: "Data tables", href: "/home/data-tables" },
]

export function DashboardTabs() {
  const pathname = usePathname()

  return (
    <div className="px-6 mt-8 flex items-center border-b border-muted-foreground/10 space-x-8 h-12">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || (tab.href === "/home/workflows" && pathname === "/home")
        
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "text-sm font-medium h-full flex items-center border-b-2 transition-all relative px-1",
              isActive 
                ? "border-primary text-foreground" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.name}
          </Link>
        )
      })}
    </div>
  )
}
