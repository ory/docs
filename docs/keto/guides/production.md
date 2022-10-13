---
id: production
title: Prepare for production
---

Read this document to prepare for production when self-hosting Ory Keto.  
Feel free to open a pull request when you have an idea how to improve this documentation.

## Database

Ory Keto requires a production-grade database such as PostgreSQL, MySQL, CockroachDB. Don't use SQLite in production! Read more
about [deployment fundamentals and requirements for Ory](https://www.ory.sh/docs/ecosystem/deployment).

## Ory Keto Write API behind an API gateway

Although Ory Keto implements all Go best practices around running public-facing production HTTP servers, we discourage running Ory
Keto facing the public net directly. We strongly recommend running Ory Keto behind an API gateway or a load balancer. It's common
to terminate TLS on the edge (gateway / load balancer) and use certificates provided by your infrastructure provider such as AWS
CA for last mile security. A good practice is to not expose the Write API at all to the public internet and use a Zero Trust
networking architecture within your intranet.

## Scaling

There are no additional requirements for scaling when self-hosting Ory Keto, just spin up another container!
