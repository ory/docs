import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"

// highlight-start
import { FrontendApi, Configuration, Session, Identity } from "@ory/client"

// Get your Ory url from .env
// Or localhost for local development
const basePath = process.env.REACT_APP_ORY_URL || "http://localhost:4000"
const ory = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
      headers: {
        // Only needed to pass the documentation CI. You do not need this line in your code:
        [process.env.ORY_CI_RATE_LIMIT_HEADER || ""]:
          process.env.ORY_CI_RATE_LIMIT_HEADER_VALUE,
      },
    },
  }),
)

function App() {
  const [session, setSession] = useState<Session | undefined>()
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>()

  // Returns either the email or the username depending on the user's Identity Schema
  const getUserName = (identity?: Identity) =>
    identity?.traits.email || identity?.traits.username

  // highlight-end

  // highlight-start
  // Second, gather session data, if the user is not logged in, redirect to login
  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data)
        ory.createBrowserLogoutFlow().then(({ data }) => {
          // Get also the logout url
          setLogoutUrl(data.logout_url)
        })
      })
      .catch((err) => {
        console.error(err)
        // Redirect to login page
        window.location.replace(`${basePath}/ui/login`)
      })
  }, [])

  if (!session) {
    // Still loading
    return <h1>Loading...</h1>
  }
  // highlight-end

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Ory,{" "}
          {
            // highlight-next-line
            getUserName(session?.identity)
          }
          .
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {
          // highlight-next-line
          // Our logout link
          <a href={logoutUrl}>Logout</a>
        }
      </header>
    </div>
  )
}

export default App
