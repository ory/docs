---
id: index
title: Introduction to Ory OAuth2 & OpenID Connect
sidebar_label: Introduction
---

# Ory OAuth2 & OpenID Connect

OAuth2 is the de-facto standard protocol that enables third-party applications to get limited access to data and services, either
on behalf of a user or for secure machine-to-machine communication. OpenID Connect (OIDC) is a protocol built on top of OAuth2
that adds an additional layer of identity management, enabling clients to verify the identity of end users.

Ory OAuth2 & OpenID Connect is an OAuth 2.0 and OpenID Connect provider available out of the box in the Ory Network. It's based on
the popular, secure, and widely deployed open-source Ory Hydra Federation Server.

:::note

If you want to authenticate your customers using their social sign-in accounts from providers like Facebook or Google, or an
existing single sign-on (SSO), use Ory Identities. It supports login via any OIDC-compliant provider. Read the
[social sign-in documentation](/kratos/social-signin/01_overview.mdx) to learn more.

:::

## Use cases

Ory OAuth2 & OpenID Connect helps you securely connect users, apps, and services using OAuth2 and OpenID Connect. The service fits
into many use cases, including these popular ones:

- **Single sign-on (SSO):** OpenID Connect allows users to authenticate with a single set of credentials across multiple
  applications, eliminating the need for multiple logins.

- **Mobile and third-party application authorization:** OAuth2 allows applications to request authorization to access resources on
  behalf of users. This enables users to give apps limited access to their resources without sharing their credentials.

- **API access management:** You can use OAuth2 to verify the identity of clients that try to access APIs and enforce appropriate
  access control policies based on this identification,

- **Server-to-server communication:** You can use OAuth2 to authorize communication between servers without a user present.

- **Federated identity:** Ory OAuth2 & OpenID Connect allows organizations to become identity providers, authenticate users and
  provide access to applications just like Google, Facebook, or GitHub.

## Why Ory OAuth2 & OpenID Connect?

### OpenID-certified

Ory OAuth2 & OpenID Connect is a [Certified OpenID Connect Implementation](https://openid.net/developers/certified/) that fulfills
all requirements set by the OpenID Foundation.

### Flexible user management

Ory OAuth2 & OpenID Connect is connected to Ory Identities per default. But unlike many other OAuth 2.0 service providers, Ory's
service is a headless API and doesn't force you to use Ory's or any specific user management system. This means that Ory OAuth2 &
OpenID Connect is the perfect fit if you want to become an OAuth2 provider and already have an existing user management system and
the only solution on the market capable of this.

### Cryptographic key storage

In addition to the OAuth 2.0 functionality, Ory OAuth2 & OpenID Connect offers safe storage for cryptographic keys that can be
used, for example, to sign JSON Web Tokens.

### Security-first architecture

The architecture and workflows of Ory OAuth2 & OpenID Connect are designed to neutralize the common attack vectors as listed in
[OWASP Top Ten](https://owasp.org/www-project-top-ten/), as well as numerous less exploited security risks. Read about the
[security architecture](../hydra/security-architecture.md) to learn more.
