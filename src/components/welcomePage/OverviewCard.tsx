import React from "react"
import Link from "@docusaurus/Link"
import { colors, radius, spacing, typography } from "./tokens"

/** Shared card styles for overview sections (welcome, products overview, solutions overview). */
const cardWrapperStyle: React.CSSProperties = {
  background: colors.backgroundSecondary,
  borderRadius: radius.general,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}

const cardInnerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.size8,
  padding: spacing.size4,
}

const titleStyle: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizeSm,
  fontWeight: "600",
  lineHeight: typography.lineHeightNormal,
  color: colors.textPrimary,
  margin: 0,
}

const descriptionStyle: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizeSm,
  fontWeight: typography.fontWeightNormal,
  lineHeight: typography.lineHeightNormal,
  color: colors.textSecondary,
  margin: 0,
}

const linkStyle: React.CSSProperties = {
  display: "flex",
  gap: spacing.size1,
  alignItems: "center",
  textDecoration: "none",
  color: colors.brandPrimary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizeSm,
  fontWeight: typography.fontWeightNormal,
  lineHeight: typography.lineHeightNormal,
}

export interface OverviewCardProps {
  title: string
  description: string
  to: string
  /** e.g. "Learn more". If set, card is a div with this link inside. If unset, entire card is a link. */
  linkLabel?: string
  /** Optional tags; "Cloud" and "Enterprise" get highlight styling */
  tags?: string[]
}

export function OverviewCard({
  title,
  description,
  to,
  linkLabel,
  tags,
}: OverviewCardProps) {
  const content = (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", gap: spacing.size2 }}
      >
        <h3 style={titleStyle}>{title}</h3>
        <p style={descriptionStyle}>{description}</p>
      </div>
      {tags && tags.length > 0 && (
        <div style={{ display: "flex", gap: spacing.size2, flexWrap: "wrap" }}>
          {tags.map((tag) => {
            const isHighlight = tag === "Cloud" || tag === "Enterprise"
            return (
              <span
                key={tag}
                style={{
                  background: isHighlight
                    ? "#c7c8fe"
                    : colors.backgroundTertiary,
                  padding: `${spacing.size0_5} ${spacing.size2}`,
                  borderRadius: radius.badge,
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeXs,
                  fontWeight: typography.fontWeightNormal,
                  lineHeight: typography.lineHeightNormal,
                  color: isHighlight ? "#3032a3" : colors.textSecondary,
                }}
              >
                {tag}
              </span>
            )
          })}
        </div>
      )}
    </>
  )

  if (linkLabel) {
    return (
      <div style={cardWrapperStyle}>
        <div style={cardInnerStyle}>
          {content}
          <Link to={to} style={linkStyle}>
            {linkLabel}
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                color: colors.brandPrimary,
              }}
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={to}
      style={{
        ...cardWrapperStyle,
        textDecoration: "none",
        color: "inherit",
        height: "100%",
      }}
    >
      <div
        style={{
          ...cardInnerStyle,
          flex: 1,
          minHeight: 0,
        }}
      >
        {content}
      </div>
    </Link>
  )
}
