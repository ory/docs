// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/overview'],
    },
    {
      type: 'category',
      label: 'Ory Identities',
      items: ['identities/overview'],
    },
    {
      type: 'category',
      label: 'Ory OAuth2',
      items: ['oauth2-oidc/overview'],
    },
  ],
};

export default sidebars;