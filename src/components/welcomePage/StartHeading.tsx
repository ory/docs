import React from "react"
import Head from "@docusaurus/Head"
import useBaseUrl from "@docusaurus/useBaseUrl"
import OryHeroDemo from "../OryHeroDemo"

export function StartHeading() {
  const backgroundPattern = useBaseUrl("/img/home-bg-grid.svg")

  return (
    <section
      className="pt-ory-16 pb-0 bg-ory-bg-secondary relative overflow-hidden"
    >
      <Head>
        <link
          rel="preload"
          as="image"
          href={backgroundPattern}
          fetchPriority="high"
        />
      </Head>
      {/* Vector grid background (filtered for dark mode) */}
      <div
        aria-hidden
        className="ory-home-hero-grid"
        style={{ backgroundImage: `url(${backgroundPattern})` }}
      />

      <div className="relative z-10 max-w-[1024px] mx-auto w-full px-4 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:items-center gap-ory-6 mb-ory-6">
          <div className="min-w-0 flex flex-col gap-ory-6 xl:flex-1">
            <h1 className="ory-heading-1 text-[40px] leading-none lg:text-[48px]">
              Welcome to the Ory Developer Portal
            </h1>
            <p className="ory-body">
              Ory gives you authentication, authorization, and user management
              APIs designed for modern applications.
              <br />
              <br />
              Start fast, scale to millions, and keep security best practices
              baked{"\u00A0"}in.
            </p>
          </div>
          <div className="min-w-0 w-full xl:flex-1 xl:max-w-[456px] xl:ml-auto">
            <OryHeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
