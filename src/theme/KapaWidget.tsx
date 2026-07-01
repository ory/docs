import React, { useEffect, useState } from "react"
import { useLocation } from "@docusaurus/router"

const EXCLUDED_PATHS = ["/docs/kratos/fallback/error"]

let scriptInjected = false

// Kapa's official preinit stub: makes window.Kapa a queue before the bundle
// loads, so calls made early (e.g. a fast Enter press) are queued and run
// once initialization completes.
function preinitKapa() {
  if (typeof window === "undefined") return
  const w = window as any
  if (!w.Kapa) {
    const i: any = function () {
      i.c(arguments)
    }
    i.q = []
    i.c = function (args: any) {
      i.q.push(args)
    }
    w.Kapa = i
  }
}

function injectKapaScript() {
  if (typeof window === "undefined" || scriptInjected) return
  scriptInjected = true
  preinitKapa()

  const script = document.createElement("script")
  script.src = "https://widget.kapa.ai/kapa-widget.bundle.js"
  script.async = true
  script.setAttribute("data-website-id", "e89e7663-df2c-4c7f-974a-1bf8accdd615")
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
  // Removed: data-modal-open-by-default and data-modal-override-open-class.
  // We now open the widget programmatically via window.Kapa("open", ...).
  script.setAttribute("data-mcp-enabled", "true")
  script.setAttribute("data-mcp-server-url", "https://ory-docs.mcp.kapa.ai")
  script.setAttribute("data-bot-protection-mechanism", "hcaptcha")
  document.body.appendChild(script)
}

// opts omitted -> open empty; { query, submit: true } -> open mid-generation.
function openKapa(opts?: { query: string; submit?: boolean }) {
  if (typeof window === "undefined") return
  preinitKapa()
  injectKapaScript()
  ;(window as any).Kapa("open", opts)
}

type KapaWidgetProps = {
  placement?: "floating" | "inline"
}

export default function KapaWidget({
  placement = "floating",
}: KapaWidgetProps) {
  const { pathname } = useLocation()
  const isExcluded = EXCLUDED_PATHS.includes(pathname)
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (isExcluded && typeof window !== "undefined" && (window as any).Kapa) {
      ;(window as any).Kapa("unmount")
    }
  }, [isExcluded])

  if (isExcluded) {
    return null
  }

  const PURPLE = "rgb(26, 35, 126)"

  // ---- Inline ask bar: type a question, press Enter, opens mid-answer ----
  if (placement === "inline") {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const q = query.trim()
      if (!q) return
      openKapa({ query: q, submit: true })
      setQuery("")
    }

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          width: "100%",
          margin: "1.5rem auto 0",
          padding: "0.75rem 1rem",
          backgroundColor: "var(--ifm-background-color)",
          border: `2px solid ${PURPLE}`,
          borderRadius: "0.5rem",
        }}
      >
        <img
          src="/docs/img/kapa-logo.png"
          alt=""
          style={{
            width: "1.5rem",
            height: "1.5rem",
            objectFit: "cover",
            borderRadius: "0.25rem",
            flexShrink: 0,
          }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={injectKapaScript} // preload the bundle on intent
          placeholder="Ask AI anything..."
          aria-label="Ask AI anything"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            color: "var(--ifm-font-color-base)",
            fontSize: "1rem",
          }}
        />
      </form>
    )
  }

  // ---- Floating button: opens the empty assistant ----
  return (
    <button
      id="kapa-ai-button"
      type="button"
      aria-label="Ask AI"
      onClick={() => openKapa()}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        height: "5rem",
        width: "4.5rem",
        padding: 0,
        backgroundColor: PURPLE,
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
    >
      <img
        src="/docs/img/kapa-logo.png"
        alt=""
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
