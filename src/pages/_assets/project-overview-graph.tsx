import Mermaid from "@site/src/theme/Mermaid"
import { useState } from "react"

// Types
type ComponentKey =
  | "kratos"
  | "hydra"
  | "keto"
  | "polis"
  | "oathkeeper"
  | "elements"

interface ComponentConfig {
  key: ComponentKey
  label: string
  logoUrl: string
  description: string
}

interface ChartNode {
  id: string
  config: string
  condition?: (components: ComponentKey[]) => boolean
}

interface ChartConnection {
  from: string
  to: string
  label?: string
  condition?: (components: ComponentKey[]) => boolean
}

// Configuration
const COMPONENT_CONFIGS: ComponentConfig[] = [
  {
    key: "kratos",
    label: "Identity Management",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-kratos.svg",
    description: "Identity Management",
  },
  {
    key: "hydra",
    label: "OAuth2 & OpenID Connect Server",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-hydra.svg",
    description: "OAuth2 & OpenID Connect Server",
  },
  {
    key: "keto",
    label: "Permissions",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-keto.svg",
    description: "Permissions",
  },
  {
    key: "polis",
    label: "Enterprise SSO bridge / SAML support",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-polis.svg",
    description: "Enterprise SSO bridge",
  },
  {
    key: "oathkeeper",
    label: "Identity and Access Proxy IAP",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-oathkeeper.svg",
    description: "Identity and Access Proxy IAP",
  },
  {
    key: "elements",
    label: "Pre-built UI",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-elements.svg",
    description: "Ory Elements",
  },
]

const COMPONENT_KEYS: ComponentKey[] = COMPONENT_CONFIGS.map(
  (config) => config.key,
)

const LABELS: Record<ComponentKey, string> = Object.fromEntries(
  COMPONENT_CONFIGS.map((config) => [config.key, config.label]),
) as Record<ComponentKey, string>

// Chart configuration
const CHART_NODES: ChartNode[] = [
  { id: "User", config: '@{ icon: "tabler:user" }' },
  { id: "Devices", config: '@{ icon: "tabler:devices"}' },
  {
    id: "Kratos",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-kratos.svg", pos: "b", w: 120, constraint: "on", label: "Identity Management" }',
  },
  {
    id: "Hydra",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-hydra.svg", pos: "b", w: 120, constraint: "on", label: "OAuth2 & OpenID Connect Server" }',
    condition: (components) => components.includes("hydra"),
  },
  {
    id: "Keto",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-keto.svg", pos: "b", w: 120, constraint: "on", label: "Permissions" }',
    condition: (components) => components.includes("keto"),
  },
  {
    id: "Polis",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-polis.svg", pos: "b", w: 120, constraint: "on", label: "Enterprise SSO bridge" }',
    condition: (components) => components.includes("polis"),
  },
  {
    id: "Oathkeeper",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-oathkeeper.svg", pos: "b", w: 120, constraint: "on", label: "Identity and Access Proxy IAP" }',
    condition: (components) => components.includes("oathkeeper"),
  },
  {
    id: "API",
    config:
      '@{ icon: "tabler:code", label: "API Endpoint 1<br/> API Endpoint 2" }',
  },
  {
    id: "Elements",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-elements.svg", pos: "b", w: 120, constraint: "on", label: "Ory Elements" }',
    condition: (components) => components.includes("elements"),
  },
]

const CHART_CONNECTIONS: ChartConnection[] = [
  { from: "User", to: "Devices" },
  {
    from: "Devices",
    to: "Oathkeeper",
    condition: (components) => components.includes("oathkeeper"),
  },
  {
    from: "Oathkeeper",
    to: "API",
    label: "protects",
    condition: (components) => components.includes("oathkeeper"),
  },
  {
    from: "Oathkeeper",
    to: "Hydra",
    label: "authenticates credentials with",
    condition: (components) =>
      components.includes("hydra") && components.includes("oathkeeper"),
  },
  {
    from: "User",
    to: "Kratos",
    label: "Registers, log in, <br/> manages profile via API",
  },
  {
    from: "User",
    to: "Elements",
    label: "Registers, log in, <br/> manages profile via prebuilt UI",
    condition: (components) => components.includes("elements"),
  },
  {
    from: "Elements",
    to: "Kratos",
    condition: (components) => components.includes("elements"),
  },
  {
    from: "Elements",
    to: "Hydra",
    condition: (components) =>
      components.includes("elements") && components.includes("hydra"),
  },
  {
    from: "Oathkeeper",
    to: "Kratos",
    label: "checks session with",
    condition: (components) => components.includes("oathkeeper"),
  },
  {
    from: "Oathkeeper",
    to: "Keto",
    label: "checks permissions with",
    condition: (components) =>
      components.includes("keto") && components.includes("oathkeeper"),
  },
  {
    from: "yourCode",
    to: "Keto",
    label: "Checks permissions with",
    condition: (components) =>
      components.includes("keto") && !components.includes("oathkeeper"),
  },
  {
    from: "Devices",
    to: "yourCode",
    condition: (components) => !components.includes("oathkeeper"),
  },
  {
    from: "Kratos",
    to: "Polis",
    label: "OIDC",
    condition: (components) => components.includes("polis"),
  },
  {
    from: "yourCode",
    to: "Hydra",
    label: "OAuth2",
    condition: (components) =>
      !components.includes("oathkeeper") &&
      !components.includes("elements") &&
      components.includes("hydra"),
  },
  {
    from: "yourCode",
    to: "Kratos",
    label: "Checks session with",
    condition: (components) => !components.includes("oathkeeper"),
  },
]

// Helper functions
function generateChartNodes(components: ComponentKey[]): string {
  return CHART_NODES.filter(
    (node) => !node.condition || node.condition(components),
  )
    .map((node) => `${node.id}${node.config}`)
    .join("\n")
}

function generateChartConnections(components: ComponentKey[]): string {
  return CHART_CONNECTIONS.filter(
    (connection) => !connection.condition || connection.condition(components),
  )
    .map((connection) => {
      const label = connection.label ? `|${connection.label}|` : ""
      return `${connection.from} -->${label} ${connection.to}`
    })
    .join("\n")
}

function generateMermaidChart(components: ComponentKey[]): string {
  const nodes = generateChartNodes(components)
  const connections = generateChartConnections(components)

  return `graph LR

${nodes}

subgraph yourCode[Your Code]
  API@{ icon: "tabler:code", label: "API Endpoint 1<br/> API Endpoint 2" }
  ${components.includes("elements") ? `Elements@{ img: "https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-elements.svg", pos: "b", w: 120, constraint: "on", label: "Ory Elements" }` : ""}
end

${connections}
`
}

// Component
export function ProjectOverviewGraph() {
  const [components, setComponents] = useState<ComponentKey[]>(COMPONENT_KEYS)

  const toggleComponent = (component: ComponentKey) => () => {
    setComponents((prev) =>
      prev.includes(component)
        ? prev.filter((c) => c !== component)
        : [...prev, component],
    )
  }

  const chart = generateMermaidChart(components)

  return (
    <div>
      I need:
      <br />
      {COMPONENT_KEYS.map((component) => (
        <div key={component}>
          <input
            type="checkbox"
            id={component}
            checked={components.includes(component)}
            onChange={toggleComponent(component)}
            disabled={component === "kratos"}
          />
          <label htmlFor={component}>{LABELS[component]}</label>
        </div>
      ))}
      <Mermaid chart={chart} />
    </div>
  )
}
