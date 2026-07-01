// Index of every REST operation from the generated OpenAPI docs, grouped by tag,
// with a fuzzy search box. Rendered on the Ory Network SDK reference page.

import React from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import openapiSidebarItems from "@site/docs/reference/openapi/sidebar"
import type { OpenApiSidebarItem } from "./types"
import { isCategory, isDoc, SKIP_IDS } from "./sidebar"
import { useSdkLanguage } from "./useSdkLanguage"
import { useOperationSearch } from "./useOperationSearch"
import { SearchBar } from "./SearchBar"
import { EndpointItem } from "./EndpointItem"

export default function OpenApiReferenceIndex(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext()
  const apiOptions = (siteConfig.themeConfig as any)?.api
  const items = openapiSidebarItems as OpenApiSidebarItem[]
  const selectedLang = useSdkLanguage()

  let firstDocId: string | null = null
  outer: for (const item of items) {
    if (isDoc(item) && !SKIP_IDS.has(item.id)) {
      firstDocId = item.id
      break
    }
    if (isCategory(item)) {
      for (const child of item.items) {
        if (isDoc(child) && !SKIP_IDS.has(child.id)) {
          firstDocId = child.id
          break outer
        }
      }
    }
  }

  const { query, setQuery, debouncedQuery, results } = useOperationSearch(items)

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />

      {results !== null ? (
        results.length === 0 ? (
          <p className="text-[var(--ifm-color-emphasis-600)]">
            No operations match “{debouncedQuery.trim()}”. Search covers
            operation names, tags, and HTTP methods.
          </p>
        ) : (
          <div className="border border-[var(--ifm-color-emphasis-200)] rounded-lg">
            {results.map((op) => (
              <EndpointItem
                key={op.doc.id}
                item={op.doc}
                defaultExpanded={false}
                apiOptions={apiOptions}
                selectedLang={selectedLang}
                tag={op.tag ?? undefined}
              />
            ))}
          </div>
        )
      ) : (
        <>
          {items.map((item, index) => {
            if (isDoc(item)) {
              if (SKIP_IDS.has(item.id)) return null
              return (
                <EndpointItem
                  key={item.id}
                  item={item}
                  defaultExpanded={item.id === firstDocId}
                  apiOptions={apiOptions}
                  selectedLang={selectedLang}
                />
              )
            }

            if (isCategory(item)) {
              return (
                <section key={`${item.label}-${index}`} className="mb-8">
                  <h3 className="capitalize mb-2">{item.label}</h3>
                  <div className="border border-[var(--ifm-color-emphasis-200)] rounded-lg">
                    {item.items.map((child, childIndex) =>
                      isDoc(child) ? (
                        <EndpointItem
                          key={`${child.id}-${childIndex}`}
                          item={child}
                          defaultExpanded={child.id === firstDocId}
                          apiOptions={apiOptions}
                          selectedLang={selectedLang}
                        />
                      ) : null,
                    )}
                  </div>
                </section>
              )
            }

            return null
          })}
        </>
      )}
    </div>
  )
}
