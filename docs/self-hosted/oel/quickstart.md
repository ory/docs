---
id: quickstart
title: Quickstart
---

This guide explains how to run Ory software if you have purchased an Ory Enterprise License.

## Prerequisites

To be able to run an enterprise build, you need:

- An Ory Enterprise License
- Access to the Ory Enterprise Docker Registry
- CockroachDB Enterprise, PostgreSQL, or MySQL

## Ory Hydra Enterprise Build

The Ory Hydra Enterprise build includes additional features and support for enterprise customers:

- Support for multi-region deployments.
- Database sharding for high scalability and availability.
- Resource Owner Password Credentials grant.
- Ability to customize access, refresh token, and authorization code prefixes.
- Regular releases addressing CVEs and security vulnerabilities.
- Zero-downtime migrations

### Docker

```
docker run -e DSN=cockroach:// {IMAGE}
```

### Helm Chart Installation
