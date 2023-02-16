import {
  Configuration,
  FrontendApi,
  UpdateVerificationFlowBody,
} from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

export async function submitVerification(
  id: string,
  body: UpdateVerificationFlowBody,
) {
  // highlight-start
  return await frontend.updateVerificationFlow({
    flow: id,
    updateVerificationFlowBody: body,
  })
  // highlight-end
}
