import { useState, useEffect } from "react"
import "./App.css"
import { FrontendApi, Configuration, Session } from "@ory/client-fetch"

interface AppProps {
  msg?: string
}

const basePath = import.meta.env.VITE_ORY_URL || "http://localhost:4000"

// Initialize Ory client
const ory = new FrontendApi(
  new Configuration({
    basePath,
    credentials: "include",
  }),
)

function App({ msg }: AppProps) {
  // State variables
  const [session, setSession] = useState<Session | null>(null)
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null)

  const fetchSession = async () => {
    try {
      // Browser automatically includes cookies in the request
      const data = await ory.toSession()
      setSession(data)

      // Create logout URL if session exists
      const logoutData = await ory.createBrowserLogoutFlow()
      setLogoutUrl(logoutData.logout_url)
    } catch (error) {
      console.error("Error fetching session:", error)
      // Redirect to login page on error
      window.location.href = basePath + "/ui/login"
    }
  }

  // Lifecycle hooks
  useEffect(() => {
    // Fetch the session
    fetchSession()
  }, [])
  return (
    <div className="main">
      <main className="container">
        {!session ? (
          // Login section
          <div className="login-section">
            <h1 className="title">{msg}</h1>
            <p>Click on "login" or "Sign Up" below to sign in.</p>
            <ul className="auth-links">
              <li>
                <a
                  href={`${basePath}/ui/login`}
                  data-testid="sign-in"
                  className="auth-button"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        ) : (
          // Protected content section
          <div className="protected-content">
            <div className="header">
              <h1 className="title">{msg}</h1>
              <a
                href={logoutUrl || "#"}
                data-testid="logout"
                className="logout-button"
              >
                Logout
              </a>
            </div>
            <div className="session-info">
              <h2 className="subtitle">Session Information:</h2>
              <pre>
                <code data-testid="ory-response">
                  {JSON.stringify(session.identity?.traits, null, 2)}
                </code>
              </pre>
            </div>
          </div>
        )}

        <div className="essential-links">
          <h3>Essential Links</h3>
          <ul>
            <li>
              <a href="https://www.ory.sh">Ory Website</a>
            </li>
            <li>
              <a href="https://github.com/ory">Ory GitHub</a>
            </li>
            <li>
              <a href="https://www.ory.sh/docs">Documentation</a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
