import {
  Configuration,
  FrontendApi,
  LoginFlow,
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

export const Login = () => {
  const [flow, setFlow] = useState<LoginFlow>()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const id = searchParams.get("id")
    frontend
      .getLoginFlow({
        id,
      })
      .then(({ data: flow }) => {
        // set the flow data
        setFlow(flow)
      })
      .catch((err) => {
        // Couldn't retrieve the login flow
        // handle the error
      })
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
              key={key}
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
              key={key}
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
        // you can also map `oidc` or `webauhthn` here as well
        groups: ["default", "password"],
      }).map((node, idx) => mapUINode(node, idx))}
    </form>
  ) : (
    // highlight-end
    <div>Loading...</div>
  )
}
