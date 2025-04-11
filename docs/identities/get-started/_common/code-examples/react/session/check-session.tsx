import { useEffect, useState } from "react"
import { ory } from "../lib/ory"

export const Dashboard = () => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if the user is authenticated
    ory
      .toSession()
      .then(({ data }) => {
        setSession(data)
        setLoading(false)
      })
      .catch(() => {
        // Not authenticated, redirect to login
        window.location.href = "/login?return_to=/dashboard"
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>
        Welcome, {session.identity.traits.name || session.identity.traits.email}
      </h2>
      <div>
        <p>User ID: {session.identity.id}</p>
        <p>Email: {session.identity.traits.email}</p>
      </div>
      <button onClick={() => (window.location.href = "/logout")}>
        Log Out
      </button>
    </div>
  )
}
