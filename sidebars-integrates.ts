// sidebars-integrates.ts
import {
  SidebarItem,
  SidebarItemConfig,
} from "@docusaurus/plugin-content-docs/src/sidebars/types"

type SidebarItemsConfig = SidebarItemConfig[]

const integratesSidebar = [
  {
    type: "category",
    label: "Integrations overview",
    link: {
      type: "generated-index",
      slug: "/integrations"
    },
    items: [
            "integrates-with/integrates-apple",
            "integrates-with/integrates-test",
            ],
        },
    ]

export default integratesSidebar