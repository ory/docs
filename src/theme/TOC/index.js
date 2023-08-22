import React from "react"
import TOC from "@theme-original/TOC"
import "./index.css"
import { OryNetworkCta } from "../../components/OryNetworkCta/ory-network-cta"

export default function TOCWrapper(props) {
  return (
    <div className="ory-toc-wrapper">
      <TOC {...props} />
      <OryNetworkCta />
      <div className="kapa-widget-placeholder" />
    </div>
  )
}
