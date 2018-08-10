# Advanced Topics

This guide aims to help setting up a production system with ORY Hydra.

<!-- toc -->

## Mobile & Browser (SPA) Authorization

We have an [excellent blog post](https://www.ory.sh/oauth2-for-mobile-app-spa-browser) on this topic. Read it now!

### Creating a public OAuth 2.0 Client

You can create a public OAuth 2.0 Client (e.g. for the authorize code + PKCE or implicit flow) with the CLI

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

Be aware that when making requests to `/oauth2/token` with a public OAuth 2.0 Client, you can not authenticate with the
HTTP Basic Authorization but must include the `client_id` in the POST body.

## Key rotation

Key rotation is simple with ORY Hydra. You can rotate OpenID Connect ID Token and OAuth 2.0 Access Tokens (JSON Web Token)
keys with one simple command.

ORY Hydra takes the latest key from the key store to sign JSON Web Tokens. All public keys will be shown at
`http://ory-hydra-public-api/.well-known/jwks.json`.

### OpenID Connect ID Token

```
hydra keys create --endpoint=http://ory-hydra-admin-api/ hydra.openid.id-token -a RS256
```

### OAuth 2.0 Access Tokens (JSON Web Token)

```
hydra keys create --endpoint=http://ory-hydra-admin-api/ hydra.jwt.access-token -a RS256
```

## OAuth 2.0

### JSON Web Tokens

ORY Hydra supports JSON Web Tokens as Access Tokens. We *discourage you from using this feature for multiple reasons:*

1. It is very new and has not been battle-tested.
2. We believe that JSON Web Tokens can lead to poor security practices.
3. Using this feature disables other features, like the pairwise Subject Identifier Algorithm.

If you still want to use this strategy you can do so by setting environment variable `OAUTH2_ACCESS_TOKEN_STRATEGY=jwt`.

Be aware that only access tokens are formatted as JSON Web Tokens. Refresh tokens are not impacted by this strategy.
By performing OAuth 2.0 Token Introspection you can check if the token is still valid. If a token is revoked or otherwise
blacklisted, the OAuth 2.0 Token Introspection will return `{ "active": false }`. This is useful when you do not want
to rely only on the token's expiry.

#### JSON Web Token Validation

You can validate JSON Web Tokens issued by ORY Hydra by pointing your `jwt` library (e.g. [node-jwks-rsa](https://github.com/auth0/node-jwks-rsa))
to `http://ory-hydra-public-api/.well-known/jwks.json`. All necessary keys are available there.

### OAuth 2.0 Client Authentication with RSA private/public keypairs

ORY Hydra supports OAuth 2.0 Client Authentication with RSA private/public keypairs. This authentication method
replaces the classic HTTP Basic Authorization and HTTP POST Authorization schemes. Instead of sending the `client_id`
and `client_secret`, you authenticate the client with a signed JSON Web Token.

To enable this feature for a specific OAuth 2.0 Client, you must set `token_endpoint_auth_method` to `private_key_jwt`
and register the public key of the RSA signing key either using the `jwks_uri` or `jwks` fields of the client.

When authenticating the client at the token endpoint, you generate and sign (with the RSA private key) a JSON Web Token
with the following claims:

* `iss`: REQUIRED. Issuer. This MUST contain the client_id of the OAuth Client.
* `sub`: REQUIRED. Subject. This MUST contain the client_id of the OAuth Client.
* `aud`: REQUIRED. Audience. The aud (audience) Claim. Value that identifies the Authorization Server (ORY Hydra) as an
intended audience. The Authorization Server MUST verify that it is an intended audience for the token.
The Audience SHOULD be the URL of the Authorization Server's Token Endpoint.
* `jti`: REQUIRED. JWT ID. A unique identifier for the token, which can be used to prevent reuse of the token.
These tokens MUST only be used once, unless conditions for reuse were negotiated between the parties; any such
negotiation is beyond the scope of this specification.
* `exp`: REQUIRED. Expiration time on or after which the ID Token MUST NOT be accepted for processing.
* `iat`: OPTIONAL. Time at which the JWT was issued.

When making a request to the `/oauth2/token` endpoint, you include `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer`
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

```
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

```
{
    "client_id": "client-jwks-uri",
    "jwks_uri": "http://path-to-my-public/keys.json",
    "token_endpoint_auth_method": "private_key_jwt"
}
```

The `jwks_uri` must return a JSON object containing the public keys associated with the OAuth 2.0 Client:

```
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

Hydra supports two [Subject Identifier Algorithms](http://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes):

* `public`: This provides the same `sub` (subject) value to all Clients (default).
* `pairwise`: This provides a different `sub` value to each Client, so as not to enable Clients to
correlate the End-User's activities without permission.

You can enable either one or both algorithms using the `OIDC_SUBJECT_TYPES_SUPPORTED` environment variable:

* `export IDC_SUBJECT_TYPES_SUPPORTED=public` (default)
* `export IDC_SUBJECT_TYPES_SUPPORTED=pairwise`
* `export IDC_SUBJECT_TYPES_SUPPORTED=public,pairwise`

If `pairwise` is enabled, you must also set the environment variable `OIDC_SUBJECT_TYPE_PAIRWISE_SALT`. The salt
is used to obfuscate the `sub` value.

**This value should not be changed once set in production. Changing it will cause all client applications
to receive new user IDs from ORY Hydra which will lead to serious complications with authentication on their side!**

Each OAuth 2.0 Client has a configuration field `subject_type`. The value of that `subject_type` is either `public` or
`pairwise`. If the mode is enabled by `IDC_SUBJECT_TYPES_SUPPORTED`, then ORY Hydra will choose the right strategy automatically.

While ORY Hydra handles `sub` obfuscation out of the box, you may also override this value with your own obfuscated
`sub` value by setting `force_subject_identifier` when accepting the login challenge in your user login app.
