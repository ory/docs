---
id: overview
title: Software Development Kit (SDK)
sidebar_label: Overview
---

The Ory Kratos SDK allows for integration with a self-hosted [Ory Kratos Identity Server](https://github.com/ory/kratos).

Before using the SDK, consult the Ory Kratos [REST](../reference/api.mdx) API documentation.

To view the source code for the generated SDKs, visit the
[Ory Kratos SDKs GitHub repository](https://github.com/ory/sdk/tree/master/clients/kratos/). Ory SDKs are generated using the
[openapi-generator](https://github.com/OpenAPITools/openapi-generator).

## Download the SDK

Ory publishes SDKs for popular languages in their respective package repositories:

- [Dart](https://pub.dev/packages/ory_kratos_client)
- [.NET](https://www.nuget.org/packages/Ory.Kratos.Client/)
- [Elixir](https://hex.pm/packages/ory_kratos)
- [Go](https://github.com/ory/kratos-client-go)
- [Java](https://search.maven.org/artifact/sh.ory.kratos/kratos-client)
- [JavaScript](https://www.npmjs.com/package/@ory/kratos-client) with TypeScript definitions and compatible with Node.js,
  React.js, Angular, Vue.js, and many more.
- [PHP](https://packagist.org/packages/ory/kratos-client)
- [Python](https://pypi.org/project/ory-kratos-client/)
- [Ruby](https://rubygems.org/gems/ory-kratos-client)
- [Rust](https://crates.io/crates/ory-kratos-client)

:::tip

Missing your programming language?  
[Create an issue](https://github.com/ory/sdk/issues) and help the Ory team build, test, and publish the SDK for your programming
language!

:::

### SDK backward compatibility

The Ory SDK uses automated code generation by [`openapi-generator`](https://github.com/OpenAPITools/openapi-generator).
`openapi-generator` can make changes to the generated code with each new version, which breaks backwards compatibility in some
cases. As a result, Ory SDK may not be compatible with previous versions.
