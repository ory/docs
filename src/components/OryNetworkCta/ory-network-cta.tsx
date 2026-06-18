import React from "react"
import networkImg from "@site/src/static/img/network-cta/network.png"

const toImgSrc = (m: string | { default?: string }): string =>
  typeof m === "string" ? m : (m as { default?: string }).default ?? ""

const CTA_CONFIG = {
  title: "Ory Network",
  description:
    "The largest Identity and Access Management network in the world. So you can get back to building your business.",
  ctaLabel: "Sign up for free",
  href: "https://console.ory.com/?mtm_campaign=Docs-SideCta&mtm_kwd=variant-0",
}

export const OryNetworkCta = () => {
  const { title, description, ctaLabel, href } = CTA_CONFIG
  const imageSrc = toImgSrc(networkImg)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ory-network-cta flex flex-shrink-0 flex-col rounded-lg bg-ory-bg-secondary border border-ory-border-primary p-3 shadow-sm no-underline transition-shadow hover:shadow-md xl:flex"
    >
      <img src={imageSrc} alt="" className="mb-3 w-full object-contain" />
      <div className="flex flex-col gap-1">
        <h3 className="ory-text-xs-normal m-0 text-ory-text-primary font-semibold">
          {title}
        </h3>
        <p className="ory-text-xs-normal m-0 text-ory-text-tertiary">
          {description}
        </p>
      </div>
      <span className="mt-2 inline-flex h-7 w-full items-center justify-center rounded-ory-btn bg-ory-border-brand-tertiary text-sm font-medium text-white">
        {ctaLabel}
      </span>
    </a>
  )
}
