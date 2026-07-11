// Fuzzy search over the flattened operation list. Returns the controlled query
// state plus `results`: `null` while the query is empty (render the full grouped
// layout) or a ranked `FlatOp[]` when searching.

import { useEffect, useMemo, useState } from "react"
import Fuse from "fuse.js"
import { flattenOps } from "./sidebar"
import type { FlatOp } from "./sidebar"
import type { OpenApiSidebarItem } from "./types"

const SEARCH_DEBOUNCE_MS = 250

export function useOperationSearch(items: OpenApiSidebarItem[]) {
  const flatOps = useMemo(() => flattenOps(items), [items])
  const fuse = useMemo(
    () =>
      new Fuse(flatOps, {
        keys: [
          { name: "label", weight: 0.7 },
          { name: "tag", weight: 0.2 },
          { name: "method", weight: 0.1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [flatOps],
  )

  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [query])

  // null → no active query, render the full grouped layout.
  const results = useMemo<FlatOp[] | null>(() => {
    const q = debouncedQuery.trim()
    return q ? fuse.search(q).map((r) => r.item) : null
  }, [debouncedQuery, fuse])

  return { query, setQuery, debouncedQuery, results }
}
