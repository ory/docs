import { useState, useEffect } from "react"
import "./App.css"
import { FrontendApi, Configuration, Session } from "@ory/client-fetch"

// Props interface
interface AppProps {
  msg?: string
}

// State variables
const basePath = import.meta.env.VITE_ORY_URL || "http://localhost:4000"
// highlight-next-line
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8081"

const ory = new FrontendApi(
  new Configuration({
    basePath,
    credentials: "include",
  }),
)

function AppWithAPI({ msg }: AppProps) {
  // Use proper Session type from the SDK
  const [session, setSession] = useState<Session | null>(null)
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null)
  const [apiResponse, setApiResponse] = useState<any | null>(null)

  const fetchSession = async () => {
    try {
      const data = await ory.toSession()
      setSession(data)
      const logoutData = await ory.createBrowserLogoutFlow()
      setLogoutUrl(logoutData.logout_url)
    } catch (error) {
      console.error("Error fetching session:", error)
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
      <h1>{msg}</h1>

      {!session ? (
        <div>
          <p>Click on "login" or "Sign Up" below to sign in.</p>
          <li>
            <a href={`${basePath}/ui/login`} data-testid="sign-in">
              Login
            </a>
          </li>
          <li>
            <a
              href={`${basePath}/ui/registration`}
              data-testid="sign-up"
              id="sign-up"
            >
              Sign Up
            </a>
          </li>
        </div>
      ) : (
        <>
          <h3>
            Calling <code>toSession()</code>
          </h3>
          <div className="long">
            <p>
              Use the SDK's <code>toSession()</code> call to receive the session
              information, for example the authentication methods used:
            </p>
            <pre>
              <code data-testid="ory-response">
                {JSON.stringify(session.identity?.traits, null, 2)}
              </code>
            </pre>
          </div>

          {/* highlight-start */}
          {apiResponse && (
            <>
              <h3>API Response</h3>
              <div className="long">
                <p>
                  Make authenticated AJAX calls to your API using{" "}
                  <code>fetch()</code>:
                </p>
                <pre>
                  <code data-testid="api-response">
                    {JSON.stringify(apiResponse, null, 2)}
                  </code>
                </pre>
              </div>
            </>
          )}
          {/* highlight-end */}

          {/* Add Common Actions section with logout link */}
          <h3>Common Actions</h3>
          <ul>
            <li>
              <a href={logoutUrl || "#"} data-testid="logout">
                Logout
              </a>
            </li>
            <li>
              <a href={`${basePath}/ui/settings`} data-testid="settings">
                Settings
              </a>
            </li>
          </ul>
        </>
      )}

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
  )
}

export default AppWithAPI
