import React, { useState } from "react"
import "./KapaWidget.css"

export default function KapaWidget() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  const loadKapaWidget = () => {
    if (isScriptLoaded) {
      return
    }

    const script = document.createElement("script")
    script.src = "https://widget.kapa.ai/kapa-widget.bundle.js"
    script.async = true
    script.setAttribute(
      "data-website-id",
      "e89e7663-df2c-4c7f-974a-1bf8accdd615",
    )
    script.setAttribute("data-project-name", "Ory")
    script.setAttribute("data-project-color", "#083344")
    script.setAttribute(
      "data-modal-disclaimer",
      "By utilizing this chatbot, you consent to the collection and transmission of data to kapa.ai, which may include your IP address. Please be advised that your privacy and data protection are of utmost importance to us. We assure you that any data collected will be handled in compliance with applicable laws and regulations. For further details on how your data is processed and used, we encourage you to review our Privacy Policy. If you do not agree with these terms, we kindly request that you refrain from using this chatbot.",
    )
    script.setAttribute("data-modal-title", "Ory AI Copilot")
    script.setAttribute("data-button-text", "Ask AI")
    script.setAttribute("data-button-bg-color", "#083344")
    script.setAttribute("data-project-logo", "/docs/img/kapa-logo.png")
    script.setAttribute("data-consent-required", "true")
    script.setAttribute("data-button-hide", "true")
    script.setAttribute("data-modal-override-open-id", "kapa-ai-button")
    script.setAttribute("data-modal-open-by-default", "true")
    script.onload = () => setIsScriptLoaded(true)
    document.body.appendChild(script)
  }

  return (
    <button
      id="kapa-ai-button"
      className="mantine-UnstyledButton-root mantine-Button-root mantine-124rx6h"
      type="button"
      data-button="true"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        height: "5rem",
        width: "4.5rem",
        padding: "0px",
        backgroundColor: "rgb(26, 35, 126)",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 10px",
        zIndex: 199,
      }}
      onClick={loadKapaWidget}
    >
      <div className="mantine-1wpc1xj mantine-Button-inner">
        <span className="mantine-1ryt1ht mantine-Button-label">
          <div
            className="mantine-Stack-root mantine-1b4vo4u"
            style={{ marginTop: "4px" }}
          >
            <div
              className="mantine-Image-root mantine-yxmaw9"
              style={{ width: "2rem" }}
            >
              <figure className="mantine-qenwvq mantine-Image-figure">
                <div className="mantine-1iugybl mantine-Image-imageWrapper">
                  <img
                    src="/docs/img/kapa-logo.png"
                    alt="Project Logo"
                    className="mantine-1sc70ew mantine-Image-image"
                    style={{
                      objectFit: "cover",
                      width: "2rem",
                      height: "2rem",
                    }}
                  />
                </div>
              </figure>
            </div>
            <div
              className="mantine-Text-root mantine-1y9jqg9"
              style={{ textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px" }}
            >
              Ask AI
            </div>
          </div>
        </span>
      </div>
    </button>
  )
}
