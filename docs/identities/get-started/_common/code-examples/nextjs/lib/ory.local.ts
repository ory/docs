import { FrontendApi, Configuration } from "@ory/client-fetch"

const ory = new FrontendApi(
  new Configuration({
    basePath: process.env.ORY_SDK_URL || "http://localhost:3000",
  }),
)

export default ory
