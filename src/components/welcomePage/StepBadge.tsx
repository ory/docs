import React from "react"

export function StepBadge({ step }: { step: number }) {
  return (
    <div
      className="absolute left-[-43.5px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-ory-bg-dark"
      aria-hidden
    >
      <span className="text-center text-xs font-semibold leading-none text-white">
        {step}
      </span>
    </div>
  )
}
