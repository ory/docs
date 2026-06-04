import React from "react"
import Link from "@docusaurus/Link"

export function HowToUseSection() {
  const guides = [
    {
      title: "Explore by product",
      description: "Go directly to product specific information.",
      link: { label: "Products", to: "/products/products-overview" },
    },
    {
      title: "Explore by solution",
      description: "Go directly to solution specific information.",
      link: { label: "Solutions", to: "/solutions/solutions-overview" },
    },
    {
      title: "Start from an example",
      description:
        "Check the Quickstarts to find the framework and language you want to use.",
      link: { label: "Quickstarts", to: "/getting-started/overview" },
    },
    {
      title: "Find an API reference",
      description: "Go directly to the REST API, SDKs, or CLI references.",
      link: { label: "API reference", to: "/reference/reference-overview" },
    },
  ]

  return (
    <section className="pt-ory-16 pb-ory-16 bg-ory-bg-primary">
      <div className="max-w-[1024px] mx-auto px-6 w-full">
        <div className="flex flex-col gap-ory-4 mb-ory-12">
          <h2 className="ory-heading-2 ory-section-heading max-w-[800px]">
            How to use the Ory Developer Portal
          </h2>
          <p className="ory-body max-w-[800px]">
            Not sure where to start? Follow our guided paths—structured journeys
            that walk you through Ory's products and solutions so you can learn
            and build faster.
          </p>
        </div>

        <div
          className="w-full h-px bg-ory-border-primary mb-ory-12"
          aria-hidden
        />

        <div className="flex gap-ory-6 bg-ory-bg-primary">
          {guides.map((guide, index) => (
            <div key={index} className="ory-guide-card">
              <p className="ory-guide-card__title">{guide.title}</p>
              <p className="ory-guide-card__description">{guide.description}</p>
              <Link to={guide.link.to} className="ory-guide-card__link">
                {guide.link.label}
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
