// Copyright © 2023 Ory Corp
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  docs: [
    {
      type: "category",
      label: "Get started",
      items: ["get-started/single-page-app"],
    },
    {
      type: "category",
      label: "Use cases",
      collapsed: false,
      items: [
        "use-cases/greenfield",
        "use-cases/greenfield-native-app",
        "use-cases/gdpr",
        "use-cases/mailchimp",
        "use-cases/hubspot",
      ],
    },
    {
      type: "category",
      label: "Popular features",
      collapsed: false,
      items: ["use-cases/passwordless", "use-cases/mfa"],
    },
  ],
}
