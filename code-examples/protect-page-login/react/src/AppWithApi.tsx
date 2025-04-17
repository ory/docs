import { useState, useEffect } from "react"
import "./App.css"
import { FrontendApi, Configuration, Session } from "@ory/client-fetch"

interface AppProps {
  msg?: string
}

const basePath = import.meta.env.VITE_ORY_URL || "http://localhost:4000"
// highlight-start
const apiUrl = import.meta.env.API_URL || "http://localhost:8081"
// highlight-end

// Initialize Ory client
const ory = new FrontendApi(
  new Configuration({
    basePath,
    credentials: "include",
  }),
)

function App({ msg }: AppProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null)
  // highlight-start
  // State variable to hold API response
  const [apiResponse, setApiResponse] = useState<any | null>(null)
  // highlight-end

  const fetchSession = async () => {
    try {
      // Browser automatically includes cookies in the request
      const data = await ory.toSession()
      setSession(data)
      const logoutData = await ory.createBrowserLogoutFlow()
      setLogoutUrl(logoutData.logout_url)
    } catch (error) {
      console.error("Error fetching session:", error)
      // Redirect to login page on error, similar to Express middleware
      window.location.href = basePath + "/ui/login"
    }
  }

  // highlight-start
  const fetchApiHello = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/hello`, {
        // Do not forget to set this - it is required to send the session cookie!
        credentials: "include",
      })

      if (res.ok) {
        const data = await res.json()
        setApiResponse(data)
      }
    } catch (error) {
      console.error("Error fetching API response:", error)
    }
  }
  // highlight-end

  // Lifecycle hooks
  useEffect(() => {
    fetchSession()
    // highlight-start
    // Make an authenticated API call
    fetchApiHello()
    // highlight-end
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

            {/* highlight-start */}
            <div className="api-info">
              <h2 className="subtitle">API Response:</h2>
              <pre>
                <code data-testid="api-response">
                  {JSON.stringify(apiResponse, null, 2)}
                </code>
              </pre>
            </div>
            {/* highlight-end */}
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
