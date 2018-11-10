# Versioning Semantics

The ORY ecosystem consists of multiple services versioned using [semantic versioning](https://semver.org). This section
explains how we define service versions and what they mean.

There are two types of services:

- **Graduated services** change rarely in a backwards incompatible fashion. A service can be considered graduated if
the major version is >= 1 - for example: `v1.0.1`, `v2.2.2`. If a serious backwards incompatible
change is made, the major version jumps one up. Most, if not all, REST APIs will provide backwards compatible transformations that
make it possible to interact with the server using older API concepts.
- **Incubating services** have well defined concepts but do not provide backwards compatible REST APIs yet. Incubating
services are indicated by major version numbers of `0` - for example: `v0.10.0`
- **Sandbox services** may implement concepts, provide APIs and CLIs which are not fully baked yet. It is possible that
these services change in unpredictable ways. These services are indicated by major version numbers of `0` and the
`sandbox` label - for example: `v0.10.0-sandbox`.

To make deployment easier but stay compatible with semantic versioning, each service is equipped with a ecosystem version
number denoted by `+oryos.X` where `X` represents the version ecosystem. This is specifically useful when using
incubating or sandboxed services which do not share the version numbers of graduated services. Let's look at some examples:

- ORY Hydra `v1.0.1+oryos.6` is best compatible with ORY Oathkeeper `v0.12.1+oryos.6` and ORY Keto `v0.5.1-sandbox+oryos.6`.
- ORY Hydra `v1.0.2+oryos.7` is best compatible with ORY Oathkeeper `v0.12.2+oryos.7` and ORY Keto `v0.6.0-sandbox+oryos.7`.
- ORY Hydra `v1.0.3+oryos.8` is probably not fully compatible with ORY Oathkeeper `v0.12.1+oryos.6` nor with ORY Keto
`v0.5.1-sandbox+oryos.6`.
- ORY Hydra `v1.1.0+oryos.9` is best compatible with ORY Oathkeeper `v1.1.0+oryos.9` and ORY Keto `v1.1.0+oryos.9`.

**Important:** Each release - unless explicitly labeled as `-unstable` - is going through extensive quality assurance
and is considered secure and reliable enough to be run in production. If you choose to go with an incubating or sandbox
service, it is likely that you will spend some time addressing breaking changes.

We always provide ways to migrate breaking changes, and all breaking changes are meticolously described in each project's
`UPGRADE.md` as well as `HISTORY.md`.

## Compatibility Matrix

This section will feature a compatibility matrix for each `oryos` in the future.