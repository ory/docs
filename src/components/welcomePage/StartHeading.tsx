import React from "react"
import useBaseUrl from "@docusaurus/useBaseUrl"
import OryHeroDemo from "@site/src/components/OryHeroDemo"

export function StartHeading() {
  const backgroundPattern = useBaseUrl("/img/home-bg-grid.svg")

  return (
    <section
      className="pt-ory-16 pb-0 bg-ory-bg-secondary"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: "100% auto",
        backgroundPosition: "top left",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-[1024px] mx-auto px-6 w-full">
        <div className="flex gap-ory-6 items-center mb-ory-6">
          <div className="flex-1 min-w-0 flex flex-col gap-ory-6">
            <h1 className="ory-heading-1">
              Welcome to the Ory Developer Portal{" "}
            </h1>
            <p className="ory-body">
              Ory gives you authentication, authorization, and user management
              APIs designed for modern applications.
              <br />
              <br />
              Start fast, scale to millions, and keep security best practices
              baked in.
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <OryHeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
