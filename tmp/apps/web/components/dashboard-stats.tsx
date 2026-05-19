import * as React from "react"
import { HelpCircle } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip"

const stats = [
  { label: "Prod. executions", value: "0" },
  { label: "Failed prod. executions", value: "0" },
  { label: "Failure rate", value: "0%" },
  { label: "Time saved", value: "--", info: "Statistical estimation of time saved" },
  { label: "Run time (avg.)", value: "0s" },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-6 py-2">
      <TooltipProvider>
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-muted/10 border-muted-foreground/10 shadow-none hover:bg-muted/20 transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.05em]">
                {stat.label}
              </CardTitle>
              {stat.info && (
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="size-3 text-muted-foreground/50" />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-[10px]">{stat.info}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </TooltipProvider>
    </div>
  )
}
