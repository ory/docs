import React, { useEffect, type ReactNode } from "react"
import Link from "@docusaurus/Link"
import { useLocation } from "@docusaurus/router"
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client"
import {
  getDocsDeploymentSegment,
  type DocsDeploymentSegment,
} from "@site/src/utils/deploymentFromPathname"

type SameDeploymentLinkProps = {
  to: string
  // Optional overrides for the link target based on the deployment segment
  network?: string
  oel?: string
  oss?: string
  children: ReactNode
}

const DEFAULT_DOCS_PLUGIN_ID = "default"

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
  const segment = getDocsDeploymentSegment(pathname)
  const stripLeadingSlashes = (value: string) => value.replace(/^\/+/, "")
  const normalizePath = (value: string) => `/${stripLeadingSlashes(value)}`

  // Detect whether the provided path already includes a deployment segment.
  // If it does, we replace it with the current one (drop-in replacement behavior).
  // If it doesn't, we prefix the current deployment segment (legacy behavior).
  const rewriteToCurrentDeployment = (value: string): string => {
    const p = normalizePath(value)

    // Handle legacy/self-hosted prefixes explicitly.
    if (p.startsWith("/self-hosted/oel/")) {
      return `/oel/${p.slice("/self-hosted/oel/".length)}`
    }

    const m = p.match(/^\/(network|oel|oss)(\/.*)?$/)
    if (m) {
      const rest = m[2] ?? ""
      return `/${segment}${rest}`
    }

    return `/${segment}${p}`
  }

  const suffixDefault = stripLeadingSlashes(to)
  const overrides: Partial<Record<DocsDeploymentSegment, string>> = {
    network,
    oel,
    oss,
  }
  const suffixOverride = overrides[segment]
  const suffixEffective = suffixOverride
    ? stripLeadingSlashes(suffixOverride)
    : suffixDefault
  const href = rewriteToCurrentDeployment(suffixEffective)
  const allDocs = useAllDocsData()

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return
    const plugin = allDocs[DEFAULT_DOCS_PLUGIN_ID]
    const version =
      plugin?.versions.find((v) => v.isLast) ?? plugin?.versions[0]
    if (!version?.docs?.length) return

    const docId = stripLeadingSlashes(href)
    const found = version.docs.some((d) => d.id === docId)
    if (!found) {
      const overrideMsg = suffixOverride
        ? ` (override prop "${segment}" was used)`
        : ""
      console.warn(
        `[SameDeploymentLink] No doc with id "${docId}". ` +
          `Resolved href="${href}" from to="${to}" under deployment "${segment}" did not match any page in this build${overrideMsg}.`,
      )
    }
  }, [allDocs, href, segment, suffixOverride, to])

  return <Link to={href}>{children}</Link>
}
