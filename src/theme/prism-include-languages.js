// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import siteConfig from "@generated/docusaurus.config"

import ketoRelationTuplesPrism from "./ketoRelationTuplesPrism"
import ketoRelationsPermissionsPrism from "./ketoRelationsPermissionsPrism"

// Automatically overrides the docusaurus prism coonfig.

export default function prismIncludeLanguages(PrismObject) {
  const {
    themeConfig: { prism },
  } = siteConfig
  const { additionalLanguages } = prism
  // Prism components work on the Prism instance on the window, while prism-
  // react-renderer uses its own Prism instance. We temporarily mount the
  // instance onto window, import components to enhance it, then remove it to
  // avoid polluting global namespace.
  // You can mutate PrismObject: registering plugins, deleting languages... As
  // long as you don't re-assign it
  globalThis.Prism = PrismObject
  additionalLanguages.forEach((lang) => {
    require(`prismjs/components/prism-${lang}`)
  })

  ketoRelationTuplesPrism(PrismObject)
  ketoRelationsPermissionsPrism(PrismObject)
  delete globalThis.Prism
}
