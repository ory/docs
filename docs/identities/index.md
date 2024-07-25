---
id: index
title: Introduction to Ory Identities
sidebar_label: Ory Identities
displayed_sidebar: identities
---

Ory Identities is designed to handle core authentication use cases in modern software applications, such as self-service login and
registration, multi-factor authentication, account verification, and recovery. It is is an API-first identity and user management
system built on top of the widely deployed open-source [Ory Kratos Identity Server](https://github.com/ory/kratos). Ory Identities
also offers admin APIs for user management and supports flexible user experiences through its customizable workflow engine.

## Features

### Cookie-based security

Enhance browser security with anti-CSRF cookies, protect against common attack vectors such as XSS and CSRF, and maintain that
session states securely. [Read more about it here](../security-model.mdx)

### Native and browser APIs

Integrate seamlessly with mobile or native apps and web browsers using robust APIs.

Read more about it [here](native-browser.mdx).

### Self-service flows

Registration, login, logout, multi-factor authentication, settings, verification, and recovery.

Read more about it [here](../kratos/self-service.mdx).

### Authentication methods

Passwords, passwordless code, Passkeys, social sign-in, multi-factor authentication.

Read more about it [here](../kratos/concepts/credentials.mdx).

### Identity schema

Customize and extend user data models to fit application-specific needs.

Read more about it [here](../kratos/manage-identities/01_overview.mdx).

### Identity management

Manage user identities with CRUD (Create, Read, Update, Delete) operations.

Read more about it [here](../category/identity-management/).

### Session management

Control user sessions, including lifespan, refresh, and revocation.

Read more about it [here](../kratos/session-management/01_overview.mdx).

### User interface

Build custom user interfaces for authentication and profile management using Ory SDKs and REST APIs to match your applications
design.

Read more about it [here](../account-experience/index.mdx).

### Send emails & SMS

Email and SMS notifications for verification, recovery, and multi-factor authentication. Customize SMPT/HTTP and SMS server and
templates.

Read more about it [here](../kratos/emails-sms/05_custom-email-templates.mdx).

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
