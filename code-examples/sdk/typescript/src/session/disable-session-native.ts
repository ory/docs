import { Configuration, IdentityApi } from "@ory/client"

const identityApi = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: `${process.env.ORY_ACCESS_TOKEN}`,
  }),
)

export async function DisableSession(sessionId: string) {
  // highlight-start
  return await identityApi.disableSession({
    id: sessionId,
  })
  // highlight-end
}
