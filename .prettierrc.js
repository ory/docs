// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  ...require("ory-prettier-styles"),
  overrides: [
    {
      files: ["docs/**/*.md", "docs/**/*.mdx"],
      options: {
        printWidth: 130,
      },
    },
  ],
}
