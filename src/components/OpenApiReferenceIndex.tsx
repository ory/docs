import React, { useState } from "react"
import { Provider } from "react-redux"
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"
import BrowserOnly from "@docusaurus/BrowserOnly"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { createStoreWithState, createStoreWithoutState } from "@theme/ApiItem/store"
import { createAuth } from "@theme/ApiExplorer/Authorization/slice"
import { createPersistenceMiddleware } from "@theme/ApiExplorer/persistenceMiddleware"
import { createStorage } from "@theme/ApiExplorer/storage-utils"
import { ungzip } from "pako"
import openapiSidebarItems from "../../docs/reference/openapi/sidebar"

let ApiExplorer: React.ComponentType<{ item: any; infoPath: any }> = () => null
if (ExecutionEnvironment.canUseDOM) {
  ApiExplorer = require("@theme/ApiExplorer").default
}

type OpenApiSidebarDoc = {
  type: "doc"
  id: string
  label?: string
  className?: string
}

type OpenApiSidebarCategory = {
  type: "category"
  label: string
  items: OpenApiSidebarItem[]
}

type OpenApiSidebarItem = OpenApiSidebarDoc | OpenApiSidebarCategory

function isCategory(item: OpenApiSidebarItem): item is OpenApiSidebarCategory {
  return item.type === "category"
}

function isDoc(item: OpenApiSidebarItem): item is OpenApiSidebarDoc {
  return item.type === "doc"
}

function isApiEndpoint(item: OpenApiSidebarDoc): boolean {
  return Boolean(item.className?.includes("api-method"))
}

function docLabel(item: OpenApiSidebarDoc): string {
  if (item.label) return item.label
  if (item.id === "reference/openapi/ory-apis") return "Introduction"
  const slug = item.id.split("/").pop() ?? item.id
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function methodFromClassName(className?: string): string | null {
  if (!className) return null
  const match = className.match(/api-method\s+(\w+)/)
  return match ? match[1].toUpperCase() : null
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function decompressApi(encoded: string): any {
  try {
    return JSON.parse(new TextDecoder().decode(ungzip(base64ToUint8Array(encoded))))
  } catch {
    return null
  }
}

const STATUS_2XX = /^(20[0-9]|2[1-9][0-9])$/

function buildStore(api: any, options: any) {
  const persistenceMiddleware = createPersistenceMiddleware(options)
  if (!api) return createStoreWithoutState({}, [persistenceMiddleware])

  const acceptArray = Object.entries(api.responses ?? {})
    .filter(([code]) => STATUS_2XX.test(code))
    .flatMap(([, content]: [string, any]) => Object.keys(content?.content ?? {}))

  const contentTypeArray = Object.keys(api.requestBody?.content ?? {})

  const params: Record<string, any[]> = { path: [], query: [], header: [], cookie: [] }
  for (const param of api.parameters ?? []) params[param.in]?.push(param)

  const auth = createAuth({
    security: api.security,
    securitySchemes: api.securitySchemes,
    options,
  })

  const storage = createStorage(options?.authPersistence ?? "sessionStorage")
  const storedServer = storage.getItem("server")
  const serverObject = storedServer ? JSON.parse(storedServer) : undefined

  return createStoreWithState(
    {
      accept: { value: acceptArray[0], options: acceptArray },
      contentType: { value: contentTypeArray[0], options: contentTypeArray },
      server: {
        value: serverObject?.url ? serverObject : undefined,
        options: api.servers ?? [],
      },
      response: { value: undefined },
      body: { type: "empty" },
      params,
      auth,
      schemaSelection: { selections: {} },
      encodingSelection: {},
    },
    [persistenceMiddleware],
  )
}

const METHOD_COLORS: Record<string, string> = {
  GET: "var(--ifm-color-info)",
  POST: "var(--ifm-color-success)",
  PUT: "var(--ifm-color-warning)",
  PATCH: "var(--ifm-color-warning)",
  DELETE: "var(--ifm-color-danger)",
}

function MethodBadge({ method }: { method: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        minWidth: "4.5rem",
        padding: "0.1rem 0.4rem",
        borderRadius: "4px",
        fontSize: "0.7rem",
        fontWeight: 700,
        textAlign: "center",
        color: "#fff",
        background: METHOD_COLORS[method] ?? "#888",
        marginRight: "0.6rem",
        flexShrink: 0,
      }}
    >
      {method}
    </span>
  )
}

type LoadedEndpoint = {
  MDXComponent: React.ComponentType
  api: any
  infoPath: string | undefined
  store: ReturnType<typeof createStoreWithState>
}

function EndpointItem({
  item,
  defaultExpanded,
  apiOptions,
}: {
  item: OpenApiSidebarDoc
  defaultExpanded: boolean
  apiOptions: any
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

  React.useEffect(() => {
    if (defaultExpanded) load()
  }, [])

  return (
    <div style={{ borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>
      <button
        onClick={toggle}
        aria-expanded={expanded}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          padding: "0.75rem 0.5rem",
          cursor: "pointer",
          textAlign: "left",
          color: "var(--ifm-font-color-base)",
          fontSize: "0.95rem",
        }}
      >
        {method && <MethodBadge method={method} />}
        <span style={{ flex: 1 }}>{label}</span>
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--ifm-color-emphasis-500)",
            marginLeft: "0.5rem",
            transition: "transform 0.15s",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </button>

      {(loaded || loading) && (
        <div style={{ display: expanded ? "flex" : "none", gap: "2rem", padding: "0 0.5rem 1rem", alignItems: "flex-start" }}>
          {loading || !loaded ? (
            <div style={{ padding: "1rem", color: "var(--ifm-color-emphasis-500)" }}>
              Loading…
            </div>
          ) : (
            <Provider store={loaded.store}>
              {/* Left: MDX content */}
              <div style={{ flex: "1 1 0", minWidth: 0 }}>
                <loaded.MDXComponent />
              </div>
              {/* Right: ApiExplorer — sticky so it stays visible while scrolling left content */}
              {loaded.api && (
                <div
                  style={{
                    flex: "0 0 38%",
                    position: "sticky",
                    top: "var(--ifm-navbar-height, 60px)",
                    alignSelf: "flex-start",
                    maxHeight: "calc(100vh - var(--ifm-navbar-height, 60px))",
                    overflowY: "auto",
                  }}
                >
                  <BrowserOnly fallback={<div />}>
                    {() => <ApiExplorer item={loaded.api} infoPath={loaded.infoPath} />}
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

export default function OpenApiReferenceIndex(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext()
  const apiOptions = (siteConfig.themeConfig as any)?.api
  const items = openapiSidebarItems as OpenApiSidebarItem[]

  let firstDocId: string | null = null
  outer: for (const item of items) {
    if (isDoc(item)) { firstDocId = item.id; break }
    if (isCategory(item)) {
      for (const child of item.items) {
        if (isDoc(child)) { firstDocId = child.id; break outer }
      }
    }
  }

  return (
    <div>
      {items.map((item, index) => {
        if (isDoc(item)) {
          return (
            <EndpointItem
              key={item.id}
              item={item}
              defaultExpanded={item.id === firstDocId}
              apiOptions={apiOptions}
            />
          )
        }

        if (isCategory(item)) {
          return (
            <section key={`${item.label}-${index}`} style={{ marginBottom: "2rem" }}>
              <h3 style={{ textTransform: "capitalize", marginBottom: "0.5rem" }}>
                {item.label}
              </h3>
              <div
                style={{
                  border: "1px solid var(--ifm-color-emphasis-200)",
                  borderRadius: "8px",
                }}
              >
                {item.items.map((child, childIndex) =>
                  isDoc(child) ? (
                    <EndpointItem
                      key={`${child.id}-${childIndex}`}
                      item={child}
                      defaultExpanded={child.id === firstDocId}
                      apiOptions={apiOptions}
                    />
                  ) : null,
                )}
              </div>
            </section>
          )
        }

        return null
      })}
    </div>
  )
}
