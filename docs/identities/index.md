---
id: index
title: Introduction to Ory Identities
sidebar_label: Ory Identities
---

Ory Identities is an API-first identity and user management system built on top of the widely deployed open-source
[Ory Kratos Identity Server](https://github.com/ory/kratos) following
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

Ory Identities calls user accounts "identities". The terms "user accounts", "users", and "identities" are used interchangeably in
the Ory documentation. Read [more here](../kratos/manage-identities/01_overview.mdx) to learn more about identities in Ory.

:::

Identity is a hard problem that Ory Identities solves in a unique way. Ory values security, flexibility, and integration with
cloud technology such as Kubernetes the most:

- Ory Identities doesn't ship an HTML Rendering Engine. You use the Ory Account Experience available in Ory Network or build your
  own UI in the language and framework you feel most comfortable with.
- The workflow engine allows you to fully customize your users' experience. Whether you want users to activate their accounts
  after registration, or have a multi-step (progressive) registration process - it's all possible!
- One [identity schema](../kratos/manage-identities/01_overview.mdx) doesn't fit all - you may have customers that need a billing
  address, have multiple email addresses, or internal support staff that's assigned to a cost center. You can accommodate the
  different data models using [JSON Schema](https://json-schema.org/) and make the system work for you - not the other way around.

Ory Identities isn't just about features - it's about security, reliability, and speed. As a cornerstone of Ory Network, Ory
Identities runs in a managed cloud environment and gives you a production-ready solution to securely manage users and
authentication flows.

When hosted on premise, Ory Identities stands out from other solutions because it runs on any operating system such as Linux,
macOS, or Windows, and on most processors such as i386, amd64, or ARM. The compiled binary has no system or library or file
dependencies and can be run as a single, static binary on top of, for example, a raw Linux kernel. Ory Identities self-hosted
scales horizontally without effort. The only external dependency is an RDBMS - we support SQLite, PostgreSQL, MySQL, CockroachDB.
You will not need memcached, etcd, or a similar system to scale.

Ory believes in a strong separation of concerns, which is a guiding principle in the design of each Ory project. As such, Ory
software is built to solve a specific problem well and offload adjacent issues such as a user interfaces to other applications.

## Features

### Cookie-based security

Enhance browser security with anti-CSRF cookies, protect against common attack vectors such as XSS and CSRF, and maintain that
session states securely. [Read more about it here](../security-model.mdx)

### Native and browser APIs

Integrate seamlessly with mobile or native apps and web browsers using robust APIs. Read more about it [here](native-browser.mdx).

### Self-service flows

Registration, login, logout, multi-factor authentication, settings, verification, and recovery. Read more about it
[here](../kratos/self-service.mdx).

### Authentication methods

Passwords, passwordless code, Passkeys, social sign-in, multi-factor authentication. Read more about it
[here](../kratos/concepts/credentials.mdx).

### Identity schema

Customize and extend user data models to fit application-specific needs. Read more about it
[here](../kratos/manage-identities/01_overview.mdx).

### Identity management

Manage user identities with CRUD (Create, Read, Update, Delete) operations. Read more about it
[here](../kratos/manage-identities/01_overview.mdx).

### Session management

Control user sessions, including lifespan, refresh, and revocation. Read more about it
[here](../kratos/session-management/01_overview.mdx).

### User interface

Build custom user interfaces for authentication and profile management using Ory SDKs and REST APIs to match your applications
design. Read more about it [here](../account-experience/index.mdx).

### Send emails & SMS

Email and SMS notifications for verification, recovery, and multi-factor authentication. Customize SMPT/HTTP and SMS server and
templates. Read more about it [here](../kratos/emails-sms/05_custom-email-templates.mdx).

## Benefits

Ory Identities offers several key benefits that make it an ideal solution for managing user identities, authentication, and access
control. By leveraging Ory Identities, you can:

**Accelerate development** Hit the ground running with a comprehensive user management system that supports a wide range of
authentication methods and identity management features. Ory Identities adheres to industry standards, allowing you to streamline
authentication across apps and services and focus on your core business.

**Ensure compliance**: Ory Identities is designed to meet the latest security standards and regulatory requirements such as GDPR,
simplifying the process of ensuring compliance. It helps you address legal and industry-specific data protection mandates
effectively.

**Own your user experience**: Ory Identities allows you to use a custom UI that matches the exact branding and flow you need to
improve user experience.

**Scale to millions**: Built on a cloud-native architecture, Ory Identities scales effortlessly to accommodate growing user bases,
whether you're managing thousands or millions of users. Its flexible design ensures consistent performance and reliability as your
needs evolve.

**Mitigate Security Risks**: With a security-first approach Ory Identities minimizes attack surface. It safeguards user data and
prevents unauthorized access and malicious attacks, providing robust protection for both users and data.

## Usecases

- B2C (Business-to-Consumer): Provide seamless registration, login, and profile management for customers using your apps and
  services directly. This includes social logins, passwordless options, and robust account recovery mechanisms.
- B2B (Business-to-Business): Create secure logins and access controls for partner organizations or client companies to manage
  their accounts, view orders, and interact with your services. Enable streamlined authentication for employees of partner
  organizations, allowing them to access your B2B applications using their company credentials.
- Workforce: Onboard new employees, manage user accounts, roles, and identities within your organization's systems. Multi-factor
  authentication (MFA) and breached password protection for added security
- Enterprise: Consolidate user accounts and identities across multi-tenant brands, applications and systems. Use Ory Identities to
  streamline user onboarding, offboarding, and permission management. Seamlessly connect with existing enterprise identity
  providers and other 3rd party systems.

## Next steps

Read more about the Ory Identities [security model](../security-model.mdx) and try out one of the
[Ory Network Identities quickstart guides](../getting-started/overview) for your framework or programming language to learn how to
add login and registration to your app in minutes.
