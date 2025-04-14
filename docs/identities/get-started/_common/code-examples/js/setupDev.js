import { Configuration, FrontendApi } from "@ory/client-fetch"

const baseUrl = process.env.ORY_SDK_URL || "http://localhost:4000"
const ory = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: baseUrl,
  }),
)
