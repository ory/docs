import React from "react"
import Heading from "@theme/Heading"
import { useQuickstartsDeployment } from "@site/src/contexts/QuickstartsDeploymentContext"
import type { QuickstartsDeploymentId } from "@site/src/contexts/QuickstartsDeploymentContext"

const DEPLOYMENT_LABEL: Record<QuickstartsDeploymentId, string> = {
  network: "Ory Network",
  oel: "Ory Enterprise License",
  oss: "Ory Open Source",
}

/** Page title for /getting-started/overview — reflects selected deployment model. */
export function QuickstartsOverviewHeading() {
  const ctx = useQuickstartsDeployment()
  const id = ctx?.deployment ?? "network"
  const label = DEPLOYMENT_LABEL[id]

  return (
    <Heading as="h1">
      Quickstarts ({label})
    </Heading>
  )
}
