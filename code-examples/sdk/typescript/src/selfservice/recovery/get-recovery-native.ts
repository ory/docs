import { Configuration, FrontendApi } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

export async function getRecovery(id: string) {
  // highlight-start
  return await frontend.getRecoveryFlow({
    id,
  })
  // highlight-end
}
