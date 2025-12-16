import React from "react"
import clsx from "clsx"
import styles from "./quickstart-filter.module.css"
import { CATEGORIES } from "./constants"
import type { QuickstartCategory } from "./types"

interface CategoryFilterProps {
  activeCategory: QuickstartCategory
  onCategoryChange: (categoryId: string) => void
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className={styles.filterBar}>
      <span className={styles.filterLabel}>Categories</span>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={clsx(
            styles.chip,
            activeCategory.id === cat.id && styles.chipActive,
          )}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
