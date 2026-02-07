import React from "react"
import Link from "@docusaurus/Link"
import { colors, spacing, typography } from "./tokens"
import styles from "@site/src/pages/welcome.module.css"

export function HowToUseSection() {
  const guides = [
    {
      title: "Want to learn more about a specific product suite?",
      description: "Go directly to product specific information.",
      link: { label: "Products", to: "/products/products-overview" },
    },
    {
      title: "Want to learn more about a specific solution?",
      description: "Go directly to solution specific information.",
      link: { label: "Solutions", to: "/solutions/solutions-overview" },
    },
    {
      title: "Start coding with an example",
      description:
        "Take a look in the Quickstarts to find the framework and language you want to use.",
      link: { label: "Quickstarts", to: "/getting-started/overview" },
    },
    {
      title: "Find the right API to use",
      description: "Go directly to the REST API, SDKs, or CLI references.",
      link: { label: "API reference", to: "/reference/reference-overview" },
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
      <div className={styles.container1024}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.size4,
            marginBottom: spacing.size12,
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

        {/* Horizontal separator */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: colors.borderPrimary,
            marginBottom: spacing.size12,
          }}
        />

        <div
          style={{
            display: "flex",
            gap: spacing.size6,
            background: colors.backgroundPrimary,
          }}
        >
          {guides.map((guide, index) => (
            <div
              key={index}
              style={{
                flex: "1 0 0",
                display: "flex",
                flexDirection: "column",
                gap: spacing.size4,
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
              <Link
                to={guide.link.to}
                style={{
                  display: "inline-flex",
                  gap: spacing.size1,
                  alignItems: "center",
                  textDecoration: "none",
                  color: colors.brandPrimary,
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeSm,
                  fontWeight: typography.fontWeightNormal,
                  lineHeight: typography.lineHeightNormal,
                  marginTop: "auto",
                }}
              >
                {guide.link.label}
                <span
                  style={{
                    display: "inline-block",
                    color: colors.brandPrimary,
                  }}
                >
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
