import React, { useState, useEffect, useRef } from "react"

const OryHeroDemo = () => {
  const [lines, setLines] = useState([
    {
      type: "line",
      number: 1,
      text: "From zero to registered user in minutes!",
    },
    { type: "line", number: 2, text: "Click 'Run'." },
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const terminalRef = useRef(null)

  const script = [
    // CLI setup
    { type: "comment", text: "# One-time project setup via Ory CLI", delay: 0 },
    { type: "command", text: "brew install ory/tap/cli", delay: 300 },
    { type: "output", text: "Installing ory...", delay: 500 },
    { type: "success", text: "✓ Installed", delay: 600 },
    { type: "command", text: "ory auth", delay: 400 },
    {
      type: "output",
      text: "Opening browser to create your Ory developer account...",
      delay: 500,
    },
    { type: "success", text: "✓ Authenticated as <your-email>", delay: 700 },
    { type: "command", text: 'ory create project --name "MyApp"', delay: 400 },
    { type: "output", text: "Project slug: myapp-abc123", delay: 600 },
    { type: "success", text: "✓ Project created", delay: 200 },

    // API registration
    { type: "comment", text: "# Register a user via Ory API", delay: 600 },
    {
      type: "note",
      text: "Note: Traits depend on your identity schema. This sample uses Ory's 'username' preset schema.",
      delay: 400,
    },
    { type: "command", text: "curl -s -X GET \\", delay: 300 },
    {
      type: "command-cont",
      text: '  "https://<YOUR_PROJECT_SLUG>.projects.oryapis.com/self-service/registration/api"',
      delay: 100,
    },
    {
      type: "output",
      text: '{ "id": "<FLOW_ID>", "type": "api", "expires_at":"...","issued_at":"...","request_url":"<YOUR_PROJECT_SLUG>/self-service/registration/api","ui":{"action":"<YOUR_PROJECT_SLUG>.projects.oryapis.com/self-service/registration?flow=<FLOW_ID>","method":"POST", ... } }',
      delay: 500,
    },
    { type: "command", text: "curl -s -X POST \\", delay: 400 },
    {
      type: "command-cont",
      text: '  -H "Content-Type: application/json" \\',
      delay: 100,
    },
    {
      type: "command-cont",
      text: '  -d \'{"traits":{"username":"<YOUR_USERNAME>"},"password":"<YOUR_PASSWORD>","method":"password"}\' \\',
      delay: 100,
    },
    {
      type: "command-cont",
      text: '  "https://<YOUR_PROJECT_SLUG>.projects.oryapis.com/self-service/registration?flow=<FLOW_ID>"',
      delay: 100,
    },
    {
      type: "output",
      text: '{"identity":{"id":"...","schema_id":"preset://username","schema_url":"<YOUR_PROJECT_SLUG>.projects.oryapis.com/schemas/cHJlc2V0Oi8vdXNlcm5hbWU","state":"active", ... } }',
      delay: 600,
    },
    { type: "success", text: "✓ User registered!", delay: 400 },
    {
      type: "link",
      text: "Create your free project via Ory Console →",
      url: "https://console.ory.sh/",
      delay: 400,
    },
  ]

  const runDemo = async () => {
    if (isRunning) return
    setIsRunning(true)
    setHasRun(true)
    setLines([])

    for (let i = 0; i < script.length; i++) {
      const item = script[i]
      await new Promise((resolve) => setTimeout(resolve, item.delay))
      setLines((prev) => [...prev, item])
    }

    setIsRunning(false)
  }

  const reset = () => {
    setLines([
      {
        type: "line",
        number: 1,
        text: "From zero to registered user in minutes!",
      },
      { type: "line", number: 2, text: "Click 'Run'." },
    ])
    setHasRun(false)
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div className="w-full">
      <style>
        {`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}
      </style>

      <div className="w-full h-[368px] overflow-hidden bg-ory-bg-primary border border-ory-border-primary rounded-[8px] shadow-[0_4px_32px_0_var(--ory-bg-brand-tertiary,_#E0E1FF)] flex flex-col">
        <div className="h-12 px-4 flex items-center gap-2 bg-ory-bg-secondary border-b border-ory-border-primary">
          <div className="w-[52px] h-3 flex items-center gap-[6px]">
            <div className="w-3 h-3 rounded-full bg-[var(--background-danger-secondary)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--background-warning-secondary)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--background-success-secondary)]" />
          </div>
          <span className="text-[13px] font-sans font-normal text-ory-text-tertiary">
            Terminal
          </span>
        </div>

        <div
          ref={terminalRef}
          className="p-4 font-mono text-[13px] text-ory-text-primary bg-ory-bg-primary leading-[1.6] overflow-y-auto flex-1 min-h-0"
        >
          {lines.map((line, i) => (
            <div key={i} className="mb-1 flex items-start">
              {line.type === "line" && (
                <>
                  <span className="text-ory-text-tertiary mr-3 tabular-nums">
                    {line.number}
                  </span>
                  <span className="text-ory-text-tertiary mr-2">$</span>
                  <span className="text-ory-text-primary ml-2">{line.text}</span>
                </>
              )}

              {line.type === "comment" && (
                <div className={i === 0 ? "text-ory-text-tertiary mt-0" : "text-ory-text-tertiary mt-3"}>
                  {line.text}
                </div>
              )}

              {line.type === "note" && (
                <div className="text-ory-text-tertiary text-[11px] mt-1 mb-2 pl-4">
                  {line.text}
                </div>
              )}

              {line.type === "command" && (
                <div className="text-ory-text-primary flex items-start">
                  <span className="text-ory-text-tertiary mr-2">$</span>{" "}
                  {line.text}
                </div>
              )}

              {line.type === "command-cont" && (
                <div className="text-ory-text-primary pl-4">{line.text}</div>
              )}

              {line.type === "output" && (
                <div className="text-ory-text-secondary pl-2">{line.text}</div>
              )}

              {line.type === "success" && (
                <div className="text-ory-text-secondary pl-2 font-normal">
                  {line.text}
                </div>
              )}

              {line.type === "link" && (
                <div className="pl-2 mt-3">
                  <a
                    href={line.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center h-8 px-4 bg-ory-bg-primary text-ory-text-primary text-[13px] font-semibold rounded-ory-btn no-underline border border-ory-border-primary shadow-[0_1px_2px_rgba(15,23,42,0.12)] hover:bg-ory-bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ory-border-brand-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-ory-bg-primary"
                  >
                    {line.text}
                  </a>
                </div>
              )}
            </div>
          ))}

          {isRunning && (
            <span
              className="inline-block w-2 h-4 bg-ory-text-primary"
              style={{ animation: "blink 1s infinite" }}
            />
          )}
        </div>

        <div className="px-4 py-3 bg-ory-bg-secondary border-t border-ory-border-primary flex items-center justify-between gap-2">
          <span className="text-ory-text-tertiary text-[13px] font-sans font-normal">
            From zero to registered user in minutes
          </span>
          <button
            onClick={runDemo}
            disabled={isRunning}
            className={
              isRunning
                ? "h-8 px-4 text-[13px] font-semibold inline-flex items-center gap-1.5 border border-transparent bg-ory-bg-tertiary text-ory-text-tertiary cursor-not-allowed rounded-ory-btn"
                : "h-8 px-4 text-[13px] font-semibold inline-flex items-center gap-1.5 border border-ory-bg-dark bg-ory-bg-dark text-white rounded-ory-btn cursor-pointer"
            }
          >
            Run
          </button>
        </div>
      </div>
    </div>
  )
}

export default OryHeroDemo
