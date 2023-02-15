import {
  Configuration,
  FrontendApi,
  LoginFlow,
  UiNodeInputAttributes,
} from "@ory/client"
import {
  filterNodesByGroups,
  isUiNodeInputAttributes,
} from "@ory/integrations/ui"
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
    <form action={flow.ui.action} method={flow.ui.method}>
      {filterNodesByGroups({
        nodes: flow.ui.nodes,
        // we will also map default fields here but not oidc and password fields
        groups: ["default"],
        attributes: ["hidden"], // only want hidden fields
      }).map((node) => {
        if (
          isUiNodeInputAttributes(node.attributes) &&
          (node.attributes as UiNodeInputAttributes).type === "hidden" &&
          (node.attributes as UiNodeInputAttributes).name === "csrf_token"
        ) {
          return (
            <input
              type={node.attributes.type}
              name={node.attributes.name}
              value={node.attributes.value}
            />
          )
        }
      })}
    </form>
  ) : (
    // highlight-end
    <div>Loading...</div>
  )
}

export default CsrfMapping
