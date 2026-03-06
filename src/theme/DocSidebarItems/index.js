import React, { useState, useMemo } from "react"
import DocSidebarItems from "@theme-original/DocSidebarItems"
import { useLocation } from "@docusaurus/router"

function filterItems(items, query) {
  if (!query) return items
  const lower = query.toLowerCase()
  return items.reduce((acc, item) => {
    if (item.type === "category") {
      const filteredChildren = filterItems(item.items, query)
      const labelMatch = item.label?.toLowerCase().includes(lower)
      if (filteredChildren.length > 0 || labelMatch) {
        acc.push({ ...item, items: filteredChildren, collapsed: false })
      }
    } else {
      const label = (item.label || item.id || "").toLowerCase()
      if (label.includes(lower)) {
        acc.push(item)
      }
    }
    return acc
  }, [])
}

export default function DocSidebarItemsWrapper(props) {
  const [query, setQuery] = useState("")
  const location = useLocation()

  const isApiPage =
    location.pathname.includes("/reference/api") ||
    location.pathname.includes("/polis/reference/api")

  const filteredItems = useMemo(
    () => (isApiPage ? filterItems(props.items, query) : props.items),
    [props.items, query, isApiPage],
  )

  return (
    <>
      {isApiPage && (
        <div style={{ padding: "0.5rem 0.75rem 0.75rem" }}>
          <input
            type="text"
            placeholder="Filter endpoints..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.4rem 0.75rem",
              fontSize: "0.85rem",
              border: "1px solid var(--ifm-toc-border-color)",
              borderRadius: "6px",
              backgroundColor: "var(--ifm-background-color)",
              color: "var(--ifm-font-color-base)",
              outline: "none",
            }}
          />
        </div>
      )}
      <DocSidebarItems {...props} items={filteredItems} />
    </>
  )
}
