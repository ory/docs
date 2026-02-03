import React, { useState } from "react"
import Link from "@docusaurus/Link"
import IconTerminal from "@site/src/static/img/icons/terminal.svg"
import IconTypescript from "@site/src/static/img/icons/typescript.svg"
import IconNextjs from "@site/src/static/img/icons/nextjs.svg"
import IconVue from "@site/src/static/img/icons/vue.svg"
import IconGo from "@site/src/static/img/icons/go.svg"
import IconCopy from "@site/src/static/img/icons/copy.svg"
import { StepBadge } from "./StepBadge"
import { SolutionDesignStepper } from "./SolutionDesignStepper"
import { colors, radius, spacing, typography } from "./tokens"

export function DeploymentAndFrameworkSection() {
  type FrameworkValue = "typescript" | "nextjs" | "vue" | "go"
  const [selectedFramework, setSelectedFramework] =
    useState<FrameworkValue>("nextjs")

  const cards = [
    {
      label: "Ory Network",
      description:
        "Managed identity, OAuth2/OIDC, and permissions. Best choice for new projects.",
      to: "/network/getting-started",
      tags: ["Cloud", "Multi-region", "Production ready"],
    },
    {
      label: "Ory Enterprise License",
      description:
        "Self-host Ory with enterprise support, SLAs, and advanced compliance options.",
      to: "/oel/getting-started",
      tags: ["Self-hosted", "Enterprise"],
    },
    {
      label: "Open Source",
      description:
        "Use the individual Ory projects directly and run everything yourself.",
      to: "/oss/getting-started",
      tags: ["Open Source", "Multi-region"],
    },
  ]

  const langs: Array<{
    value: FrameworkValue
    label: string
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    snippet: string
  }> = [
    {
      value: "typescript",
      label: "Typescript",
      Icon: IconTypescript as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >,
      snippet: `npm install @ory/elements-react @ory/nextjs`,
    },
    {
      value: "nextjs",
      label: "Next.js",
      Icon: IconNextjs as React.ComponentType<React.SVGProps<SVGSVGElement>>,
      snippet: `npm install @ory/elements-react @ory/nextjs`,
    },
    {
      value: "vue",
      label: "Vue",
      Icon: IconVue as React.ComponentType<React.SVGProps<SVGSVGElement>>,
      snippet: `npm install @ory/elements-react @ory/nextjs`,
    },
    {
      value: "go",
      label: "Go",
      Icon: IconGo as React.ComponentType<React.SVGProps<SVGSVGElement>>,
      snippet: `npm install @ory/elements-react @ory/nextjs`,
    },
  ]

  const selectedLang =
    langs.find((l) => l.value === selectedFramework) ?? langs[1]
  const selectedSnippet = selectedLang.snippet
  const snippetPrefix = selectedSnippet.startsWith("npm install ")
    ? "npm install "
    : ""
  const snippetRest = snippetPrefix
    ? selectedSnippet.slice(snippetPrefix.length)
    : selectedSnippet

  return (
    <section
      style={{
        paddingTop: spacing.size16,
        paddingBottom: spacing.size16,
        background: colors.backgroundPrimary,
        borderTop: `1px solid ${colors.borderPrimary}`,
        borderBottom: `1px solid ${colors.borderPrimary}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: `0 ${spacing.size2}`,
        }}
      >
        <div
          style={{
            flex: "1 0 0",
            maxWidth: "1056px",
            display: "flex",
            flexDirection: "column",
            gap: spacing.size8,
            borderLeft: `1px solid ${colors.borderPrimary}`,
            paddingLeft: spacing.size8,
            paddingBottom: spacing.size16,
          }}
        >
          {/* Choose a deployment option */}
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
              <StepBadge step={1} />
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
                Choose a deployment option
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
                Choose the deployment option that fits your organization and
                build secure IAM into your apps. You can switch later — the core
                concepts stay the same.
              </p>
            </div>

            <div style={{ display: "flex", gap: spacing.size4 }}>
              {cards.map((card) => (
                <div
                  key={card.label}
                  style={{
                    flex: "1 0 0",
                    background: colors.backgroundPrimary,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: spacing.size8,
                      padding: spacing.size4,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: spacing.size2,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: typography.fontFamily,
                          fontSize: typography.fontSizeSm,
                          fontWeight: "600",
                          lineHeight: typography.lineHeightNormal,
                          color: colors.textPrimary,
                          margin: 0,
                        }}
                      >
                        {card.label}
                      </h3>
                      <p
                        style={{
                          fontFamily: typography.fontFamily,
                          fontSize: typography.fontSizeSm,
                          fontWeight: typography.fontWeightNormal,
                          lineHeight: typography.lineHeightNormal,
                          color: colors.textSecondary,
                          margin: 0,
                        }}
                      >
                        {card.description}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: spacing.size2,
                        flexWrap: "wrap",
                      }}
                    >
                      {card.tags.map((tag) => {
                        const isCloud = tag === "Cloud"
                        const isEnterprise = tag === "Enterprise"
                        return (
                          <span
                            key={tag}
                            style={{
                              background:
                                isCloud || isEnterprise
                                  ? "#c7c8fe"
                                  : colors.backgroundTertiary,
                              padding: `${spacing.size0_5} ${spacing.size2}`,
                              borderRadius: radius.badge,
                              fontFamily: typography.fontFamily,
                              fontSize: typography.fontSizeXs,
                              fontWeight: typography.fontWeightNormal,
                              lineHeight: typography.lineHeightNormal,
                              color:
                                isCloud || isEnterprise
                                  ? "#3032a3"
                                  : colors.textSecondary,
                            }}
                          >
                            {tag}
                          </span>
                        )
                      })}
                    </div>
                    <Link
                      to={card.to}
                      style={{
                        display: "flex",
                        gap: spacing.size1,
                        alignItems: "center",
                        textDecoration: "none",
                        color: colors.brandPrimary,
                        fontFamily: typography.fontFamily,
                        fontSize: typography.fontSizeSm,
                        fontWeight: typography.fontWeightNormal,
                        lineHeight: typography.lineHeightNormal,
                      }}
                    >
                      Learn more
                      <span
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          color: colors.brandPrimary,
                        }}
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SolutionDesignStepper />


          {/* Select your framework or language */}
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
              <StepBadge step={3} />
              <h2
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeLg,
                  fontWeight: typography.fontWeightMedium,
                  lineHeight: typography.lineHeightTight,
                  color: colors.textPrimary,
                  margin: 0,
                  maxWidth: "672px",
                }}
              >
                Select your framework or language
              </h2>
              <p
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeSm,
                  fontWeight: typography.fontWeightNormal,
                  lineHeight: typography.lineHeightNormal,
                  color: colors.textSecondary,
                  margin: 0,
                  maxWidth: "672px",
                }}
              >
                Drop Ory into an existing app. Pick your stack and follow the
                step-by-step integration guides.
              </p>
            </div>

            <div
              style={{
                background: colors.backgroundSecondaryHover,
                border: `1px solid ${colors.borderPrimary}`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: colors.backgroundSecondary,
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.size1,
                  padding: `${spacing.size2} ${spacing.size4}`,
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconTerminal style={{ width: "16px", height: "16px" }} />
                </div>

                <div
                  style={{ display: "flex", gap: spacing.size1, flex: "1 0 0" }}
                >
                  {langs.map((lang) => {
                    const active = lang.value === selectedFramework
                    const LangIcon = lang.Icon
                    const iconStroke = active
                      ? colors.brandOnTertiary
                      : colors.textPrimary
                    return (
                      <button
                        key={lang.value}
                        type="button"
                        onClick={() => setSelectedFramework(lang.value)}
                        style={{
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          gap: spacing.size0_5,
                          padding: `0 ${spacing.size2_5}`,
                          borderRadius: radius.buttons,
                          background: active
                            ? colors.backgroundBrandTertiary
                            : "transparent",
                          border: active
                            ? `1px solid ${colors.borderBrandTertiary}`
                            : "1px solid transparent",
                          cursor: "pointer",
                        }}
                      >
                        <LangIcon
                          style={
                            {
                              width: "16px",
                              height: "16px",
                              flexShrink: 0,
                              ["--stroke-0"]: iconStroke,
                            } as React.CSSProperties
                          }
                        />
                        <span
                          style={{
                            fontFamily: typography.fontFamily,
                            fontSize: typography.fontSizeSm,
                            fontWeight: typography.fontWeightNormal,
                            lineHeight: "1",
                            color: active
                              ? colors.brandOnTertiary
                              : colors.textPrimary,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {lang.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  aria-label="Copy"
                  onClick={() => navigator.clipboard.writeText(selectedSnippet)}
                  style={{
                    width: "32px",
                    height: "28px",
                    background: "transparent",
                    border: "1px solid transparent",
                    borderRadius: radius.buttons,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <IconCopy style={{ width: "16px", height: "16px" }} />
                </button>
              </div>

              <div
                className="code-sample-body"
                style={{
                  background: "#ffffff",
                  border: `1px solid ${colors.borderPrimary}`,
                  padding: spacing.size6,
                  fontFamily: typography.fontFamilyMono,
                  fontSize: typography.fontSizeSm,
                  display: "flex",
                  gap: spacing.size6,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: colors.textTertiary,
                    lineHeight: "1.65",
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  1
                </span>
                <code
                  style={{
                    flex: "1 0 0",
                    color: colors.textPrimary,
                    lineHeight: "1.65",
                    whiteSpace: "pre-wrap",
                    fontFamily: typography.fontFamilyMono,
                  }}
                >
                  {snippetPrefix ? (
                    <>
                      <span style={{ color: colors.textPrimary }}>
                        {snippetPrefix}
                      </span>
                      <span style={{ color: colors.brandPrimary }}>
                        {snippetRest}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: colors.textPrimary }}>
                      {selectedSnippet}
                    </span>
                  )}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
