import { Configuration, IdentityApi } from "@ory/client"

const identity = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: `${process.env.ORY_ACCESS_TOKEN}`,
  }),
)

export async function refreshSession(sessionId: string) {
  // highlight-start
  return await identity.extendSession({
    id: sessionId,
  })
  // highlight-end
}
