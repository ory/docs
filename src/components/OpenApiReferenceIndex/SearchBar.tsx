// Sticky search input (with the navbar magnifier icon) shown above the operation
// list. Presentational — search state lives in `useOperationSearch`.

import React from "react"
import IconSearch from "@site/src/static/img/icons/search.svg"

export function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div
      className="sticky z-10 mb-6 py-2 bg-[var(--ifm-background-color)]"
      style={{ top: "var(--ifm-navbar-height)" }}
    >
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[var(--ifm-color-emphasis-500)]">
          <IconSearch className="w-4 h-4" aria-hidden="true" />
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search operations by name, tag, or method…"
          aria-label="Search SDK operations"
          className="w-full rounded border pl-10 pr-3 py-2 bg-[var(--ifm-background-surface-color)] text-[var(--ifm-font-color-base)] border-[var(--ifm-color-emphasis-300)]"
        />
      </div>
    </div>
  )
}
