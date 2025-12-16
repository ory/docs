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
          <h3 className={styles.cardTitle}>{item.label}</h3>
          {item.description && (
            <p className={styles.cardDescription}>{item.description}</p>
          )}
        </Link>
      ))}
    </div>
  )
}
