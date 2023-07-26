import React from "react"
import TOCCollapsible from "@theme-original/TOCCollapsible"
import "./index.css"

export default function TOCCollapsibleWrapper(props) {
  return (
    <>
      <TOCCollapsible {...props} />
      <div className="ory-network-mobile-cta">
        Please do a thing at a time, thanks!
      </div>
    </>
  )
}
