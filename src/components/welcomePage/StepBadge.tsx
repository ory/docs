import React from "react"

export function StepBadge({ step }: { step: number }) {
  return (
    <div className="ory-step-badge">
      <span className="ory-step-badge__number">{step}</span>
    </div>
  )
}
