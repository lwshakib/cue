"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Search, 
  Filter, 
  MoreVertical, 
  User,
} from "lucide-react"

import { Input } from "@repo/ui/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"

type WorkflowItem = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

const getSessionToken = () => {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; axonix_session_token=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null
  return null
}

const formatDate = (value: string) => {
  const date = new Date(value)
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}

export default function WorkflowsPage() {
  const router = useRouter()
  const [allWorkflows, setAllWorkflows] = React.useState<WorkflowItem[]>([])
  const [visibleCount, setVisibleCount] = React.useState(20)
  const [isLoading, setIsLoading] = React.useState(true)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const run = async () => {
      const token = getSessionToken()
      if (!token) {
        setAllWorkflows([])
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflow`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to load workflows")
        }

        const payload = await response.json()
        setAllWorkflows(payload.workflows ?? [])
        setVisibleCount(20)
      } catch (error) {
        console.error("[WorkflowsPage] Failed to load workflows:", error)
        setAllWorkflows([])
      } finally {
        setIsLoading(false)
      }
    }

    void run()
  }, [])

  React.useEffect(() => {
    const onWorkflowCreated = (event: Event) => {
      const customEvent = event as CustomEvent<WorkflowItem>
      const workflow = customEvent.detail
      if (!workflow?.id) return

      setAllWorkflows((current) => {
        const exists = current.some((item) => item.id === workflow.id)
        if (exists) return current
        return [workflow, ...current]
      })
      setVisibleCount((prev) => Math.max(prev, 20))
    }

    window.addEventListener("workflow:created", onWorkflowCreated as EventListener)
    return () => window.removeEventListener("workflow:created", onWorkflowCreated as EventListener)
  }, [])

  React.useEffect(() => {
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first?.isIntersecting) return
        setVisibleCount((prev) => Math.min(prev + 20, allWorkflows.length))
      },
      { rootMargin: "200px 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [allWorkflows.length])

  const workflows = React.useMemo(
    () => allWorkflows.slice(0, visibleCount),
    [allWorkflows, visibleCount]
  )

  const duplicateWorkflow = async (workflow: WorkflowItem) => {
    const token = getSessionToken()
    if (!token) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: `${workflow.name} Copy` }),
      })

      if (!response.ok) {
        throw new Error("Failed to duplicate workflow")
      }

      const payload = await response.json()
      const created = payload?.workflow as WorkflowItem | undefined
      if (!created?.id) return

      setAllWorkflows((current) => [created, ...current])
      setVisibleCount((prev) => Math.max(prev, 20))
    } catch (error) {
      console.error("[WorkflowsPage] Failed to duplicate workflow:", error)
    }
  }

  const deleteWorkflow = async (workflow: WorkflowItem) => {
    const token = getSessionToken()
    if (!token) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflow/${workflow.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete workflow")
      }

      setAllWorkflows((current) => current.filter((item) => item.id !== workflow.id))
    } catch (error) {
      console.error("[WorkflowsPage] Failed to delete workflow:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex items-center justify-end gap-3">
        <div className="relative w-full max-w-sm group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <Input 
            placeholder="Search" 
            className="pl-10 h-10 bg-muted/5 border-muted-foreground/10 focus-visible:ring-1 focus-visible:ring-primary/50" 
          />
        </div>
        <Select defaultValue="updated">
          <SelectTrigger className="w-[180px] h-10 bg-muted/5 border-muted-foreground/10">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Sort by last updated</SelectItem>
            <SelectItem value="name">Sort by name</SelectItem>
            <SelectItem value="created">Sort by created</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="h-10 w-10 bg-muted/5 border-muted-foreground/10">
          <Filter className="size-4" />
        </Button>
      </div>

      {/* Workflow List */}
      <div className="space-y-3">
        {isLoading && (
          <div className="text-sm text-muted-foreground">Loading workflows...</div>
        )}
        {!isLoading && allWorkflows.length === 0 && (
          <div className="text-sm text-muted-foreground">No workflows yet. Click Create workflow.</div>
        )}
        {workflows.map((wf) => (
          <div 
            key={wf.id} 
            className="flex items-center justify-between p-4 rounded-xl border border-muted-foreground/10 bg-muted/5 hover:bg-muted/10 transition-all group cursor-pointer"
            onClick={() => router.push(`/workflow/${wf.id}`)}
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-[15px] group-hover:text-primary transition-colors">{wf.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                Last updated {formatDate(wf.updatedAt)} <span className="h-4 w-px bg-muted-foreground/30 mx-1" /> Created {formatDate(wf.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-muted/20 text-muted-foreground flex items-center gap-1 px-2.5 py-1 font-normal border-none">
                <User className="size-3" />
                <span className="text-[11px] font-medium">Personal</span>
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-foreground"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/workflow/${wf.id}`)
                    }}
                  >
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      void duplicateWorkflow(wf)
                    }}
                  >
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      void deleteWorkflow(wf)
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Footer */}
      <div className="pt-6 text-sm text-muted-foreground">
        <div ref={sentinelRef} className="h-2 w-full" />
        {!isLoading && workflows.length < allWorkflows.length && (
          <p className="mt-2 text-xs text-muted-foreground">Scroll to load more...</p>
        )}
      </div>
    </div>
  )
}
