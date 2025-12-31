---
id: production
title: Prepare for production
---

Read this document to prepare for production when self-hosting Ory Keto.  
Feel free to [open an issue or pull request](https://github.com/ory/docs/) when you have an idea how to improve this
documentation.

Read more about [deployment fundamentals and requirements for Ory](../../oss/deployment).

## Database

Ory Keto requires a production-grade database such as PostgreSQL, MySQL, CockroachDB. Don't use SQLite in production! Read more
about [deployment fundamentals and requirements for Ory](../../oss/deployment).

## Ory Keto API behind an API gateway

Although Ory Keto implements all Go best practices around running public-facing production HTTP servers, we discourage running Ory
Keto facing the public net directly. We strongly recommend running Ory Keto behind an API gateway or a load balancer. It's common
to terminate TLS on the edge (gateway / load balancer) and use certificates provided by your infrastructure provider such as AWS
CA for last mile security. A good practice is to not expose the Write API at all to the public internet. The Read API should also
be protected, depending on your usecase it can reveal expose information (for example leak who has permission to do something).
Use a Zero Trust networking architecture within your intranet.

## Scaling

There are no additional requirements for scaling when self-hosting Ory Keto, just spin up another container!
