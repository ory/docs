import React from "react"
import { typography } from "./tokens"

/** Step number circle styles from Figma node 6319-49328 (background/inverted/primary, text/inverted/primary, radius/full, font-size/xs) */
const stepCircleStyle: React.CSSProperties = {
  position: "absolute",
  left: "-43.5px",
  top: 0,
  width: "24px",
  height: "24px",
  background: "var(--background-inverted-primary, #0f172a)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const stepNumberStyle: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizeXs,
  fontWeight: "600",
  lineHeight: 1,
  color: "var(--text-inverted-primary, #ffffff)",
  textAlign: "center",
}

export function StepBadge({ step }: { step: number }) {
  return (
    <div style={stepCircleStyle}>
      <span style={stepNumberStyle}>{step}</span>
    </div>
  )
}
