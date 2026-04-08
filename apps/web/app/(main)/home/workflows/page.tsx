"use client"

import * as React from "react"
import { 
  Search, 
  Filter, 
  MoreVertical, 
  User,
  ChevronLeft,
  ChevronRight
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/ui/pagination"

const workflows = [
  {
    id: 1,
    name: "My workflow",
    updated: "23 minutes ago",
    created: "5 April",
    owner: "Personal",
  },
]

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex items-center justify-end gap-3">
        <div className="relative w-full max-w-sm group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <Input 
            placeholder="Search" 
            className="pl-10 h-10 bg-muted/5 border-muted-foreground/10 focus-visible:ring-1 focus-visible:ring-red-600/50" 
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
        {workflows.map((wf) => (
          <div 
            key={wf.id} 
            className="flex items-center justify-between p-4 rounded-xl border border-muted-foreground/10 bg-muted/5 hover:bg-muted/10 transition-all group cursor-pointer"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-[15px] group-hover:text-red-500 transition-colors">{wf.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                Last updated {wf.updated} <span className="h-4 w-px bg-muted-foreground/30 mx-1" /> Created {wf.created}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-muted/20 text-muted-foreground flex items-center gap-1 px-2.5 py-1 font-normal border-none">
                <User className="size-3" />
                <span className="text-[11px] font-medium">{wf.owner}</span>
              </Badge>
              <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                <MoreVertical className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-end gap-6 pt-6 text-sm text-muted-foreground">
        <p className="text-xs">Total 1</p>
        <Pagination className="w-auto mx-0">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationLink 
                href="#"
                aria-label="Go to previous page"
                className="h-8 w-8 p-0 border-muted-foreground/10 hover:bg-muted/10"
              >
                <ChevronLeft className="size-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                href="#" 
                isActive 
                className="h-8 w-8 p-0 border-primary bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:text-primary-foreground"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                href="#"
                aria-label="Go to next page"
                className="h-8 w-8 p-0 border-muted-foreground/10 hover:bg-muted/10"
              >
                <ChevronRight className="size-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        <Select defaultValue="50">
          <SelectTrigger className="w-[100px] h-8 bg-muted/5 border-muted-foreground/10 text-xs text-muted-foreground">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10/page</SelectItem>
            <SelectItem value="20">20/page</SelectItem>
            <SelectItem value="50">50/page</SelectItem>
            <SelectItem value="100">100/page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
