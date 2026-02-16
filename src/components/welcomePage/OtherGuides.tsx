import React from "react"
import { OverviewCard } from "./OverviewCard"

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
    <section className="pt-ory-16 pb-ory-16 bg-ory-bg-primary">
      <div className="max-w-[1024px] mx-auto px-6 w-full">
        <div className="flex flex-col gap-2 mb-ory-6">
          <h2 className="ory-heading-2">Start building with Ory</h2>
          <p className="ory-body max-w-[680px]">
            Starting fresh or migrating? Find your path to production.
          </p>
        </div>

        <div
          className="w-full h-px bg-ory-border-primary mb-ory-6"
          aria-hidden
        />

        <div className="flex flex-row gap-ory-4 flex-wrap">
          {guides.map((guide) => (
            <div key={guide.label} className="flex-1 min-w-[280px]">
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
