import { Configuration, FrontendApi } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

export async function getSessions(sessionId: string, token: string) {
  // highlight-start
  return await frontend.listMySessions({
    xSessionToken: token,
    page: 1, // optional parameter
    perPage: 10, // optional parameter
  })
  // highlight-end
}
