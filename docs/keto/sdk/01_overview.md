---
id: overview
title: Software Development Kit (SDK)
sidebar_label: Ory Keto SDK
---

The Ory Keto SDK allows for integration with a self-hosted [Ory Keto Permission Server](https://github.com/ory/keto).

Before using the SDK, it is recommended to consult the Ory Keto [REST](../reference/rest-api) and [gRPC](../reference/rest-api)
API documentation, which includes code samples and examples for various programming languages.

---

Ory publishes SDKs for popular languages in their respective package repositories:

- [Dart](https://pub.dev/packages/ory_keto_client)
- [.NET](https://www.nuget.org/packages/Ory.keto.Client/)
- [Go gRPC](https://github.com/ory/keto/blob/master/proto/go.mod) (import using `go get github.com/ory/keto/proto`)
- [Go REST](https://github.com/ory/keto-client-go)
- [Java](https://search.maven.org/artifact/sh.ory.keto/keto-client)
- [JavaScript](https://www.npmjs.com/package/@ory/keto-client) with TypeScript definitions and compatible with: Node.js, React.js,
  Angular, Vue.js, and many more.
- [PHP](https://packagist.org/packages/ory/keto-client)
- [Python](https://pypi.org/project/ory-keto-client/)
- [Ruby](https://rubygems.org/gems/ory-keto-client)
- [Rust](https://crates.io/crates/ory-keto-client)

---

:::info Source Code

To view the source code for the generated Ory SDKs, visit the GitHub repository:
[Generated SDKs for Ory Keto](https://github.com/ory/sdk/tree/master/clients/keto/)

Missing your programming language?  
[Create an issue](https://github.com/ory/sdk/issues) and help the Ory team build, test, and publish the SDK for your programming
language!

:::

:::info self-hosting

The Ory [`client`](../../sdk.mdx) SDK works with self-hosted Ory services, but due to different release cycles it is recommended
to use `keto-client` with self-hosted Ory Keto.

:::

:::note backwards compatibility

The Ory SDK uses automated code generation by [`openapi-generator`](https://github.com/OpenAPITools/openapi-generator).
`openapi-generator` can make changes to the generated code with each new version, which breaks backwards compatibility in some
cases. As a result, the Ory SDK may not be compatible with previous versions.

:::
