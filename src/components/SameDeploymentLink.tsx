import React, { useEffect, type ReactNode } from "react"
import Link from "@docusaurus/Link"
import { useLocation } from "@docusaurus/router"
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client"

type DocsDeploymentSegment = "network" | "oel" | "oss"

type SameDeploymentLinkProps = {
  to: string
  // Optional overrides for the link target based on the deployment segment
  network?: string
  oel?: string
  oss?: string
  children: ReactNode
}

const DEFAULT_DOCS_PLUGIN_ID = "default"

const DEPLOYMENT_SEGMENT_PATTERN = /\/(network|oel|oss)(?:\/|$)/

const stripLeadingSlashes = (value: string) => value.replace(/^\/+/, "")
const normalizePath = (value: string) => `/${stripLeadingSlashes(value)}`

/**
 * Internal docs link that keeps the reader on the current deployment (Network / OEL / OSS).
 */
export default function SameDeploymentLink({
  to,
  network,
  oel,
  oss,
  children,
}: SameDeploymentLinkProps): JSX.Element {
  const { pathname } = useLocation()
  const segment =
    (pathname.match(DEPLOYMENT_SEGMENT_PATTERN)?.[1] as
      | DocsDeploymentSegment
      | undefined) ?? "network"

  const rewriteToCurrentDeployment = (value: string): string => {
    const path = normalizePath(value)
    const match = path.match(DEPLOYMENT_SEGMENT_PATTERN)
    if (match) {
      // Replace explicit deployment segment with the current one.
      return path.replace(DEPLOYMENT_SEGMENT_PATTERN, `/${segment}/`)
    }
    // Prefix when no deployment segment is present.
    return `/${segment}${path}`
  }

  const overrideForCurrentDeployment = { network, oel, oss }[segment]
  const href = overrideForCurrentDeployment
    ? normalizePath(overrideForCurrentDeployment)
    : rewriteToCurrentDeployment(to)
  const allDocs = useAllDocsData()

  useEffect(() => {
    if (!DEPLOYMENT_SEGMENT_PATTERN.test(href)) return
    const plugin = allDocs[DEFAULT_DOCS_PLUGIN_ID]
    const version =
      plugin?.versions.find((v) => v.isLast) ?? plugin?.versions[0]
    if (!version?.docs?.length) return

    const docId = stripLeadingSlashes(href)
    const found = version.docs.some((d) => d.id === docId)
    if (!found) {
      const overrideMsg = overrideForCurrentDeployment
        ? ` (override prop "${segment}" was used)`
        : ""
      console.warn(
        `[SameDeploymentLink] No doc with id "${docId}". ` +
          `Resolved href="${href}" from to="${to}" under deployment "${segment}" did not match any page in this build${overrideMsg}.`,
      )
    }
  }, [allDocs, href, overrideForCurrentDeployment, segment, to])

  return <Link to={href}>{children}</Link>
}
