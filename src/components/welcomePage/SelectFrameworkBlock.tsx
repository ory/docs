import React from "react"
import IconCopy from "@site/src/static/img/icons/copy.svg"
import { StepBadge } from "./StepBadge"
import { FrameworkCodeSnippet } from "./FrameworkCodeSnippet"
import { GuideLinkBox } from "./GuideLinkBox"

export type FrameworkValue = "typescript" | "nextjs" | "vue" | "go"

export interface FrameworkOption {
  value: FrameworkValue
  label: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  snippet: string
  guideTitle: string
  guideTo: string
}

export interface SelectFrameworkBlockProps {
  frameworks: FrameworkOption[]
  selectedFramework: FrameworkValue
  onFrameworkChange: (value: FrameworkValue) => void
  onCopy?: () => void
}

export function SelectFrameworkBlock({
  frameworks,
  selectedFramework,
  onFrameworkChange,
  onCopy,
}: SelectFrameworkBlockProps) {
  const selected =
    frameworks.find((f) => f.value === selectedFramework) ?? frameworks[1]
  const snippetPrefix = selected.snippet.startsWith("npm install ")
    ? "npm install "
    : ""
  const snippetRest = snippetPrefix
    ? selected.snippet.slice(snippetPrefix.length)
    : selected.snippet

  return (
    <div>
      <div className="flex flex-col gap-ory-4 mb-ory-8 relative">
        <StepBadge step={3} />
        <h2 className="ory-heading-3 text-xl max-w-[672px]">
          Select your framework or language
        </h2>
        <p className="ory-body-sm max-w-[672px]">
          Already building with a specific framework or language? Pick your
          stack and follow the quickstart example for that framework/language.
        </p>
      </div>

      <div className="bg-ory-bg-secondary-hover border border-ory-border-primary flex flex-col overflow-hidden">
        {/* Toolbar: framework tabs + copy */}
        <div className="bg-ory-bg-secondary flex items-center gap-1 py-ory-2 px-ory-4">
          <div className="flex gap-1 flex-1 min-w-0">
            {frameworks.map((lang) => {
              const active = lang.value === selectedFramework
              const LangIcon = lang.Icon
              const iconStroke = active ? "#2e3081" : "#0f172a"
              return (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() => onFrameworkChange(lang.value)}
                  className={`ory-btn-ghost ${active ? "ory-code-tab--active" : ""}`}
                >
                  <LangIcon
                    className="w-4 h-4 shrink-0"
                    style={
                      { ["--stroke-0"]: iconStroke } as React.CSSProperties
                    }
                  />
                  <span
                    className={
                      active ? "text-inherit" : "text-ory-text-primary"
                    }
                  >
                    {lang.label}
                  </span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            aria-label="Copy"
            onClick={() => {
              navigator.clipboard.writeText(selected.snippet)
              onCopy?.()
            }}
            className="ory-btn-icon"
          >
            <IconCopy className="w-4 h-4" />
          </button>
        </div>

        <FrameworkCodeSnippet
          snippet={selected.snippet}
          snippetPrefix={snippetPrefix || undefined}
          snippetRest={snippetRest}
        />
      </div>

      <GuideLinkBox to={selected.guideTo} label={selected.label} />
    </div>
  )
}
