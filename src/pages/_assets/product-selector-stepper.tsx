import Mermaid from "@site/src/theme/Mermaid"
import React, { useState, useEffect } from "react"
import styles from "./product-selector-stepper.module.css"
import graphStyles from "./product-selector-graph.module.css"

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
  gettingStartedUrl: string
}

interface Step {
  id: string
  title: string
  question: string
  options: {
    value: string
    label: string
    components?: ComponentKey[]
  }[]
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
    gettingStartedUrl: "/kratos/quickstart",
  },
  {
    key: "hydra",
    label: "OAuth2 & OpenID Connect Server",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-hydra.svg",
    description: "OAuth2 & OpenID Connect Server",
    gettingStartedUrl: "/hydra/self-hosted/quickstart",
  },
  {
    key: "keto",
    label: "Permissions",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-keto.svg",
    description: "Permissions",
    gettingStartedUrl: "/keto/quickstart",
  },
  {
    key: "polis",
    label: "Enterprise SSO bridge / SAML support",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-polis.svg",
    description: "Enterprise SSO bridge",
    gettingStartedUrl: "/polis/quickstart",
  },
  {
    key: "oathkeeper",
    label: "Identity and Access Proxy IAP",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-oathkeeper.svg",
    description: "Identity and Access Proxy IAP",
    gettingStartedUrl: "/oathkeeper",
  },
  {
    key: "elements",
    label: "Pre-built UI",
    logoUrl:
      "https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-elements.svg",
    description: "Ory Elements",
    gettingStartedUrl: "/elements",
  },
]

const STEPS: Step[] = [
  {
    id: "identity",
    title: "Identity Management",
    question: "Do you need identity management (user registration, profile management)?",
    options: [
      {
        value: "yes",
        label: "Yes, I need identity management",
        components: ["kratos"],
      },
      {
        value: "no",
        label: "No, I have an existing identity system",
        components: [],
      },
    ],
  },
  {
    id: "ui",
    title: "User Interface",
    question: "How do you want to handle user authentication UI?",
    options: [
      {
        value: "prebuilt",
        label: "Use pre-built UI components",
        components: ["elements"],
      },
      {
        value: "custom",
        label: "Build custom UI",
        components: [],
      },
    ],
  },
  {
    id: "oauth",
    title: "OAuth2 & OpenID Connect",
    question: "Do you need OAuth2 or OpenID Connect capabilities?",
    options: [
      {
        value: "yes",
        label: "Yes, I need OAuth2/OIDC",
        components: ["hydra"],
      },
      {
        value: "no",
        label: "No, I don't need OAuth2/OIDC",
        components: [],
      },
    ],
  },
  {
    id: "permissions",
    title: "Permissions & Authorization",
    question: "Do you need fine-grained permissions and authorization?",
    options: [
      {
        value: "yes",
        label: "Yes, I need permissions management",
        components: ["keto"],
      },
      {
        value: "no",
        label: "No, I don't need permissions",
        components: [],
      },
    ],
  },
  {
    id: "sso",
    title: "Enterprise SSO",
    question: "Do you need Enterprise SSO or SAML support?",
    options: [
      {
        value: "yes",
        label: "Yes, I need SSO/SAML",
        components: ["polis"],
      },
      {
        value: "no",
        label: "No, I don't need SSO/SAML",
        components: [],
      },
    ],
  },
  {
    id: "proxy",
    title: "API Gateway",
    question: "Do you need an API gateway or reverse proxy for authentication?",
    options: [
      {
        value: "yes",
        label: "Yes, I need an API gateway",
        components: ["oathkeeper"],
      },
      {
        value: "no",
        label: "No, I'll handle this in my application",
        components: [],
      },
    ],
  },
]

// Chart configuration (same as project-overview-graph.tsx)
const CHART_NODES: ChartNode[] = [
  { id: "User", config: '@{ icon: "tabler:user" }' },
  { id: "Devices", config: '@{ icon: "tabler:devices"}' },
  {
    id: "Kratos",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-kratos.svg", pos: "b", w: 120, constraint: "on", label: "Identity Management" }',
    condition: (components) => components.includes("kratos"),
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
    condition: (components) => components.includes("kratos"),
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
    condition: (components) =>
      components.includes("elements") && components.includes("kratos"),
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
    condition: (components) =>
      components.includes("oathkeeper") && components.includes("kratos"),
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
    condition: (components) =>
      components.includes("polis") && components.includes("kratos"),
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
    condition: (components) =>
      !components.includes("oathkeeper") && components.includes("kratos"),
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
  
  // Generate style directives for Ory product nodes to remove borders
  const productNodeIds = ["Kratos", "Hydra", "Keto", "Polis", "Oathkeeper", "Elements"]
  const visibleProductNodes = productNodeIds.filter((id) => {
    if (id === "Kratos") return components.includes("kratos")
    if (id === "Hydra") return components.includes("hydra")
    if (id === "Keto") return components.includes("keto")
    if (id === "Polis") return components.includes("polis")
    if (id === "Oathkeeper") return components.includes("oathkeeper")
    if (id === "Elements") return components.includes("elements")
    return false
  })
  
  const nodeStyles = visibleProductNodes
    .map((id) => `style ${id} fill:transparent,stroke:none`)
    .join("\n")

  return `graph LR

${nodes}

subgraph yourCode["Your Code"]
  direction TB
  API@{ icon: "tabler:code", label: "API Endpoint 1<br/> API Endpoint 2" }
  ${components.includes("elements") ? `Elements@{ img: "https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-elements.svg", pos: "b", w: 120, constraint: "on", label: "Ory Elements" }` : ""}
end

style yourCode fill:transparent,stroke:#cbd5e1,stroke-width:2px,stroke-dasharray: 5 5,color:#1e293b
${nodeStyles}

${connections}
`
}

// Component
export function ProductSelectorStepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedComponents, setSelectedComponents] = useState<ComponentKey[]>([])

  // Recalculate selected components whenever answers change
  useEffect(() => {
    const newComponents = new Set<ComponentKey>()
    STEPS.forEach((step) => {
      const answer = answers[step.id]
      const option = step.options.find((opt) => opt.value === answer)
      if (option?.components) {
        option.components.forEach((comp) => newComponents.add(comp))
      }
    })
    setSelectedComponents(Array.from(newComponents))
  }, [answers])

  const handleAnswer = (stepId: string, value: string) => {
    const newAnswers = { ...answers, [stepId]: value }
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setSelectedComponents([])
  }

  const currentStepData = STEPS[currentStep]
  const isLastStep = currentStep === STEPS.length - 1
  const isComplete = Object.keys(answers).length === STEPS.length

  const chart = generateMermaidChart(selectedComponents)

  return (
    <div className={styles.stepper}>
      <div className={styles.header}>
        <p className={styles.description}>
          Answer a few questions about your IAM requirements. We'll match you with the right Ory products.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Left column: Stepper */}
        <div className={styles.stepperColumn}>
          {/* Progress indicator */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              {STEPS.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div
                    className={`${styles.progressSegment} ${
                      index <= currentStep ? styles.progressSegmentActive : ""
                    }`}
                  />
                  {index < STEPS.length - 1 && (
                    <div
                      className={`${styles.progressDot} ${
                        index < currentStep ? styles.progressDotActive : ""
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className={styles.progressText}>
              Step {currentStep + 1} of {STEPS.length}
            </div>
          </div>

          {/* Current step */}
          {!isComplete ? (
            <div className={styles.stepCard}>
              <h3 className={styles.stepTitle}>{currentStepData.title}</h3>
              <p className={styles.stepQuestion}>{currentStepData.question}</p>
              <div className={styles.optionsContainer}>
                {currentStepData.options.map((option) => {
                  const isSelected = answers[currentStepData.id] === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentStepData.id, option.value)}
                      className={`${styles.optionButton} ${
                        isSelected ? styles.optionButtonSelected : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className={styles.completionCard}>
              <h3 className={styles.completionTitle}>Configuration Complete!</h3>
              {selectedComponents.length > 0 ? (
                <>
                  <p className={styles.completionDescription}>
                    Based on your answers, here are the recommended Ory products for your
                    use case:
                  </p>
                  <ul className={styles.componentsList}>
                    {selectedComponents.map((component) => {
                      const config = COMPONENT_CONFIGS.find((c) => c.key === component)
                      if (!config) return null
                      return (
                        <li key={component} className={styles.componentListItem}>
                          <a
                            href={config.gettingStartedUrl}
                            className={styles.componentLink}
                          >
                            {config.label}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </>
              ) : (
                <p className={styles.completionDescription}>
                  Based on your answers, you may not need any Ory products, or you might
                  be using an existing identity solution. If you need help determining the
                  right setup for your use case, please{" "}
                  <a href="mailto:support@ory.com" className={styles.link}>
                    contact our support team
                  </a>
                  .
                </p>
              )}
              <button onClick={handleReset} className={styles.resetButton}>
                Start over
              </button>
            </div>
          )}

          {/* Navigation buttons */}
          {!isComplete && (
            <div className={styles.navigation}>
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={styles.navButton}
              >
                Previous
              </button>
              <div className={styles.navCounter}>
                {currentStep + 1} / {STEPS.length}
              </div>
              <button
                onClick={handleNext}
                disabled={!answers[currentStepData.id]}
                className={`${styles.navButton} ${styles.navButtonPrimary}`}
              >
                {isLastStep ? "Complete" : "Next"}
              </button>
            </div>
          )}
        </div>

        {/* Right column: Graph visualization */}
        <div className={styles.graphColumn}>
          <div className={graphStyles.graphSection}>
            <h3 className={graphStyles.graphTitle}>Your solution</h3>
            <div className={graphStyles.graphContainer}>
              <Mermaid chart={chart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}