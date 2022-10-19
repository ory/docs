---
id: index
title: Introduction to Ory OAuth2 & OpenID Connect (Ory Hydra)
sidebar_label: Introduction
---

Ory OAuth2 & OpenID Connect (based on the Ory Hydra Federation Server) is an OAuth 2.0 and OpenID Connect provider available out
of the box in the Ory Network. It issues OAuth 2.0 access, refresh, and ID tokens that allow third parties to access APIs in the
name of your users.

## Flexible user management

One of the biggest advantages of Ory OAuth2 & OpenID Connect is that, unlike other OAuth 2.0 implementations, it doesn't force you
to use any specific user management system, a particular template engine, or a predefined front end.

This allows you to implement user management and login your way, in your technology stack, with authentication mechanisms required
by your use case.

## OpenID certified

Ory OAuth2 & OpenID Connect is a [Certified OpenID Connect Implementation](https://openid.net/developers/certified/) that fulfills
all requirements set by the OpenID Foundation.

## Cryptographic key storage

In addition to the OAuth 2.0 functionality, Ory OAuth2 & OpenID Connect offers a safe storage for cryptographic keys (used for
example to sign JSON Web Tokens).

## Security first

The architecture and workflows of Ory OAuth2 & OpenID Connect are designed to neutralize the common attack vectors (as listed in
[OWASP Top Ten](https://owasp.org/www-project-top-ten/)) and less exploited security risks.
[Read about the security architecture to learn more](./security-architecture.md).

## Is Ory OAuth2 & OpenID Connect the right fit for you?

OAuth 2.0 can be used in many environments for various purposes. This list gives you some use cases where the OAuth protocol and
Ory OAuth2 & OpenID Connect work great:

✅ Enabling third party solutions to access your APIs. </br>
✅ Enabling browser, mobile, or wearable applications to access your APIs. </br>
✅ Becoming an Identity Provider like Google, Facebook, or Microsoft. </br>
✅ Controlling the types of information your backend services can get from each other. </br>
