import { useState, useEffect } from "react"
import "./App.css"
// highlight-next-line
import { FrontendApi, Configuration, Session } from "@ory/client-fetch"

interface LogoutData {
  logout_url: string
}

interface LogoutResponse {
  data: LogoutData
}

// Props interface (matching Vue props)
interface AppProps {
  msg?: string
}

// highlight-start
const basePath = import.meta.env.VITE_ORY_URL || "http://localhost:4000"
console.log("basePath", basePath)
// highlight-end

// Initialize Ory client
// highlight-start
const ory = new FrontendApi(
  new Configuration({
    basePath,
    credentials: "include",
  }),
)
// highlight-end

function App({ msg }: AppProps) {
  // State variables
  const [session, setSession] = useState<Session | null>(null)
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null)

  const fetchSession = async () => {
    try {
      // highlight-start
      // Fetch the session directly from Ory
      const data = await ory.toSession()
      setSession(data)
      // highlight-end

      // highlight-start
      // Create logout URL if session exists
      const logoutData = await ory.createBrowserLogoutFlow()
      setLogoutUrl(logoutData.logout_url)
      // highlight-end
    } catch (error) {
      console.error("Error fetching session:", error)
    }
  }

  // Lifecycle hooks
  useEffect(() => {
    // highlight-start
    // Fetch the session and API response
    fetchSession()
    // highlight-end
  }, [])

  return (
    <div className="main">
      <h1>{msg}</h1>

      <div className={!session ? "" : "hidden"}>
        <p>Click on "login" or "Sign Up" below to sign in.</p>
        {/* highlight-start */}
        <li>
          <a href={`${basePath}/ui/login`} data-testid="sign-in">
            Login
          </a>
        </li>
        <li>
          <a href={`${basePath}/ui/registration`} data-testid="sign-up">
            Sign Up
          </a>
        </li>
        {/* highlight-end */}
      </div>
      <div className={session ? "long" : "hidden"}>
        <p>
          Use the SDK's <code>toSession()</code> call to receive the session
          information, for example the authentication methods used:
        </p>
        {/* highlight-start */}
        <pre>
          <code data-testid="ory-response">
            {session
              ? JSON.stringify(session.authentication_methods, null, 2)
              : ""}
          </code>
        </pre>
        {/* highlight-end */}
      </div>
      <ul className={session ? "" : "hidden"}>
        {/* highlight-start */}
        <li>
          <a href={logoutUrl || "#"} data-testid="logout">
            Logout
          </a>
        </li>
        {/* highlight-end */}
      </ul>

      <br />
      <h3>Essential Links</h3>
      <ul>
        <a href="https://www.ory.sh">Ory Website</a>
        <a href="https://github.com/ory">Ory GitHub</a>
        <a href="https://www.ory.sh/docs">Documentation</a>
      </ul>
    </div>
  )
}

export default App
