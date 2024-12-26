const script = document.createElement("script")
script.src = "https://widget.kapa.ai/kapa-widget.bundle.js"
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
script.defer = true

addEventListener("DOMContentLoaded", (event) => {
  setTimeout(() => document.head.appendChild(script), 500)
})
