import React from "react"
import Link from "@docusaurus/Link"
import IconBulb from "@site/src/static/img/icons/other/bulb.svg"

export interface GuideLinkBoxProps {
  to: string
  label: string
}

export function GuideLinkBox({ to, label }: GuideLinkBoxProps) {
  return (
    <div className="mt-ory-4 flex flex-col gap-ory-3 p-ory-6 rounded-ory border border-ory-border-info-tertiary bg-ory-info-tertiary">
      <Link
        to={to}
        className="ory-body-sm font-medium text-ory-info-on-tertiary no-underline inline-flex items-center gap-ory-2"
      >
        <IconBulb
          className="w-5 h-5 shrink-0 text-ory-info-primary"
          aria-hidden
        />
        Follow the quickstart guide for {label}
      </Link>
    </div>
  )
}
