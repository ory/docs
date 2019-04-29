---
id: versioning
title: Software Versions
---

> Running security-critical open source technology in a self-service format requires vigilance. We make your life easier
by announcing important software updates via the
[ORY Security Newsletter](https://ory.us10.list-manage.com/subscribe?u=ffb1a878e4ec6c0ed312a3480&id=f605a41b53). Never miss
an update and **[sign up now to important release updates!](https://ory.us10.list-manage.com/subscribe?u=ffb1a878e4ec6c0ed312a3480&id=f605a41b53)**

The ORY ecosystem consists of multiple services versioned using [semantic versioning](https://semver.org). This section
explains how we define service versions and what they mean.

There are two types of services:

- **Graduated services** change rarely in a backwards incompatible fashion. A service can be considered graduated if
the major version is >= 1 - for example: `v1.0.1`, `v2.2.2`. If a serious backwards incompatible
change is made, the major version jumps one up. Most, if not all, REST APIs will provide backwards compatible transformations that
make it possible to interact with the server using older API concepts.
- **Incubating services** implement well defined concepts but do not provide backwards compatible REST APIs yet. Incubating
services are indicated by major version numbers of `0` - for example: `v0.10.0`. There is a very low risk of breaking
backwards compatibility with regards to concepts and there will always be upgrade guides.
- **Sandbox services** may implement concepts, provide APIs and CLIs which are not fully baked yet. It is possible that
these services change in unpredictable ways. These services are indicated by major version numbers of `0` and the
`sandbox` label - for example: `v0.10.0-sandbox`. We will provide upgrade guides wherever possible and when adopters
rely in production on that particular service.

To make deployment easier but stay compatible with semantic versioning, each service is equipped with a `oryOS` version
number denoted by `+oryOS.X` where `X` represents the "ecosystem" version. This is especially useful if you use more
than one service from the ORY ecosystem. Let's look at some examples:

- ORY Hydra `v1.0.1+oryOS.6` is best compatible with ORY Oathkeeper `v0.13.1+oryOS.6` and ORY Keto `v0.5.1-sandbox+oryOS.6`.
- ORY Hydra `v1.0.2+oryOS.7` is best compatible with ORY Oathkeeper `v0.13.2+oryOS.7` and ORY Keto `v0.6.0-sandbox+oryOS.7`.
- ORY Hydra `v1.0.3+oryOS.8` is probably not fully compatible with ORY Oathkeeper `v0.13.1+oryOS.6` nor with ORY Keto
`v0.5.1-sandbox+oryOS.6`.
- ORY Hydra `v1.1.0+oryOS.9` is best compatible with ORY Oathkeeper `v1.1.0+oryOS.9` and ORY Keto `v1.1.0+oryOS.9`.

It is possible that a number of releases are versioned with the same `oryOS.x` version metadata:

- ORY Hdyra `v1.0.1+oryOS.10`, `v1.0.2+oryOS.10` is guaranteed compatible with ORY Oathkeeper `v0.15.5+oryOS.10`, `v1.16.0+oryOS.10`
and ORY Keto `v0.1.1+oryOS.10`, `v0.1.2+oryOS.10`.

> Each release - unless explicitly labeled as `-unstable` - is going through extensive quality assurance
and is considered secure and reliable enough to be run in production. If you choose to go with an incubating or sandbox
service, it is likely that you will spend some time addressing breaking changes.

We always provide ways to migrate breaking changes, and all breaking changes are meticulously described in each project's
`UPGRADE.md` as well as `HISTORY.md`.

## Compatibility

This compatibility matrix shows which versions are compatible with one another.

| oryOS         | Documentation | ORY Hydra                 | ORY Keto                 | ORY Oathkeeper         |
| ------------- | ------------- | ------------------------  | ------------------------ | ---------------------- |
| `oryOS.10`    | `oryOS.10`    | `v1.0.0-rc.5+oryOS.10`, `v1.0.0-rc.6+oryOS.10`, `v1.0.0-rc.7+oryOS.10`, `v1.0.0-rc.8+oryOS.10` , `v1.0.0-rc.9+oryOS.10` | `v0.2.2-sandbox+oryOS.10`| `v0.14.2+oryOS.10`     |
| `oryOS.9`     | `oryOS.9`     | `v1.0.0-beta.9`, `v1.0.0-rc.2+oryOS.9`, `v1.0.0-rc.3+oryOS.9`, `v1.0.0-rc.4+oryOS.9`           | `v0.1.9-sandbox+oryOS.9` | `v0.13.9+oryOS.9`      |
| `oryOS.8`     |               | `v1.0.0-beta.8`           | `v0.1.8-sandbox+oryOS.8` | `v0.13.8+oryOS.8`      |
| `oryOS.7`     |               | `v1.0.0-beta.7`           | `v0.1.7-sandbox+oryOS.7` | `v0.13.7+oryOS.7`      |
| `oryOS.6`     |               | `v1.0.0-beta.6`           | `v0.1.6-sandbox+oryOS.6` | `v0.13.6+oryOS.6`      |
| `oryOS.5`     |               | `v1.0.0-beta.5`           | `v0.1.5-sandbox+oryOS.5` | `v0.13.5+oryOS.5`      |
| `oryOS.4`     |               | `v1.0.0-beta.4`           | `v0.1.4-sandbox+oryOS.4` | `v0.13.4+oryOS.4`      |
| `oryOS.3`     |               | `v1.0.0-beta.3`           | `v0.1.3-sandbox+oryOS.3` | `v0.13.3+oryOS.3`      |
| `oryOS.2`     |               | `v1.0.0-beta.2`           | `v0.1.2-sandbox+oryOS.2` | `v0.13.2+oryOS.2`      |
| `oryOS.1`     |               | `v1.0.0-beta.1`           | `v0.1.1-sandbox+oryOS.1` | `v0.13.1+oryOS.1`      |
| `oryOS.1`     |               | `v1.0.0-beta.1`           | `v0.1.1-sandbox+oryOS.1` | `v0.13.1+oryOS.1`      |

### Docker Hub and NPM

[Docker does not allow `+` in version tags](https://github.com/moby/moby/issues/16304) and
[Docker is not fully semver compatible](https://github.com/docker/distribution/pull/1202#issuecomment-161075954).

As we still want to provide you with a way of checking if you have the right docker image, the `+` symbol will be
replaced by `_`. For example, ORY Hydra `v1.2.3+oryOS.123` is available on Docker as `v1.2.3_oryOS.123`.

NPM also does not support `+` in version tags. Since npm modules are only required for interacting with the service
itself, `+oryOS` is not available in npm packages at all.

| Example version        | Docker Hub                             | NPM               |
| ---------------------- | -------------------------------------- | ----------------- |
| `v1.2.3-rc1+oryOS.123` | `v1.2.3-rc1_oryOS.123`                 | `v1.2.3-rc1`      |

## November 2018 Change

If you are an adopter of the ORY Keto ory ORY Oathkeeper prior to November 2018, this
section is for you.

### Why

Before November 2018, ORY Keto and ORY Oathkeeper were available as versions `v1.0.0-beta.1` through `v1.0.0-beta.9`.
We wanted to make versioning as easy as possible across all services. For example, if you ran ORY Hydra `v1.2.3` and ORY Oathkeeper
`v1.2.3` both versions would be guaranteed compatible.

This turned out to be a bad decision because of multiple factors:

1. As ORY Hydra was moving towards `v1.0.0`, ORY Oathkeeper and ORY Keto were still rather new projects and some of them
required breaking changes to improve the value of the technology. But semantic versioning, which is a de-facto standard,
has strong implications on breaking changes in software labeled as `v1.x.y`. While we had
plans to add tags like `-sandbox` to software, labeled as `v1` but not fully matured, we quickly realized that this would
only add to confusion.
2. While certain services matured rather quickly and the community was eagerly awaiting the next release, we had to hold
back because of unfinished changes to other projects. ORY Hydra `v1.0.0-rc.2` was put on delay because we
wanted other systems to feel `v1`-ish, which required a lot of work, stress and caused delays. This lead to a misalignment
between what the community wants (ORY Hydra rc1) and what had to be added to the roadmap in order to comply with the
versioning concept.
3. We are working towards an open source identity management system (ORY Hive) which will stay in sandbox and incubation
for a while due to its complexity. We definitely did not want to give the impression that early MVPs are `v1` or even `v2`.

Our plan to help developers understand which versions are compatible with one another backfired and instead we delayed
releases and developers were confused as to the maturity of the individual services.

### Upgrading

The new versioning framework was published in November 2018 at the top of this page. This is an overview of the things that
changed.

#### ORY Hydra

No changes to the versioning will be made. The next release will remain `v1.0.0-rc.2+oryOS.9`.

Going forward, the npm package `ory-hydra-sdk` will no longer be continued. Instead, new versions will be pushed to
`@oryd/hydra`. Version `v1.0.0-beta.9` will be the last available version at `ory-hydra-sdk`. Version `v1.0.0-rc.2+oryOS.9`
will be the first version available at `@oryd/hydra`.

##### Version Matrix

| Old version     | Re-released as                    | NPM                           | Docker Hub                        |
| --------------- | --------------------------------- | ----------------------------- | --------------------------------- |
| `v1.0.0-beta.9` | -                                 | `ory-hydra-sdk:v1.0.0-beta.9` | `oryd/hydra:v1.0.0-beta.9`        |
| -               | `v1.0.0-rc.2+oryOS.9` (example)   | `@oryd/hydra:v1.0.0-rc.2`     | `oryd/hydra:v1.0.0-rc.2_oryOS.9`  |

#### ORY Oathkeeper

ORY Oathkeeper is a service in incubation phase. To comply with the new versioning framework,
the following changes will be made:

* [GitHub Releases](https://github.com/ory/oathkeeper/releases) `v1.0.0-beta.1` to `v1.0.0-beta.9`
have been removed as well as their binaries uploaded to GitHub Releases.
Releases `v1.0.0-beta.1` to `v1.0.0-beta.9`, including binaries, have been re-released as
`v0.13.1+oryOS.1` to `v0.13.9+oryOS.9`. Binaries, code, and functionality for versions `v1.0.0-beta.2+oryOS.2` and `v0.13.2+oryOS.2` are
equal.
* [Git Tags](https://github.com/ory/oathkeeper/tags) will be removed on **Jan 15th 2019**. Until then, you will
be able to check out the specific commits using e.g. `git checkout v1.0.0-beta.2 -b my-branch`. Tags `v1.0.0-beta.1`
to `v1.0.0-beta.9` will be re-released as `v0.13.1+oryOS.1` to `v0.13.9+oryOS.2`. After Jan 15th 2019 you will be able
to get the same functionality as before, but you have to change the tag from `v1.0.0-beta.x` to `v0.13.x+oryOS.x`.
* Versions `v1.0.0-beta.1` to `v1.0.0-beta.9` will be removed from
[Docker Hub `oryd/oathkeeper`](https://hub.docker.com/r/oryd/oathkeeper/) on **Jan 15th 2019**. These have been
re-released according to the same rules that apply for Git Tags, but with `_oryOS.x` instead of `+oryOS.x`. Image `oryd/oathkeeper:v1.0.0-beta.2` will
thus be available as `oryd/oathkeeper:v0.13.2_oryOS.2`.
* The npm package [`ory-oathkeeper-sdk`](https://www.npmjs.com/package/ory-oathkeeper-sdk) will be deprecated. The new
npm package will be available at `@oryd/oathkeeper`. The new npm package will only serve versions under the new
format `v0.13.x+oryOS.x`.

##### Version Matrix

| Old version     | Re-released as                | NPM                           | Docker Hub                     |
| --------------- | ----------------------------- | ----------------------------- | ------------------------------ |
| `v1.0.0-beta.1` | `v0.13.1+oryOS.1`             | `@oryd/oathkeeper:v0.13.1`, `ory-oathkeeper-sdk:v1.0.0-beta.1` (deprecated!) | `oryd/oathkeeper:v0.13.1_oryOS.1`, `oryd/oathkeeper:v1.0.0-beta.1` (deleted Jan 15th 2019) |
| `v1.0.0-beta.2` | `v0.13.2+oryOS.2`             | `@oryd/oathkeeper:v0.13.2`, `ory-oathkeeper-sdk:v1.0.0-beta.2` (deprecated!) | `oryd/oathkeeper:v0.13.2_oryOS.2`, `oryd/oathkeeper:v1.0.0-beta.2` (deleted Jan 15th 2019) |
| `v1.0.0-beta.3` | `v0.13.3+oryOS.3`             | `@oryd/oathkeeper:v0.13.3`, `ory-oathkeeper-sdk:v1.0.0-beta.3` (deprecated!) | `oryd/oathkeeper:v0.13.3_oryOS.3`, `oryd/oathkeeper:v1.0.0-beta.3` (deleted Jan 15th 2019) |
| `v1.0.0-beta.4` | `v0.13.4+oryOS.4`             | `@oryd/oathkeeper:v0.13.4`, `ory-oathkeeper-sdk:v1.0.0-beta.4` (deprecated!) | `oryd/oathkeeper:v0.13.4_oryOS.4`, `oryd/oathkeeper:v1.0.0-beta.4` (deleted Jan 15th 2019) |
| `v1.0.0-beta.5` | `v0.13.5+oryOS.5`             | `@oryd/oathkeeper:v0.13.5`, `ory-oathkeeper-sdk:v1.0.0-beta.5` (deprecated!) | `oryd/oathkeeper:v0.13.5_oryOS.5`, `oryd/oathkeeper:v1.0.0-beta.5` (deleted Jan 15th 2019) |
| `v1.0.0-beta.6` | `v0.13.6+oryOS.6`             | `@oryd/oathkeeper:v0.13.6`, `ory-oathkeeper-sdk:v1.0.0-beta.6` (deprecated!) | `oryd/oathkeeper:v0.13.6_oryOS.6`, `oryd/oathkeeper:v1.0.0-beta.6` (deleted Jan 15th 2019) |
| `v1.0.0-beta.7` | `v0.13.7+oryOS.7`             | `@oryd/oathkeeper:v0.13.7`, `ory-oathkeeper-sdk:v1.0.0-beta.7` (deprecated!) | `oryd/oathkeeper:v0.13.7_oryOS.7`, `oryd/oathkeeper:v1.0.0-beta.7` (deleted Jan 15th 2019) |
| `v1.0.0-beta.8` | `v0.13.8+oryOS.8`             | `@oryd/oathkeeper:v0.13.8`, `ory-oathkeeper-sdk:v1.0.0-beta.8` (deprecated!) | `oryd/oathkeeper:v0.13.8_oryOS.8`, `oryd/oathkeeper:v1.0.0-beta.8` (deleted Jan 15th 2019) |
| `v1.0.0-beta.9` | `v0.13.9+oryOS.9`             | `@oryd/oathkeeper:v0.13.9`, `ory-oathkeeper-sdk:v1.0.0-beta.9` (deprecated!) | `oryd/oathkeeper:v0.13.9_oryOS.9`, `oryd/oathkeeper:v1.0.0-beta.9` (deleted Jan 15th 2019) |
| -               | `v0.13.10+oryOS.10` (example) | `@oryd/oathkeeper:v0.13.10` | `oryd/oathkeeper:v0.13.10_oryOS.10` |

> No code or database changes will be required when moving from `v1.0.0-beta.x` to `v0.13.x+oryOS.x`

#### ORY Keto

ORY Keto is a service in sandbox phase. To comply with the new versioning rules, the following changes will be made:

* [GitHub Releases](https://github.com/ory/keto/releases) `v1.0.0-beta.1` to `v1.0.0-beta.9`
have been removed as well as their binaries uploaded to GitHub Releases.
Releases `v1.0.0-beta.1` to `v1.0.0-beta.9`, including binaries, have been re-released as
`v0.1.1-sandbox+oryOS.1` to `v0.1.9-sandbox+oryOS.9`. Binaries, code, and functionality for versions `v1.0.0-beta.2` and `v0.1.2-sandbox+oryOS.2` are
equal.
* [Git Tags](https://github.com/ory/keto/tags) will be removed on **Jan 15th 2019**. Until then, you will
be able to check out the specific commits using e.g. `git checkout v1.0.0-beta.2 -b my-branch`. Tags `v1.0.0-beta.1`
to `v1.0.0-beta.9` will be re-released as `v0.1.1-sandbox+oryOS.1` to `v0.1.9-sandbox+oryOS.9`. After Jan 15th 2019 you will be able
to get the same functionality as before, but you have to change the tag from `v1.0.0-beta.x` to `v0.1.x-sandbox+oryOS.x`.
* Versions `v1.0.0-beta.1` to `v1.0.0-beta.9` will be removed from
[Docker Hub `oryd/keto`](https://hub.docker.com/r/oryd/keto/) on **Jan 15th 2019**. These have been
re-released according to the same rules that apply for Git Tags. Image `oryd/keto:v1.0.0-beta.2` will
thus be available as `oryd/keto:v0.1.2-sandbox_oryOS.2`.
* The npm package [`ory-keto-sdk`](https://www.npmjs.com/package/ory-keto-sdk) will be deprecated. The new
npm package will be available at `@oryd/keto`. The new npm package will only serve versions under the new
format `v0.1.x-sandbox+oryOS.x`.

##### Version Matrix

| Old version     | Re-released as                                 | NPM                           | Docker Hub                     |
| --------------- | ------------------------------------- | ----------------------------- | ------------------------------ |
| `v1.0.0-beta.1` | `v0.1.1-sandbox+oryOS.1`              | `@oryd/keto:v0.1.1-sandbox`, `ory-keto-sdk:v1.0.0-beta.1` (deprecated!) | `oryd/keto:v0.1.1-sandbox_oryOS.1`, `oryd/keto:v1.0.0-beta.1` (deleted Jan 15th 2019) |
| `v1.0.0-beta.2` | `v0.1.2-sandbox+oryOS.2`              | `@oryd/keto:v0.1.2-sandbox`, `ory-keto-sdk:v1.0.0-beta.2` (deprecated!) | `oryd/keto:v0.1.2-sandbox_oryOS.2`, `oryd/keto:v1.0.0-beta.2` (deleted Jan 15th 2019) |
| `v1.0.0-beta.3` | `v0.1.3-sandbox+oryOS.3`              | `@oryd/keto:v0.1.3-sandbox`, `ory-keto-sdk:v1.0.0-beta.3` (deprecated!) | `oryd/keto:v0.1.3-sandbox_oryOS.3`, `oryd/keto:v1.0.0-beta.3` (deleted Jan 15th 2019) |
| `v1.0.0-beta.4` | `v0.1.4-sandbox+oryOS.4`              | `@oryd/keto:v0.1.4-sandbox`, `ory-keto-sdk:v1.0.0-beta.4` (deprecated!) | `oryd/keto:v0.1.4-sandbox_oryOS.4`, `oryd/keto:v1.0.0-beta.4` (deleted Jan 15th 2019) |
| `v1.0.0-beta.5` | `v0.1.5-sandbox+oryOS.5`              | `@oryd/keto:v0.1.5-sandbox`, `ory-keto-sdk:v1.0.0-beta.5` (deprecated!) | `oryd/keto:v0.1.5-sandbox_oryOS.5`, `oryd/keto:v1.0.0-beta.5` (deleted Jan 15th 2019) |
| `v1.0.0-beta.6` | `v0.1.6-sandbox+oryOS.6`              | `@oryd/keto:v0.1.6-sandbox`, `ory-keto-sdk:v1.0.0-beta.6` (deprecated!) | `oryd/keto:v0.1.6-sandbox_oryOS.6`, `oryd/keto:v1.0.0-beta.6` (deleted Jan 15th 2019) |
| `v1.0.0-beta.7` | `v0.1.7-sandbox+oryOS.7`              | `@oryd/keto:v0.1.7-sandbox`, `ory-keto-sdk:v1.0.0-beta.7` (deprecated!) | `oryd/keto:v0.1.7-sandbox_oryOS.7`, `oryd/keto:v1.0.0-beta.7` (deleted Jan 15th 2019) |
| `v1.0.0-beta.8` | `v0.1.8-sandbox+oryOS.8`              | `@oryd/keto:v0.1.8-sandbox`, `ory-keto-sdk:v1.0.0-beta.8` (deprecated!) | `oryd/keto:v0.1.8-sandbox_oryOS.8`, `oryd/keto:v1.0.0-beta.8` (deleted Jan 15th 2019) |
| `v1.0.0-beta.9` | `v0.1.9-sandbox+oryOS.9`              | `@oryd/keto:v0.1.9-sandbox`, `ory-keto-sdk:v1.0.0-beta.9` (deprecated!) | `oryd/keto:v0.1.9-sandbox_oryOS.9`, `oryd/keto:v1.0.0-beta.9` (deleted Jan 15th 2019) |
| -               | `v0.1.10-sandbox+oryOS.10` (example)  | `@oryd/keto:v0.1.10-sandbox` | `oryd/keto:v0.1.10-sandbox_oryOS.10` |

> No code or database changes will be required when moving from `v1.0.0-beta.x` to `v0.1.x-sandbox`

#### ORY Docs

> If you are looking for the old developer guide, [click here](https://www.ory.sh/docs/deprecated/latest/).

The documentation got a major overhaul. We completely deprecated GitBook, which is no longer being
developed, and moved to [Docusaurus](https://docusaurus.io/). Additionally, the API documentation is
now integrated in Docusaurus using [widdershins](https://github.com/Mermade/widdershins) with custom templates, and no
longer uses SwaggerUI. This is great, because everything is now in one place - and we added code examples for consuming
the REST API for all major programming languages!

The new documentation will serve documentation the latest version (new version semantics) only, this will be `oryOS.9`.
This means that the following versions will be documented in the new docs:

* ORY Hydra `v1.0.0-beta.9`
* ORY Oathkeeper `v0.13.9+oryOS.9`
* ORY Keto `v0.1.9-sandbox+oryOS.9`

If you need to look up documentation on older versions (in the old format), you will be able to do so
[here](https://www.ory.sh/docs/deprecated/latest/). This documentation will be available for a reasonable amount of time and you will receive
a notice with ample time if we shut that down. You can view the legacy REST API Documentation by browsing to the
[hosted swagger ui](https://petstore.swagger.io/) and entering, for example,
`https://raw.githubusercontent.com/ory/keto/v1.0.0-beta.8/docs/api.swagger.json` in the top bar.

#### ORY Security Console

The ORY Security Console will be compatible with `oryOS.9`. While we work on implementing the new changes there you might
see error messages regarding compatibility. You may ignore them for now.

#### Outlook

Versions `v1.0.0-beta.1` to `v1.0.0-beta.9` are blacklisted for ORY Oathkeeper and ORY Keto. No future release
will have those versions. This will prevent potential future conflicts.

#### Conflict Resolution

If you need help with these changes or want us to handle these updates for you, [write us now](mailto:hi@ory.sh).
