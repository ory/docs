import React from "react"
import Link from "@docusaurus/Link"
import type { QuickstartItem, DeploymentMode } from "./types"

interface QuickstartGridProps {
  items: QuickstartItem[]
  deploymentMode: DeploymentMode
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
        <Link
          key={item.to}
          className="block p-4 px-5 rounded-[var(--ory-radius)] border border-ory-border-primary bg-ory-bg-primary no-underline text-inherit transition-[box-shadow,transform,border-color] duration-150 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-ory-border-brand-tertiary"
          to={item.to}
        >
          <h3 className="ory-heading-3 m-0 mb-1">{item.label}</h3>
          {item.description && (
            <p className="ory-body-sm m-0">{item.description}</p>
          )}
        </Link>
      ))}
    </div>
  )
}
