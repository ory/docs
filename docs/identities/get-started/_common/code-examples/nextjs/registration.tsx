// In lib/ory.js
import { Configuration, FrontendApi } from "@ory/client"
import { edgeConfig } from "@ory/integrations/next"

// Initialize the SDK
export const ory = new FrontendApi(
  new Configuration({
    ...edgeConfig,
    baseOptions: {
      withCredentials: true,
    },
  }),
)

// In pages/registration.js
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ory } from "../lib/ory"

export default function RegistrationPage() {
  const [flow, setFlow] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Get the flow ID from the URL if available
    const { flow: flowId, return_to } = router.query

    if (flowId) {
      // If we have a flow ID, fetch the flow
      ory
        .getRegistrationFlow({ id: flowId })
        .then(({ data }) => {
          setFlow(data)
        })
        .catch((err) => {
          // If the flow is expired or invalid, create a new one
          if (err.response?.status === 410) {
            return router.push("/registration")
          }

          console.error("Could not get registration flow", err)
        })
    } else {
      // Otherwise create a new registration flow
      ory
        .createBrowserRegistrationFlow({
          returnTo: return_to || "/welcome",
        })
        .then(({ data }) => {
          setFlow(data)
          // Update the URL to include the flow ID
          router.push(`/registration?flow=${data.id}`, undefined, {
            shallow: true,
          })
        })
        .catch((err) => {
          console.error("Could not create registration flow", err)
        })
    }
  }, [router.query.flow])

  if (!flow) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Register a new account</h2>

      {/* Display any flow error messages */}
      {flow.ui.messages?.map((message, i) => (
        <div key={i} className="error">
          {message.text}
        </div>
      ))}

      {/* Render the registration form */}
      <form action={flow.ui.action} method={flow.ui.method}>
        {/* Form fields similar to React example */}
        {/* ... */}
      </form>
    </div>
  )
}
