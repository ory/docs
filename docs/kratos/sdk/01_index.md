---
id: index
title: SDKs
sidebar_label: Overview
---

All SDKs use automated code generation provided by [`openapi-generator`](https://github.com/OpenAPITools/openapi-generator).
Unfortunately, `openapi-generator` has serious breaking changes in the generated code when upgrading versions. Therefore, we don't
make backwards compatibility promises with regards to the generated SDKs. We hope to improve this process in the future.

Before you check out the SDKs, head over to the [REST API](reference/api.mdx) documentation which includes code samples for common
programming languages for each REST endpoint.

We publish our SDKs for popular languages in their respective package repositories:

- [Dart](https://pub.dev/packages/ory_client)
- [.NET](https://www.nuget.org/packages/Ory.Client/)
- [Go](https://github.com/ory/kratos-client-go)
- [Java](https://search.maven.org/artifact/sh.ory.kratos/kratos-client)
- [JavaScript](https://www.npmjs.com/package/@ory/kratos-client) with TypeScript definitions and compatible with: Node.js, React.js,
  Angular, Vue.js, and many more.
- [PHP](https://packagist.org/packages/ory/client)
- [Python](https://pypi.org/project/ory-client/)
- [Ruby](https://rubygems.org/gems/ory-client)
- [Rust](https://crates.io/crates/ory-client)

Code examples:

- [Go](./05_go.mdx)

Take a look at the source: [Generated SDKs for Ory](https://github.com/ory/sdk/tree/master/clients/client)

Missing your programming language? [Create an issue](https://github.com/ory/sdk/issues) and help us build, test and publish the
SDK for your programming language!
