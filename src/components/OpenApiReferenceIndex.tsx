import React, { useState, useEffect } from "react"
import { Provider } from "react-redux"
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"
import BrowserOnly from "@docusaurus/BrowserOnly"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import {
  createStoreWithState,
  createStoreWithoutState,
} from "@theme/ApiItem/store"
import { createAuth } from "@theme/ApiExplorer/Authorization/slice"
import { createPersistenceMiddleware } from "@theme/ApiExplorer/persistenceMiddleware"
import { createStorage } from "@theme/ApiExplorer/storage-utils"
import { ungzip } from "pako"
import openapiSidebarItems from "../../docs/reference/openapi/sidebar"

let ApiExplorer: React.ComponentType<{ item: any; infoPath: any }> = () => null
if (ExecutionEnvironment.canUseDOM) {
  ApiExplorer = require("@theme/ApiExplorer").default
}

// ─── Types ───────────────────────────────────────────────────────────────────

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

type SdkParam = {
  name: string
  type: string
  description: string
  required: boolean
}

type SdkMethodDocs = {
  signature: string
  params: SdkParam[]
  returnType: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

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
    return JSON.parse(
      new TextDecoder().decode(ungzip(base64ToUint8Array(encoded))),
    )
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
    .flatMap(([, content]: [string, any]) =>
      Object.keys(content?.content ?? {}),
    )

  const contentTypeArray = Object.keys(api.requestBody?.content ?? {})

  const params: Record<string, any[]> = {
    path: [],
    query: [],
    header: [],
    cookie: [],
  }
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

// ─── Language sync ────────────────────────────────────────────────────────────

const LS_KEY = "docusaurus.tab.code-samples"

function useSdkLanguage() {
  const [lang, setLang] = useState<string>(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(LS_KEY) ?? "TypeScript"
    }
    return "TypeScript"
  })

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === LS_KEY && e.newValue) setLang(e.newValue)
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [])

  return lang
}

// ─── SDK Usage Section ────────────────────────────────────────────────────────

const LANG_LABEL: Record<string, string> = {
  TypeScript: "TypeScript",
  go: "Go",
  python: "Python",
}

const MD_LINK = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  MD_LINK.lastIndex = 0
  while ((match = MD_LINK.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {match[1]}
      </a>,
    )
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 ? parts[0] : <>{parts}</>
}

function CollapsibleSection({
  title,
  children,
  borderTop = true,
}: {
  title: string
  children: React.ReactNode
  borderTop?: boolean
}) {
  const [open, setOpen] = useState(true)
  return (
    <div
      className={
        borderTop ? "border-t border-[var(--ifm-toc-border-color)]" : ""
      }
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full px-3 py-2 bg-[var(--ifm-pre-background)] border-none cursor-pointer text-left"
      >
        <span
          className={`text-[9px] text-[var(--ifm-color-secondary)] transition-transform duration-150 ${open ? "rotate-90" : "rotate-0"}`}
        >
          ▶
        </span>
        <h3 className="m-0 text-sm font-semibold text-[var(--ifm-font-color-base)]">
          {title}
        </h3>
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

function SdkUsageSection({
  sdkDocs,
  selectedLang,
  description,
}: {
  sdkDocs: Record<string, SdkMethodDocs> | undefined
  selectedLang: string
  description?: string
}) {
  const docs = sdkDocs?.[selectedLang]
  if (!docs) return null

  const langLabel = LANG_LABEL[selectedLang] ?? selectedLang
  const badgeClass =
    selectedLang === "go"
      ? "bg-[var(--ifm-color-info)]"
      : selectedLang === "python"
        ? "bg-[#3776ab]"
        : "bg-[#3178c6]"
  const typeColorClass =
    selectedLang === "go"
      ? "text-[var(--ifm-color-info)]"
      : selectedLang === "python"
        ? "text-[#3776ab]"
        : "text-[#3178c6]"
  const responseVar =
    selectedLang === "go"
      ? "resp"
      : selectedLang === "python"
        ? "api_response"
        : "data"
  const hasParams = docs.params.length > 0
  const hasResponse = docs.returnType && docs.returnType !== "void"

  return (
    <div className="mb-6 border border-[var(--ifm-toc-border-color)] rounded-[var(--ifm-global-radius)] overflow-hidden text-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--ifm-toc-border-color)] bg-[var(--ifm-pre-background)]">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--ifm-color-secondary)]">
          SDK Reference
        </span>
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded text-white ${badgeClass}`}
        >
          {langLabel}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="px-3 py-2.5 m-0 text-[0.85rem] text-[var(--ifm-font-color-base)] border-b border-[var(--ifm-toc-border-color)]">
          {renderInlineMarkdown(description)}
        </p>
      )}

      {/* Signature */}
      <div className="px-3 py-2 border-b border-[var(--ifm-toc-border-color)] bg-[var(--ifm-pre-background)]">
        <code className="text-[0.82rem] font-mono text-[var(--ifm-code-color)]">
          {docs.signature}
        </code>
      </div>

      {/* Request — collapsible */}
      {hasParams && (
        <CollapsibleSection title="Request">
          <table className="w-full border-collapse text-[0.82rem]">
            <thead>
              <tr>
                {["Parameters", "Type", "Required", "Description"].map((h) => (
                  <th
                    key={h}
                    className="px-2.5 py-1.5 text-left text-[10px] font-semibold tracking-[0.06em] uppercase text-[var(--ifm-color-secondary)] border-b border-[var(--ifm-toc-border-color)] bg-[var(--ifm-pre-background)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.params.map((p, i) => (
                <tr
                  key={p.name}
                  className={
                    i < docs.params.length - 1
                      ? "border-b border-[var(--ifm-color-emphasis-100)]"
                      : ""
                  }
                >
                  <td className="px-2.5 py-1.5 font-mono whitespace-nowrap">
                    {p.name}
                  </td>
                  <td
                    className={`px-2.5 py-1.5 font-mono whitespace-nowrap ${typeColorClass}`}
                  >
                    {p.type}
                  </td>
                  <td className="px-2.5 py-1.5 whitespace-nowrap">
                    {p.required ? (
                      <span className="text-[var(--ifm-color-danger)] font-semibold text-[0.78rem]">
                        required
                      </span>
                    ) : (
                      <span className="text-[var(--ifm-color-secondary)] text-[0.78rem]">
                        optional
                      </span>
                    )}
                  </td>
                  <td className="px-2.5 py-1.5 text-[var(--ifm-color-secondary)]">
                    {renderInlineMarkdown(p.description)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CollapsibleSection>
      )}

      {/* Response — collapsible */}
      {hasResponse && (
        <CollapsibleSection title="Response">
          <table className="w-full border-collapse text-[0.82rem]">
            <thead>
              <tr>
                {["Variable", "Type"].map((h) => (
                  <th
                    key={h}
                    className="px-2.5 py-1.5 text-left text-[10px] font-semibold tracking-[0.06em] uppercase text-[var(--ifm-color-secondary)] border-b border-[var(--ifm-toc-border-color)] bg-[var(--ifm-pre-background)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2.5 py-1.5 font-mono text-[var(--ifm-color-secondary)] whitespace-nowrap">
                  {responseVar}
                </td>
                <td
                  className={`px-2.5 py-1.5 font-mono whitespace-nowrap ${typeColorClass}`}
                >
                  {docs.returnType}
                </td>
              </tr>
            </tbody>
          </table>
        </CollapsibleSection>
      )}
    </div>
  )
}

// ─── Method badge ─────────────────────────────────────────────────────────────

const METHOD_BG: Record<string, string> = {
  GET: "bg-[var(--ifm-color-info)]",
  POST: "bg-[var(--ifm-color-success)]",
  PUT: "bg-[var(--ifm-color-warning)]",
  PATCH: "bg-[var(--ifm-color-warning)]",
  DELETE: "bg-[var(--ifm-color-danger)]",
}

function MethodBadge({ method }: { method: string }) {
  return (
    <span
      className={`inline-block min-w-[4.5rem] px-1.5 py-0.5 rounded text-[0.7rem] font-bold text-center text-white mr-2.5 shrink-0 ${METHOD_BG[method] ?? "bg-[#888]"}`}
    >
      {method}
    </span>
  )
}

// ─── Endpoint item ────────────────────────────────────────────────────────────

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
  selectedLang,
}: {
  item: OpenApiSidebarDoc
  defaultExpanded: boolean
  apiOptions: any
  selectedLang: string
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

// ─── Main export ──────────────────────────────────────────────────────────────

const SKIP_IDS = new Set(["reference/openapi/ory-apis"])

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

  return (
    <div>
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
    </div>
  )
}
