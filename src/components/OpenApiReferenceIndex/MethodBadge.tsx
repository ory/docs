// Colored HTTP-method pill (GET/POST/…).

import React from "react"

const METHOD_BG: Record<string, string> = {
  GET: "bg-[var(--ifm-color-info)]",
  POST: "bg-[var(--ifm-color-success)]",
  PUT: "bg-[var(--ifm-color-warning)]",
  PATCH: "bg-[var(--ifm-color-warning)]",
  DELETE: "bg-[var(--ifm-color-danger)]",
}

export function MethodBadge({ method }: { method: string }) {
  return (
    <span
      className={`inline-block min-w-[4.5rem] px-1.5 py-0.5 rounded text-[0.7rem] font-bold text-center text-white mr-2.5 shrink-0 ${METHOD_BG[method] ?? "bg-[#888]"}`}
    >
      {method}
    </span>
  )
}
