export type DocsDeploymentSegment = "network" | "oel" | "oss"

export function getDocsDeploymentSegment(
  pathname: string,
): DocsDeploymentSegment {
  if (pathname.includes("/oel/") || pathname.includes("/self-hosted/oel/")) {
    return "oel"
  }
  if (pathname.includes("/oss/")) {
    return "oss"
  }
  return "network"
}
