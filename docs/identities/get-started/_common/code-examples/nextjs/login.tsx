// In pages/login.js
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ory } from "../lib/ory"

export default function LoginPage() {
  const [flow, setFlow] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Get the flow ID from the URL if available
    const { flow: flowId, return_to } = router.query

    if (flowId) {
      // If we have a flow ID, fetch the flow
      ory
        .getLoginFlow({ id: flowId })
        .then(({ data }) => {
          setFlow(data)
        })
        .catch((err) => {
          // If the flow is expired or invalid, create a new one
          if (err.response?.status === 410) {
            return router.push("/login")
          }

          console.error("Could not get login flow", err)
        })
    } else {
      // Otherwise create a new login flow
      ory
        .createBrowserLoginFlow({
          returnTo: return_to || "/dashboard",
          refresh: false, // Set to true to refresh an existing login session
        })
        .then(({ data }) => {
          setFlow(data)
          // Update the URL to include the flow ID
          router.push(`/login?flow=${data.id}`, undefined, { shallow: true })
        })
        .catch((err) => {
          console.error("Could not create login flow", err)
        })
    }
  }, [router.query.flow])

  if (!flow) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Sign in to your account</h2>

      {/* Display any flow error messages */}
      {flow.ui.messages?.map((message, i) => (
        <div key={i} className="error">
          {message.text}
        </div>
      ))}

      {/* Render the login form */}
      <form action={flow.ui.action} method={flow.ui.method}>
        {/* Form fields similar to React example */}
        {/* ... */}
      </form>
    </div>
  )
}
