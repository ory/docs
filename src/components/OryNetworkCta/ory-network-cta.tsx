import React from "react"
import "./ory-network-cta.css"

export const OryNetworkCta = () => (
  <a href="https://console.ory.sh/" target="_blank" className="ory-network-cta">
    <div className="ory-network-cta__background">
      <div className="ory-network-cta__grid"></div>
      <div className="ory-network-cta__gradient"></div>
    </div>
    <div className="ory-network-cta__content">
      <div className="ory-network-cta__title-and-paragraph">
        <em className="ory-network-cta__title">Are you a deve&shy;loper?</em>
        <p className="ory-network-cta__paragraph">
          Try out the Ory Network and get your proof of concept up and running
          in no time. You can run your test and integration systems.
          <span className="ory-network-cta__inline-get-started">
            Click to get started -‍&gt;
          </span>
        </p>
      </div>
      <div>
        <div className="ory-network-cta__button">Get started -‍&gt;</div>
      </div>
    </div>
  </a>
)
