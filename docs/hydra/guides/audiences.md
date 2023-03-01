---
id: audiences
title: OAuth2 token audience
sidebar_label: Token audience
---

In the context of OAuth 2.0 and OpenID Connect, there are two types of audience concepts that developers should be aware of.

- **OAuth 2.0 access token audience:** OAuth 2.0 access tokens are "internal-facing". In other words, the `aud` claim of an OAuth
  2.0 access token defines the endpoints at which the token can be used.
- **OpenID Connect ID token audience:** On the other hand, the OpenID Connect ID Token is "external-facing". The aud claim of an
  OpenID Connect ID Token defines which clients should accept it.

## Add audiences to the client allow list

To specify the intended audiences for an OAuth 2.0 access token, the OAuth 2.0 client needs to proactively define the audiences it
needs access to when creating or updating the client. This can be done by including the audience parameter in the client's
metadata. The audience parameter should contain a list of case-sensitive URLs, and URLs must not contain whitespaces.

```json5
{
  client_id: "...",
  // ..
  audience: ["https://api.my-cloud.com/user", "https://some-tenant.my-cloud.com/"],
  // ..
}
```

If you're a developer looking to manage OAuth2 clients, you can find more information in the
[Manage OAuth2 Clients document](./oauth2-clients.mdx).

## Audience in Authorization Code, Implicit, and Hybrid Flows

When performing an OAuth 2.0 authorization code, implicit, or hybrid flow, developers can request audiences at the `/oauth2/auth`
endpoint using the `audience` query parameter. For example,

```
https://{project.slug}.projects.oryapis.com/oauth2/auth
  ?client_id=...
  &scope=...
  &audience=https://api.my-cloud.com/user+https://some-tenant.my-cloud.com/
```

The audience query parameter may contain multiple strings separated by a URL-encoded space (`+` or `%20`). The audience values
themselves must also be URL-encoded.

The values will be validated against the allowed audiences defined in the OAuth 2.0 client. For instance, if an OAuth 2.0 client
allows the audience `https://api.my-cloud/user`, it can request audience values like `https://api.my-cloud/user` or
`https://api.my-cloud/user/1234`, but not `https://api.my-cloud/not-user` or `https://something-else/`.

The requested audience from the query parameter is then part of the login and consent request payload as the field
`requested_access_token_audience`. Developers can then alter the audience using `grant_audience.access_token` when accepting the
consent request. For example:

```mdx-code-block
import CodeBlock from '@theme/CodeBlock'
import tsExample from '!!raw-loader!../../../code-examples/sdk/typescript/src/oauth2/consent-audience.ts'

<CodeBlock language="tsx">{tsExample}</CodeBlock>
```

When introspecting the OAuth 2.0 Access Token, the response payload will include the audience. For instance,

```mdx-code-block
import audExample from '!!raw-loader!../../../code-examples/sdk/typescript/src/oauth2/token-introspect-audience.ts'

<CodeBlock language="tsx">{audExample}</CodeBlock>
```

## Audiences in Client Credentials Grant

When performing the client credentials grant, the audience parameter from the POST body of the /oauth2/token is decoded and
validated according to the same rules of the previous section, except for the login and consent part which does not exist for this
flow.
