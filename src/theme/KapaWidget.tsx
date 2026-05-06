import React, { useState } from "react"

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
    script.setAttribute("data-project-color", "#1A237E")
    script.setAttribute(
      "data-modal-disclaimer",
      "By utilizing this chatbot, you consent to the collection and transmission of data to kapa.ai, which may include your IP address. Please be advised that your privacy and data protection are of utmost importance to us. We assure you that any data collected will be handled in compliance with applicable laws and regulations. For further details on how your data is processed and used, we encourage you to review our Privacy Policy. If you do not agree with these terms, we kindly request that you refrain from using this chatbot.",
    )
    script.setAttribute("data-modal-title", "Ory AI Copilot")
    script.setAttribute("data-button-text", "Ask AI")
    script.setAttribute("data-project-logo", "/docs/img/kapa-logo.png")
    script.setAttribute("data-consent-required", "true")
    script.setAttribute("data-button-hide", "true")
    script.setAttribute("data-modal-override-open-id", "kapa-ai-button")
    script.setAttribute("data-modal-open-by-default", "true")
    script.setAttribute("data-mcp-enabled", "true")
    script.setAttribute("data-mcp-server-url", "https://ory-docs.mcp.kapa.ai")
    script.onload = () => setIsScriptLoaded(true)
    document.body.appendChild(script)
  }

  return (
    <button
      id="kapa-ai-button"
      type="button"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        height: "5rem",
        width: "4.5rem",
        padding: 0,
        backgroundColor: "rgb(26, 35, 126)",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 10px",
        zIndex: 199,
        border: "none",
        borderRadius: "0.25rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
      }}
      onClick={loadKapaWidget}
    >
      <img
        src="/docs/img/kapa-logo.png"
        alt="Ask AI"
        style={{
          width: "2rem",
          height: "2rem",
          objectFit: "cover",
          borderRadius: "0.25rem",
        }}
      />
      <span
        style={{
          color: "white",
          fontSize: "1.125rem",
          fontWeight: 600,
          textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px",
        }}
      >
        Ask AI
      </span>
    </button>
  )
}
