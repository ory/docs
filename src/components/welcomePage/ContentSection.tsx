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
      to: "https://console.ory.sh/registration?flow=e27eca2b-ca8a-4722-8a4e-9c52a20aa0d4",
      description:
        "Sign up to Ory Network's central console to set up projects, manage users, and configure authentication and authorization flows. Monitor, manage, and develop — all in one place.",
    },
    {
      label: "Ory Account Experience",
      to: "/account-experience",
      description:
        "Learn about Ory Network's default UI for self-service registration, login, verification, recovery, and account settings flows. A polished authentication experience out-of-the-box — no frontend work required.",
    },
    {
      label: "Ory Elements",
      to: "/elements",
      description:
        "Learn how to use Ory's pre-built, customizable UI components to build your own self-service registration, login, recovery, and account settings flows.",
    },
    {
      label: "Ory Actions",
      to: "/kratos/hooks/configure-hooks",
      description:
        "Learn how to add custom business logic to authentication and authorization flows. Automate event-driven, and integrate third-party services like HubSpot, Google Analytics, and Stripe.",
    },
    {
      label: "Operations",
      to: "/category/operations-reference",
      description: "Learn how to operate and maintain Ory in production.",
    },
    {
      label: "Status and SLA",
      to: "https://status.ory.com/",
      description: "Check operational status and uptime for Ory's services.",
    },
        {
      label: "Changelog",
      to: "https://changelog.ory.com/?",
      description: "Track changes and updates to Ory products and components.",
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
              maxWidth: "800px",
            }}
          >
            Explore Ory's supporting components and resources
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
            Learn about the components and resources that complement Ory's core products.
          </p>
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
