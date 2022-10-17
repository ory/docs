---
id: audiences
title: Using audiences
---

There are two types of audience concept in the context of OAuth 2.0 and OpenID Connect:

1. OAuth 2.0: Access and Refresh Tokens are "internal-facing". The `aud` claim of an OAuth 2.0 Access and Refresh token defines at
   which _endpoints_ the token can be used.
2. OpenID Connect: The ID Token is "external-facing". The `aud` claim of an OpenID Connect ID Token defines which _clients_ should
   accept it.

While modifying the audience of an ID Token isn't desirable, specifying the audience of an OAuth 2.0 Access Token is. This isn't
defined as an IETF Standard but is considered good practice in certain environments.

For this reason, Hydra allows you to control the aud claim of the access token. To do so, you must specify the intended audiences
in the OAuth 2.0 Client's metadata on a per-client basis:

```json
{
    "client_id": "...",
    "audience": ["https://api.my-cloud.com/user", "https://some-tenant.my-cloud.com/"]
}
```

The audience is a list of case-sensitive URLs. **URLs must not contain whitespaces**.

## Audience in authorization code, implicit, and hybrid flows

When performing an OAuth 2.0 authorize code, implicit, or hybrid flow, you can request audiences at the `/oauth2/auth` endpoint
`https://my-hydra.com/oauth2/auth?client_id=...&scope=...&audience=https%3A%2F%2Fapi.my-cloud.com%2Fuser+https%3A%2F%2Fsome-tenant.my-cloud.com%2F`
which requests audiences `https://api.my-cloud.com/user` and `https://some-tenant.my-cloud.com/`.

The `audience` query parameter may contain multiple strings separated by a url-encoded space (`+` or `%20`). The audience values
themselves must also be url encoded. The values will be validated against the whitelisted audiences defined in the OAuth 2.0
Client:

- An OAuth 2.0 Client with the allowed audience `https://api.my-cloud/user` is allowed to request audience values
  `https://api.my-cloud/user` `https://api.my-cloud/user/1234` but not `https://api.my-cloud/not-user` nor
  `https://something-else/`.

The requested audience from the query parameter is then part of the login and consent request payload as field
`requested_access_token_audience`. You can then alter the audience using `grant_audience.access_token` when accepting the consent
request:

```
hydra.acceptConsentRequest(challenge, {
  // Ory Hydra checks if requested audiences are allowed by the client, so we can simply echo this.
  grant_audience: {
    access_token: response.requested_access_token_audience,
    // or, for example:
    // access_token: ["https://api.my-cloud/not-user"]
  },

  // ... remember: false
  // ...
})
```

When introspecting the OAuth 2.0 Access Token, the response payload will include the audience:

```
{
  "active": true,
  // ...
  "audience": ["https://api.my-cloud/user", "https://api.my-cloud/user/1234"]
}
```

## Audiences in client credentials grant

When performing the client credentials grant, the audience parameter from the POST body of the `/oauth2/token` is decoded and
validated according to the same rules of the previous section, except for the login and consent part which does not exist for this
flow.