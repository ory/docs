import { Configuration, FrontendApi } from "@ory/client"
import { useCallback } from "react"

const ory = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true, // we need to include cookies
    },
  }),
)

export const CreateRecovery = useCallback(
  () =>
    // highlight-start
    ory.createBrowserRecoveryFlow(),
  // highlight-end
  [],
)
