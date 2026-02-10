import React from "react"
import Link from "@docusaurus/Link"
import { colors, radius, spacing, typography } from "./tokens"

export interface GuideLinkBoxProps {
  to: string
  label: string
}

export function GuideLinkBox({ to, label }: GuideLinkBoxProps) {
  return (
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
        to={to}
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
        Follow the quickstart guide for {label}
      </Link>
    </div>
  )
}
