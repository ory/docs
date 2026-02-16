import React from "react"
import useBaseUrl from "@docusaurus/useBaseUrl"

// Resolve image via bundler so path works in dev and build (baseUrl: /docs/)
import networkImg from "@site/src/static/img/network-cta/network.png"

const CTA_CONFIG = {
  title: "Ory Network",
  description:
    "The largest Identity and Access Management network in the world. So you can get back to building your business.",
  ctaLabel: "Sign up for free",
  href: "https://console.ory.sh/?mtm_campaign=Docs-SideCta&mtm_kwd=variant-0",
}

export const OryNetworkCta = () => {
  const { title, description, ctaLabel, href } = CTA_CONFIG
  const imageSrc =
    typeof networkImg === "string"
      ? networkImg
      : (networkImg as { default?: string }).default ??
        useBaseUrl("/img/network-cta/network.png")

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ory-network-cta mt-4 flex flex-shrink-0 flex-col rounded-xl bg-white p-6 shadow-md no-underline transition-shadow hover:shadow-lg xl:flex"
    >
      <img src={imageSrc} alt="" className="mb-4 w-full object-contain" />
      <div className="flex flex-col gap-4">
        <h3 className="ory-text-sm-normal m-0 text-ory-text-primary">
          {title}
        </h3>
        <p className="ory-text-xs-normal m-0 text-ory-text-tertiary">
          {description}
        </p>
      </div>
      <span className="mt-6 inline-flex h-8 w-full items-center justify-center rounded-ory-btn bg-[#6366f1] font-medium text-[#eeeeff]">
        {ctaLabel}
      </span>
    </a>
  )
}
