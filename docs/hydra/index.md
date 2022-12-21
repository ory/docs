---
id: index
title: Ory OAuth2 & OpenID Connect
sidebar_label: Introduction
---

OAuth2 is the de-facto standard protocol that enables third-party applications to obtain limited access to data and services,
either on behalf of a user or for secure machine-to-machine communication. OpenID Connect (OIDC) is a protocol that sits on top of
OAuth2 and adds an additional layer of identity management, enabling clients to verify the identity of an end user based.

Ory OAuth2 & OpenID Connect is an OAuth 2.0 and OpenID Connect provider available out of the box in the Ory Network. It is based
on the popular, secure and widely deployed open-source Ory Hydra Federation Server.

:::note

If you are looking to authenticate your customers using social sign-in (e.g. with Facebook or Google) or an existing Single
Sign-On: Ory Identities supports login via any OIDC-compliant provider. [Learn more](/kratos/social-signin/overview)

:::

## Securely connect users, apps and services using OAuth2 and OpenID Connect

- **Single Sign-On (SSO):** OpenID Connect allows users to authenticate with a single set of credentials across multiple
  applications, eliminating the need for multiple logins.

- **Mobile and 3rd Party Application Authorization:** OAuth2 allows applications to request authorization to access resources on
  behalf of a user. This enables users to grant limited access to their resources without sharing their credentials.

- **API Access Management:** OAuth2 can be used to secure APIs by verifying the identity of clients attempting to access them and
  enforcing access control policies.

- **Server-to-Server Communication:** OAuth2 can be used to authorize communication between servers without a user present.

- **Federated Identity:** Ory OpenID Connect enables organizations to use become an identity provider like Google, Facebook or
  Github - to authenticate users and provide access to applications.

## Why Ory OAuth2 & OpenID Connect

### OpenID certified

Ory OAuth2 & OpenID Connect is a [Certified OpenID Connect Implementation](https://openid.net/developers/certified/) that fulfills
all requirements set by the OpenID Foundation.

### Cryptographic key storage

In addition to the OAuth 2.0 functionality, Ory OAuth2 & OpenID Connect offers a safe storage for cryptographic keys (used for
example to sign JSON Web Tokens).

### Flexible user management

Ory OAuth2 & OpenID Connect doesn't force you to use any specific user management system, a particular template engine, or a
predefined front end - unlike many other OAuth 2.0 implementations.

This allows you to build user management and login your way, in your technology stack, with authentication mechanisms required by
your use case.

### Security first

The architecture and workflows of Ory OAuth2 & OpenID Connect are designed to neutralize the common attack vectors (as listed in
[OWASP Top Ten](https://owasp.org/www-project-top-ten/)) and less exploited security risks.
[Read about the security architecture to learn more](./security-architecture.md).
