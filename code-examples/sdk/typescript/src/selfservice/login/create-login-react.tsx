import { Configuration, FrontendApi } from "@ory/client"
import { useCallback } from "react"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true, // we need to include cookies
    },
  }),
)

export const createLogin = useCallback((aal: string, refresh: boolean) => {
  // highlight-start
  return frontend.createBrowserLoginFlow({
    aal, // the authentication level (e.g. 2FA)
    refresh, // if we already have a session, refresh it.
  })
  // highlight-end
}, [])
