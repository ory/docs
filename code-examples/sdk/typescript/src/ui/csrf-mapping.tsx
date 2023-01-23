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

function CsrfMapping() {
  const [flow, setFlow] = useState<LoginFlow>()

  useEffect(() => {
    frontend.createBrowserLoginFlow().then(({ data: flow }) => setFlow(flow))
  }, [])

  return flow ? (
    // highlight-start
    flow.ui.nodes
      .filter(({ group, attributes }) => {
        if (group.includes("default") && attributes.name === "csrf_token") {
          return true
        }
      })
      .map((node) => (
        <input
          type={node.attributes.type}
          name={node.attributes.name}
          value={node.attributes.value}
        />
      ))
  ) : (
    // highlight-end
    <div>Loading...</div>
  )
}

export default CsrfMapping
