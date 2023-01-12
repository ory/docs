import {
  Configuration,
  FrontendApi,
  UpdateVerificationFlowBody,
} from "@ory/client"
import { useCallback } from "react"

const ory = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true, // we need to include cookies
    },
  }),
)

export const SubmitVerification = useCallback(
  // highlight-start
  (id: string, body: UpdateVerificationFlowBody) =>
    ory.updateVerificationFlow({
      flow: id,
      updateVerificationFlowBody: body,
    }),
  // highlight-end
  [],
)
