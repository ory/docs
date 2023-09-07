import { Configuration, FrontendApi } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

export async function toSessionWithJwt(sessionId: string) {
  // highlight-start
  const session = await frontend.toSession({
    tokenize_as: "jwt_example_template1",
  })
  const jwt = session.tokenized
  return jwt
  // highlight-end
}
