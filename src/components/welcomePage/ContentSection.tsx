import React from "react"
import Link from "@docusaurus/Link"
import { colors, radius, spacing, typography } from "./tokens"

/**
 * Content section (placeholder – title and items will be adjusted later).
 * Layout from Figma: 2 rows × 3 cards.
 */
export function ContentSection() {
  const items = [
    {
      label: "Ory Console",
      to: "/docs",
      description:
        "User Interface to manage projects, configurations, and more.",
    },
    {
      label: "Ory Account Experience",
      to: "/docs",
      description:
        "User interface for all self-service screens like login, registration, or consent.",
    },
    {
      label: "Ory Elements",
      to: "/docs",
      description:
        "Pre-built UI components for login, registration, and account flows.",
    },
    {
      label: "Ory Actions",
      to: "/docs",
      description:
        "Define custom business logic, automating system behavior in response to events, and integrating with third-party services.",
    },
    {
      label: "Changelog",
      to: "/docs",
      description: "Plan your migration to Ory from an existing system.",
    },
    {
      label: "Status and SLA",
      to: "/docs",
      description: "Understand the core building blocks and architecture.",
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
      <div className="container" style={{ maxWidth: "1024px" }}>
        <div
          style={{
            marginBottom: spacing.size6,
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
            Content
          </h2>
          {/* Subtitle to be added when section is adjusted later */}
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: colors.borderPrimary,
            marginBottom: spacing.size6,
          }}
          aria-hidden
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: spacing.size4,
          }}
        >
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              style={{
                background: colors.backgroundSecondary,
                border: `1px solid ${colors.borderPrimary}`,
                borderRadius: radius.general,
                padding: spacing.size6,
                display: "flex",
                flexDirection: "column",
                gap: spacing.size2,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h3
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeBase,
                  fontWeight: typography.fontWeightMedium,
                  lineHeight: typography.lineHeightTight,
                  color: colors.textPrimary,
                  margin: 0,
                }}
              >
                {item.label}
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
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
