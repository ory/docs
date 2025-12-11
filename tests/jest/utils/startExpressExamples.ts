import { ChildProcess, spawn } from "child_process"
import waitOn from "wait-on"
import path from "path"

const DEFAULT_PORT = 3000

let serverProcess: ChildProcess | null = null

export async function startExamplesApp() {
  if (!process.env.ORY_SDK_URL) {
    // No real Ory project configured, tests using this helper should skip.
    return
  }

  if (serverProcess) {
    return
  }

  const appDir = path.join(
    process.cwd(),
    "tests",
    "jest",
    "apps",
    "identity-get-started",
  )

  serverProcess = spawn(process.execPath, ["server.js"], {
    cwd: appDir,
    env: {
      ...process.env,
      EXAMPLES_TEST_APP_PORT: String(DEFAULT_PORT),
    },
    stdio: "inherit",
  })

  // Handle process errors
  serverProcess.on("error", (error) => {
    console.error("Failed to start server process:", error)
    throw error
  })

  // Wait for server to be ready
  try {
    await waitOn({
      resources: [`http://127.0.0.1:${DEFAULT_PORT}/configure`],
      timeout: 30000,
    })
  } catch (error) {
    console.error("Server failed to start within timeout:", error)
    if (serverProcess) {
      serverProcess.kill()
      serverProcess = null
    }
    throw error
  }
}

export async function stopExamplesApp() {
  if (serverProcess) {
    serverProcess.kill()
    serverProcess = null
  }
}

export const examplesBaseUrl = `http://127.0.0.1:${DEFAULT_PORT}`
