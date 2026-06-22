import React from "react"
import { useHistory, useLocation } from "@docusaurus/router"
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client"
import { useQuickstartsDeployment } from "@site/src/contexts/QuickstartsDeploymentContext"
import type { QuickstartsDeploymentId } from "@site/src/contexts/QuickstartsDeploymentContext"
import DeploymentPickerUI, {
  DEPLOYMENT_OPTIONS,
  QUICKSTARTS_SIDEBAR_NAMES,
} from "@site/src/components/DeploymentPickerUI"

function getCurrentDeployment(
  pathname: string,
): (typeof DEPLOYMENT_OPTIONS)[number] {
  if (pathname.includes("/oel/") || pathname.includes("/self-hosted/oel/"))
    return DEPLOYMENT_OPTIONS.find((o) => o.id === "oel")!
  if (pathname.includes("/oss/"))
    return DEPLOYMENT_OPTIONS.find((o) => o.id === "oss")!
  return DEPLOYMENT_OPTIONS.find((o) => o.id === "network")!
}

export default function SidebarDeploymentModel(): JSX.Element | null {
  const history = useHistory()
  const location = useLocation()
  const sidebar = useDocsSidebar()
  const quickstartsDeployment = useQuickstartsDeployment()

  if (!sidebar?.name || !QUICKSTARTS_SIDEBAR_NAMES.has(sidebar.name))
    return null

  const currentFromPath = getCurrentDeployment(location.pathname)
  const current = quickstartsDeployment
    ? DEPLOYMENT_OPTIONS.find(
        (o) => o.id === quickstartsDeployment.deployment,
      ) ?? currentFromPath
    : currentFromPath

  return (
    <DeploymentPickerUI
      current={current}
      onSelect={(opt) => {
        quickstartsDeployment?.setDeployment(opt.id as QuickstartsDeploymentId)
        history.push("/docs/getting-started/overview")
      }}
    />
  )
}
