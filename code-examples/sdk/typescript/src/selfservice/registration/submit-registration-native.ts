import {
  Configuration,
  FrontendApi,
  UpdateRegistrationFlowBody,
} from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

export async function submitRegistration(
  id: string,
  body: UpdateRegistrationFlowBody,
) {
  // highlight-start
  return await frontend.updateRegistrationFlow({
    flow: id,
    updateRegistrationFlowBody: body,
  })
  // highlight-end
}
