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

export const CreateLogin = useCallback((aal: string, refresh: boolean) => {
  return ory.createBrowserLoginFlow({
    aal, // the authentication level (e.g. 2FA)
    refresh, // if we already have a session, refresh it.
  })
}, [])
