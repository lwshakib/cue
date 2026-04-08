"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronDown, Plus } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"

const actions = [
  { label: "Create workflow", href: "/home/workflows" },
  { label: "Create credential", href: "/home/credentials" },
  { label: "Create variable", href: "/home/variables" },
  { label: "Create data table", href: "/home/data-tables" },
]

export function DashboardHeader() {
  const pathname = usePathname()
  
  // Find current action based on path
  const currentAction = actions.find(a => pathname.includes(a.href)) ?? actions[0]!
  const otherActions = actions.filter(a => a.label !== currentAction.label)

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          All the workflows, credentials and data tables you have access to
        </p>
      </div>
      
      <div className="flex items-center gap-px rounded-md bg-primary shadow-sm hover:bg-primary/90 transition-colors overflow-hidden">
        <Button 
          variant="ghost"
          className="rounded-none h-10 px-4 border-r border-primary-foreground/10 text-sm font-semibold text-primary-foreground hover:bg-white/10 active:bg-white/20 whitespace-nowrap"
        >
          {currentAction.label}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-none h-10 w-10 px-0 text-primary-foreground hover:bg-white/10 active:bg-white/20">
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {otherActions.map((action) => (
              <DropdownMenuItem key={action.label} className="cursor-pointer">
                <Plus className="mr-2 size-4" />
                <span>{action.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
