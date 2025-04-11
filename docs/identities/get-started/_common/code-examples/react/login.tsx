import { Configuration, FrontendApi, LoginFlow } from "@ory/client"
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

export const Login = () => {
  const [flow, setFlow] = useState<LoginFlow | null>(null)

  useEffect(() => {
    // Create a login flow when the component mounts
    ory
      .createBrowserLoginFlow({
        returnTo: "/dashboard", // Optional return URL after successful login
      })
      .then(({ data }) => {
        setFlow(data)
      })
      .catch((err) => {
        console.error("Could not create login flow", err)
      })
  }, [])

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
        {/* Hidden field for the csrf_token */}
        <input
          type="hidden"
          name="csrf_token"
          value={
            flow.ui.nodes.find((n) => n.attributes.name === "csrf_token")
              ?.attributes.value || ""
          }
        />

        {/* Identifier field */}
        <div>
          <label htmlFor="identifier">Email or Username</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            defaultValue={
              flow.ui.nodes.find((n) => n.attributes.name === "identifier")
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

        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
