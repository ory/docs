import React from "react"
import { OverviewCard } from "./OverviewCard"

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
    <section className="pt-ory-16 pb-ory-16 bg-ory-bg-primary">
      <div className="max-w-[1024px] mx-auto px-6 w-full">
        <div className="mb-ory-6">
          <h2 className="ory-heading-2 max-w-[800px]">
            Explore Ory's supporting components and resources
          </h2>
          <p className="ory-body max-w-[800px]">
            Learn about the components and resources that complement Ory's core
            products.
          </p>
        </div>

        <div
          className="w-full h-px bg-ory-border-primary mb-ory-6"
          aria-hidden
        />

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-ory-4">
          {items.map((item) => (
            <OverviewCard
              key={item.label}
              title={item.label}
              description={item.description}
              to={item.to}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
