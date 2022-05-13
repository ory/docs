---
id: sdk
title: Software Development Kits (SDKs)
sidebar_label: Overview
---

All SDKs use automated code generation provided by [`openapi-generator`](https://github.com/OpenAPITools/openapi-generator).
Unfortunately, `openapi-generator` has serious breaking changes in the generated code when upgrading versions. Therefore, we don't
make backwards compatibility promises with regards to the generated SDKs. We hope to improve this process in the future.

Before you check out the SDKs, head over to the [REST API](reference/api.mdx) documentation which includes code samples for common
programming languages for each REST endpoint.

> The SDKs don't provide a good API for dealing with OAuth 2.0 Flows (for example Authorize Code Flow, Refresh Flow, ...). But
> there are tons of [libraries available for consuming OAuth 2.0](https://oauth.net/code/). Don't write your own OAuth 2.0
> Library!

We publish our SDKs for popular languages in their respective package repositories:

- [Dart](https://pub.dev/packages/ory_hydra_client)
- [.NET](https://www.nuget.org/packages/Ory.Hydra.Client/)
- [Go](https://github.com/ory/hydra-client-go)
- [Java](https://search.maven.org/artifact/sh.ory.hydra/hydra-client)
- [JavaScript](https://www.npmjs.com/package/@ory/hydra-client) with TypeScript definitions and compatible with: NodeJS, ReactJS,
  AngularJS, Vue.js, and many more.
- [PHP](https://packagist.org/packages/ory/hydra-client)
- [Python](https://pypi.org/project/ory-hydra-client/)
- [Ruby](https://rubygems.org/gems/ory-hydra-client)
- [Rust](https://crates.io/crates/ory-hydra-client)

We also provide more info for these SDKs:

- [Golang](sdk/go.mdx)
- [JavaScript](sdk/js.mdx)
- [PHP](sdk/php.mdx)

Take a look at the source: [Generated SDKs for Ory Hydra](https://github.com/ory/sdk/tree/master/clients/hydra/)

Missing your programming language? [Create an issue](https://github.com/ory/hydra/issues) and help us build, test and publish the
SDK for your programming language!
