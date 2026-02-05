import { colors, spacing, typography } from "./tokens"

export interface FrameworkCodeSnippetProps {
  /** Full snippet text to display */
  snippet: string
  /** Optional prefix (e.g. "npm install ") shown in default color */
  snippetPrefix?: string
  /** Rest of snippet after prefix (e.g. package names) shown in brand color */
  snippetRest?: string
}

export function FrameworkCodeSnippet({
  snippet,
  snippetPrefix = "",
  snippetRest,
}: FrameworkCodeSnippetProps) {
  const showHighlight = snippetPrefix && snippetRest !== undefined

  return (
    <div
      className="code-sample-body"
      style={{
        background: colors.backgroundPrimary,
        border: `1px solid ${colors.borderPrimary}`,
        padding: spacing.size6,
        fontFamily: typography.fontFamilyMono,
        fontSize: typography.fontSizeSm,
        display: "flex",
        gap: spacing.size6,
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          color: colors.textTertiary,
          lineHeight: "1.65",
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        1
      </span>
      <code
        style={{
          flex: "1 0 0",
          color: colors.textPrimary,
          lineHeight: "1.65",
          whiteSpace: "pre-wrap",
          fontFamily: typography.fontFamilyMono,
        }}
      >
        {showHighlight ? (
          <>
            <span style={{ color: colors.textPrimary }}>{snippetPrefix}</span>
            <span style={{ color: colors.brandPrimary }}>{snippetRest}</span>
          </>
        ) : (
          <span style={{ color: colors.textPrimary }}>{snippet}</span>
        )}
      </code>
    </div>
  )
}
