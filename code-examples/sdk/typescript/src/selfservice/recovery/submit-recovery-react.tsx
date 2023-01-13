import { Configuration, FrontendApi, UpdateRecoveryFlowBody } from "@ory/client"
import { useCallback } from "react"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true, // we need to include cookies
    },
  }),
)

export const SubmitRecovery = useCallback(
  (id: string, body: UpdateRecoveryFlowBody) =>
    // highlight-start
    frontend.updateRecoveryFlow({
      flow: id,
      updateRecoveryFlowBody: body,
    }),
  // highlight-end
  [],
)
