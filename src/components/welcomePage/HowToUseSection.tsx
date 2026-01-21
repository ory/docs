import React from "react"
import Link from "@docusaurus/Link"
import { colors, spacing, typography } from "./tokens"
import styles from "@site/src/pages/welcome.module.css"

export function HowToUseSection() {
  const guides = [
    {
      title: "Want to learn more about a specific product suite or solution?",
      description: "Go directly to product and solution specific information.",
      links: [
        { label: "Products", to: "/products/products-overview" },
        { label: "Solutions", to: "/solutions/solutions-overview" },
      ],
    },
    {
      title: "Want to start coding and need an example?",
      description: "Want to start coding and need an example?",
      links: [{ label: "Quickstarts", to: "/getting-started/overview" }],
    },
    {
      title: "Want to find the right API to use?",
      description: "Go directly to the REST API, SDKs, or CLI references.",
      links: [{ label: "Reference", to: "/reference/reference-overview" }],
    },
  ]

  return (
    <section
      style={{
        paddingTop: spacing.size16,
        paddingBottom: spacing.size16,
        background: colors.backgroundPrimary,
      }}
    >
      <div
        className={`container ${styles.container1024}`}
        style={{ padding: `0 ${spacing.size2}` }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.size4,
            marginBottom: spacing.size8,
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
            How to use the Ory Developer Portal
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
            Not sure where to start? Follow our guided paths—structured journeys
            that walk you through Ory's products and solutions so you can learn
            and build faster.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: spacing.size4,
            background: colors.backgroundPrimary,
          }}
        >
          {guides.map((guide, index) => (
            <div
              key={index}
              style={{
                flex: "1 0 0",
                background: colors.backgroundSecondary,
                padding: spacing.size4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  maxWidth: "240px",
                }}
              >
                <p
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.fontSizeSm,
                    fontWeight: "600",
                    lineHeight: typography.lineHeightNormal,
                    color: colors.textPrimary,
                    margin: 0,
                  }}
                >
                  {guide.title}
                </p>
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
                  {guide.description}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacing.size2,
                  paddingTop: spacing.size8,
                }}
              >
                {guide.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    to={link.to}
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
                    {link.label}
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
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

