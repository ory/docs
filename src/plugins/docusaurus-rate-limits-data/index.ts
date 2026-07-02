// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import * as fs from "fs"
import * as path from "path"
import type { PluginModule } from "@docusaurus/types"
import { createCsvProvider } from "../../lib/rate-limits/csv-provider"

const plugin: PluginModule = async (context) => {
  const siteDir = context.siteDir
  const provider = createCsvProvider({ siteDir })
  const [endpoints, thresholds] = await Promise.all([
    provider.getEndpointsByBucket(),
    provider.getThresholds(),
  ])
  const staticDir = path.join(siteDir, "src", "static")
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true })
  }
  const outPath = path.join(staticDir, "rate-limits.json")
  fs.writeFileSync(outPath, JSON.stringify({ endpoints, thresholds }), "utf-8")

  return {
    name: "docusaurus-rate-limits-data",
  }
}

export default plugin
