# ORY Ecosystem

The ORY ecosystem was born out of the need for scalable, cloud native access control mechanisms. Each service in our
portfolio can act on its own, if you combine each part you get a full-scale, production-grade access control system.

Our goal is to reduce the time it takes developers to build authentication, authorization, and access control
systems. The tools we provide address exactly these issues with best practice, hardened security, awesome
open source community management, and professional support.

## Services

### ORY Hydra: OAuth 2.0 and OpenID Connect Server

[ORY Hydra](https://github.com/ory/hydra) is a hardened OAuth2 and OpenID Connect server. It is not an identity provider (user sign up, user log in,
password reset flow), but connects to your existing identity provider (AWS Cognito, Auth0, Keycloak, ...).

This service creates and validates OAuth 2.0 Access, Refresh Tokens, and OpenID ID tokens. It
is perfect for you, if you want to allow 3rd party access to your APIs, have multiple departments in your company,
or a variety of mobile devices.

### ORY Oathkeeper: Identity & Access Proxy

[ORY Oathkeeper](https://github.com/ory/oathkeeper) is an Identity & Access Proxy (IAP) that authorizes HTTP requests based on sets of rules.

An Identity & Access Proxy is typically deployed in front of (think API Gateway) web-facing
applications and is capable of authenticating and optionally authorizing access requests.

WHen a request hits this proxy, it looks for a rule and applies authentication and authorization mechanisms according
to the rule's settings. Additionally, it is capable of convert credentials (e.g. Access Tokens, JWTs, SAML Assertions,
...) to something (e.g. ID Token) that can be easily consumed by your backend services.

### ORY Keto: Access Control Server

[ORY Keto](https://github.com/ory/keto) uses a set of access control policies, similar to [AWS IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html),
in order to determine whether a subject (user, application, service, car, ...) is authorized to perform a certain action on a resource.

Use this service if RBAC or ACLs are too restrictive for you.

### Identity Provider (work in progress)

We are currently developing an identity provider that will be an open source alternative to expensive SaaS solutions.
More details coming soon.
