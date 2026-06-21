export type DocsDeploymentId = "network" | "oel" | "oss"

/**
 * Infer the docs deployment from a pathname.
 *
 * Note: Some routes still use legacy `/docs/self-hosted/oel/...` paths.
 */
export function docsDeploymentFromPathname(pathname: string): DocsDeploymentId {
  if (!pathname) return "network"

  if (pathname.includes("/oel/") || pathname.includes("/self-hosted/oel/"))
    return "oel"
  if (pathname.includes("/oss/")) return "oss"
  if (pathname.includes("/network/")) return "network"

  return "network"
}

export function isExplicitDocsDeploymentPath(pathname: string): boolean {
  if (!pathname) return false
  return (
    pathname.includes("/network/") ||
    pathname.includes("/oel/") ||
    pathname.includes("/oss/") ||
    pathname.includes("/self-hosted/oel/")
  )
}
