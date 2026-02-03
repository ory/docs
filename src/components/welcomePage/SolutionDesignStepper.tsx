import React, { useState, useMemo } from "react"
import Link from "@docusaurus/Link"
import Mermaid from "@theme/Mermaid"
import { colors, radius, spacing, typography } from "./tokens"
import { StepBadge } from "./StepBadge"

type ProductKey =
  | "kratos"
  | "elements"
  | "hydra"
  | "polis"
  | "keto"
  | "oathkeeper"

interface StepQuestion {
  id: string
  question: string
  options: { value: "yes" | "no"; label: string; addProducts?: ProductKey[] }[]
}

const STEPS: StepQuestion[] = [
  {
    id: "identity",
    question:
      "Do you need to support user sign-up, login, account recovery, and profile management?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["kratos"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "ui",
    question:
      "Do you want a prebuilt or customizable login and account UI, instead of building the UI entirely yourself?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["elements"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "oauth",
    question:
      "Do you need authentication for APIs, mobile apps, or single-page applications (beyond browser cookies and sessions)? These typically require OAuth2/OIDC tokens.",
    options: [
      { value: "yes", label: "Yes", addProducts: ["hydra"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "sso",
    question:
      "Do you need Enterprise Single Sign-On (SSO), so business customers can sign in with IdPs like Okta, Azure AD, or Google Workspace?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["polis"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "scim",
    question:
      "Do you need automated user and group provisioning from enterprise directories (SCIM directory sync)?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["polis"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "permissions",
    question:
      "Do you need fine-grained permissions inside your application (for example, “can this user edit this document?”)?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["keto"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
  {
    id: "gateway",
    question:
      "Do you want a centralized gateway that enforces authentication and authorization before requests reach your APIs?",
    options: [
      { value: "yes", label: "Yes", addProducts: ["oathkeeper"] },
      { value: "no", label: "No", addProducts: [] },
    ],
  },
]

const PRODUCT_LABELS: Record<
  ProductKey,
  { label: string; description: string; to: string }
> = {
  kratos: {
    label: "Ory Kratos",
    description: "Identity and login",
    to: "/docs/kratos",
  },
  hydra: {
    label: "Ory Hydra",
    description: "OAuth2/OIDC tokens",
    to: "/docs/hydra",
  },
  polis: {
    label: "Ory Polis",
    description: "Enterprise SSO + SCIM",
    to: "/docs/polis",
  },
  keto: {
    label: "Ory Keto",
    description: "Fine-grained permissions",
    to: "/docs/keto",
  },
  oathkeeper: {
    label: "Ory Oathkeeper",
    description: "API enforcement gateway",
    to: "/docs/oathkeeper",
  },
  elements: {
    label: "Ory Elements",
    description: "Pre-built login and account UI",
    to: "/docs/elements",
  },
}

const RESULTS_ORDER: ProductKey[] = [
  "kratos",
  "hydra",
  "polis",
  "keto",
  "oathkeeper",
  "elements",
]

// Dynamic diagram: nodes and edges shown based on selected products
interface ChartNode {
  id: string
  config: string
  condition?: (components: ProductKey[]) => boolean
}
interface ChartConnection {
  from: string
  to: string
  label?: string
  condition?: (components: ProductKey[]) => boolean
}

const CHART_NODES: ChartNode[] = [
  { id: "User", config: '@{ icon: "tabler:user" }' },
  { id: "Devices", config: '@{ icon: "tabler:devices"}' },
  {
    id: "Kratos",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-kratos.svg", pos: "b", w: 120, constraint: "on", label: "Identity Management" }',
    condition: (c) => c.includes("kratos"),
  },
  {
    id: "Hydra",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-hydra.svg", pos: "b", w: 120, constraint: "on", label: "OAuth2 & OpenID Connect Server" }',
    condition: (c) => c.includes("hydra"),
  },
  {
    id: "Keto",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-keto.svg", pos: "b", w: 120, constraint: "on", label: "Permissions" }',
    condition: (c) => c.includes("keto"),
  },
  {
    id: "Polis",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-polis.svg", pos: "b", w: 120, constraint: "on", label: "Enterprise SSO bridge" }',
    condition: (c) => c.includes("polis"),
  },
  {
    id: "Oathkeeper",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-oathkeeper.svg", pos: "b", w: 120, constraint: "on", label: "Identity and Access Proxy IAP" }',
    condition: (c) => c.includes("oathkeeper"),
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
    condition: (c) => c.includes("elements"),
  },
]

const CHART_CONNECTIONS: ChartConnection[] = [
  { from: "User", to: "Devices" },
  {
    from: "Devices",
    to: "Oathkeeper",
    condition: (c) => c.includes("oathkeeper"),
  },
  {
    from: "Oathkeeper",
    to: "API",
    label: "protects",
    condition: (c) => c.includes("oathkeeper"),
  },
  {
    from: "Oathkeeper",
    to: "Hydra",
    label: "authenticates credentials with",
    condition: (c) => c.includes("hydra") && c.includes("oathkeeper"),
  },
  {
    from: "User",
    to: "Kratos",
    label: "Registers, log in, <br/> manages profile via API",
    condition: (c) => c.includes("kratos"),
  },
  {
    from: "User",
    to: "Elements",
    label: "Registers, logs in, <br/> manages profile via prebuilt UI",
    condition: (c) => c.includes("elements"),
  },
  {
    from: "Elements",
    to: "Kratos",
    condition: (c) => c.includes("elements") && c.includes("kratos"),
  },
  {
    from: "Elements",
    to: "Hydra",
    condition: (c) => c.includes("elements") && c.includes("hydra"),
  },
  {
    from: "Oathkeeper",
    to: "Kratos",
    label: "checks session with",
    condition: (c) =>
      c.includes("oathkeeper") && c.includes("kratos"),
  },
  {
    from: "Oathkeeper",
    to: "Keto",
    label: "checks permissions with",
    condition: (c) =>
      c.includes("keto") && c.includes("oathkeeper"),
  },
  {
    from: "Devices",
    to: "API",
    condition: (c) => !c.includes("oathkeeper"),
  },
  {
    from: "Kratos",
    to: "Polis",
    label: "OIDC",
    condition: (c) => c.includes("polis") && c.includes("kratos"),
  },
  {
    from: "API",
    to: "Hydra",
    label: "OAuth2",
    condition: (c) => c.includes("hydra"),
  },
  {
    from: "API",
    to: "Kratos",
    label: "Checks session with",
    condition: (c) => c.includes("kratos"),
  },
  {
    from: "API",
    to: "Keto",
    label: "Checks permissions with",
    condition: (c) => c.includes("keto"),
  },
]

function generateChartNodes(components: ProductKey[]): string {
  return CHART_NODES.filter(
    (node) => !node.condition || node.condition(components),
  )
    .map((node) => `${node.id}${node.config}`)
    .join("\n")
}

function generateChartConnections(components: ProductKey[]): string {
  return CHART_CONNECTIONS.filter(
    (conn) => !conn.condition || conn.condition(components),
  )
    .map((conn) => {
      const label = conn.label ? `|${conn.label}|` : ""
      return `${conn.from} -->${label} ${conn.to}`
    })
    .join("\n")
}

function generateMermaidChart(components: ProductKey[]): string {
  const nodes = generateChartNodes(components)
  const connections = generateChartConnections(components)
  const productIds = ["Kratos", "Hydra", "Keto", "Polis", "Oathkeeper", "Elements"]
  const visibleProducts = productIds.filter((id) => {
    const key = id.toLowerCase() as ProductKey
    return components.includes(key)
  })
  const nodeStyles =
    visibleProducts.length > 0
      ? visibleProducts
          .map((id) => `style ${id} fill:transparent,stroke:none`)
          .join("\n")
      : ""

  return `graph LR
${nodes}

${nodeStyles}

${connections}
`
}

export function SolutionDesignStepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, "yes" | "no">>({})

  const selectedProducts = useMemo(() => {
    const set = new Set<ProductKey>()
    STEPS.forEach((step) => {
      const answer = answers[step.id]
      if (answer === "yes") {
        const option = step.options.find((o) => o.value === "yes")
        option?.addProducts?.forEach((p) => set.add(p))
      }
    })
    return Array.from(set)
  }, [answers])

  const isIntro = currentStep === 0
  const isResults = currentStep === STEPS.length + 1
  const questionIndex = currentStep - 1
  const currentQuestion = questionIndex >= 0 && questionIndex < STEPS.length
    ? STEPS[questionIndex]
    : null

  const handleStart = () => setCurrentStep(1)

  const handleAnswer = (stepId: string, value: "yes" | "no") => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }))
  }

  const handleNext = () => {
    if (currentStep <= STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (isResults) {
      handleReset()
      return
    }
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
  }

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined
  const canProceed = isIntro || isResults || currentAnswer !== undefined

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.size4,
          marginBottom: spacing.size8,
          position: "relative",
        }}
      >
        <StepBadge step={2} />
        <h2
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.fontSizeXl,
            fontWeight: typography.fontWeightMedium,
            lineHeight: typography.lineHeightTight,
            color: colors.textPrimary,
            margin: 0,
            maxWidth: "800px",
          }}
        >
          Design your Ory solution
        </h2>
        <p
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.fontSizeBase,
            fontWeight: typography.fontWeightNormal,
            lineHeight: typography.lineHeightNormal,
            color: colors.textSecondary,
            margin: 0,
            maxWidth: "800px",
          }}
        >
          Answer a few questions about your IAM requirements, and we'll
          recommend the right products for your solution.
        </p>
      </div>

      <div
        style={{
          background: colors.backgroundPrimary,
          border: `1px solid ${colors.borderPrimary}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: radius.general,
        }}
      >
        {/* Architecture diagram */}
        <div
          style={{
            padding: spacing.size4,
            position: "relative",
            background: colors.backgroundPrimary,
          }}
        >
          <div
            style={{
              aspectRatio: "1008 / 400",
              position: "relative",
              background: colors.backgroundSecondary,
              width: "100%",
              borderRadius: radius.general,
              overflow: "hidden",
            }}
          >
            <Mermaid
              key={selectedProducts.slice().sort().join(",")}
              // @ts-expect-error Mermaid theme component uses chart prop (untyped JS)
              chart={generateMermaidChart(selectedProducts)}
            />
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            borderTop: `1px solid ${colors.borderPrimary}`,
            padding: spacing.size6,
            display: "flex",
            flexDirection: "column",
            gap: spacing.size6,
            minHeight: "192px",
          }}
        >
          {currentQuestion && !isResults && (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.fontSizeSm,
                    fontWeight: typography.fontWeightNormal,
                    lineHeight: "1",
                    color: colors.textTertiary,
                    whiteSpace: "nowrap",
                  }}
                >
                  Step {currentStep} of {STEPS.length}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: spacing.size6,
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: typography.fontFamily,
                      fontSize: typography.fontSizeSm,
                      fontWeight: typography.fontWeightMedium,
                      lineHeight: typography.lineHeightNormal,
                      color: colors.textPrimary,
                      margin: 0,
                      paddingBottom: spacing.size3,
                    }}
                  >
                    {currentQuestion.question}
                  </p>
                </div>
                <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: spacing.size3,
                    }}
                  >
                    {currentQuestion.options.map((option) => {
                      const selected = currentAnswer === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleAnswer(currentQuestion.id, option.value)
                          }
                          style={{
                            background: colors.backgroundPrimary,
                            border: `1px solid ${
                              selected
                                ? colors.borderBrandTertiary
                                : colors.borderPrimary
                            }`,
                            borderRadius: radius.buttons,
                            padding: `${spacing.size2} ${spacing.size4}`,
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            cursor: "pointer",
                            fontFamily: typography.fontFamily,
                            fontSize: typography.fontSizeSm,
                            fontWeight: typography.fontWeightNormal,
                            color: colors.textPrimary,
                            textAlign: "left",
                          }}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {isResults && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.size6,
              }}
            >
              <p
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeBase,
                  fontWeight: typography.fontWeightMedium,
                  lineHeight: typography.lineHeightNormal,
                  color: colors.textPrimary,
                  margin: 0,
                }}
              >
                Based on your answers, here's the Ory stack that matches your
                IAM requirements:
              </p>
              {selectedProducts.length > 0 ? (
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: spacing.size6,
                    display: "flex",
                    flexDirection: "column",
                    gap: spacing.size2,
                  }}
                >
                  {RESULTS_ORDER.filter((k) => selectedProducts.includes(k)).map(
                    (key) => {
                      const p = PRODUCT_LABELS[key]
                      return (
                        <li
                          key={key}
                          style={{
                            fontFamily: typography.fontFamily,
                            fontSize: typography.fontSizeBase,
                            fontWeight: typography.fontWeightNormal,
                            lineHeight: typography.lineHeightNormal,
                            color: colors.textSecondary,
                          }}
                        >
                          <Link
                            to={p.to}
                            style={{
                              color: colors.textPrimary,
                              fontWeight: typography.fontWeightMedium,
                              textDecoration: "none",
                            }}
                          >
                            {p.label}
                          </Link>
                          {" — "}
                          {p.description}
                        </li>
                      )
                    },
                  )}
                </ul>
              ) : (
                <p
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.fontSizeBase,
                    fontWeight: typography.fontWeightNormal,
                    lineHeight: typography.lineHeightNormal,
                    color: colors.textSecondary,
                    margin: 0,
                  }}
                >
                  Based on your answers, you may not need additional Ory products
                  for your current use case. You can still explore our{" "}
                  <Link to="/getting-started/overview">quickstarts</Link> or{" "}
                  <a
                    href="https://www.ory.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: colors.brandPrimary,
                      textDecoration: "underline",
                    }}
                  >
                    contact sales
                  </a>{" "}
                  for guidance.
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacing.size3,
                }}
              >
                <p
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.fontSizeSm,
                    fontWeight: typography.fontWeightMedium,
                    lineHeight: "1",
                    color: colors.textPrimary,
                    margin: 0,
                  }}
                >
                  Next steps:
                </p>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: spacing.size6,
                    display: "flex",
                    flexDirection: "column",
                    gap: spacing.size2,
                  }}
                >
                  <li>
                    <Link
                      to="/getting-started/overview"
                      style={{
                        color: colors.brandPrimary,
                        textDecoration: "underline",
                        fontFamily: typography.fontFamily,
                        fontSize: typography.fontSizeBase,
                      }}
                    >
                      View quickstart tutorials
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://console.ory.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: colors.brandPrimary,
                        textDecoration: "underline",
                        fontFamily: typography.fontFamily,
                        fontSize: typography.fontSizeBase,
                      }}
                    >
                      Create a free Ory Network project
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ory.com/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: colors.brandPrimary,
                        textDecoration: "underline",
                        fontFamily: typography.fontFamily,
                        fontSize: typography.fontSizeBase,
                      }}
                    >
                      Contact Sales
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer navigation */}
        <div
          style={{
            background: colors.backgroundSecondary,
            borderTop: `1px solid ${colors.borderPrimary}`,
            padding: spacing.size4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: spacing.size3,
          }}
        >
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.fontSizeSm,
              fontWeight: typography.fontWeightNormal,
              lineHeight: "1",
              color: colors.textTertiary,
            }}
          >
            {isIntro && "Answer a few questions to get a tailored recommendation"}
            {currentQuestion &&
              !isResults &&
              "Select an option to continue"}
            {isResults && "Start over to try different answers"}
          </span>
          <div style={{ display: "flex", gap: spacing.size2 }}>
            {!isIntro && (
              <button
                type="button"
                onClick={handleBack}
                style={{
                  height: "32px",
                  padding: `0 ${spacing.size4}`,
                  background: colors.backgroundPrimary,
                  border: `1px solid ${colors.borderPrimary}`,
                  borderRadius: radius.buttons,
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeSm,
                  fontWeight: typography.fontWeightNormal,
                  lineHeight: "1",
                  color: colors.textPrimary,
                  cursor: "pointer",
                }}
              >
                {isResults ? "Start over" : "Back"}
              </button>
            )}
            {isIntro && (
              <button
                type="button"
                onClick={handleStart}
                style={{
                  height: "32px",
                  padding: `0 ${spacing.size4}`,
                  background: colors.backgroundDark,
                  border: "none",
                  borderRadius: radius.buttons,
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeSm,
                  fontWeight: typography.fontWeightNormal,
                  lineHeight: "1",
                  color: colors.backgroundPrimary,
                  cursor: "pointer",
                }}
              >
                Start
              </button>
            )}
            {!isIntro && !isResults && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                style={{
                  height: "32px",
                  padding: `0 ${spacing.size4}`,
                  background: canProceed
                    ? colors.backgroundDark
                    : colors.backgroundTertiary,
                  border: "none",
                  borderRadius: radius.buttons,
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeSm,
                  fontWeight: typography.fontWeightNormal,
                  lineHeight: "1",
                  color: colors.backgroundPrimary,
                  cursor: canProceed ? "pointer" : "not-allowed",
                }}
              >
                {currentStep === STEPS.length ? "See results" : "Continue"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
