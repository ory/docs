import { Configuration, IdentityApi } from "@ory/client"

const identity = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: `${process.env.ORY_ACCESS_TOKEN}`,
  }),
)

export async function disableSession(sessionId: string) {
  // highlight-start
  return await identity.disableSession({
    id: sessionId,
  })
  // highlight-end
}
