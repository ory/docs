import { Configuration, FrontendApi } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

export async function checkSession(sessionId: string, token: string) {
  // highlight-start
  return await frontend.toSession({
    xSessionToken: token,
  })
  // highlight-end
}
