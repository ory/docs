import React from "react"
import { StepBadge } from "./StepBadge"
import { SolutionDesignStepper } from "./SolutionDesignStepper"
import { SelectFrameworkSection } from "./SelectFrameworkSection"
import { OverviewCard } from "./OverviewCard"

export function DeploymentAndFrameworkSection() {
  const cards = [
    {
      label: "Ory Network",
      description:
        "Fully managed, multi-regional cloud platform for identity management, authentication, and authorization. Ory handles infrastructure, scaling, and updates — you focus on your app.",
      to: "/network/getting-started",
      tags: [],
    },
    {
      label: "Ory Enterprise License",
      description:
        "Deploy and operate the Ory ecosystem on your own infrastructure while retaining full control over your data and environment. Includes enterprise production support.",
      to: "/oel/getting-started",
      tags: [],
    },
    {
      label: "Ory Open Source",
      description:
        "Community-driven, open-source identity management, authentication, and authorization. Deploy on your own infrastructure with complete access to the codebase.",
      to: "/oss/getting-started",
      tags: [],
    },
  ]

  return (
    <section className="pt-ory-16 pb-ory-12 bg-ory-bg-primary border-t border-b border-ory-border-primary">
      <div className="max-w-[1024px] mx-auto px-6 w-full">
        <div className="flex flex-col gap-ory-8">
          <h2 className="ory-heading-2 max-w-[800px]">
            How to design your Ory solution
          </h2>
          <p className="ory-body max-w-[800px]">
            Every Ory implementation starts with these decisions—how to
            deploy, which products to use, and what framework or language to
            build with. Start here to find the right combination for your use
            case.
          </p>
          <div className="border-l border-ory-border-primary pl-ory-8 pb-ory-16 flex flex-col gap-ory-8">
            <div>
              <div className="flex flex-col gap-ory-4 mb-ory-8 relative">
                <StepBadge step={1} />
                <h3 className="ory-heading-3 text-xl max-w-[800px]">
                  Choose your deployment option
                </h3>
                <p className="ory-body max-w-[800px]">
                  Choose the deployment option that fits your organization and
                  build secure IAM into your apps. You can switch later—the
                  core concepts stay the same.
                </p>
              </div>

              <div className="flex gap-ory-4">
                {cards.map((card) => (
                  <div key={card.label} className="flex-1 min-w-0">
                    <OverviewCard
                      title={card.label}
                      description={card.description}
                      to={card.to}
                      linkLabel="Learn more"
                      tags={card.tags}
                    />
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
