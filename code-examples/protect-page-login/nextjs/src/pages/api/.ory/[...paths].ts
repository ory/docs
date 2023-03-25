// @ory/integrations offers a package for integrating with Next.js in development. It is not needed in production.
// @ory/integrations works in a similar way as ory tunnel, read more about it what it does:
// https://www.ory.sh/docs/guides/cli/proxy-and-tunnel
import { config, createApiHandler } from "@ory/integrations/next-edge"

// We need to export the config.
export { config }

// And create the Ory Network API "bridge".
export default createApiHandler({
  fallbackToPlayground: true,
  dontUseTldForCookieDomain: true,
})
