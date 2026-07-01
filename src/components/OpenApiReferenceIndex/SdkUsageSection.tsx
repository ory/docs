// Language-specific SDK method reference (signature, params, response) rendered
// on the left of an expanded endpoint when `x-sdk-docs` metadata is present.

import React, { useState } from "react"
import type { SdkMethodDocs } from "./types"
import { parseDeprecation, renderInlineMarkdown } from "./markdown"

const LANG_LABEL: Record<string, string> = {
  TypeScript: "TypeScript",
  go: "Go",
  python: "Python",
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

export function SdkUsageSection({
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
  const { deprecated, notice, body } = parseDeprecation(description)

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
        {deprecated && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded text-white tracking-wider uppercase bg-[var(--ifm-color-danger)]">
            Deprecated
          </span>
        )}
      </div>

      {/* Deprecation notice */}
      {deprecated && notice && (
        <div className="px-3 py-2.5 text-[0.85rem] border-b border-[var(--ifm-toc-border-color)] border-l-4 border-l-[var(--ifm-color-danger)] bg-[var(--ifm-color-danger-contrast-background)] text-[var(--ifm-color-danger-contrast-foreground)]">
          {renderInlineMarkdown(notice)}
        </div>
      )}

      {/* Description */}
      {body && (
        <p className="px-3 py-2.5 m-0 text-[0.85rem] text-[var(--ifm-font-color-base)] border-b border-[var(--ifm-toc-border-color)]">
          {renderInlineMarkdown(body)}
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
