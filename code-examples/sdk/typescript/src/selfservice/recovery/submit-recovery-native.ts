import { Configuration, FrontendApi, UpdateRecoveryFlowBody } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

export async function submitRecovery(id: string, body: UpdateRecoveryFlowBody) {
  // highlight-start
  return await frontend.updateRecoveryFlow({
    flow: id,
    updateRecoveryFlowBody: body,
  })
  // highlight-end
}
