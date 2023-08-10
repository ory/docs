import React from "react"
import "./ory-network-cta.css"

const ctaVariants = [
  {
    title: "Ory Network",
    content: (
      <>
        The most flexible and scalable way to manage identi&shy;ties,
        authen&shy;tication, autho&shy;rization and access control.
      </>
    ),
    cta: "Explore Ory Network",
    href: "https://www.ory.sh/network/?mtm_campaign=Docs-SideCta&mtm_kwd=variant-0",
  },
]

export const OryNetworkCta = () => {
  const { cta, content, title, href } = ctaVariants[0]

  return (
    <a href={href} target="_blank" className="ory-network-cta">
      <div className="ory-network-cta__background">
        <div className="ory-network-cta__grid"></div>
        <div className="ory-network-cta__gradient"></div>
      </div>
      <div className="ory-network-cta__content">
        <div className="ory-network-cta__title-and-paragraph">
          <em className="ory-network-cta__title">{title}</em>
          <p className="ory-network-cta__paragraph">
            {content}
            <span className="ory-network-cta__inline-get-started">
              {cta} <span aria-hidden>-‍&gt;</span>
            </span>
          </p>
        </div>
        <div className="ory-network-cta__button">
          {cta} <span aria-hidden>-‍&gt;</span>
        </div>
      </div>
    </a>
  )
}
