import { Configuration, V0alpha2Api } from "@ory/client"

const basePath = import.meta.env.PROD
  ? "<your-ory-cloud-domain>"
  : "http://localhost:4000/.ory" // the .ory will route your traffic to the proxy

export const ory = new V0alpha2Api(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
      timeout: 10000,
    },
  })
)
