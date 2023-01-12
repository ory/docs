import { Configuration, FrontendApi, UpdateLoginFlowBody } from "@ory/client"

const ory = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true, // we need to include cookies
    },
  }),
)

const SubmitLogin = (id: string, body: UpdateLoginFlowBody) =>
  ory.updateLoginFlow({
    flow: id,
    updateLoginFlowBody: body,
  })
