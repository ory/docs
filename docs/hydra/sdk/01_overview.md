---
id: overview
title: Software Development Kit (SDK)
sidebar_label: Ory Hydra SDK
---

The Ory Hydra SDK allows for integration with a self-hosted [Ory Hydra OAuth2 Server](https://github.com/ory/hydra).

Before using the SDK, consult the Ory Hydra [REST](../reference/api.mdx) API documentation, which includes code samples and
examples for various programming languages.

To view the source code for the generated SDKs, visit the
[Ory Hydra SDKs GitHub repository](https://github.com/ory/sdk/tree/master/clients/hydra/).

:::info

The [`ory-client`](../../sdk.mdx) SDK works with self-hosted Ory services, but due to different release cycles it is recommended
to use `hydra-client` with self-hosted Ory Hydra.

:::

## Download the SDK

Ory publishes SDKs for popular languages in their respective package repositories:

- [Dart](https://pub.dev/packages/ory_hydra_client)
- [.NET](https://www.nuget.org/packages/Ory.Hydra.Client/)
- [Elixir](https://hex.pm/packages/ory_hydra)
- [Go](https://github.com/ory/hydra-client-go)
- [Java](https://search.maven.org/artifact/sh.ory.hydra/hydra-client)
- [JavaScript](https://www.npmjs.com/package/@ory/hydra-client) with TypeScript definitions and compatible with Node.js, React.js,
  Angular, Vue.js, and many more.
- [PHP](https://packagist.org/packages/ory/hydra-client)
- [Python](https://pypi.org/project/ory-hydra-client/)
- [Ruby](https://rubygems.org/gems/ory-hydra-client)
- [Rust](https://crates.io/crates/ory-hydra-client)

:::tip

Missing your programming language?  
[Create an issue](https://github.com/ory/sdk/issues) and help the Ory team build, test, and publish the SDK for your programming
language!

:::

## Handling OAuth2 flows

The Ory Hydra SDK doesn't provide a comprehensive API for handling OAuth 2.0 flows such as the authorization code flow and refresh
flow. Use one of the many [well-established libraries](https://oauth.net/code/) for this purpose, don't write your own code to
interact with OAuth 2.0.

Read the [OAuth2 client libraries](../guides/using-oauth2.mdx) document for more information.

### SDK backward compatibility

The Ory SDK uses automated code generation by [`openapi-generator`](https://github.com/OpenAPITools/openapi-generator).
`openapi-generator` can make changes to the generated code with each new version, which breaks backwards compatibility in some
cases. As a result, Ory SDK may not be compatible with previous versions.
