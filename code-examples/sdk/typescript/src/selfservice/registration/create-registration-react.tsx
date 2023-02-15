import {
  Configuration,
  FrontendApi,
  RegistrationFlow,
  UiNode,
  UiNodeInputAttributes,
} from "@ory/client"
import {
  filterNodesByGroups,
  isUiNodeInputAttributes,
} from "@ory/integrations/ui"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true, // we need to include cookies
    },
  }),
)

export const Registration = () => {
  const [flow, setFlow] = useState<RegistrationFlow>()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // we can redirect the user back to the page they were on before login
    const returnTo = searchParams.get("return_to")

    // highlight-start
    frontend
      .createBrowserRegistrationFlow({
        returnTo: returnTo || "/", // redirect to the root path after login
      })
      .then(({ data: flow }) => {
        // set the flow data
        setFlow(flow)
      })
      .catch((err) => {
        // Couldn't create login flow
        // handle the error
      })
    // highlight-end
  }, [])

  const mapUINode = (node: UiNode, key: number) => {
    // other node types are also supported
    // if (isUiNodeTextAttributes(node.attributes)) {
    // if (isUiNodeImageAttributes(node.attributes)) {
    // if (isUiNodeAnchorAttributes(node.attributes)) {
    if (isUiNodeInputAttributes(node.attributes)) {
      const attrs = node.attributes as UiNodeInputAttributes
      const nodeType = attrs.type

      switch (nodeType) {
        case "button":
        case "submit":
          return (
            <button
              type={attrs.type as "submit" | "reset" | "button" | undefined}
              name={attrs.name}
              value={attrs.value}
            />
          )
        default:
          return (
            <input
              name={attrs.name}
              type={attrs.type}
              autoComplete={
                attrs.autocomplete || attrs.name === "identifier"
                  ? "username"
                  : ""
              }
              defaultValue={attrs.value}
              required={attrs.required}
              disabled={attrs.disabled}
            />
          )
      }
    }
  }

  return flow ? (
    // highlight-start
    <form action={flow.ui.action} method={flow.ui.method}>
      {filterNodesByGroups({
        nodes: flow.ui.nodes,
        // we will also map default fields here such as csrf_token
        // this only maps the `password` method
        // other methods can also be mapped such as `oidc` or `webauthn`
        groups: ["default", "password"],
      }).map((node, idx) => mapUINode(node, idx))}
    </form>
  ) : (
    // highlight-end
    <div>Loading...</div>
  )
}
