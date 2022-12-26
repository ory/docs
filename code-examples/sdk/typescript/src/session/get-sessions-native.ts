import { Configuration, IdentityApi } from "@ory/client"

const identityApi = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    apiKey: `${process.env.ORY_ACCESS_TOKEN}`,
  }),
)

export async function ListSessions(
  expandOptions: Array<"Devices" | "Identity">,
  pageToken: string,
  pageSize: number,
  active?: boolean,
) {
  // highlight-start
  return await identityApi.listSessions({
    expand: expandOptions,
    active: active,
    pageToken: pageToken,
    pageSize: pageSize,
  })
  // highlight-end
}
