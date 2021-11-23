---
id: projects
title: Products
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Ory is an open source ecosystem of services with clear functional boundaries
that solve authentication and authorization:

- Ory Kratos is an identity management server;
- Ory Hydra is an OAuth 2.0 and OpenID Connect provider;
- Ory Oathkeeper is an Identity and Access Rule-based Proxy; and
- Ory Keto is an access control system.

Each service works standalone and can be consumed through REST API and in cases
gRPC APIs. Combine the Ory Open Source products for the full feature set. For
more information about the individual products visit
[Ory on GitHub](https://github.com/ory/).

Almost every application has the concept of users and permissions. An anonymous
user, for example, is allowed to read blog posts while certain authenticated
users are allowed to write blog posts. While this is the basis for most
applications, access control becomes complex as an application grows. What
started with a user's username and password grows to, for example,
machine-2-machine interaction, third-party developers accessing your user's
data, and microservice system architecture.

Ory's projects solve the basic use case and scale to more complex scenarios
without painful and slow upgrade processes.

## ![Ory Kratos](https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-kratos.svg)

The identity management server Ory Kratos provides user management, login, and
registration. It is not necessary to rewrite every aspect of identity management
for every project. Ory Kratos implements all common flows such as login and
logout, account activation, MFA/2FA, profile and session management, user-facing
errors, and account recovery methods. For example, an Ory Docker Image provides
the basis to write a simple UI for numerous languages or frameworks in
compliance with GDPR, common conventions such as address verification data
protection, and privacy protection. Ory Kratos applies security standards
established by experts including the National Institute of Sciences NIST,
Internet Engineering Task Force IETF, Microsoft Research, Google Research, and
Troy Hunt. It is also possible to customize user flows for flexible usage.

## ![Ory Hydra](https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-hydra.svg)

Ory Hydra enables an application to be an OAuth 2.0 and OpenID Connect provider.
Hydra supports applications that work on different devices, that have
machine-2-machine interaction, or enable third-party developers to use an API
(and pay for it). Ory Hydra is not identity management, though. Hydra connects
to identity management systems, e.g. the one from the paragraph above, or any
MySQL+PHP login service, or a Federated SAML SSO and is capable of issuing, in a
secure and OpenID Certified manner, access, refresh, and ID tokens. Hydra can be
used in a 5MB Docker Image with almost no configuration required.

## ![Ory Oathkeeper](https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-oathkeeper.svg)

Ory Oathkeeper prevents unqualified user access to an application through
advanced permission checks and access controls. Ory Oathkeeper defines access
rules for API endpoints e.g. OAuth 2.0 Access Token certain set of permissions,
a valid JSON Web Token, a valid SAML assertion adding a firewall like service in
front of cloud services.

## ![Ory Keto](https://raw.githubusercontent.com/ory/meta/master/static/logos/logo-keto.svg)

Ory Keto provides a system for managing different roles in applications, for
instance, anonymous users (not logged in), authenticated users (logged in), and
administrators. As systems become more complex it is necessary to distinguish
permissions based on the user's organization, the access time (think time lock
in banking), or the billing plan. Cloud infrastructure providers often solve
this functionality using "Access Control Policies". These policies represent
flexible rules and allow for complex access control scenarios. Ory Keto can
authenticate different types of credentials e.g. OAuth 2.0 Access Tokens, SAML
Assertions, JSON Web Tokens, and allows for advanced permission rules or "Access
Control Policies". And, some endpoints police certain sets of credentials e.g.
an OAuth 2.0 Access Token for permission scope.

<img alt="The Ory Ecosystem" src='https://github.com/ory/docs/raw/master/docs/static/img/docs/ory-ecosystem.png'/>

This diagram shows the Ory Ecosystem's full potential. For further information
on the services, the documentation of the individual projects includes copious
details and examples.

[Join the community](./community.md) or [reach out directly](mailto:hi@ory.sh)
if you need consulting with your specific project.
