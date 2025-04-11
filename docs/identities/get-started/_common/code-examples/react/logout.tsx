import { useEffect } from "react"
import { ory } from "../lib/ory"

export const Logout = () => {
  useEffect(() => {
    // Create a logout flow and redirect to it
    ory
      .createBrowserLogoutFlow()
      .then(({ data }) => {
        // Redirect to the logout URL which will destroy the session
        window.location.href = data.logout_url
      })
      .catch((err) => {
        console.error("Logout error:", err)
        // Already logged out or error, redirect to login
        window.location.href = "/login"
      })
  }, [])

  return <div>Logging out...</div>
}
