import {
  Configuration,
  FrontendApi,
  UpdateRegistrationFlowBody,
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

export const SubmitRegistration = useCallback(
  // highlight-start
  (id: string, body: UpdateRegistrationFlowBody) =>
    ory.updateRegistrationFlow({
      flow: id,
      updateRegistrationFlowBody: body,
    }),
  // highlight-end
  [],
)
