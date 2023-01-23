import { Configuration, FrontendApi, LoginFlow } from "@ory/client"
import { useEffect, useState } from "react"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true,
    },
  }),
)

function OidcMapping() {
  const [flow, setFlow] = useState<LoginFlow>()

  useEffect(() => {
    frontend.createBrowserLoginFlow().then(({ data: flow }) => setFlow(flow))
  }, [])

  return flow ? (
    // highlight-start
    flow.ui.nodes
      .filter(({ group, attributes }) => {
        if (group.includes("oidc")) {
          return true
        }
      })
      .map((node) => (
        <button
          type={node.attributes.type}
          name={node.attributes.name}
          value={node.attributes.value}
        >
          {node.attributes.value}
        </button>
      ))
  ) : (
    // highlight-end
    <div>Loading...</div>
  )
}

export default OidcMapping
