import React, { useState, useEffect, useRef } from "react"

const OryHeroDemo = () => {
  const [lines, setLines] = useState([])
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
    { type: "output", text: "Opening browser to create your Ory developer account...", delay: 500 },
    { type: "success", text: "✓ Authenticated as <your-email>", delay: 700 },
    { type: "command", text: "ory create project --name \"MyApp\"", delay: 400 },
    { type: "output", text: "Project slug: myapp-abc123", delay: 600 },
    { type: "success", text: "✓ Project created", delay: 200 },
    
    // API registration
    { type: "comment", text: "# Register a user via Ory API", delay: 600 },
    { type: "note", text: "Note: Traits depend on your identity schema. This sample uses Ory's 'username' preset schema.", delay: 400 },
    { type: "command", text: "curl -s -X GET \\", delay: 300 },
    { type: "command-cont", text: "  \"https://<YOUR_PROJECT_SLUG>.projects.oryapis.com/self-service/registration/api\"", delay: 100 },
    { type: "output", text: "{ \"id\": \"<FLOW_ID>\", \"type\": \"api\", \"expires_at\":\"...\",\"issued_at\":\"...\",\"request_url\":\"<YOUR_PROJECT_SLUG>/self-service/registration/api\",\"ui\":{\"action\":\"<YOUR_PROJECT_SLUG>.projects.oryapis.com/self-service/registration?flow=<FLOW_ID>\",\"method\":\"POST\", ... } }", delay: 500 },
    { type: "command", text: "curl -s -X POST \\", delay: 400 },
    { type: "command-cont", text: "  -H \"Content-Type: application/json\" \\", delay: 100 },
    { type: "command-cont", text: "  -d '{\"traits\":{\"username\":\"<YOUR_USERNAME>\"},\"password\":\"<YOUR_PASSWORD>\",\"method\":\"password\"}' \\", delay: 100 },
    { type: "command-cont", text: "  \"https://<YOUR_PROJECT_SLUG>.projects.oryapis.com/self-service/registration?flow=<FLOW_ID>\"", delay: 100 },
    { type: "output", text: "{\"identity\":{\"id\":\"...\",\"schema_id\":\"preset://username\",\"schema_url\":\"<YOUR_PROJECT_SLUG>.projects.oryapis.com/schemas/cHJlc2V0Oi8vdXNlcm5hbWU\",\"state\":\"active\", ... } }", delay: 600 },
    { type: "success", text: "✓ User registered!", delay: 400 },
    { type: "link", text: "Create your free project via Ory Console →", url: "https://console.ory.sh/", delay: 300 },
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
    setLines([])
    setHasRun(false)
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const styles = {
    wrapper: {
      width: "80%",
      maxWidth: "500px",
      margin: "0 auto",
      maxHeight: "500px",
    },
    terminal: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
      background: "#1a1033",
      border: "1px solid #3d2a6d",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 16px",
      background: "#241845",
      borderBottom: "1px solid #3d2a6d",
    },
    trafficLights: {
      display: "flex",
      gap: "6px",
    },
    light: (color) => ({
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: color,
    }),
    headerText: {
      color: "#888",
      fontSize: "13px",
      fontFamily: "monospace",
      marginLeft: "8px",
    },
    body: {
      padding: "16px",
      fontFamily: "monospace",
      fontSize: "13px",
      height: "200px",
      overflowY: "auto",
    },
    comment: {
      color: "#d2a8ff",
      marginTop: "12px",
    },
    note: {
      color: "#d2a8ff",
      fontSize: "11px",
      marginTop: "4px",
      marginBottom: "8px",
      paddingLeft: "16px",
    },
    command: {
      color: "#ffffff",
    },
    commandCont: {
      color: "#ffffff",
      paddingLeft: "16px",
    },
    prompt: {
      color: "#67e8f9",
    },
    output: {
      color: "#a5d6ff",
      paddingLeft: "8px",
    },
    success: {
      color: "#ff7b72",
      paddingLeft: "8px",
      fontWeight: "600",
    },
    linkWrapper: {
      paddingLeft: "8px",
      marginTop: "12px",
    },
    link: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      background: "#0e639c",
      color: "#fff",
      fontSize: "13px",
      fontWeight: "500",
      borderRadius: "4px",
      textDecoration: "none",
    },
    cursor: {
      display: "inline-block",
      width: "8px",
      height: "16px",
      background: "#d4d4d4",
      animation: "blink 1s infinite",
    },
    controls: {
      display: "flex",
      gap: "8px",
      padding: "12px 16px",
      background: "#241845",
      borderTop: "1px solid #3d2a6d",
    },
    button: {
      padding: "6px 16px",
      fontSize: "13px",
      fontWeight: "500",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
    },
    runButton: {
      background: "#0e639c",
      color: "#fff",
    },
    runButtonDisabled: {
      background: "#555",
      color: "#999",
      cursor: "not-allowed",
    },
    resetButton: {
      background: "#3c3c3c",
      color: "#d4d4d4",
    },
    caption: {
      textAlign: "center",
      color: "#888",
      fontSize: "14px",
      marginTop: "16px",
    },
    placeholder: {
      color: "#6a9955",
    },
  }

  return (
    <div style={styles.wrapper}>
      <style>
        {`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}
      </style>
      
      <div style={styles.terminal}>
        {/* Terminal header */}
        <div style={styles.header}>
          <div style={styles.trafficLights}>
            <div style={styles.light("#ff5f56")} />
            <div style={styles.light("#ffbd2e")} />
            <div style={styles.light("#27c93f")} />
          </div>
          <span style={styles.headerText}>terminal</span>
        </div>

        {/* Terminal body */}
        <div ref={terminalRef} style={styles.body}>
          {/* Initial prompt when empty */}
          {lines.length === 0 && !isRunning && (
            <div style={{ color: "#67e8f9" }}>
              <span style={styles.prompt}>$</span> From zero to registered user in minutes! Click 'Run'.
            </div>
          )}

          {/* Script output */}
          {lines.map((line, i) => (
            <div key={i} style={{ marginBottom: "2px" }}>
              {line.type === "comment" && (
                <div style={i === 0 ? { ...styles.comment, marginTop: 0 } : styles.comment}>
                  {line.text}
                </div>
              )}
              {line.type === "note" && (
                <div style={styles.note}>{line.text}</div>
              )}
              {line.type === "command" && (
                <div style={styles.command}>
                  <span style={styles.prompt}>$</span> {line.text}
                </div>
              )}
              {line.type === "command-cont" && (
                <div style={styles.commandCont}>{line.text}</div>
              )}
              {line.type === "output" && (
                <div style={styles.output}>{line.text}</div>
              )}
              {line.type === "success" && (
                <div style={styles.success}>{line.text}</div>
              )}
              {line.type === "link" && (
                <div style={styles.linkWrapper}>
                  <a
                    href={line.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    {line.text}
                  </a>
                </div>
              )}
            </div>
          ))}

          {/* Blinking cursor */}
          {isRunning && <span style={styles.cursor} />}
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <button
            onClick={runDemo}
            disabled={isRunning}
            style={{
              ...styles.button,
              ...(isRunning ? styles.runButtonDisabled : styles.runButton),
            }}
          >
            {isRunning ? "Running..." : hasRun ? "Run Again" : "Run"}
          </button>
          {hasRun && !isRunning && (
            <button onClick={reset} style={{ ...styles.button, ...styles.resetButton }}>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Caption */}
      <p style={styles.caption}>From zero to registered user in minutes.</p>
    </div>
  )
}

export default OryHeroDemo