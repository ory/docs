import { FrontendApi, Configuration } from "@ory/client-fetch"

const ory = new FrontendApi(
  new Configuration({
    basePath: process.env.NEXT_PUBLIC_ORY_SDK_URL,
    credentials: "include",
  }),
)

export default ory
