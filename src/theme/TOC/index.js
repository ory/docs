import React from "react"
import TOC from "@theme-original/TOC"
import "./index.css"

export default function TOCWrapper(props) {
  return (
    <div className="ory-toc-wrapper">
      <TOC {...props} />
      <div className="ory-network-cta">
        Please do a thing at a time, thanks!
      </div>
    </div>
  )
}
