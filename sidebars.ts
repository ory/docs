// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

// sidebars.ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs"

// adjust imports depending on how those files export
import networkSidebar from "./sidebars-network"
import oelSidebar from "./sidebars-oel"
import ossSidebar from "./sidebars-oss"

const sidebars: SidebarsConfig = {
  networkSidebar,
  oelSidebar,
  ossSidebar,
}

export default sidebars