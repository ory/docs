import React from "react"
import Link from "@docusaurus/Link"
import IconCopy from "@site/src/static/img/icons/copy.svg"
import { StepBadge } from "./StepBadge"
import { FrameworkCodeSnippet } from "./FrameworkCodeSnippet"
import { colors, radius, spacing, typography } from "./tokens"

export type FrameworkValue = "typescript" | "nextjs" | "vue" | "go"

export interface FrameworkOption {
  value: FrameworkValue
  label: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  snippet: string
  guideTitle: string
  guideSteps: string[]
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.size4,
          marginBottom: spacing.size8,
          position: "relative",
        }}
      >
        <StepBadge step={3} />
        <h2
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.fontSizeLg,
            fontWeight: typography.fontWeightMedium,
            lineHeight: typography.lineHeightTight,
            color: colors.textPrimary,
            margin: 0,
            maxWidth: "672px",
          }}
        >
          Select your framework or language
        </h2>
        <p
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.fontSizeSm,
            fontWeight: typography.fontWeightNormal,
            lineHeight: typography.lineHeightNormal,
            color: colors.textSecondary,
            margin: 0,
            maxWidth: "672px",
          }}
        >
          Already building with a specific framework or language? Pick your stack and follow
          the quickstart example for that framework/language.
        </p>
      </div>

      <div
        style={{
          background: colors.backgroundSecondaryHover,
          border: `1px solid ${colors.borderPrimary}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Toolbar: framework tabs + copy */}
        <div
          style={{
            background: colors.backgroundSecondary,
            display: "flex",
            alignItems: "center",
            gap: spacing.size1,
            padding: `${spacing.size2} ${spacing.size4}`,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: spacing.size1,
              flex: "1 0 0",
            }}
          >
            {frameworks.map((lang) => {
              const active = lang.value === selectedFramework
              const LangIcon = lang.Icon
              const iconStroke = active
                ? colors.brandOnTertiary
                : colors.textPrimary
              return (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() => onFrameworkChange(lang.value)}
                  style={{
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.size0_5,
                    padding: `0 ${spacing.size2_5}`,
                    borderRadius: radius.buttons,
                    background: active
                      ? colors.backgroundBrandTertiary
                      : "transparent",
                    border: active
                      ? `1px solid ${colors.borderBrandTertiary}`
                      : "1px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  <LangIcon
                    style={
                      {
                        width: "16px",
                        height: "16px",
                        flexShrink: 0,
                        ["--stroke-0"]: iconStroke,
                      } as React.CSSProperties
                    }
                  />
                  <span
                    style={{
                      fontFamily: typography.fontFamily,
                      fontSize: typography.fontSizeSm,
                      fontWeight: typography.fontWeightNormal,
                      lineHeight: "1",
                      color: active
                        ? colors.brandOnTertiary
                        : colors.textPrimary,
                      whiteSpace: "nowrap",
                    }}
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
            style={{
              width: "32px",
              height: "28px",
              background: "transparent",
              border: "1px solid transparent",
              borderRadius: radius.buttons,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <IconCopy style={{ width: "16px", height: "16px" }} />
          </button>
        </div>

        <FrameworkCodeSnippet
          snippet={selected.snippet}
          snippetPrefix={snippetPrefix || undefined}
          snippetRest={snippetRest}
        />
      </div>

      {/* Follow the full guide – info box */}
      <div
        style={{
          marginTop: spacing.size4,
          background: colors.infoTertiary,
          border: `1px solid ${colors.borderInfoTertiary}`,
          borderRadius: radius.general,
          padding: spacing.size6,
          display: "flex",
          flexDirection: "column",
          gap: spacing.size3,
        }}
      >
        <Link
          to={selected.guideTo}
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.fontSizeSm,
            fontWeight: typography.fontWeightMedium,
            lineHeight: typography.lineHeightNormal,
            color: colors.infoOnTertiary,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: spacing.size2,
          }}
        >
          <span
            style={{
              width: "20px",
              height: "20px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.infoPrimary,
            }}
            aria-hidden
          >
            💡
          </span>
          Follow the quickstart example for {selected.label}
        </Link>
        <ul
          style={{
            margin: 0,
            paddingLeft: spacing.size6,
            fontFamily: typography.fontFamily,
            fontSize: typography.fontSizeSm,
            fontWeight: typography.fontWeightNormal,
            lineHeight: typography.lineHeightNormal,
            color: colors.infoOnTertiary,
          }}
        >
          {selected.guideSteps.map((step, i) => (
            <li key={i} style={{ marginBottom: spacing.size0_5 }}>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
