import { Configuration, FrontendApi, UpdateLoginFlowBody } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

export async function submitLogin(id: string, body: UpdateLoginFlowBody) {
  // highlight-start
  return await frontend.updateLoginFlow({
    flow: id,
    updateLoginFlowBody: body,
  })
  // highlight-end
}
