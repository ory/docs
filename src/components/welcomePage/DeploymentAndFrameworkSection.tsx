import React from "react"
import Link from "@docusaurus/Link"
import { StepBadge } from "./StepBadge"
import { SolutionDesignStepper } from "./SolutionDesignStepper"
import { SelectFrameworkSection } from "./SelectFrameworkSection"
import { colors, radius, spacing, typography } from "./tokens"
import styles from "@site/src/pages/welcome.module.css"

export function DeploymentAndFrameworkSection() {
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
      <div className={styles.container1024}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.size8,
          }}
        >
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
            How to design your Ory solution
          </h2>
          <div
            style={{
              borderLeft: `1px solid ${colors.borderPrimary}`,
              paddingLeft: spacing.size8,
              paddingBottom: spacing.size16,
              display: "flex",
              flexDirection: "column",
              gap: spacing.size8,
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
                <h3
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.fontSizeLg,
                    fontWeight: typography.fontWeightMedium,
                    lineHeight: typography.lineHeightTight,
                    color: colors.textPrimary,
                    margin: 0,
                    maxWidth: "800px",
                  }}
                >
                  Choose your deployment option
                </h3>
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
                  build secure IAM into your apps. You can switch later — the
                  core concepts stay the same.
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

            <SelectFrameworkSection />
          </div>
        </div>
      </div>
    </section>
  )
}
