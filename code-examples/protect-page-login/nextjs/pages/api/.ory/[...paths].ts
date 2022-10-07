// Copyright © 2022 Ory Corp

// @ory/integrations offers a package for integrating with Next.js.
import { config, createApiHandler } from "@ory/integrations/next-edge"

// We need to export the config.
export { config }

// And create the Ory Cloud API "bridge".
export default createApiHandler({
  fallbackToPlayground: true,
})
