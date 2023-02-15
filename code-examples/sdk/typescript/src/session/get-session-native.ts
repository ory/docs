import { Configuration, IdentityApi } from "@ory/client"

const identity = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: `${process.env.ORY_ACCESS_TOKEN}`,
  }),
)

export async function getSession(
  sessionId: string,
  expandOptions?: Array<"Devices" | "Identity">,
) {
  // highlight-start
  return await identity.getSession({
    id: sessionId,
    expand: expandOptions,
  })
  // highlight-end
}
