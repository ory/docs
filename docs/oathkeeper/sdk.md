---
id: sdk
title: Software Development Kit (SDK)
sidebar_label: Ory Oathkeeper SDK
---

Before using the SDK, consult the Ory Oathkeeper [REST](../reference/api.mdx) API documentation, which includes code samples and
examples for various programming languages.

## Download the SDK

Ory publishes SDKs for popular languages in their respective package repositories:

- [Dart](https://pub.dev/packages/ory_oathkeeper_client)
- [.NET](https://www.nuget.org/packages/Ory.oathkeeper.Client/)
- [Elixir](https://hex.pm/packages/ory_oathkeeper)
- [Go REST](https://github.com/ory/oathkeeper-client-go)
- [Java](https://search.maven.org/artifact/sh.ory.oathkeeper/oathkeeper-client)
- [JavaScript](https://www.npmjs.com/package/@ory/oathkeeper-client) with TypeScript definitions and compatible with: Node.js,
  React.js, Angular, Vue.js, and many more.
- [PHP](https://packagist.org/packages/ory/oathkeeper-client)
- [Python](https://pypi.org/project/ory-oathkeeper-client/)
- [Ruby](https://rubygems.org/gems/ory-oathkeeper-client)
- [Rust](https://crates.io/crates/ory-oathkeeper-client)

## Further information

To view the source code for the generated Ory SDKs, visit the GitHub repository:
[Generated SDKs for Ory Oathkeeper](https://github.com/ory/sdk/tree/master/clients/oathkeeper/)

Missing your programming language?  
[Create an issue](https://github.com/ory/sdk/issues) and help the Ory team build, test, and publish the SDK for your programming
language!

:::

### SDK Backwards compatibility

The Ory SDK uses automated code generation by [`openapi-generator`](https://github.com/OpenAPITools/openapi-generator).
`openapi-generator` can make changes to the generated code with each new version, which breaks backwards compatibility in some
cases. As a result, the Ory SDK may not be compatible with previous versions.

:::
