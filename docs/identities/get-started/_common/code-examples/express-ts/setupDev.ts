import { Configuration, FrontendApi } from "@ory/client-fetch"

const baseUrl = process.env.ORY_SDK_URL || "http://localhost:4000"

const ory = new FrontendApi(
  new Configuration({
    basePath: baseUrl,
  }),
)


