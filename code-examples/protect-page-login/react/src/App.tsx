import { useState, useEffect } from "react"
import "./App.css"
import { FrontendApi, Configuration, Session } from "@ory/client-fetch"

interface AppProps {
  msg?: string
}

const basePath = import.meta.env.VITE_ORY_SDK_URL || "http://localhost:4000"

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
  const [loading, setLoading] = useState(true)

  // Lifecycle hooks
  const fetchSession = async () => {
    try {
      // Browser automatically includes cookies in the request
      const session = await ory.toSession()
      setSession(session)
      try {
        const { logout_url } = await ory.createBrowserLogoutFlow()
        setLogoutUrl(logout_url)
      } catch (logoutError) {
        console.error("Error creating logout flow:", logoutError)
      }
    } catch (err) {
      console.error("Error fetching session:", err)
      window.location.href = basePath + "/self-service/login/browser"
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSession()
  }, [])
  return (
    <div className="main">
      <main className="container">
        {loading ? (
          <div className="title"> Loading...</div>
        ) : session?.identity ? (
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
              <h2 className="subtitle">Session Information</h2>
              <pre>{JSON.stringify(session.identity.traits || {})}</pre>
            </div>
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
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default App
