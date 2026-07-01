// Helpers that operate on the generated OpenAPI sidebar item tree.

import type {
  OpenApiSidebarCategory,
  OpenApiSidebarDoc,
  OpenApiSidebarItem,
} from "./types"

// Items that exist in the sidebar but should not be rendered as operations.
export const SKIP_IDS = new Set(["reference/openapi/ory-apis"])

export function isCategory(
  item: OpenApiSidebarItem,
): item is OpenApiSidebarCategory {
  return item.type === "category"
}

export function isDoc(item: OpenApiSidebarItem): item is OpenApiSidebarDoc {
  return item.type === "doc"
}

export function isApiEndpoint(item: OpenApiSidebarDoc): boolean {
  return Boolean(item.className?.includes("api-method"))
}

export function docLabel(item: OpenApiSidebarDoc): string {
  if (item.label) return item.label
  const slug = item.id.split("/").pop() ?? item.id
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export function methodFromClassName(className?: string): string | null {
  if (!className) return null
  const match = className.match(/api-method\s+(\w+)/)
  return match ? match[1].toUpperCase() : null
}

export type FlatOp = {
  doc: OpenApiSidebarDoc
  label: string
  method: string | null
  tag: string | null // parent category label, null for top-level docs
}

// Flatten the grouped sidebar into a single list the fuzzy index can search.
// Only fields available without lazy-loading each endpoint's MDX are indexed:
// the operation label, its HTTP method, and its tag (parent category label).
export function flattenOps(items: OpenApiSidebarItem[]): FlatOp[] {
  const out: FlatOp[] = []
  const push = (doc: OpenApiSidebarDoc, tag: string | null) => {
    if (SKIP_IDS.has(doc.id)) return
    out.push({
      doc,
      label: docLabel(doc),
      method: methodFromClassName(doc.className),
      tag,
    })
  }
  for (const item of items) {
    if (isDoc(item)) push(item, null)
    else if (isCategory(item))
      item.items.forEach((child) => isDoc(child) && push(child, item.label))
  }
  return out
}
