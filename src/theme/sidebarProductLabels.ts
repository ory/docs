export type SidebarProductLabel = {
  productName: string
  domain: string | null
}

export const SIDEBAR_PRODUCT_LABELS: Record<string, SidebarProductLabel> = {
  kratos: {
    productName: "Ory Kratos",
    domain: "Identity & AuthN",
  },
  hydra: {
    productName: "Ory Hydra",
    domain: "Delegated AuthZ & Federated AuthN",
  },
  keto: {
    productName: "Ory Keto",
    domain: "Fine-grained Permissions",
  },
  polis: {
    productName: "Ory Polis",
    domain: "Enterprise SSO AuthZ",
  },
  oathkeeper: {
    productName: "Ory Oathkeeper",
    domain: "Proxy-based Access Control",
  },
  network: {
    productName: "Ory Network",
    domain: null,
  },
  oel: {
    productName: "Ory Elements",
    domain: null,
  },
  oss: {
    productName: "Ory Open Source",
    domain: null,
  },
}

const SIDEBAR_ICON_PREFIX = "sidebar-icon-"

export function getSidebarProductLabels(
  className: string | undefined,
): SidebarProductLabel | null {
  if (!className || typeof className !== "string") return null
  const match = className
    .split(/\s+/)
    .find((c) => c.startsWith(SIDEBAR_ICON_PREFIX))
  if (!match) return null
  const slug = match.slice(SIDEBAR_ICON_PREFIX.length)
  const labels = SIDEBAR_PRODUCT_LABELS[slug]
  return labels ?? null
}
