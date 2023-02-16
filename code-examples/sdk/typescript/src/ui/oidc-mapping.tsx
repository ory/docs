import {
  Configuration,
  FrontendApi,
  LoginFlow,
  UiNodeInputAttributes,
} from "@ory/client"
import {
  filterNodesByGroups,
  getNodeLabel,
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

function OidcMapping() {
  const [flow, setFlow] = useState<LoginFlow>()

  useEffect(() => {
    frontend.createBrowserLoginFlow().then(({ data: flow }) => setFlow(flow))
  }, [])

  return flow ? (
    // highlight-start
    <form method={flow.ui.action} action={flow.ui.method}>
      {filterNodesByGroups({
        nodes: flow.ui.nodes,
        // we will also map default fields here
        groups: ["oidc"],
        attributes: ["hidden", "submit", "button"],
      }).map((node) => {
        if (isUiNodeInputAttributes(node.attributes)) {
          const attrs = node.attributes as UiNodeInputAttributes
          const nodeType = attrs.type

          const isSocial =
            (attrs.name === "provider" || attrs.name === "link") &&
            node.group === "oidc"

          const submit: any = {
            type: attrs.type as "submit" | "reset" | "button" | undefined,
            name: attrs.name,
            ...(attrs.value && { value: attrs.value }),
          }

          switch (nodeType) {
            case "button":
            case "submit":
              if (isSocial) {
                submit.formNoValidate = true
                submit.onClick = (e) => {
                  // we want to submit the form natively on click
                  // so we can redirect to the provider
                  e.currentTarget.type = "submit"
                  e.currentTarget.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true }),
                  )
                }
                return <button {...submit}>{getNodeLabel(node)}</button>
              }
            default:
              return (
                <input
                  name={attrs.name}
                  type={attrs.type}
                  defaultValue={attrs.value}
                  required={attrs.required}
                  disabled={attrs.disabled}
                />
              )
          }
        }
      })}
    </form>
  ) : (
    // highlight-end
    <div>Loading...</div>
  )
}

export default OidcMapping
