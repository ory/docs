import React, { useState, useMemo } from "react"
import Link from "@docusaurus/Link"
import Mermaid from "@theme/Mermaid"
import { colors } from "./tokens"
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
      "Do you need users to sign in once and use multiple applications, or let third-party apps access your APIs on the user's behalf?",
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
      "Do you need fine-grained permissions inside your application? For example, 'can this user edit this document?'",
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
    description: "Identity management and authentication",
    to: "/docs/kratos",
  },
  hydra: {
    label: "Ory Hydra",
    description: "OAuth2/OIDC tokens for authorization",
    to: "/docs/hydra",
  },
  polis: {
    label: "Ory Polis",
    description: "Enterprise SSO & SCIM",
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
    description: "Pre-built, UI components for self-service flows",
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
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-kratos.svg", pos: "b", w: 120, constraint: "on" }',
    condition: (c) => c.includes("kratos"),
  },
  {
    id: "Hydra",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-hydra.svg", pos: "b", w: 120, constraint: "on" }',
    condition: (c) => c.includes("hydra"),
  },
  {
    id: "Keto",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-keto.svg", pos: "b", w: 120, constraint: "on" }',
    condition: (c) => c.includes("keto"),
  },
  {
    id: "Polis",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-polis.svg", pos: "b", w: 120, constraint: "on" }',
    condition: (c) => c.includes("polis"),
  },
  {
    id: "Oathkeeper",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/refs/heads/master/static/logos/logo-oathkeeper.svg", pos: "b", w: 120, constraint: "on" }',
    condition: (c) => c.includes("oathkeeper"),
  },
  {
    id: "API",
    config: '@{ icon: "tabler:code" }',
  },
  {
    id: "Elements",
    config:
      '@{ img: "https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-elements.svg", pos: "b", w: 120, constraint: "on" }',
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
    condition: (c) => c.includes("oathkeeper") && c.includes("kratos"),
  },
  {
    from: "Oathkeeper",
    to: "Keto",
    label: "checks permissions with",
    condition: (c) => c.includes("keto") && c.includes("oathkeeper"),
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
  const productIds = [
    "Kratos",
    "Hydra",
    "Keto",
    "Polis",
    "Oathkeeper",
    "Elements",
  ]
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

function IntroGraphic({
  colors,
}: {
  colors: Readonly<typeof import("./tokens").colors>
}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1008 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxHeight: "100%", objectFit: "contain" }}
    >
      <defs>
        <pattern
          id="intro-dots"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="12"
            cy="12"
            r="1.5"
            fill={colors.borderPrimary}
            opacity="0.5"
          />
        </pattern>
        <linearGradient
          id="intro-card-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={colors.backgroundPrimary} />
          <stop offset="100%" stopColor={colors.backgroundSecondary} />
        </linearGradient>
        <filter id="intro-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="8"
            floodColor={colors.textPrimary}
            floodOpacity="0.06"
          />
        </filter>
      </defs>
      <rect width="1008" height="400" fill="url(#intro-dots)" />
      <g filter="url(#intro-shadow)">
        <rect
          x="120"
          y="120"
          width="200"
          height="160"
          rx="8"
          fill="url(#intro-card-gradient)"
          stroke={colors.borderPrimary}
          strokeWidth="1"
        />
        <circle
          cx="180"
          cy="165"
          r="20"
          fill={colors.brandPrimaryAlt}
          opacity="0.2"
        />
        <circle cx="180" cy="165" r="10" fill={colors.brandPrimary} />
        <rect
          x="220"
          y="155"
          width="80"
          height="8"
          rx="4"
          fill={colors.borderPrimary}
          opacity="0.6"
        />
        <rect
          x="220"
          y="175"
          width="60"
          height="8"
          rx="4"
          fill={colors.borderPrimary}
          opacity="0.4"
        />
        <rect
          x="220"
          y="195"
          width="70"
          height="8"
          rx="4"
          fill={colors.borderPrimary}
          opacity="0.4"
        />
      </g>
      <path
        d="M 340 200 L 428 200"
        stroke={colors.brandPrimary}
        strokeWidth="2"
        strokeDasharray="6 6"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M 418 200 L 428 194 L 428 206 Z"
        fill={colors.brandPrimary}
        opacity="0.7"
      />
      <g filter="url(#intro-shadow)">
        <rect
          x="448"
          y="120"
          width="200"
          height="160"
          rx="8"
          fill="url(#intro-card-gradient)"
          stroke={colors.borderPrimary}
          strokeWidth="1"
        />
        <rect
          x="478"
          y="145"
          width="48"
          height="32"
          rx="4"
          fill={colors.brandPrimary}
          opacity="0.15"
        />
        <rect
          x="538"
          y="145"
          width="48"
          height="32"
          rx="4"
          fill={colors.brandPrimary}
          opacity="0.15"
        />
        <rect
          x="598"
          y="145"
          width="48"
          height="32"
          rx="4"
          fill={colors.brandPrimary}
          opacity="0.15"
        />
        <rect
          x="478"
          y="195"
          width="48"
          height="32"
          rx="4"
          fill={colors.borderPrimary}
          opacity="0.3"
        />
        <rect
          x="538"
          y="195"
          width="48"
          height="32"
          rx="4"
          fill={colors.borderPrimary}
          opacity="0.3"
        />
      </g>
      <path
        d="M 668 200 L 756 200"
        stroke={colors.brandPrimary}
        strokeWidth="2"
        strokeDasharray="6 6"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M 746 200 L 756 194 L 756 206 Z"
        fill={colors.brandPrimary}
        opacity="0.7"
      />
      <g filter="url(#intro-shadow)">
        <rect
          x="776"
          y="120"
          width="200"
          height="160"
          rx="8"
          fill="url(#intro-card-gradient)"
          stroke={colors.borderPrimary}
          strokeWidth="1"
        />
        <circle
          cx="876"
          cy="165"
          r="24"
          fill={colors.brandPrimary}
          opacity="0.12"
        />
        <circle
          cx="836"
          cy="200"
          r="16"
          fill={colors.borderPrimary}
          opacity="0.4"
        />
        <circle
          cx="916"
          cy="200"
          r="16"
          fill={colors.borderPrimary}
          opacity="0.4"
        />
        <path
          d="M 860 185 L 892 185 M 876 165 L 876 195"
          stroke={colors.brandPrimary}
          strokeWidth="1.5"
          opacity="0.6"
        />
      </g>
      <text
        x="220"
        y="315"
        fill={colors.textSecondary}
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        Answer a few questions
      </text>
      <text
        x="498"
        y="315"
        fill={colors.textSecondary}
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        Get your Ory stack
      </text>
      <text
        x="816"
        y="315"
        fill={colors.textSecondary}
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        See your architecture
      </text>
    </svg>
  )
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

  const isResults = currentStep === STEPS.length
  const questionIndex = currentStep
  const currentQuestion =
    questionIndex >= 0 && questionIndex < STEPS.length
      ? STEPS[questionIndex]
      : null

  const isOnFirstQuestion = currentStep === 0
  const showIntroDiagram =
    isOnFirstQuestion && answers[STEPS[0].id] === undefined

  const handleAnswer = (stepId: string, value: "yes" | "no") => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
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
  const canProceed = isResults || currentAnswer !== undefined

  return (
    <div>
      <div className="flex flex-col gap-ory-4 mb-ory-8 relative">
        <StepBadge step={2} />
        <h3 className="ory-heading-3 max-w-[800px]">Pick your Ory products</h3>
        <p className="ory-body max-w-[800px]">
          Answer a few questions about your IAM requirements, and we'll
          recommend the right products for your solution.
        </p>
      </div>

      <div className="bg-ory-bg-primary border border-ory-border-primary flex flex-col overflow-hidden rounded-ory">
        {/* Architecture diagram or intro graphic */}
        <div className="p-ory-4 relative bg-ory-bg-primary">
          <div
            className="relative w-full overflow-hidden rounded-ory bg-ory-bg-secondary"
            style={{
              aspectRatio: "1008 / 400",
              ...(showIntroDiagram && {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }),
            }}
          >
            {showIntroDiagram ? (
              <IntroGraphic colors={colors} />
            ) : (
              <>
                <style>{`
                  .solution-design-diagram-fill { display: flex; flex-direction: column; }
                  .solution-design-diagram-fill > *:first-child { flex: 1; min-height: 0; display: flex; }
                  .solution-design-diagram-fill svg { width: 100%; height: 100%; object-fit: contain; }
                `}</style>
                <div
                  className="solution-design-diagram-fill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Mermaid
                    key={selectedProducts.slice().sort().join(",")}
                    // @ts-expect-error Mermaid theme component uses chart prop (untyped JS)
                    chart={generateMermaidChart(selectedProducts)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content area */}
        <div className="border-t border-ory-border-primary p-ory-6 flex flex-col gap-ory-6 min-h-[192px]">
          {currentQuestion && !isResults && (
            <>
              <div className="flex justify-center">
                <span className="ory-body-sm text-ory-text-tertiary whitespace-nowrap leading-none">
                  Step {currentStep + 1} of {STEPS.length}
                </span>
              </div>
              <div className="flex justify-between gap-ory-6 w-full flex-wrap">
                <div className="flex-[1_1_280px] min-w-0">
                  <p className="ory-body-sm font-medium text-ory-text-primary pb-ory-3 m-0">
                    {currentQuestion.question}
                  </p>
                </div>
                <div className="flex-[1_1_200px] min-w-0">
                  <div className="flex flex-col gap-ory-3">
                    {currentQuestion.options.map((option) => {
                      const selected = currentAnswer === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleAnswer(currentQuestion.id, option.value)
                          }
                          className={`w-full flex items-center cursor-pointer text-left bg-ory-bg-primary border rounded-ory-btn py-ory-2 px-ory-4 ory-body-sm text-ory-text-primary ${selected ? "border-ory-border-brand-tertiary" : "border-ory-border-primary"}`}
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
            <div className="flex flex-col gap-ory-6">
              <p className="ory-body font-medium text-ory-text-primary m-0">
                Based on your answers, here's the Ory stack that matches your
                IAM requirements:
              </p>
              {selectedProducts.length > 0 ? (
                <ul className="m-0 pl-ory-6 flex flex-col gap-ory-2 list-disc">
                  {RESULTS_ORDER.filter((k) =>
                    selectedProducts.includes(k),
                  ).map((key) => {
                    const p = PRODUCT_LABELS[key]
                    return (
                      <li
                        key={key}
                        className="ory-body text-ory-text-secondary"
                      >
                        <Link
                          to={p.to}
                          className="text-ory-text-primary font-medium no-underline"
                        >
                          {p.label}
                        </Link>
                        {" — "}
                        {p.description}
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="ory-body text-ory-text-secondary m-0">
                  Based on your answers, you may not need additional Ory
                  products for your current use case. You can still explore our{" "}
                  <Link to="/getting-started/overview">quickstarts</Link> or{" "}
                  <a
                    href="https://www.ory.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ory-brand-primary underline"
                  >
                    contact sales
                  </a>{" "}
                  for guidance.
                </p>
              )}
              <div className="flex flex-col gap-ory-3" />
            </div>
          )}
        </div>

        {/* Footer navigation */}
        <div className="bg-ory-bg-secondary border-t border-ory-border-primary p-ory-4 flex justify-between items-center flex-wrap gap-ory-3">
          <span className="ory-body-sm text-ory-text-tertiary leading-none">
            {currentQuestion && !isResults && "Select an option to continue"}
            {isResults && "Start over to try different answers"}
          </span>
          <div className="flex gap-ory-2">
            {!isOnFirstQuestion && (
              <button
                type="button"
                onClick={handleBack}
                className="ory-btn-secondary"
              >
                {isResults ? "Start over" : "Back"}
              </button>
            )}
            {!isResults && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                className="ory-btn-primary disabled:bg-ory-bg-tertiary disabled:cursor-not-allowed"
              >
                {currentStep === STEPS.length - 1 ? "See results" : "Continue"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
