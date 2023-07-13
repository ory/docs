---
id: upgrading
title: Versioning and upgrades
---

## Upgrades

> Running security-critical open source technology in a self-service format requires vigilance. We make your life easier by
> announcing important software updates via the [Ory Security Newsletter](http://eepurl.com/di390P). Never miss an update and
> **[sign up now to important release updates!](http://eepurl.com/di390P)**

Good software improves over time. If it wouldn't, you shouldn't use it. Unfortunately, some of these improvements have breaking
changes. We know that breaking changes are annoying so we want to make upgrading as painless as possible.

We document changelogs and upgrade guides for Ory services:

- Ory Kratos: [upgrade guide](../kratos/guides/upgrade), [changelog](https://github.com/ory/kratos/blob/master/CHANGELOG.md)
- Ory Hydra: [upgrade guide](https://github.com/ory/hydra/blob/master/UPGRADE.md),
  [changelog](https://github.com/ory/hydra/blob/master/CHANGELOG.md)
- Ory Oathkeeper: [upgrade guide](https://github.com/ory/oathkeeper/blob/master/UPGRADE.md),
  [changelog](https://github.com/ory/oathkeeper/blob/master/CHANGELOG.md)
- Ory Keto: [upgrade guide](https://github.com/ory/keto/blob/master/UPGRADE.md),
  [changelog](https://github.com/ory/keto/blob/master/CHANGELOG.md)

Before upgrading to a newer version, please make sure to check with these documents first.

**If you haven't already subscribed to our release announcements, [subscribe now](http://eepurl.com/di390P)!** We announce
important security releases in this newsletter.

## Versioning

The Ory ecosystem consists of multiple services versioned using [semantic versioning](https://semver.org). This section explains
how we define service versions and what they mean.

## Development stages

:::important

**Ory only releases software that is stable and ready for production!**  
The sandbox/incubating stage is an indicator of how much the API could change in the future, including backward incompatible
changes.

Ory was founded in 2015, secures more than 50B requests monthly and is the most trusted open source ecosystem for authentication &
authorization.

:::

There are three main stages of development for services:

- **Graduated:** Mature implementations of proven concepts. They rarely change in backwards incompatible ways. A software is
  considered graduated if the major version is >= 1, for example `v1.0.1`, `v2.2.2`. Backwards incompatible changes are indicated
  by a bump of the major version number. Most, if not all, REST APIs will provide backwards compatible transformations that make
  it possible to interact with the server using older API versions.
- **Incubating:** Implements well defined but not fully matured concepts. Incubating software has a major version number of `0`,
  for example `v0.10.0`. You may see a pre-release version such as `v0.10.0-beta.1`. Incubating software has a higher (but overall
  moderate) probability for larger changes that can break backwards compatibility, for which there are upgrade guides.
- **Sandbox:** Implements concepts, APIs and CLIs at the experimental stage and may change in unpredictable ways. Sandbox software
  has a major version number of `0` with a `alpha` or `beta` pre-release indicator, for example `v0.10.0-alpha.1`. It's more
  likely that you'll encounter a version tag with a `alpha` pre-release version. We will provide upgrade guides wherever possible,
  when they're used in production already.

The following is a list of maturity level per project:

- [Ory Hydra](https://github.com/ory/hydra) is a **graduated** project.
- [Ory Kratos](https://github.com/ory/kratos) is a **graduated** project.
- [Ory Oathkeeper](https://github.com/ory/oathkeeper) is an **incubating** project.
- [Ory Keto](https://github.com/ory/keto) is a **sandbox** project.
