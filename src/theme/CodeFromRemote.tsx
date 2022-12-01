// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import CodeBlock from "@theme/CodeBlock"
import fetch from "node-fetch"
import React, { useEffect, useState } from "react"
import styles from "./CodeFromRemote.module.css"

const detectLanguage = (src) => {
  const ext = src.split(".").pop()
  switch (ext) {
    case "jsx":
      return "jsx"
    case "tsx":
      return "tsx"
    case "ts":
      return "typescript"
    case "go":
      return "go"
    case "yaml":
    case "yml":
      return "yaml"
    case "js":
      return "javascript"
    case "html":
      return "html"
    case "pug":
      return "pug"
    default:
      return ext
  }
}

const findPath = (src) => {
  const matches =
    src.match(
      new RegExp("https://github.com/[^/]+/[^/]+/blob/[^/]+/(.+)", "i"),
    ) || []
  if (matches.length >= 2) {
    return matches[1]
  }
  return src
}

const findLine = (needle: string | undefined, haystack: Array<string>) => {
  if (!needle) {
    return 0
  }

  const index = haystack.findIndex((s) => s.indexOf(needle) > -1)

  if (index === -1) {
    return 0
  }

  return index
}

const transform =
  ({ startAt, endAt }: { startAt?: string; endAt?: string }) =>
  (content: string) => {
    let lines = content.split("\n")

    const startIndex = findLine(startAt, lines)
    if (startIndex > 0) {
      lines = ["// ...", ...lines.slice(startIndex, -1)]
    }

    const endIndex = findLine(endAt, lines)
    if (endIndex > 0) {
      lines = [...lines.slice(0, endIndex + 1), "// ..."]
    }

    return lines.join("\n")
  }

const CodeFromRemote = (props: {
  title: string
  src?: string
  contentOverride?: string
  startAt?: string
  endAt?: string
}) => {
  const { src, title, contentOverride } = props
  const [content, setContent] = useState(contentOverride || "")

  useEffect(() => {
    if (contentOverride) {
      return
    }

    fetch(
      src
        .replace("github.com", "raw.githubusercontent.com")
        .replace("/blob/", "/"),
    )
      .then((body) => body.text())
      .then(transform(props))
      .then(setContent)
      .catch(console.error)
  }, [contentOverride, src])

  const lang = `language-${detectLanguage(src)}`
  const metaString = `title="${title || findPath(src)}"`

  return (
    <div className={styles.container}>
      <CodeBlock
        metastring={metaString}
        className={lang}
        children={content}
        showLineNumbers={true}
      />
    </div>
  )
}

export default CodeFromRemote
