import React, { useState, useEffect, useRef } from "react"

const OryHeroDemo = () => {
  const [lines, setLines] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const terminalRef = useRef(null)

  const script = [
    { type: "command", text: "npm install @ory/elements-react @ory/nextjs", delay: 300 },
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
              <span style={styles.prompt}>$</span>{" "}
            </div>
          )}

          {/* Script output */}
          {lines.map((line, i) => (
            <div key={i} style={{ marginBottom: "2px" }}>
              {line.type === "comment" && (
                <div
                  style={
                    i === 0
                      ? { ...styles.comment, marginTop: 0 }
                      : styles.comment
                  }
                >
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
            Try it
          </button>
        </div>
      </div>
    </div>
  )
}

export default OryHeroDemo
