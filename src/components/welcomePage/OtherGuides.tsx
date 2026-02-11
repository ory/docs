import React from "react"
import { OverviewCard } from "./OverviewCard"
import { colors, spacing, typography } from "./tokens"

export function OtherGuides() {
  const guides = [
    {
      label: "Ory ecosystem & architecture",
      to: "/products/products-overview",
      description: "Understand the core building blocks and architecture.",
    },
    {
      label: "Install from green-field",
      to: "/solutions/solutions-overview",
      description:
        "Replace your home-grown IAM solution with Ory, fully or partially.",
    },
    {
      label: "Migrate to Ory",
      to: "/migrate-to-ory/migrate",
      description: "Plan your migration to Ory.",
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
            display: "flex",
            flexDirection: "column",
            gap: spacing.size1_5,
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
            Start building with Ory
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
            Starting fresh or migrating? Find your path to production.
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
            display: "flex",
            flexDirection: "row",
            gap: spacing.size4,
            flexWrap: "wrap",
          }}
        >
          {guides.map((guide) => (
            <div
              key={guide.label}
              style={{ flex: "1 1 0", minWidth: "280px" }}
            >
              <OverviewCard
                title={guide.label}
                description={guide.description}
                to={guide.to}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
