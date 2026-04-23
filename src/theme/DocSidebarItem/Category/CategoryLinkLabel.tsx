/**
 * Renders category label. For items with sidebar-icon-* we show two lines:
 * main title = product name, secondary = domain (per Figma design).
 */
import React from "react"
import clsx from "clsx"
import { getSidebarProductLabels } from "@site/src/theme/sidebarProductLabels"
import styles from "./styles.module.css"

export interface CategoryLinkLabelProps {
  item: { label: string; className?: string }
}

export default function CategoryLinkLabel({ item }: CategoryLinkLabelProps) {
  const { label } = item
  const productLabels = getSidebarProductLabels(item.className)
  const title = productLabels
    ? productLabels.domain
      ? `${productLabels.productName} · ${productLabels.domain}`
      : productLabels.productName
    : ""

  if (productLabels) {
    return (
      <span
        title={title}
        className={clsx(
          styles.categoryLinkLabel,
          styles.categoryLinkLabelDouble,
        )}
      >
        <span className={styles.categoryLinkLabelTextBlock}>
          <span className={styles.categoryLinkLabelMain}>
            {productLabels.productName}
          </span>
          {productLabels.domain && (
            <span className={styles.categoryLinkLabelSecondary}>
              {productLabels.domain}
            </span>
          )}
        </span>
      </span>
    )
  }

  return (
    <span title={label} className={styles.categoryLinkLabel}>
      {label}
    </span>
  )
}
