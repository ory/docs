import React from "react"
import Link from "@docusaurus/Link"
import styles from "./quickstart-filter.module.css"
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
    <div className={styles.grid}>
      {filteredItems.map((item) => (
        <Link key={item.to} className={styles.card} to={item.to}>
          <h3 className={`ory-heading-3 ${styles.cardTitle}`}>{item.label}</h3>
          {item.description && (
            <p className={`ory-body-sm ${styles.cardDescription}`}>
              {item.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}
