---
id: advanced
title: Advanced Topics
---

This guide aims to help setting up a production system with ORY Hydra.

<!-- toc -->

## Mobile & Browser (SPA) Authorization

We have an
[excellent blog post](https://www.ory.sh/oauth2-for-mobile-app-spa-browser) on
this topic. Read it now!

### Creating a public OAuth 2.0 Client

You can create a public OAuth 2.0 Client (e.g. for the authorize code + PKCE or
implicit flow) with the CLI

```
hydra clients create --endpoint http://ory-hydra-admin-api --token-endpoint-auth-method none
```

or by setting in the HTTP API JSON body when POSTing to `/clients`:

```
{
    "client_id": "...",
    "token_endpoint_auth_method": "none"
}
```

Be aware that when making requests to `/oauth2/token` with a public OAuth 2.0
Client, you can not authenticate with the HTTP Basic Authorization but must
include the `client_id` in the POST body.

## Key rotation

There are two types of key rotation:

- Rotation of JSON Web Token Signing Keys
- Rotation of HMAC Token Signing and Database and Cookie Encryption Keys

### Rotation of JSON Web Token Signing Keys

JSON Web Token Signing Key rotation is simple with ORY Hydra. You can rotate
OpenID Connect ID Token and OAuth 2.0 Access Tokens, when using the JSON Web
Token strategy, keys with one simple command.

ORY Hydra takes the latest key from the key store to sign JSON Web Tokens. All
public keys will be shown at
`http://ory-hydra-public-api/.well-known/jwks.json`.

#### OpenID Connect ID Token

```
hydra keys create --endpoint=http://ory-hydra-admin-api/ hydra.openid.id-token -a RS256
```

#### OAuth 2.0 Access Tokens (JSON Web Token)

> This will only work when using the JWT access token strategy. Otherwise, this
> will have no effect.

```
hydra keys create --endpoint=http://ory-hydra-admin-api/ hydra.jwt.access-token -a RS256
```

### Rotation of HMAC Token Signing and Database and Cookie Encryption Keys

Rotating database encryption keys is done by prepending the new encryption key
to the respective configuration value. Assuming configuration

```yaml
secrets:
  cookie:
    - the-old-cookie-encryption-key
  system:
    - the-old-system-encryption-key
```

one would add the new keys as follows

```yaml
secrets:
  cookie:
    - the-new-cookie-encryption-key # the new key must be the first entry
    - the-old-cookie-encryption-key
  system:
    - the-new-system-encryption-key # the new key must be the first entry
    - the-old-system-encryption-key
```

> It is very important that the new key is the first entry in the list as only
> the first key is used for encryption while all keys from the list are used for
> decryption. Please note that existing data will not be automatically
> re-encrypted using the new key. Only new data will be signed and encrypted
> using the new key. It is therefore imperative that the old key is added to the
> list, unless you want to also invalidate all data that was signed or encrypted
> using the old key.

## OAuth 2.0

### Audience

There are two types of audience concept in the context of OAuth 2.0 and OpenID
Connect:

1. OAuth 2.0: Access and Refresh Tokens are "internal-facing". The `aud` claim
   of an OAuth 2.0 Access and Refresh token defines at which _endpoints_ the
   token can be used.
2. OpenID Connect: The ID Token is "external-facing". The `aud` claim of an
   OpenID Connect ID Token defines which _clients_ should accept it.

While modifying the audience of an ID Token is not desirable, specifying the
audience of an OAuth 2.0 Access Token is. This is not defined as an IETF
Standard but is considered good practice in certain environments.

For this reason, Hydra allows you to control the aud claim of the access token.
To do so, you must specify the intended audiences in the OAuth 2.0 Client's
metadata on a per-client basis:

```
{
    "client_id": "...",
    "audience": ["https://api.my-cloud.com/user", "https://some-tenant.my-cloud.com/"]
}
```

The audience is a list of case-sensitive URLs. **URLs must not contain
whitespaces**.

#### OAuth 2.0 Authorization Code, Implicit, Hybrid Flows

When performing an OAuth 2.0 authorize code, implicit, or hybrid flow, you can
request audiences at the `/oauth2/auth` endpoint
`https://my-hydra.com/oauth2/auth?client_id=...&scope=...&audience=https%3A%2F%2Fapi.my-cloud.com%2Fuser+https%3A%2F%2Fsome-tenant.my-cloud.com%2F`
which requests audiences `https://api.my-cloud.com/user` and
`https://some-tenant.my-cloud.com/`.

The `audience` query parameter may contain multiple strings separated by a
url-encoded space (`+` or `%20`). The audience values themselves must also be
url encoded. The values will be validated against the whitelisted audiences
defined in the OAuth 2.0 Client:

- An OAuth 2.0 Client with the allowed audience `https://api.my-cloud/user` is
  allowed to request audience values `https://api.my-cloud/user`
  `https://api.my-cloud/user/1234` but not `https://api.my-cloud/not-user` nor
  `https://something-else/`.

The requested audience from the query parameter is then part of the login and
consent request payload as field `requested_access_token_audience`. You can then
alter the audience using `grant_audience.access_token` when accepting the
consent request:

```
hydra.acceptConsentRequest(challenge, {
  // ORY Hydra checks if requested audiences are allowed by the client, so we can simply echo this.
  grant_audience: {
    access_token: response.requested_access_token_audience,
    // or, for example:
    // access_token: ["https://api.my-cloud/not-user"]
  },

  // ... remember: false
  // ...
})
```

When introspecting the OAuth 2.0 Access Token, the response payload will include
the audience:

```
{
  "active": true,
  // ...
  "audience": ["https://api.my-cloud/user", "https://api.my-cloud/user/1234"]
}
```

#### OAuth 2.0 Client Credentials Grant

When performing the client credentials grant, the audience parameter from the
POST body of the `/oauth2/token` is decoded and validated according to the same
rules of the previous section, except for the login and consent part which does
not exist for this flow.

### JSON Web Tokens

ORY Hydra issues opaque OAuth 2.0 Access Tokens per default for the following
reasons:

1. **OAuth 2.0 Access Tokens represent internal state but are public
   knowledge:** An Access Token often contains internal data (e.g. session data)
   or other sensitive data (e.g. user roles and permissions) and is sometimes
   used as a means of transporting system-relevant information in a stateless
   manner. Therefore, making these tokens transparent (by using JSON Web Tokens
   as Access Tokens) comes with risk of exposing this information accidentally,
   and with the downside of not storing this information in the OAuth 2.0 Access
   Token at all.
2. **JSON Web Tokens can not hold secrets:** Unless encrypted, JSON Web Tokens
   can be read by everyone, including 3rd Parties. Therefore, they can not keep
   secrets. This point is similar to (1), but it is important to stress this.
3. **Access Tokens as JSON Web Tokens can not be revoked:** Well, you can revoke
   them, but they will be considered valid until the "expiry" of the token is
   reached. Unless, of course, you have a blacklist or check with Hydra if the
   token was revoked, which however defeats the purpose of using JSON Web Tokens
   in the first place.
4. **Certain OpenID Connect features will not work** when using JSON Web Tokens
   as Access Tokens, such as the pariwise subject identifier algorithm.
5. **There is a better solution: Use
   [ORY Oathkeeper](https://github.com/ory/oathkeeper)!** ORY Oathkeeper is a
   proxy you deploy in front of your services. It will "convert" ORY Hydra's
   opaque Access Tokens into JSON Web Tokens for your backend services. This
   allows your services to work without additional REST Calls while solving all
   previous points. **We really recommend this option if you want JWTs!**

If you are not convinced that ORY Oathkeeper is the right tool for the job, you
can still enable JSON Web Tokens in ORY Hydra by setting:

```yaml
strategies:
  access_token: jwt
```

Be aware that only access tokens are formatted as JSON Web Tokens. Refresh
tokens are not impacted by this strategy. By performing OAuth 2.0 Token
Introspection you can check if the token is still valid. If a token is revoked
or otherwise blacklisted, the OAuth 2.0 Token Introspection will return
`{ "active": false }`. This is useful when you do not want to rely only on the
token's expiry.

#### JSON Web Token Validation

You can validate JSON Web Tokens issued by ORY Hydra by pointing your `jwt`
library (e.g. [node-jwks-rsa](https://github.com/auth0/node-jwks-rsa)) to
`http://ory-hydra-public-api/.well-known/jwks.json`. All necessary keys are
available there.

### OAuth 2.0 Client Authentication with RSA private/public keypairs

ORY Hydra supports OAuth 2.0 Client Authentication with RSA private/public
keypairs. This authentication method replaces the classic HTTP Basic
Authorization and HTTP POST Authorization schemes. Instead of sending the
`client_id` and `client_secret`, you authenticate the client with a signed JSON
Web Token.

To enable this feature for a specific OAuth 2.0 Client, you must set
`token_endpoint_auth_method` to `private_key_jwt` and register the public key of
the RSA signing key either using the `jwks_uri` or `jwks` fields of the client.

When authenticating the client at the token endpoint, you generate and sign
(with the RSA private key) a JSON Web Token with the following claims:

- `iss`: REQUIRED. Issuer. This MUST contain the client_id of the OAuth Client.
- `sub`: REQUIRED. Subject. This MUST contain the client_id of the OAuth Client.
- `aud`: REQUIRED. Audience. The aud (audience) Claim. Value that identifies the
  Authorization Server (ORY Hydra) as an intended audience. The Authorization
  Server MUST verify that it is an intended audience for the token. The Audience
  SHOULD be the URL of the Authorization Server's Token Endpoint.
- `jti`: REQUIRED. JWT ID. A unique identifier for the token, which can be used
  to prevent reuse of the token. These tokens MUST only be used once, unless
  conditions for reuse were negotiated between the parties; any such negotiation
  is beyond the scope of this specification.
- `exp`: REQUIRED. Expiration time on or after which the ID Token MUST NOT be
  accepted for processing.
- `iat`: OPTIONAL. Time at which the JWT was issued.

When making a request to the `/oauth2/token` endpoint, you include
`client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer`
and `client_assertion=<signed-jwt>` in the request body:

```
POST /oauth2/token HTTP/1.1
Host: my-hydra.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=i1WsRn1uB1&
client_id=s6BhdRkqt3&
client_assertion_type=
urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
client_assertion=PHNhbWxwOl ... ZT
```

Here's what a client with a `jwks` looks like:

```json
{
  "client_id": "client-jwks",
  "jwks": {
    "keys": [
      {
        "kty": "RSA",
        "n": "jL7h5wc-yeMUsHGJHc0xe9SbTdaLKXMHvcIHQck20Ji7SvrHPdTDQTvZtTDS_wJYbeShcCrliHvbJRSZhtEe0mPJpyWg3O_HkKy6_SyHepLK-_BR7HfcXYB6pVJCG3BW-lVMY7gl5sULFA74kNZH50h8hdmyWC9JgOHn0n3YLdaxSWlhctuwNPSwqwzY4qtN7_CZub81SXWpKiwj4UpyB10b8rM8qn35FS1hfsaFCVi0gQpd4vFDgFyqqpmiwq8oMr8RZ2mf0NMKCP3RXnMhy9Yq8O7lgG2t6g1g9noWbzZDUZNc54tv4WGFJ_rJZRz0jE_GR6v5sdqsDTdjFquPlQ",
        "e": "AQAB"
      }
    ]
  },
  "token_endpoint_auth_method": "private_key_jwt"
}
```

And with `jwks_uri`:

```json
{
  "client_id": "client-jwks-uri",
  "jwks_uri": "http://path-to-my-public/keys.json",
  "token_endpoint_auth_method": "private_key_jwt"
}
```

The `jwks_uri` must return a JSON object containing the public keys associated
with the OAuth 2.0 Client:

```json
{
  "keys": [
    {
      "kty": "RSA",
      "n": "jL7h5wc-yeMUsHGJHc0xe9SbTdaLKXMHvcIHQck20Ji7SvrHPdTDQTvZtTDS_wJYbeShcCrliHvbJRSZhtEe0mPJpyWg3O_HkKy6_SyHepLK-_BR7HfcXYB6pVJCG3BW-lVMY7gl5sULFA74kNZH50h8hdmyWC9JgOHn0n3YLdaxSWlhctuwNPSwqwzY4qtN7_CZub81SXWpKiwj4UpyB10b8rM8qn35FS1hfsaFCVi0gQpd4vFDgFyqqpmiwq8oMr8RZ2mf0NMKCP3RXnMhy9Yq8O7lgG2t6g1g9noWbzZDUZNc54tv4WGFJ_rJZRz0jE_GR6v5sdqsDTdjFquPlQ",
      "e": "AQAB"
    }
  ]
}
```

## OpenID Connect

### Subject Identifier Algorithms

Hydra supports two
[Subject Identifier Algorithms](http://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes):

- `public`: This provides the same `sub` (subject) value to all Clients
  (default).
- `pairwise`: This provides a different `sub` value to each Client, so as not to
  enable Clients to correlate the End-User's activities without permission.

You can enable either one or both algorithms using the following configuration
layout:

```yaml
oidc:
  subject_identifiers:
    enabled:
      - public
      - pairwise
```

When `pairwise` is enabled, you must also set
`oidc.subject_identifiers.pairwise.salt`. The salt is used to obfuscate the
`sub` value:

```yaml
oidc:
  subject_identifiers:
    enabled:
      - public
      - pairwise
    pairwise:
      salt: some-salt
```

**This value should not be changed once set in production. Changing it will
cause all client applications to receive new user IDs from ORY Hydra which will
lead to serious complications with authentication on their side!**

Each OAuth 2.0 Client has a configuration field `subject_type`. The value of
that `subject_type` is either `public` or `pairwise`. If the identifier
algorithm is enabled, ORY Hydra will choose the right strategy automatically.

While ORY Hydra handles `sub` obfuscation out of the box, you may also override
this value with your own obfuscated `sub` value by setting
`force_subject_identifier` when accepting the login challenge in your user login
app.

## CORS

Both ORY Hydra's Admin and Public endpoints support CORS. For detailed
information, head over to the exemplary
[config file](https://github.com/ory/hydra/blob/master/docs/config.yaml).

For CORS to work properly, we encourage to set the following values:

```yaml
serve:
  admin:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com
      allowed_methods:
        - POST
        - GET
        - PUT
        - PATCH
        - DELETE
      allowed_headers:
        - Authorization
      exposed_headers:
        - Content-Type
  public:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com
      allowed_methods:
        - POST
        - GET
        - PUT
        - PATCH
        - DELETE
      allowed_headers:
        - Authorization
      exposed_headers:
        - Content-Type
```

Keep in mind that the OAuth 2.0 Authorization Endpoint (`/oauth2/auth`) does not
expose CORS by design. This endpoint should never be consumed in a CORS-fashion.
Some endpoints (`/oauth2/token`, `/userinfo`, `/oauth2/revoke`) additionally
include URLs listed in field `allowed_cors_origins` of the OAuth 2.0 Client that
is making the request. For example, OAuth 2.0 Client

```json
{
  "client_id": "foo",
  "allowed_cors_origins": ["https://foo-bar.com/"]
}
```

is allowed to make CORS request to `/oauth2/token` from origin
`https://foo-bar.com/` even if that origin is not listed in
`public.cors.allowed_origins`.
