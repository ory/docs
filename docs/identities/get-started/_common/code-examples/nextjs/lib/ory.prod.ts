import { FrontendApi, Configuration } from "@ory/client-fetch"

const ory = new FrontendApi(
  new Configuration({
    basePath:
      process.env.ORY_SDK_URL || "https://$PROJECT_SLUG.projects.oryapis.com",
  }),
)

export default ory
