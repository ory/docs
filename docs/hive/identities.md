---
id: identities
title: Identities
---

Identities represent subjects (who) in a system. Ory Hive understand two types of identities:

- **End-Users** represent a natural entities (human, user, employee) or legal entities (company).
- **Service Accounts** represent a automated entities (IoT device, server, cron job, service, third-party application).

## Identity Pool

The identity pool is the "source of truth" for all identities. It stores, creates, updates, returns, and deletes
identities.

### Credentials

Each identity has one or more credentials attached to it. Credentials are required for validating an identity (think
passport control). Ory Hive supports the following credential types:

- Password: The most common way of authenticating on the internet today.
- OAuth 2.0 / OpenID Connect: This credential type allows authentication using a third-party identity provider - also
known as Social Sign In. Typically a provider like Google, GitHub, Microsoft, ... *(to be implemented)*
- x509 Client Certificate: Allows the identity to authenticate by providing a x509 Client Certificate during the TLS
handshake. *(to be implemented)*

Each credential type lists one or more unique identifiers that are being used for lookup during the authentication process.
The value of those identifiers depends on the credential type:

- Password:

Assuming the password credential type. The identifier may vary depending on the use case, it could be an email address,
a phone number, a username.



### Limitations

The identity pool is an abstraction which is implemented by different identity pool implementations. The limitations
in this section apply only to identity pool implementations written and maintained by Ory. Any third-party implementations
might not adhere to these limitations.

#### Unique Identifiers and Constraints

The following fields have unique constraints, meaning that no identities may share the same

- email address,
- phone number, or
- username.
