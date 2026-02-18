export type QuickstartItem = {
  label: string
  to: string
  description?: string
  deploymentModes?: DeploymentMode[]
}

export type QuickstartCategory = {
  id: string
  label: string
  /** CSS color for the category chip indicator (e.g. #f97316 or var(--icon-kratos-tertiary)) */
  color?: string
  items: QuickstartItem[]
}

export type LanguageMeta = {
  id: string
  label: string
  group: "Web" | "Mobile" | "Backend" | "Other"
  icon: string
}

export type DeploymentMode = "network" | "oel" | "oss"
