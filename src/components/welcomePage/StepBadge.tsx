import React from "react"
import { colors, radius, typography } from "./tokens"

export function StepBadge({ step }: { step: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "-43.5px",
        top: 0,
        width: "24px",
        height: "24px",
        background: colors.backgroundBrandTertiary,
        borderRadius: radius.keyboard,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.fontSizeSm,
          fontWeight: "600",
          lineHeight: "1",
          color: colors.brandOnTertiary,
          textAlign: "center",
        }}
      >
        {step}
      </span>
    </div>
  )
}
