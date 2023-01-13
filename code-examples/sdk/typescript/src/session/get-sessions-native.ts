import { Configuration, IdentityApi } from "@ory/client"

const identity = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: `${process.env.ORY_ACCESS_TOKEN}`,
  }),
)

export async function listSessions(
  expandOptions?: Array<"Devices" | "Identity">,
  pageToken?: string,
  pageSize?: number,
  active?: boolean,
) {
  // highlight-start
  // All parameters here are optional
  // Expand options can be used to include data for certain attributes in the response which are not returned by default to improve performance
  // Page Token obtained from the response header has to be set to receive subsequent page data
  return await identity.listSessions({
    expand: expandOptions,
    active: active, // Optional parameter to filter sessions based on state (active/inactive)
    pageToken: pageToken,
    pageSize: pageSize, // Optional parameter to control the number of sessions per page (has default fallback value)
  })
  // highlight-end
}
