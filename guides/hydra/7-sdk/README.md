# SDK

All SDKs are use automated code generation provided by [`swagger-codegen`](https://github.com/swagger-api/swagger-codegen).
Unfortunately, `swagger-codegen` has serious breaking changes in the generated code when upgrading versions. Therefore,
we do not make backwards compatibility promises with regards to the generated SDKs. We hope to improve this process
in the future.

We encourage you to not use the SDKs (due to mediocre code quality) but to implement the simple REST calls yourself instead. Most calls can be handled with one-liners in many languages. In JavaScript you can create a client with: `fetch('http://hydra/clients', { method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.encode({ client_id: 'foo', client_secret: 'bar' }) }).then(r => r.JSON())`.

If you want to use the SDK despite its caveats (mediocre code quality, potential breaking changes), you will find more information here:

* [Golang](./1-go.md)
* [JavaScript](./2-js.md)
* [PHP](./3-php.md)

Missing your programming language? [Create an issue](https://github.com/ory/hydra/issues) and help us build, test and publish the SDK for your programming language!
