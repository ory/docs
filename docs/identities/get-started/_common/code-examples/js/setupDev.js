import { Configuration, FrontendApi } from "@ory/client-fetch"

export const baseUrl = process.env.ORY_SDK_URL || "http://localhost:4000"

export const ory = new FrontendApi(
  new Configuration({
    basePath: baseUrl,
  }),
)
