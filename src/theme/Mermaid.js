// Copyright 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

// according to https://github.com/facebook/docusaurus/issues/1258#issuecomment-594393744

// use in *.mdx like:
//
// import Mermaid from '@theme/Mermaid'
//
// <Mermaid chart={`
// flowchart TD
//     cr([Create Request]) --> backoffice[Backoffice Server REST]
// `}/>

import React, { useEffect, useState, useRef } from "react"
import { useColorMode } from "@docusaurus/theme-common"
import mermaid from "mermaid"
import styles from "./mermaid.module.css"
import cn from "classnames"

mermaid.initialize({
  startOnLoad: false,
  logLevel: "fatal",
  securityLevel: "strict",
  arrowMarkerAbsolute: false,
  theme: "neutral",
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    rankSpacing: 65,
    nodeSpacing: 30,
    curve: "basis",
  },
  sequence: {
    useMaxWidth: true,
  },
  gantt: {
    useMaxWidth: true,
  },
})
mermaid.registerIconPacks([
  {
    name: "tabler",
    loader: () => import("@iconify-json/tabler").then((module) => module.icons),
  },
])

const Mermaid = ({ chart }) => {
  const [zoomed, setZoomed] = useState(false)
  const containerRef = useRef(null)
  const toggle = () => setZoomed(!zoomed)
  const { colorMode } = useColorMode()
  const theme = colorMode === "light" ? "neutral" : "dark"

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous content
    containerRef.current.innerHTML = ""

    // Add the mermaid diagram definition with theme
    containerRef.current.innerHTML = `<div class="mermaid">
      %%{init: {'theme':'${theme}'}}%%
      ${chart}
    </div>`

    // Use mermaid.run to process the diagram
    try {
      mermaid.run({
        nodes: [containerRef.current.querySelector(".mermaid")],
      })
    } catch (error) {
      console.error("Mermaid error:", error)
    }
  }, [chart, theme])

  return (
    <>
      <div
        onClick={toggle}
        ref={containerRef}
        className={cn(styles.graph, styles.pointer)}
      />
      <div
        onClick={toggle}
        className={cn(styles.overlay, styles.pointer, styles.graph, {
          [styles.visible]: zoomed,
        })}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(styles.backdrop, styles.graph)}
          dangerouslySetInnerHTML={{
            __html: containerRef.current?.innerHTML || "",
          }}
        />
      </div>
    </>
  )
}

export default Mermaid
