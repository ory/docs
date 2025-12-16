export type QuickstartItem = {
  label: string
  to: string
  description?: string
  deploymentModes?: DeploymentMode[]
}

export type QuickstartCategory = {
  id: string
  label: string
  items: QuickstartItem[]
}

export type LanguageMeta = {
  id: string
  label: string
  group: "Web" | "Mobile" | "Backend" | "Other"
  icon: string
}

export type DeploymentMode = "network" | "oel" | "oss"
