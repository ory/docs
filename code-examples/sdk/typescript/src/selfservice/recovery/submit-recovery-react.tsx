import {
  Configuration,
  FrontendApi,
  RecoveryFlow,
  UiNode,
  UiNodeInputAttributes,
  UpdateRecoveryFlowBody,
} from "@ory/client"
import {
  filterNodesByGroups,
  isUiNodeInputAttributes,
} from "@ory/integrations/ui"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true, // we need to include cookies
    },
  }),
)

export const Recovery = () => {
  const [flow, setFlow] = useState<RecoveryFlow>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const id = searchParams.get("flow")

    // highlight-start
    frontend
      .getRecoveryFlow({
        id: id,
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

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    // map the entire form data to JSON for the request body
    let body = Object.fromEntries(formData) as unknown as UpdateRecoveryFlowBody

    // We need the method specified from the name and value of the submit button.
    // when multiple submit buttons are present, the clicked one's value is used.
    if ("submitter" in event.nativeEvent) {
      const method = (
        event.nativeEvent as unknown as { submitter: HTMLInputElement }
      ).submitter
      body = {
        ...body,
        ...{ [method.name]: method.value },
      }
    }

    // highlight-start
    frontend
      .updateRecoveryFlow({
        flow: flow.id,
        updateRecoveryFlowBody: body,
      })
      .then(() => {
        navigate("/", { replace: true })
      })
      .catch((err: AxiosError) => {
        // handle the error
        if (err.response.status === 400) {
          // user input error
          // show the error messages in the UI
          setFlow(err.response.data)
        }
      })
    // highlight-end
  }

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
    <form action={flow.ui.action} method={flow.ui.method} onSubmit={submit}>
      {filterNodesByGroups({
        nodes: flow.ui.nodes,
        // we will also map default fields here such as csrf_token
        // this only maps the `code` and `link` method
        groups: ["default", "code", "link"],
      }).map((node, idx) => mapUINode(node, idx))}
    </form>
  ) : (
    // highlight-end
    <div>Loading...</div>
  )
}
