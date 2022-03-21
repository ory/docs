---
id: upgrade
title: Apply Upgrades
---

:::warning

Back up your data! Applying upgrades can lead to data loss if handled
incorrectly.

:::

This guide covers basics to consider when upgrading Ory Kratos, please also
visit [CHANGELOG.md](https://github.com/ory/kratos/blob/master/CHANGELOG.md) for
more details.

To upgrade Ory Kratos follow these steps:

1. Make a backup.
1. [Install](../install.md) the new version (depending on how you run Ory
   Kratos).
1. **Run [`kratos migrate sql`](../cli/kratos-migrate-sql.md)** to run the SQL
   queries.

> The crucial step of upgrading Ory Kratos is migrating the database schema
> using [`kratos migrate sql`](../cli/kratos-migrate-sql.md) !

Ory Kratos will run the `migrate sql` command for all versions. For example when
upgrading from v0.6 to v0.8, the migrations will run for v0.6 to v0.7 and then
for v0.7 to v0.8. As such upgrading from any version to the latest version
directly is possible. Should you run into problems with a direct upgrade,
consider a stepped upgrade and please visit the community
[chat](https://slack.ory.sh/) or
[discussions](https://github.com/ory/kratos/discussions).

### Upgrade Tips

Take the following steps to ensure no data loss:

> Please note: These are recommendations and should be used with other Ops best
> practices. The steps required for a smooth and secure upgrade process may vary
> with different setups, tech stacks, and environments.

1. Write down a high-level upgrade plan
   - Who will perform the upgrade?
   - How will the upgrade process look?
   - What components are affected?
1. Devise roll-out plan
   - When is the upgrade due?
   - Will there be an outage?
   - How long will it be?
   - What's your rollback plan?
1. Back up everything!
1. Run a trial upgrade on a local environment.
1. Run an upgrade on a staging environment.
1. Perform tests on staging & prepare production environment.
1. Run the upgrade on production.

### Breaking changes overview

- **[Ory Kratos v0.8 Breaking changes](https://github.com/ory/kratos/blob/v0.8.0-alpha.1/CHANGELOG.md#breaking-changes)**
- **[Ory Kratos v0.7 Breaking changes](https://github.com/ory/kratos/blob/v0.7.0-alpha.1/CHANGELOG.md#breaking-changes)**
- **[Ory Kratos v0.6 Breaking changes](https://github.com/ory/kratos/blob/v0.6.0-alpha.1/CHANGELOG.md#breaking-changes)**
- **[Ory Kratos v0.5 Breaking changes](https://github.com/ory/kratos/blob/v0.5.0-alpha.1/CHANGELOG.md#breaking-changes)**

#### v0.7 Changed cookie behavior

In
[Ory Kratos v0.7](https://github.com/ory/kratos/blob/v0.7.0-alpha.1/CHANGELOG.md#breaking-changes)
the cookie behavior has changed. Review
[changes in the exemplary self-service user interface](https://github.com/ory/kratos-selfservice-ui-node/commit/e7fa292968111e06401fcfc9b1dd0e8e285a4d87).  
Visit the
[Cookie Settings](https://www.ory.sh/kratos/docs/guides/multi-domain-cookies/#cookies)
document for more information.

:::note

Skip the hassle of applying upgrades to Ory Kratos? Take a look at
[Ory Cloud](https://www.ory.sh/docs).

:::
