import React from "react"
import { useHistory, useLocation } from "@docusaurus/router"
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client"
import DeploymentPickerUI, {
  DEPLOYMENT_OPTIONS,
  QUICKSTARTS_SIDEBAR_NAMES,
  type DeploymentOption,
} from "@site/src/components/DeploymentPickerUI"

/**
 * Scans the sidebar's top-level category labels to detect the current
 * deployment. Works for non-migrated sections whose URLs don't yet follow
 * the /docs/oss/ pattern but whose sidebar wraps content inside e.g.
 * "Ory Open Source".
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDeploymentFromSidebar(sidebar: any): DeploymentOption | null {
  if (!sidebar?.items) return null
  for (const item of sidebar.items) {
    if (item.type === "category") {
      const match = DEPLOYMENT_OPTIONS.find((o) => o.label === item.label)
      if (match) return match
    }
  }
  return null
}

/** Fallback for migrated sections whose URLs follow /docs/network|oel|oss/. */
function getDeploymentFromPath(pathname: string): DeploymentOption | null {
  if (
    pathname.startsWith("/docs/oel/") ||
    pathname.includes("/docs/self-hosted/oel/")
  )
    return DEPLOYMENT_OPTIONS.find((o) => o.id === "oel") ?? null
  if (pathname.startsWith("/docs/oss/"))
    return DEPLOYMENT_OPTIONS.find((o) => o.id === "oss") ?? null
  if (pathname.startsWith("/docs/network/"))
    return DEPLOYMENT_OPTIONS.find((o) => o.id === "network") ?? null
  return null
}

export default function SidebarDeploymentDropdown(): JSX.Element | null {
  const location = useLocation()
  const sidebar = useDocsSidebar()
  const history = useHistory()

  // QuickStarts has its own SidebarDeploymentModel — don't double-render.
  if (sidebar?.name && QUICKSTARTS_SIDEBAR_NAMES.has(sidebar.name)) return null

  const current =
    getDeploymentFromSidebar(sidebar) ?? getDeploymentFromPath(location.pathname)
  if (!current) return null

  return (
    <DeploymentPickerUI
      current={current}
      onSelect={(opt) => history.push(`/docs/${opt.id}/getting-started`)}
    />
  )
}
