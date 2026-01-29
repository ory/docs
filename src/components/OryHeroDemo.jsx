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
    {
      type: "line",
      number: 1,
      text: "From zero to registered user in minutes!",
      delay: 300,
    },
    { type: "line", number: 2, text: "Click 'Run'.", delay: 300 },
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

  const styles = {
    wrapper: {
      width: "416px",
      margin: "0 auto",
    },
    terminal: {
      width: "416px",
      height: "280px",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 16px",
      background: "#f8fafc",
      borderBottom: "1px solid #e2e8f0",
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
      color: "#64748b",
      fontSize: "13px",
      fontFamily: "Inter, sans-serif",
      fontWeight: "400",
    },
    body: {
      padding: "16px",
      fontFamily: "JetBrains Mono, monospace",
      fontSize: "13px",
      flex: "1",
      overflowY: "auto",
      background: "#ffffff",
      color: "#0f172a",
      lineHeight: "1.6",
    },
    lineNumber: {
      color: "#94a3b8",
      marginRight: "12px",
      fontFamily: "JetBrains Mono, monospace",
      fontSize: "13px",
    },
    comment: {
      color: "#64748b",
      marginTop: "12px",
    },
    note: {
      color: "#64748b",
      fontSize: "11px",
      marginTop: "4px",
      marginBottom: "8px",
      paddingLeft: "16px",
    },
    command: {
      color: "#0f172a",
      display: "flex",
      alignItems: "flex-start",
    },
    commandCont: {
      color: "#0f172a",
      paddingLeft: "16px",
    },
    prompt: {
      color: "#64748b",
      marginRight: "8px",
    },
    output: {
      color: "#334155",
      paddingLeft: "8px",
    },
    success: {
      color: "#334155",
      paddingLeft: "8px",
      fontWeight: "400",
    },
    linkWrapper: {
      paddingLeft: "8px",
      marginTop: "12px",
    },
    link: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      background: "#383bca",
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
      background: "#0f172a",
      animation: "blink 1s infinite",
    },
    controls: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "8px",
      padding: "12px 16px",
      background: "#f1f5f9",
      borderTop: "1px solid #e2e8f0",
    },
    controlsText: {
      color: "#94a3b8",
      fontSize: "13px",
      fontFamily: "Inter, sans-serif",
      fontWeight: "400",
    },
    button: {
      padding: "8px 16px",
      fontSize: "13px",
      fontWeight: "600",
      borderRadius: "0",
      border: "none",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
    },
    runButton: {
      background: "#6366f1",
      color: "#ffffff",
    },
    runButtonDisabled: {
      background: "#e2e8f0",
      color: "#94a3b8",
      cursor: "not-allowed",
    },
    resetButton: {
      background: "#e2e8f0",
      color: "#334155",
    },
    buttonIcon: {
      fontSize: "14px",
      lineHeight: "1",
      fontWeight: "400",
    },
    caption: {
      textAlign: "center",
      color: "#64748b",
      fontSize: "14px",
      marginTop: "16px",
    },
    placeholder: {
      color: "#94a3b8",
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
          <span style={styles.headerText}>Terminal</span>
        </div>

        {/* Terminal body */}
        <div ref={terminalRef} style={styles.body}>
          {/* Script output */}
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                marginBottom: "4px",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              {line.type === "line" && (
                <>
                  <span style={styles.lineNumber}>{line.number}</span>
                  <span style={styles.prompt}>$</span>
                  <span style={{ ...styles.command, marginLeft: "8px" }}>
                    {line.text}
                  </span>
                </>
              )}
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
          <span style={styles.controlsText}>
            From zero to registered user in minutes
          </span>
          <button
            onClick={runDemo}
            disabled={isRunning}
            style={{
              ...styles.button,
              ...(isRunning ? styles.runButtonDisabled : styles.runButton),
            }}
          >
            <span style={styles.buttonIcon}>&gt;</span>
            Run
          </button>
        </div>
      </div>
    </div>
  )
}

export default OryHeroDemo
