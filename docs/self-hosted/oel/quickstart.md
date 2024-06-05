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

To run the Ory Hydra Enterprise build, you need to set the `DSN` environment variable to the [database connection string](../deployment.md) and provide
a [configuration file](../../hydra/reference/configuration.mdx).

Before deploying the service, you need to apply SQL migrations:

```bash
docker run -e DSN=cockroach:// {IMAGE} -- migrate sql -e  -f /path/to/config.yaml
```

Now you will be able to start the service:

```bash
docker run -e DSN=cockroach:// {IMAGE} -- serve all -f /path/to/config.yaml
```

### Kubernetes

{Explain helm chart installation here}
