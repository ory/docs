// Small text helpers for rendering operation descriptions.

import React from "react"

const MD_LINK = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g

export function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  MD_LINK.lastIndex = 0
  while ((match = MD_LINK.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {match[1]}
      </a>,
    )
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 ? parts[0] : <>{parts}</>
}

// Many operations signal deprecation via a `Deprecated: …` prefix in their
// description (the OpenAPI spec sets no `deprecated` flag). Pull that out so it
// can be rendered as a badge + notice instead of plain inline body text.
export function parseDeprecation(text?: string): {
  deprecated: boolean
  notice: string
  body: string
} {
  if (!text) return { deprecated: false, notice: "", body: "" }
  const prefix = text.match(/^\s*deprecated:\s*/i)
  if (!prefix) return { deprecated: false, notice: "", body: text }
  const rest = text.slice(prefix[0].length)
  const splitAt = rest.search(/\n\n+/)
  const notice = (splitAt >= 0 ? rest.slice(0, splitAt) : rest).trim()
  const body = (splitAt >= 0 ? rest.slice(splitAt) : "").trim()
  return { deprecated: true, notice, body }
}
