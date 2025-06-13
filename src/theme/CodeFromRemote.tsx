// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import CodeBlock from "@theme/CodeBlock"
import fetch from "node-fetch"
import React, { useEffect, useState } from "react"
import styles from "./CodeFromRemote.module.css"

const detectLanguage = (ext) => {
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
  (content: string): [string, number, number] => {
    let lines = content.split("\n")
    let startLineNum = 1
    let endLineNum = lines.length

    const startIndex = findLine(startAt, lines)
    if (startIndex > 0) {
      lines = ["// ...", ...lines.slice(startIndex, -1)]
      startLineNum = startIndex + 1
    }

    const endIndex = findLine(endAt, lines)
    if (endIndex > 0) {
      lines = [...lines.slice(0, endIndex + 1), "// ..."]
      endLineNum = startLineNum + endIndex - 1
    }

    return [lines.join("\n"), startLineNum, endLineNum]
  }

const CodeFromRemote = (props: {
  title: string
  src?: string
  contentOverride?: string
  startAt?: string
  endAt?: string
  showLink?: boolean
  lang: string
}) => {
  const { src, title, contentOverride } = props
  const [content, setContent] = useState(contentOverride || "")
  const [startLineNum, setStartLineNum] = useState(0)
  const [endLineNum, setEndLineNum] = useState(0)

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
      .then(([content, startLineNum, endLineNum]) => {
        setContent(content)
        setStartLineNum(startLineNum)
        setEndLineNum(endLineNum)
      })
      .catch(console.error)
  }, [contentOverride, src])

  const lang = `language-${detectLanguage(props.lang || src.split(".").pop())}`

  return (
    <div className={styles.container}>
      <CodeBlock
        title={title || findPath(src)}
        className={`${lang} ${styles.codeblock}`}
        children={content}
        showLineNumbers={true}
      />
      <div className={styles.link}>
        <a href={src + `#L${startLineNum}-L${endLineNum}`}>
          See full code on GitHub
        </a>
      </div>
    </div>
  )
}

export default CodeFromRemote
