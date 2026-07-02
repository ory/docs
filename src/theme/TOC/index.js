import React from "react"
import TOC from "@theme-original/TOC"
import { useLocation } from "@docusaurus/router"
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client"
import "./index.css"
import { OryNetworkCta } from "../../components/OryNetworkCta/ory-network-cta"
import { docsDeploymentFromPathname } from "../../utils/docsDeploymentFromPathname"

const OSS_SIDEBAR_LABEL = "Ory Open Source"

function isOssDeployment(pathname, sidebar) {
  // Check sidebar category labels first (covers non-migrated sections)
  if (sidebar?.items) {
    for (const item of sidebar.items) {
      if (item.type === "category" && item.label === OSS_SIDEBAR_LABEL)
        return true
    }
  }
  // Fall back to URL-based detection (migrated sections)
  return docsDeploymentFromPathname(pathname) === "oss"
}

export default function TOCWrapper(props) {
  const { pathname } = useLocation()
  const sidebar = useDocsSidebar()
  const isOss = isOssDeployment(pathname, sidebar)

  return (
    <div className="ory-toc-wrapper">
      <TOC {...props} />
      {isOss && (
        <div className="ory-network-cta-sticky">
          <OryNetworkCta />
        </div>
      )}
      <div className="kapa-widget-placeholder" />
    </div>
  )
}
