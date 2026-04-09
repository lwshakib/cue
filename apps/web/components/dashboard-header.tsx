"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
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

const getSessionToken = () => {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; axonix_session_token=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null
  return null
}

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCreating, setIsCreating] = React.useState(false)
  
  // Find current action based on path
  const currentAction = actions.find(a => pathname.includes(a.href)) ?? actions[0]!
  const otherActions = actions.filter(a => a.label !== currentAction.label)

  const createWorkflow = async () => {
    if (isCreating) return
    const token = getSessionToken()
    if (!token) return

    try {
      setIsCreating(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: "My Workflow" }),
      })

      if (!response.ok) {
        throw new Error("Create workflow failed")
      }

      const payload = await response.json()

      if (typeof window !== "undefined" && payload?.workflow) {
        window.dispatchEvent(
          new CustomEvent("workflow:created", {
            detail: payload.workflow,
          })
        )
      }

      const createdWorkflowId = payload?.workflow?.id as string | undefined
      if (createdWorkflowId) {
        router.push(`/workflow/${createdWorkflowId}`)
      } else if (!pathname.includes("/home/workflows")) {
        router.push("/home/workflows")
      }
    } catch (error) {
      console.error("[DashboardHeader] Failed to create workflow:", error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          All the workflows, credentials and data tables you have access to
        </p>
      </div>
      
      <div className="group flex items-center rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md transition-all overflow-hidden">
        <Button 
          variant="ghost"
          className="rounded-none h-10 px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground active:bg-primary/75 active:text-primary-foreground whitespace-nowrap transition-colors"
          onClick={() => {
            if (currentAction.href === "/home/workflows") {
              void createWorkflow()
            }
          }}
          disabled={isCreating && currentAction.href === "/home/workflows"}
        >
          {currentAction.label}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none h-10 w-10 px-0 border-l border-primary-foreground/15 text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground active:bg-primary/75 active:text-primary-foreground data-[state=open]:bg-primary/85 data-[state=open]:text-primary-foreground transition-colors"
            >
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
