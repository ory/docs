---
id: ory-kratos-intro
title: Introduction to the Ory Identities (Ory Kratos)
sidebar_label: Introduction
---

Ory Identities (Ory Kratos) is an API-first identity and user management system built following
[cloud architecture best practices](https://www.ory.sh/docs/ecosystem/software-architecture-philosophy/). It implements mechanisms
that allow handling core use cases that the majority of modern software applications have to deal with:

- **Self-service login and registration**: Allow end-users to create and sign in to accounts using username/email and password
  combinations, social sign-in ("Sign in with Google, GitHub"), passwordless flows, and others.
- **Multi-factor authentication (MFA/2FA)**: Support protocols such as TOTP ([RFC 6238](https://tools.ietf.org/html/rfc6238) and
  [IETF RFC 4226](https://tools.ietf.org/html/rfc4226) - better known as
  [Google Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator))
- **Account verification**: Verify that an email address, phone number, or physical address actually belongs to the user.
- **Account recovery**: Allow users to recover access to their account using "Forgot Password" flows or security codes.
- **Profile and account management**: Use secure flows to update passwords, personal details, email addresses, and linked social
  profiles.
- **Admin APIs**: Import, update, and delete user accounts.

:::tip

Ory Identities (Ory Kratos) calls user accounts "identities". Clarity and simplicity are the key focus of the documentation, so we
use these terms "user accounts", "users", and "identities" interchangeably making sure to provide unambiguous and clear
information.

Read [this document](./manage-identities/overview) to learn more about identities in Ory.

:::

Identity is a hard problem that Ory Identities (Ory Kratos) solves in a unique way. We value security, flexibility, and
integration with cloud technology (such as Kubernetes) the most:

- Ory Kratos doesn't ship an HTML Rendering Engine. You use the Ory Account Experience available in The Ory Network or build your own
  UI in the language and framework you feel most comfortable with.
- The workflow engine allows you to fully customize your users' experience. Whether you want users to activate their accounts
  after registration, or have a multi-step (progressive) registration process - it's all possible!
- One [identity schema](./manage-identities/identity-schema) doesn't fit all - you may have customers that need a billing address,
  internal support staff that's assigned to a cost center, and that smart fridge on floor 4. You can accommodate the different
  data models using [JSON Schema](https://json-schema.org/) and make the system work for you - not the other way around.

Ory Identities (Ory Kratos) isn't just about features - it's about security, reliability, and speed. Being the cornerstone of Ory
Network, the service runs in a managed cloud environment and gives you a production-ready way to securely manage your users and
their authentication flows.

When hosted on private infrastructure, Ory Kratos stands out from other solutions because it runs on any operating system (Linux,
macOS, Windows) and on most processors (i386, amd64, ARM). The compiled binary has no system or library or file dependencies and
can be run as a single, static binary on top of, for example, a raw Linux kernel. The binary and Docker images are each less than
20MB in size.

Ory Kratos scales horizontally without effort. The only external dependency is an RDBMS - we support SQLite, PostgreSQL, MySQL,
CockroachDB. You will not need memcached, etcd, or any other system to scale Ory Kratos.

We believe in a strong separation of concerns, which is a guiding principle in the design of each Ory project. As such, we build
software that solves specific problems very well and offloads adjacent issues (such as a user interface) to other applications.
