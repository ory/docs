// A single collapsible operation row. The endpoint's MDX + OpenAPI metadata is
// lazy-loaded on first expand, then rendered as the SDK usage section (left) and
// the interactive ApiExplorer (right).

import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"
import BrowserOnly from "@docusaurus/BrowserOnly"
import type { OpenApiSidebarDoc } from "./types"
import { docLabel, isApiEndpoint, methodFromClassName } from "./sidebar"
import { buildStore, decompressApi } from "./api"
import { MethodBadge } from "./MethodBadge"
import { SdkUsageSection } from "./SdkUsageSection"

let ApiExplorer: React.ComponentType<{ item: any; infoPath: any }> = () => null
if (ExecutionEnvironment.canUseDOM) {
  ApiExplorer = require("@theme/ApiExplorer").default
}

type LoadedEndpoint = {
  MDXComponent: React.ComponentType
  api: any
  infoPath: string | undefined
  store: ReturnType<typeof buildStore>
}

export function EndpointItem({
  item,
  defaultExpanded,
  apiOptions,
  selectedLang,
  tag,
}: {
  item: OpenApiSidebarDoc
  defaultExpanded: boolean
  apiOptions: any
  selectedLang: string
  tag?: string
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [loaded, setLoaded] = useState<LoadedEndpoint | null>(null)
  const [loading, setLoading] = useState(false)

  const endpoint = isApiEndpoint(item)
  const method = methodFromClassName(item.className)
  const label = docLabel(item)

  const load = async () => {
    if (loaded || loading) return
    setLoading(true)
    const slug = item.id.split("/").pop()!
    const mod = endpoint
      ? await import(`@site/docs/reference/openapi/${slug}.api.mdx`)
      : await import(`@site/docs/reference/openapi/${slug}.info.mdx`)

    const fm = (mod as any).frontMatter ?? {}
    const api = fm.api ? decompressApi(fm.api) : null
    const store = buildStore(api, apiOptions)
    setLoaded({ MDXComponent: mod.default, api, infoPath: fm.info_path, store })
    setLoading(false)
  }

  const toggle = () => {
    if (!loaded && !loading) load()
    setExpanded((prev) => !prev)
  }

  useEffect(() => {
    if (defaultExpanded) load()
  }, [])

  return (
    <div className="border-b border-[var(--ifm-color-emphasis-200)]">
      <button
        onClick={toggle}
        aria-expanded={expanded}
        className="flex items-center w-full bg-transparent border-none px-2 py-3 cursor-pointer text-left text-[var(--ifm-font-color-base)] text-[0.95rem]"
      >
        {method && <MethodBadge method={method} />}
        <span className="flex-1">{label}</span>
        {tag && (
          <span className="text-xs text-[var(--ifm-color-emphasis-600)] mr-2 capitalize">
            {tag}
          </span>
        )}
        <span
          className={`text-xs text-[var(--ifm-color-emphasis-500)] ml-2 transition-transform duration-150 ${expanded ? "rotate-180" : "rotate-0"}`}
        >
          ▼
        </span>
      </button>

      {(loaded || loading) && (
        <div
          className="flex gap-8 px-2 pb-4 items-start"
          style={{ display: expanded ? "flex" : "none" }}
        >
          {loading || !loaded ? (
            <div className="p-4 text-[var(--ifm-color-emphasis-500)]">
              Loading…
            </div>
          ) : (
            <Provider store={loaded.store}>
              {/* Left: SDK usage (replaces MDX params when available) */}
              <div className="flex-1 min-w-0">
                {loaded.api?.["x-sdk-docs"]?.[selectedLang] ? (
                  <SdkUsageSection
                    sdkDocs={loaded.api["x-sdk-docs"]}
                    selectedLang={selectedLang}
                    description={loaded.api.description ?? loaded.api.summary}
                  />
                ) : (
                  <loaded.MDXComponent />
                )}
              </div>
              {/* Right: ApiExplorer — sticky */}
              {loaded.api && (
                <div
                  className="shrink-0 w-[38%] sticky top-[var(--ifm-navbar-height,60px)] self-start overflow-y-auto"
                  style={{
                    maxHeight: "calc(100vh - var(--ifm-navbar-height, 60px))",
                  }}
                >
                  <BrowserOnly fallback={<div />}>
                    {() => (
                      <ApiExplorer
                        item={loaded.api}
                        infoPath={loaded.infoPath}
                      />
                    )}
                  </BrowserOnly>
                </div>
              )}
            </Provider>
          )}
        </div>
      )}
    </div>
  )
}
