// Copyright © 2026 Ory Corp
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  ...require("ory-prettier-styles"),
  overrides: [
    {
      // The deviceauthn partials carry inline <SameDeploymentLink> elements whose
      // opening tags exceed 80 characters. At the default width, prettier pushes
      // those tags onto their own lines, which MDX then parses as block-level JSX
      // and breaks the surrounding paragraph or list item.
      files: [
        "docs/**/*.md",
        "docs/**/*.mdx",
        "src/components/Shared/kratos/passwordless/deviceauthn/*.mdx",
        "src/components/Shared/kratos/01_mfa-overview.mdx",
      ],
      options: {
        printWidth: 130,
      },
    },
  ],
}
