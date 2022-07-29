---
id: versioning
title: Software versions
---

The Ory ecosystem consists of multiple services versioned using [semantic versioning](https://semver.org). This section explains
how we define service versions and what they mean.

## Development Stages

:::important

**Ory only releases software that is stable and ready for production!**  
The sandbox/incubating stage is an indicator of _how much_ the API could change in the future, including backwards incompatible
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
- [Ory Oathkeeper](https://github.com/ory/oathkeeper) is an **incubating** project.
- [Ory Kratos](https://github.com/ory/kratos) is an **incubating** project.
- [Ory Keto](https://github.com/ory/keto) is a **sandbox** project.

## Changelog

### March 2020 Change

As of March 2020, the `oryOS` semantics have been deprecated and will no longer be used.

The `oryOS` versioning was introduced as a way to declare compatibility between the different projects. This was necessary as
parts of Ory Hydra were split into new projects called Ory Keto and Ory Oathkeeper.

As of today however, these projects are largely independent. Future versions of these projects will also include versioned APIs
which renders the `oryOS` semantics unnecessary.

If compatibility is an issue, it will be highlighted in the project's documentation.

The next sections document the previous behavior and are kept for historical reasons.

Old documentation links with `oryOS.<x>` in the URL are going to keep working in the foreseeable future.

#### oryOS Semantics

To make deployment easier but stay compatible with semantic versioning, each service is equipped with a `oryOS` version number
denoted by `+oryOS.X` where `X` represents the "ecosystem" version. This is useful if you use more than one service from the Ory
ecosystem. Let's look at some examples:

- Ory Hydra `v1.0.1+oryOS.6` is best compatible with Ory Oathkeeper `v0.13.1+oryOS.6` and Ory Keto `v0.5.1+oryOS.6`.
- Ory Hydra `v1.0.2+oryOS.7` is best compatible with Ory Oathkeeper `v0.13.2+oryOS.7` and Ory Keto `v0.6.0+oryOS.7`.
- Ory Hydra `v1.0.3+oryOS.8` is probably not fully compatible with Ory Oathkeeper `v0.13.1+oryOS.6` nor with Ory Keto
  `v0.5.1+oryOS.6`.
- Ory Hydra `v1.1.0+oryOS.9` is best compatible with Ory Oathkeeper `v1.1.0+oryOS.9` and Ory Keto `v1.1.0+oryOS.9`.

It's possible that a number of releases are versioned with the same `oryOS.x` version metadata:

- Ory Hydra `v1.0.1+oryOS.10`, `v1.0.2+oryOS.10` is guaranteed compatible with Ory Oathkeeper `v0.15.5+oryOS.10`,
  `v1.16.0+oryOS.10` and Ory Keto `v0.1.1+oryOS.10`, `v0.1.2+oryOS.10`.

We always provide ways to migrate breaking changes, and all breaking changes are meticulously described in each project's
`UPGRADE.md` as well as `HISTORY.md`.

## Compatibility

This compatibility matrix shows which versions are compatible with one another.

| oryOS      | Documentation | Ory Hydra                                                                                                                                          | Ory Keto                                                               | Ory Oathkeeper                                                                                                                                                                                                                                             | Ory Kratos                                                                                                                                                                                                                                                                                                         |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `oryOS.18` | `oryOS.18`    | `v1.4.2`, `v1.4.1`, `v1.4.0`                                                                                                                       | `v0.5.3-alpha.1`, `v0.5.2-alpha.1`, `v0.5.1-alpha.1`, `v0.5.0-alpha.1` | `v0.37.1-beta.1`, `v0.37.0-beta.1`                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.17` | `oryOS.17`    | `v1.3.2`, `v1.3.1`, `v1.3.0`                                                                                                                       | `v0.4.4-alpha.1`, `v0.4.5-alpha.1`                                     | `v0.36.0-beta.4`, `v0.36.0-beta.3`, `v0.36.0-beta.2`, `v0.36.0-beta.1`                                                                                                                                                                                     | `v0.1.1-alpha.1`                                                                                                                                                                                                                                                                                                   |
| `oryOS.16` | `oryOS.16`    | `v1.2.3`                                                                                                                                           | `v0.4.3-alpha.2`                                                       | `v0.35.5-beta.2`                                                                                                                                                                                                                                           | `v0.1.0-alpha.1`, `v0.1.0-alpha.6`, `v0.1.0-alpha.5`, `v0.1.0-alpha.4`, `v0.1.0-alpha.3`, `v0.1.0-alpha.2`                                                                                                                                                                                                         |
| `oryOS.15` | `oryOS.15`    | `v1.2.1`, `v1.2.0`, `v1.2.0-alpha.3`, `v1.2.0-alpha.2`, `v1.2.0-alpha.1`, `v1.2.2`                                                                 | `v0.4.2-alpha.1`, `v0.4.0-sandbox`, `v0.4.0-alpha.1`, `v0.4.3-alpha.1` | `v0.35.1-beta.1`, `v0.35.0-alpha.1`, `v0.35.5-beta.1`, `v0.35.4-beta.1`                                                                                                                                                                                    | `v0.0.3-alpha.10`, `v0.0.3-alpha.9`, `v0.0.3-alpha.7`, `v0.0.3-alpha.5`, `v0.0.3-alpha.4`, `v0.0.3-alpha.3`, `v0.0.3-alpha.2`, `v0.0.3-alpha.1`, `v0.0.1-alpha.11`, `v0.0.1-alpha.9`, `v0.0.2-alpha.1`, `v0.0.1-alpha.8`, `v0.0.1-alpha.6`, `v0.0.1-alpha.5`, `v0.0.1-alpha.3`, `v0.0.1-alpha.2`, `v0.0.1-alpha.1` |
| `oryOS.14` | `oryOS.14`    | `v1.1.1`                                                                                                                                           | `v0.3.10-sandbox`, `v0.3.9-sandbox`, `v0.3.8-sandbox`                  | `v0.34.0-beta.1`                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.13` | `oryOS.13`    | `v1.1.0`                                                                                                                                           | `v0.3.8-sandbox`, `v0.3.7-sandbox`                                     | `v0.33.1-beta.1`, `v0.33.0-beta.1`                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.12` | `oryOS.12`    | `v1.0.0-rc.14`, `v1.0.0-rc.15`, `v1.0.0`, `v1.0.0-rc.16`, `v1.0.3`, `v1.0.2`, `v1.0.1`, `v1.0.8`, `v1.0.7`, `v1.0.6`, `v1.0.5`, `v1.0.4`, `v1.0.9` | `v0.3.3-sandbox`, `v0.3.6-sandbox`, `v0.3.5-sandbox`                   | `v0.16.0-beta.3`, `v0.16.0-beta.4`, `v0.16.0-beta.5`, `v0.19.0-beta.1`, `v0.18.0-beta.1`, `v0.17.4-beta.1`, `v0.17.3-beta.1`, `v0.17.2-beta.1`, `v0.17.1-beta.1`, `v0.17.0-beta.1`, `v0.19.3-beta.1`, `v0.32.0-beta.1`, `v0.31.0-beta.1`, `v0.32.1-beta.1` |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.11` | `oryOS.11`    | `v1.0.0-rc.10`, `v1.0.0-rc.11`, `v1.0.0-rc.12`                                                                                                     | `v0.3.0-sandbox`, `v0.3.1-sandbox`                                     | `v0.15.0`, `v0.15.1`, `v0.15.2`                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.10` | `oryOS.10`    | `v1.0.0-rc.5`, `v1.0.0-rc.6`, `v1.0.0-rc.7`, `v1.0.0-rc.8`, `v1.0.0-rc.9`                                                                          | `v0.2.2-sandbox`, `v0.2.3-sandbox`, `v0.2.1-sandbox`, `v0.2.0-sandbox` | `v0.14.2`, `v0.14.1`, `v0.14.0`                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.9`  | `oryOS.9`     | `v1.0.0-beta.9`, `v1.0.0-rc.2`, `v1.0.0-rc.3`, `v1.0.0-rc.4`                                                                                       | `v0.1.9-sandbox`                                                       | `v0.13.9`                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.8`  | `oryOS.8`     | `v1.0.0-beta.8`                                                                                                                                    | `v0.1.8-sandbox`                                                       | `v0.13.8`                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.7`  | `oryOS.7`     | `v1.0.0-beta.7`                                                                                                                                    | `v0.1.7-sandbox`                                                       | `v0.13.7`                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.6`  | `oryOS.6`     | `v1.0.0-beta.6`                                                                                                                                    | `v0.1.6-sandbox`                                                       | `v0.13.6`                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.5`  | `oryOS.5`     | `v1.0.0-beta.5`                                                                                                                                    | `v0.1.5-sandbox`                                                       | `v0.13.5`                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.4`  | `oryOS.4`     | `v1.0.0-beta.4`                                                                                                                                    | `v0.1.4-sandbox`                                                       | `v0.13.4`                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.3`  | `oryOS.3`     | `v1.0.0-beta.3`                                                                                                                                    | `v0.1.3-sandbox`                                                       | `v0.13.3`                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.2`  | `oryOS.2`     | `v1.0.0-beta.2`                                                                                                                                    | `v0.1.2-sandbox`                                                       | `v0.13.2`                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                    |
| `oryOS.1`  | `oryOS.1`     | `v1.0.0-beta.1`                                                                                                                                    | `v0.1.1-sandbox`                                                       | `v0.13.1`                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                    |

### Package repository limitations

Several package repositories such as [Docker Hub](https://github.com/moby/moby/issues/16304), NPM, and others don't allow build
metadata in the version tag.

Therefore, we generally strip the `oryOS` metadata from the versions published on package repositories (for example NPM, Ruby
Gems, Packagist, Maven Central, Go ...).

### January 2020 Change

As of January 2020 (oryOS.15) we will no longer use `-sandbox` to indicate the sandbox stage. Instead, please check the
[maturity](#maturity) section. We made this change because some package manager (for example Ruby Gems) don't allow the `-sandbox`
suffix in the version.

### November 2018 Change

If you are an adopter of the Ory Keto or Ory Oathkeeper prior to November 2018, this section is for you.

#### Why

Before November 2018, Ory Keto and Ory Oathkeeper were available as versions `v1.0.0-beta.1` through `v1.0.0-beta.9`. We wanted to
make versioning as easy as possible across all services. For example, if you ran Ory Hydra `v1.2.3` and Ory Oathkeeper `v1.2.3`
both versions would be guaranteed compatible.

This turned out to be a bad decision because of multiple factors:

1. As Ory Hydra was moving towards `v1.0.0`, Ory Oathkeeper and Ory Keto were still rather new projects and some of them required
   breaking changes to improve the value of the technology. But semantic versioning, which is a de-facto standard, has strong
   implications on breaking changes in software labeled as `v1.x.y`. While we had plans to add tags like `-sandbox` to software,
   labeled as `v1` but not fully matured, we quickly realized that this would only add to confusion.
2. While certain services matured rather quickly and the community was eagerly awaiting the next release, we had to hold back
   because of unfinished changes to other projects. Ory Hydra `v1.0.0-rc.2` was put on delay because we wanted other systems to
   feel `v1`-ish, which required a lot of work, stress and caused delays. This lead to a misalignment between what the community
   wants (Ory Hydra rc1) and what had to be added to the roadmap in order to comply with the versioning concept.
3. We're working towards an open source identity management system (Ory Hive) which will stay in sandbox and incubation for a
   while due to its complexity. We didn't want to give the impression that MVPs are `v1` or even `v2`.

Our plan to help developers understand which versions are compatible with one another backfired and instead we delayed releases
and developers were confused as to the maturity of the individual services.

#### Upgrading

The new versioning framework was published in November 2018 at the top of this page. This is an overview of the things that
changed.

##### Ory Hydra

No changes to the versioning will be made. The next release will remain `v1.0.0-rc.2+oryOS.9`.

Going forward, the npm package `ory-hydra-sdk` will no longer be continued. Instead, new versions will be pushed to `@oryd/hydra`.
Version `v1.0.0-beta.9` will be the last available version at `ory-hydra-sdk`. Version `v1.0.0-rc.2+oryOS.9` will be the first
version available at `@oryd/hydra`.

###### Version Matrix

| Old version     | Re-released as                  | NPM                           | Docker Hub                       |
| --------------- | ------------------------------- | ----------------------------- | -------------------------------- |
| `v1.0.0-beta.9` | -                               | `ory-hydra-sdk:v1.0.0-beta.9` | `oryd/hydra:v1.0.0-beta.9`       |
| -               | `v1.0.0-rc.2+oryOS.9` (example) | `@oryd/hydra:v1.0.0-rc.2`     | `oryd/hydra:v1.0.0-rc.2_oryOS.9` |

##### Ory Oathkeeper

Ory Oathkeeper is a service in incubation phase. To comply with the new versioning framework, the following changes will be made:

- [GitHub Releases](https://github.com/ory/oathkeeper/releases) `v1.0.0-beta.1` to `v1.0.0-beta.9` have been removed as well as
  their binaries uploaded to GitHub Releases. Releases `v1.0.0-beta.1` to `v1.0.0-beta.9`, including binaries, have been
  re-released as `v0.13.1+oryOS.1` to `v0.13.9+oryOS.9`. Binaries, code, and functionality for versions `v1.0.0-beta.2+oryOS.2`
  and `v0.13.2+oryOS.2` are equal.
- [Git Tags](https://github.com/ory/oathkeeper/tags) will be removed on **Jan 15th 2019**. Until then, you will be able to check
  out the specific commits using for example `git checkout v1.0.0-beta.2 -b my-branch`. Tags `v1.0.0-beta.1` to `v1.0.0-beta.9`
  will be re-released as `v0.13.1+oryOS.1` to `v0.13.9+oryOS.2`. After Jan 15th 2019 you will be able to get the same
  functionality as before, but you have to change the tag from `v1.0.0-beta.x` to `v0.13.x+oryOS.x`.
- Versions `v1.0.0-beta.1` to `v1.0.0-beta.9` will be removed from
  [Docker Hub `oryd/oathkeeper`](https://hub.docker.com/r/oryd/oathkeeper/) on **Jan 15th 2019**. These have been re-released
  according to the same rules that apply for Git Tags, but with `_oryOS.x` instead of `+oryOS.x`. Image
  `oryd/oathkeeper:v1.0.0-beta.2` will thus be available as `oryd/oathkeeper:v0.13.2_oryOS.2`.
- The npm package [`ory-oathkeeper-sdk`](https://www.npmjs.com/package/ory-oathkeeper-sdk) will be deprecated. The new npm package
  will be available at `@oryd/oathkeeper`. The new npm package will only serve versions under the new format `v0.13.x+oryOS.x`.

###### Version Matrix

| Old version     | Re-released as                | NPM                                                                          | Docker Hub                                                                                 |
| --------------- | ----------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `v1.0.0-beta.1` | `v0.13.1+oryOS.1`             | `@oryd/oathkeeper:v0.13.1`, `ory-oathkeeper-sdk:v1.0.0-beta.1` (deprecated!) | `oryd/oathkeeper:v0.13.1_oryOS.1`, `oryd/oathkeeper:v1.0.0-beta.1` (deleted Jan 15th 2019) |
| `v1.0.0-beta.2` | `v0.13.2+oryOS.2`             | `@oryd/oathkeeper:v0.13.2`, `ory-oathkeeper-sdk:v1.0.0-beta.2` (deprecated!) | `oryd/oathkeeper:v0.13.2_oryOS.2`, `oryd/oathkeeper:v1.0.0-beta.2` (deleted Jan 15th 2019) |
| `v1.0.0-beta.3` | `v0.13.3+oryOS.3`             | `@oryd/oathkeeper:v0.13.3`, `ory-oathkeeper-sdk:v1.0.0-beta.3` (deprecated!) | `oryd/oathkeeper:v0.13.3_oryOS.3`, `oryd/oathkeeper:v1.0.0-beta.3` (deleted Jan 15th 2019) |
| `v1.0.0-beta.4` | `v0.13.4+oryOS.4`             | `@oryd/oathkeeper:v0.13.4`, `ory-oathkeeper-sdk:v1.0.0-beta.4` (deprecated!) | `oryd/oathkeeper:v0.13.4_oryOS.4`, `oryd/oathkeeper:v1.0.0-beta.4` (deleted Jan 15th 2019) |
| `v1.0.0-beta.5` | `v0.13.5+oryOS.5`             | `@oryd/oathkeeper:v0.13.5`, `ory-oathkeeper-sdk:v1.0.0-beta.5` (deprecated!) | `oryd/oathkeeper:v0.13.5_oryOS.5`, `oryd/oathkeeper:v1.0.0-beta.5` (deleted Jan 15th 2019) |
| `v1.0.0-beta.6` | `v0.13.6+oryOS.6`             | `@oryd/oathkeeper:v0.13.6`, `ory-oathkeeper-sdk:v1.0.0-beta.6` (deprecated!) | `oryd/oathkeeper:v0.13.6_oryOS.6`, `oryd/oathkeeper:v1.0.0-beta.6` (deleted Jan 15th 2019) |
| `v1.0.0-beta.7` | `v0.13.7+oryOS.7`             | `@oryd/oathkeeper:v0.13.7`, `ory-oathkeeper-sdk:v1.0.0-beta.7` (deprecated!) | `oryd/oathkeeper:v0.13.7_oryOS.7`, `oryd/oathkeeper:v1.0.0-beta.7` (deleted Jan 15th 2019) |
| `v1.0.0-beta.8` | `v0.13.8+oryOS.8`             | `@oryd/oathkeeper:v0.13.8`, `ory-oathkeeper-sdk:v1.0.0-beta.8` (deprecated!) | `oryd/oathkeeper:v0.13.8_oryOS.8`, `oryd/oathkeeper:v1.0.0-beta.8` (deleted Jan 15th 2019) |
| `v1.0.0-beta.9` | `v0.13.9+oryOS.9`             | `@oryd/oathkeeper:v0.13.9`, `ory-oathkeeper-sdk:v1.0.0-beta.9` (deprecated!) | `oryd/oathkeeper:v0.13.9_oryOS.9`, `oryd/oathkeeper:v1.0.0-beta.9` (deleted Jan 15th 2019) |
| -               | `v0.13.10+oryOS.10` (example) | `@oryd/oathkeeper:v0.13.10`                                                  | `oryd/oathkeeper:v0.13.10_oryOS.10`                                                        |

> No code or database changes will be required when moving from `v1.0.0-beta.x` to `v0.13.x+oryOS.x`

##### Ory Keto

Ory Keto is a service in sandbox phase. To comply with the new versioning rules, the following changes will be made:

- [GitHub Releases](https://github.com/ory/keto/releases) `v1.0.0-beta.1` to `v1.0.0-beta.9` have been removed as well as their
  binaries uploaded to GitHub Releases. Releases `v1.0.0-beta.1` to `v1.0.0-beta.9`, including binaries, have been re-released as
  `v0.1.1-sandbox+oryOS.1` to `v0.1.9-sandbox+oryOS.9`. Binaries, code, and functionality for versions `v1.0.0-beta.2` and
  `v0.1.2-sandbox+oryOS.2` are equal.
- [Git Tags](https://github.com/ory/keto/tags) will be removed on **Jan 15th 2019**. Until then, you will be able to check out the
  specific commits using for example `git checkout v1.0.0-beta.2 -b my-branch`. Tags `v1.0.0-beta.1` to `v1.0.0-beta.9` will be
  re-released as `v0.1.1-sandbox+oryOS.1` to `v0.1.9-sandbox+oryOS.9`. After Jan 15th 2019 you will be able to get the same
  functionality as before, but you have to change the tag from `v1.0.0-beta.x` to `v0.1.x-sandbox+oryOS.x`.
- Versions `v1.0.0-beta.1` to `v1.0.0-beta.9` will be removed from [Docker Hub `oryd/keto`](https://hub.docker.com/r/oryd/keto/)
  on **Jan 15th 2019**. These have been re-released according to the same rules that apply for Git Tags. Image
  `oryd/keto:v1.0.0-beta.2` will thus be available as `oryd/keto:v0.1.2-sandbox_oryOS.2`.
- The npm package [`ory-keto-sdk`](https://www.npmjs.com/package/ory-keto-sdk) will be deprecated. The new npm package will be
  available at `@oryd/keto`. The new npm package will only serve versions under the new format `v0.1.x-sandbox+oryOS.x`.

###### Version Matrix

| Old version     | Re-released as                       | NPM                                                                     | Docker Hub                                                                            |
| --------------- | ------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `v1.0.0-beta.1` | `v0.1.1-sandbox+oryOS.1`             | `@oryd/keto:v0.1.1-sandbox`, `ory-keto-sdk:v1.0.0-beta.1` (deprecated!) | `oryd/keto:v0.1.1-sandbox_oryOS.1`, `oryd/keto:v1.0.0-beta.1` (deleted Jan 15th 2019) |
| `v1.0.0-beta.2` | `v0.1.2-sandbox+oryOS.2`             | `@oryd/keto:v0.1.2-sandbox`, `ory-keto-sdk:v1.0.0-beta.2` (deprecated!) | `oryd/keto:v0.1.2-sandbox_oryOS.2`, `oryd/keto:v1.0.0-beta.2` (deleted Jan 15th 2019) |
| `v1.0.0-beta.3` | `v0.1.3-sandbox+oryOS.3`             | `@oryd/keto:v0.1.3-sandbox`, `ory-keto-sdk:v1.0.0-beta.3` (deprecated!) | `oryd/keto:v0.1.3-sandbox_oryOS.3`, `oryd/keto:v1.0.0-beta.3` (deleted Jan 15th 2019) |
| `v1.0.0-beta.4` | `v0.1.4-sandbox+oryOS.4`             | `@oryd/keto:v0.1.4-sandbox`, `ory-keto-sdk:v1.0.0-beta.4` (deprecated!) | `oryd/keto:v0.1.4-sandbox_oryOS.4`, `oryd/keto:v1.0.0-beta.4` (deleted Jan 15th 2019) |
| `v1.0.0-beta.5` | `v0.1.5-sandbox+oryOS.5`             | `@oryd/keto:v0.1.5-sandbox`, `ory-keto-sdk:v1.0.0-beta.5` (deprecated!) | `oryd/keto:v0.1.5-sandbox_oryOS.5`, `oryd/keto:v1.0.0-beta.5` (deleted Jan 15th 2019) |
| `v1.0.0-beta.6` | `v0.1.6-sandbox+oryOS.6`             | `@oryd/keto:v0.1.6-sandbox`, `ory-keto-sdk:v1.0.0-beta.6` (deprecated!) | `oryd/keto:v0.1.6-sandbox_oryOS.6`, `oryd/keto:v1.0.0-beta.6` (deleted Jan 15th 2019) |
| `v1.0.0-beta.7` | `v0.1.7-sandbox+oryOS.7`             | `@oryd/keto:v0.1.7-sandbox`, `ory-keto-sdk:v1.0.0-beta.7` (deprecated!) | `oryd/keto:v0.1.7-sandbox_oryOS.7`, `oryd/keto:v1.0.0-beta.7` (deleted Jan 15th 2019) |
| `v1.0.0-beta.8` | `v0.1.8-sandbox+oryOS.8`             | `@oryd/keto:v0.1.8-sandbox`, `ory-keto-sdk:v1.0.0-beta.8` (deprecated!) | `oryd/keto:v0.1.8-sandbox_oryOS.8`, `oryd/keto:v1.0.0-beta.8` (deleted Jan 15th 2019) |
| `v1.0.0-beta.9` | `v0.1.9-sandbox+oryOS.9`             | `@oryd/keto:v0.1.9-sandbox`, `ory-keto-sdk:v1.0.0-beta.9` (deprecated!) | `oryd/keto:v0.1.9-sandbox_oryOS.9`, `oryd/keto:v1.0.0-beta.9` (deleted Jan 15th 2019) |
| -               | `v0.1.10-sandbox+oryOS.10` (example) | `@oryd/keto:v0.1.10-sandbox`                                            | `oryd/keto:v0.1.10-sandbox_oryOS.10`                                                  |

> No code or database changes will be required when moving from `v1.0.0-beta.x` to `v0.1.x-sandbox`

##### Ory Docs

> If you are looking for the old developer guide, [click here](https://www.ory.sh/docs/deprecated/latest/).

The documentation got a major overhaul. We deprecated GitBook, which is no longer being developed, and moved to
[Docusaurus](https://docusaurus.io/). Additionally, the API documentation is now integrated in Docusaurus using
[widdershins](https://github.com/Mermade/widdershins) with custom templates, and no longer uses SwaggerUI. This is great, because
everything is now in one place - and we added code examples for consuming the REST API for all major programming languages!

The new documentation will serve documentation the latest version (new version semantics) only, this will be `oryOS.9`. This means
that the following versions will be documented in the new docs:

- Ory Hydra `v1.0.0-beta.9`
- Ory Oathkeeper `v0.13.9+oryOS.9`
- Ory Keto `v0.1.9-sandbox+oryOS.9`

If you need to look up documentation on older versions (in the old format), you will be able to do so
[here](https://www.ory.sh/docs/deprecated/latest/). This documentation will be available for a reasonable amount of time and you
will receive a notice with ample time if we shut that down. You can view the legacy REST API Documentation by browsing to the
[hosted swagger ui](https://petstore.swagger.io/) and entering, for example,
`https://raw.githubusercontent.com/ory/keto/v1.0.0-beta.8/docs/api.swagger.json` in the top bar.

##### Ory Security Console

The Ory Security Console will be compatible with `oryOS.9`. While we work on implementing the new changes there you might see
error messages regarding compatibility. You may ignore them for now.

##### Outlook

Versions `v1.0.0-beta.1` to `v1.0.0-beta.9` are blacklisted for Ory Oathkeeper and Ory Keto. No future release will have those
versions. This will prevent potential future conflicts.

##### Conflict Resolution

If you need help with these changes or want us to handle these updates for you, [write us now](mailto:hi@ory.sh).
