import React from "react"
import { OverviewCard } from "@site/src/components/welcomePage/OverviewCard"
import type { QuickstartItem, DeploymentMode } from "./types"

interface QuickstartGridProps {
  items: QuickstartItem[]
  deploymentMode: DeploymentMode
}

/** Prefix doc path with deployment so links go to network/oel/oss variant. */
function toDeploymentPath(path: string, deployment: DeploymentMode): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  // Some routes intentionally do not have per-deployment variants.
  if (
    normalized.startsWith("/guides/") ||
    normalized.startsWith("/elements") ||
    normalized.startsWith("/getting-started/")
  ) {
    return normalized
  }
  return `/${deployment}${normalized}`
}

export const QuickstartGrid: React.FC<QuickstartGridProps> = ({
  items,
  deploymentMode,
}) => {
  const filteredItems = items.filter((item) => {
    if (!item.deploymentModes) {
      return true
    }
    return item.deploymentModes.includes(deploymentMode)
  })

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
      {filteredItems.map((item) => (
        <div key={item.to} className="min-w-0 h-full">
          <OverviewCard
            title={item.label}
            description={item.description ?? ""}
            to={toDeploymentPath(item.to, deploymentMode)}
            linkLabel="Learn more"
          />
        </div>
      ))}
    </div>
  )
}
