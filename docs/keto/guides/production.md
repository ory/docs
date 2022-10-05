---
id: production
title: Going to production
---

:::warning

This document is still in development.

:::

## Database

Ory Keto requires a production-grade database such as PostgreSQL, MySQL, CockroachDB. Don't use SQLite in production!

### Write API

Never expose the Ory Keto Write API to the internet unsecured. Always require authorization. A good practice is to not expose the
Write API at all to the public internet and use a Zero Trust Networking Architecture within your intranet.

## Scaling

There are no additional requirements for scaling Ory Keto, just spin up another container!
