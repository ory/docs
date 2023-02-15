import { Configuration, IdentityApi } from "@ory/client"

const identity = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: `${process.env.ORY_ACCESS_TOKEN}`,
  }),
)

export async function getIdentitySessions(
  identityId: string,
  active?: boolean,
  pageNumber?: number,
  pageSize?: number,
) {
  // highlight-start
  return await identity.listIdentitySessions({
    id: identityId,
    active: active, // Optional parameter to filter sessions based on state (active/inactive)
    page: pageNumber, // Optional parameter to receive subsequent pages
    perPage: pageSize, // Optional parameter to control the number of sessions per page (has default fallback value)
  })
  // highlight-end
}
