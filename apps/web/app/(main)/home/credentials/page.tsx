import * as React from "react"
import { Database, Plus } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"

export default function CredentialsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted-foreground/10 rounded-2xl bg-muted/5 space-y-4">
      <div className="p-3 bg-muted rounded-full">
        <Database className="size-6 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-sm">No credentials found</h3>
        <p className="text-xs text-muted-foreground mt-1">Start by creating your first secure credential</p>
      </div>
      <Button variant="outline" className="h-9 px-4 gap-2 text-xs border-border hover:border-primary/50 transition-colors">
        <Plus className="size-3.5" />
        Create credential
      </Button>
    </div>
  )
}
