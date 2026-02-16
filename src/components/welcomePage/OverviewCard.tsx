import React from "react"
import Link from "@docusaurus/Link"

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
      <div className="flex flex-col gap-ory-2">
        <h3 className="ory-heading-3">{title}</h3>
        <p className="ory-body-sm">{description}</p>
      </div>
      {tags && tags.length > 0 && (
        <div className="flex gap-ory-2 flex-wrap">
          {tags.map((tag) => {
            const isHighlight = tag === "Cloud" || tag === "Enterprise"
            return (
              <span
                key={tag}
                className={`ory-body-xs ${isHighlight ? "ory-tag ory-tag-highlight" : "ory-tag"}`}
              >
                {tag}
              </span>
            )
          })}
        </div>
      )}
    </>
  )

  const wrapperClass =
    "flex flex-col overflow-hidden rounded-ory bg-ory-bg-secondary"
  const innerClass = "flex flex-col gap-ory-8 p-ory-4"

  if (linkLabel) {
    return (
      <div className={wrapperClass}>
        <div className={innerClass}>
          {content}
          <Link to={to} className="ory-guide-card__link">
            {linkLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={to}
      className={`${wrapperClass} no-underline text-inherit h-full`}
    >
      <div className={`${innerClass} flex-1 min-h-0`}>{content}</div>
    </Link>
  )
}
