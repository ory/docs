// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

export interface ProductLineConfig {
  name: string;
  products: {
    identities: string;
    oauth2: string;
    permissions: string;
    saml: string;
    oathkeeper: string;
    elements: string;
  };
  features: string[];
  urls: {
    console?: string;
    signup?: string;
    download?: string;
  };
  cliCommands?: {
    install?: string;
    serve?: string;
  };
}

export type ProductLineKey = 'network' | 'oel' | 'oss';
export type ProductKey = keyof ProductLineConfig['products'];

export const productLineConfig: Record<ProductLineKey, ProductLineConfig> = {
  network: {
    name: 'Ory Network',
    products: {
      identities: 'Ory Identities',
      oauth2: 'Ory OAuth2',
      permissions: 'Ory Permissions',
      saml: 'Ory SAML',
      oathkeeper: 'Ory Zero Trust',
      elements: 'Ory Elements',
    },
    features: ['cloud', 'console', 'multi-region', 'sla', 'managed'],
    urls: {
      console: 'https://console.ory.sh',
      signup: 'https://console.ory.sh/registration',
    },
  },
  oel: {
    name: 'Ory Enterprise License',
    products: {
      identities: 'Ory Kratos',
      oauth2: 'Ory Hydra',
      permissions: 'Ory Keto',
      saml: 'Ory Polis',
      oathkeeper: 'Ory Oathkeeper',
      elements: 'Ory Elements',
    },
    features: ['self-hosted', 'enterprise-support', 'license-management'],
    urls: {
      download: 'https://github.com/ory',
    },
    cliCommands: {
      install: 'docker pull oryd/kratos:latest',
      serve: 'kratos serve --config kratos.yml',
    },
  },
  oss: {
    name: 'Open Source',
    products: {
      identities: 'Ory Kratos',
      oauth2: 'Ory Hydra',
      permissions: 'Ory Keto',
      saml: 'Ory Polis',
      oathkeeper: 'Ory Oathkeeper',
      elements: 'Ory Elements',
    },
    features: ['self-hosted', 'community-support', 'open-source'],
    urls: {
      download: 'https://github.com/ory',
    },
    cliCommands: {
      install: 'docker pull oryd/kratos:latest',
      serve: 'kratos serve --config kratos.yml',
    },
  },
};
