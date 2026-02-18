import React from "react"
import clsx from "clsx"
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
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <span className="ory-body-sm font-semibold mr-2 text-ory-text-primary">
        Categories
      </span>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={clsx(
            "border rounded-full py-1.5 px-3.5 bg-transparent ory-body-sm cursor-pointer transition-[background,color,border-color] duration-150 border-ory-border-primary inline-flex items-center gap-2",
            activeCategory.id === cat.id &&
              "bg-ory-brand-primary border-ory-brand-primary text-white",
          )}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.color && (
            <span
              className="shrink-0 rounded-full w-2 h-2"
              style={{ backgroundColor: cat.color }}
              aria-hidden
            />
          )}
          {cat.label}
        </button>
      ))}
    </div>
  )
}
