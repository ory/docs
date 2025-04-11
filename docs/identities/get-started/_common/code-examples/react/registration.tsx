import { Configuration, FrontendApi, RegistrationFlow } from "@ory/client"
import { useEffect, useState } from "react"

// Initialize the SDK
const ory = new FrontendApi(
  new Configuration({
    basePath: "https://$PROJECT_SLUG.projects.oryapis.com",
    baseOptions: {
      withCredentials: true,
    },
  }),
)

export const Registration = () => {
  const [flow, setFlow] = useState<RegistrationFlow | null>(null)

  useEffect(() => {
    // Create a registration flow when the component mounts
    ory
      .createBrowserRegistrationFlow({
        returnTo: "/welcome", // Optional return URL after successful registration
      })
      .then(({ data }) => {
        setFlow(data)
      })
      .catch((err) => {
        console.error("Could not create registration flow", err)
      })
  }, [])

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
        {/* Hidden field for the csrf_token */}
        <input
          type="hidden"
          name="csrf_token"
          value={
            flow.ui.nodes.find((n) => n.attributes.name === "csrf_token")
              ?.attributes.value || ""
          }
        />

        {/* Email field */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="traits.email"
            defaultValue={
              flow.ui.nodes.find((n) => n.attributes.name === "traits.email")
                ?.attributes.value || ""
            }
            required
          />
        </div>

        {/* Password field */}
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
