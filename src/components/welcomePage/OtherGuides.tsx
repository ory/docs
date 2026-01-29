import React from "react"
import Link from "@docusaurus/Link"
import { colors, radius, spacing, typography } from "./tokens"

export function OtherGuides() {
  const guides = [
    {
      label: "Installl from green-field",
      to: "/getting-started/overview",
      description: "What Ory Identities (Kratos) is and when to use it",
    },
    {
      label: "Migrate to Ory",
      to: "/kratos/self-service/flows/user-login-user-registration",
      description: "Day 1 essentials for browser-based authentication",
    },
    {
      label: "Ory Architecture",
      to: "/kratos/self-service/flows/user-login-user-registration",
      description: "What Ory Identities (Kratos) is and when to use it",
      tags: ["Ory / Kratos", "Tutorial"],
    },
  ]

  return (
    <section
      style={{
        paddingTop: spacing.size16,
        paddingBottom: spacing.size16,
        background: colors.backgroundSecondary,
      }}
    >
      <div className="container" style={{ maxWidth: "1024px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.size1_5,
            marginBottom: spacing.size12,
          }}
        >
          <h2
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.fontSizeXl,
              fontWeight: typography.fontWeightNormal,
              lineHeight: typography.lineHeightNormal,
              color: colors.textPrimary,
              margin: 0,
            }}
          >
            Other guides
          </h2>
          <p
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.fontSizeBase,
              fontWeight: typography.fontWeightNormal,
              lineHeight: typography.lineHeightNormal,
              color: colors.textSecondary,
              margin: 0,
              maxWidth: "680px",
            }}
          >
            Not sure where to start? Follow our guided paths—structured journeys
            that walk you through Ory's products and solutions so you can learn
            and build faster.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.size3,
          }}
        >
          <div style={{ display: "flex", gap: spacing.size3 }}>
            {guides.slice(0, 2).map((guide) => (
              <div
                key={guide.label}
                style={{
                  flex: "1 0 0",
                  background: colors.backgroundSecondary,
                  border: `1px solid ${colors.borderPrimary}`,
                  padding: spacing.size6,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "200px",
                }}
              >
                <div></div>
                <div>
                  <h3
                    style={{
                      fontFamily: typography.fontFamily,
                      fontSize: typography.fontSizeBase,
                      fontWeight: typography.fontWeightMedium,
                      lineHeight: "1",
                      color: colors.textPrimary,
                      margin: 0,
                      marginBottom: spacing.size1_5,
                    }}
                  >
                    <Link
                      to={guide.to}
                      style={{
                        color: colors.textPrimary,
                        textDecoration: "none",
                      }}
                    >
                      {guide.label}
                    </Link>
                  </h3>
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
                    {guide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: spacing.size3 }}>
            {guides.slice(2).map((guide) => (
              <div
                key={guide.label}
                style={{
                  flex: "1 0 0",
                  background: colors.backgroundSecondary,
                  border: `1px solid ${colors.borderPrimary}`,
                  padding: spacing.size6,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "200px",
                }}
              >
                <div></div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: spacing.size2,
                      alignItems: "center",
                      marginBottom: spacing.size1_5,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: typography.fontFamily,
                        fontSize: typography.fontSizeBase,
                        fontWeight: typography.fontWeightMedium,
                        lineHeight: "1",
                        color: colors.textPrimary,
                        margin: 0,
                      }}
                    >
                      <Link
                        to={guide.to}
                        style={{
                          color: colors.textPrimary,
                          textDecoration: "none",
                        }}
                      >
                        {guide.label}
                      </Link>
                    </h3>
                    {guide.tags?.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background:
                            tag === "Ory / Kratos"
                              ? "#fed7aa"
                              : colors.backgroundTertiary,
                          color:
                            tag === "Ory / Kratos"
                              ? "#7c2d12"
                              : colors.textSecondary,
                          padding: `${spacing.size0_5} ${spacing.size2}`,
                          borderRadius: radius.badge,
                          fontFamily: typography.fontFamily,
                          fontSize: typography.fontSizeXs,
                          fontWeight: typography.fontWeightNormal,
                          lineHeight: typography.lineHeightNormal,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
                    {guide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
