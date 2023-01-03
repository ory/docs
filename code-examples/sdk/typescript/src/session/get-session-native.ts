import { Configuration, IdentityApi } from "@ory/client"

const identityApi = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: `${process.env.ORY_ACCESS_TOKEN}`,
  }),
)

export async function GetSession(
  sessionId: string,
  expandOptions?: Array<"Devices" | "Identity">,
) {
  // highlight-start
  return await identityApi.getSession({
    id: sessionId,
    expand: expandOptions,
  })
  // highlight-end
}
