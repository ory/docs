import {
  Configuration,
  FrontendApi,
  LoginFlow,
  UiNodeInputAttributes,
  UiNodeScriptAttributes,
} from "@ory/client"
import {
  filterNodesByGroups,
  isUiNodeInputAttributes,
} from "@ory/integrations/ui"
import { HTMLAttributeReferrerPolicy, useEffect, useState } from "react"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true,
    },
  }),
)

function PasswordlessMapping() {
  const [flow, setFlow] = useState<LoginFlow>()

  useEffect(() => {
    frontend.createBrowserLoginFlow().then(({ data: flow }) => setFlow(flow))
  }, [])

  // Add the WebAuthn script to the DOM
  useEffect(() => {
    const scriptNodes = filterNodesByGroups({
      nodes: flow.ui.nodes,
      groups: "webauthn",
      attributes: "text/javascript",
      withoutDefaultGroup: true,
      withoutDefaultAttributes: true,
    }).map((node) => {
      const attr = node.attributes as UiNodeScriptAttributes
      const script = document.createElement("script")
      script.src = attr.src
      script.type = attr.type
      script.async = attr.async
      script.referrerPolicy = attr.referrerpolicy as HTMLAttributeReferrerPolicy
      script.crossOrigin = attr.crossorigin
      script.integrity = attr.integrity
      document.body.appendChild(script)
      return script
    })

    // cleanup
    return () => {
      scriptNodes.forEach((script) => {
        document.body.removeChild(script)
      })
    }
  }, [flow.ui.nodes])

  return flow ? (
    // highlight-start
    <form action={flow.ui.action} method={flow.ui.method}>
      {filterNodesByGroups({
        nodes: flow.ui.nodes,
        // we will also map default fields here but not oidc and password fields
        groups: ["webauthn"],
        attributes: ["hidden", "submit", "button"],
      }).map((node) => {
        if (isUiNodeInputAttributes(node.attributes)) {
          const attrs = node.attributes as UiNodeInputAttributes
          const nodeType = attrs.type
          const submit: any = {
            type: attrs.type as "submit" | "reset" | "button" | undefined,
            name: attrs.name,
            ...(attrs.value && { value: attrs.value }),
          }

          switch (nodeType) {
            case "button":
            case "submit":
              if (attrs.onclick) {
                // This is a bit hacky but it wouldn't work otherwise.
                const oc = attrs.onclick
                submit.onClick = () => {
                  eval(oc)
                }
              }

              return <button disabled={attrs.disabled} {...submit} />
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

export default PasswordlessMapping
