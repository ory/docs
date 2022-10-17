---
id: jwt
title: JSON Web Tokens (JWT)
toc_max_heading_level: 4
---

Ory Hydra issues opaque OAuth 2.0 Access Tokens per default for the following reasons:

1. **OAuth 2.0 Access Tokens represent internal state but are public knowledge:** An Access Token often contains internal data
   (such as session data) or other sensitive data (such as user roles and permissions) and is sometimes used as a means of
   transporting system-relevant information in a stateless manner. Therefore, making these tokens transparent (by using JSON Web
   Tokens as Access Tokens) comes with risk of exposing this information, and with the downside of not storing this information in
   the OAuth 2.0 Access Token at all.
2. **JSON Web Tokens can't hold secrets:** Unless encrypted, JSON Web Tokens can be read by everyone, including 3rd Parties.
   Therefore, they can't keep secrets. This point is similar to (1), but it's important to stress this.
3. **Access Tokens as JSON Web Tokens can't be revoked:** Well, you can revoke them, but they will be considered valid until the
   "expiry" of the token is reached. Unless, of course, you have a blacklist or check with Hydra if the token was revoked, which
   however defeats the purpose of using JSON Web Tokens in the first place.
4. **Certain OpenID Connect features won't work** when using JSON Web Tokens as Access Tokens, such as the pairwise subject
   identifier algorithm.
5. **There is a better solution: Use [Ory Oathkeeper](https://github.com/ory/oathkeeper)!** Ory Oathkeeper is a proxy you deploy
   in front of your services. It will "convert" Ory Hydra's opaque Access Tokens into JSON Web Tokens for your backend services.
   This allows your services to work without additional REST Calls while solving all previous points. **We really recommend this
   option if you want JWTs!**

If you aren't convinced that Ory Oathkeeper is the right tool for the job, you can still enable JSON Web Tokens in Ory Hydra by
setting:

```yaml
strategies:
  access_token: jwt
```

Be aware that only access tokens are formatted as JSON Web Tokens. Refresh tokens aren't impacted by this strategy. By performing
OAuth 2.0 Token Introspection you can check if the token is still valid. If a token is revoked or otherwise blacklisted, the OAuth
2.0 Token Introspection will return `{ "active": false }`. This is useful when you don't want to rely only on the token's expiry.

## JSON Web Token validation

You can validate JSON Web Tokens issued by Ory Hydra by pointing your `jwt` library (for example
[node-jwks-rsa](https://github.com/auth0/node-jwks-rsa)) to `http://ory-hydra-public-api/.well-known/jwks.json`. All necessary
keys are available there.

### Adding custom claims top-level to the Access Token

Assume you want to add custom claims to the access token with the following code:

```typescript
let session: ConsentRequestSession = {
  access_token: {
    foo: "bar",
  },
}
```

Then part of the resulting access token will look like this:

```json
{
  "ext": {
    "foo": "bar"
  }
}
```

If you instead want "foo" to be added top-level in the access token, you need to set the configuration flag
`oauth2.allowed_top_level_claims` like described in
[the reference Configuration](https://www.ory.sh/hydra/docs/reference/configuration).

Note: Any user defined allowed top level claim may not override standardized access token claim names.

Configuring Hydra to allow "foo" as a top-level claim will result in the following access token part (allowed claims get mirrored,
for backwards compatibility):

```json
{
  "foo": "bar",
  "ext": {
    "foo": "bar"
  }
}
```

## OAuth 2.0 Client Authentication with private/public key pairs

Ory Hydra is capable of performing the
[JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants](https://tools.ietf.org/html/rfc7523).
This guide defines how a JWT Bearer Token can be used to request an access token when a client wishes to utilize an existing trust
relationship, expressed through the semantics of the JWT, without a direct user-approval step at the authorization server (Hydra).

Ory Hydra supports both methods expressed in RFC 7523:

- _Using JWTs as Authorization Grants_: Allows exchanging a JSON Web Token for an Access Token.
- _Using JWTs for Client Authentication_: Allows OAuth 2.0 Client Authentication using public/private keys via JSON Web Tokens.

### Exchanging JWTs for Access Tokens

To use the Authorization Grant `urn:ietf:params:oauth:grant-type:jwt-bearer`, the client performs an OAuth 2.0 Access Token
Request as defined in
[Section 4.1 of the OAuth Assertion Framework RFC7521](https://datatracker.ietf.org/doc/html/rfc7521#section-4.1) with the
following specific parameter values and encodings:

- The value of the `grant_type` is `urn:ietf:params:oauth:grant-type:jwt-bearer`.
- The value of the `assertion` parameter MUST contain a single JWT.

The `scope` parameter may be used, as defined in the OAuth Assertion Framework
[RFC7521](https://datatracker.ietf.org/doc/html/rfc7521), to indicate the requested scope:

```
POST /oauth2/token HTTP/1.1
Host: public.hydra.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer
&assertion=eyJhbGciOiJFUzI1NiIsImtpZCI6IjE2In0.
eyJpc3Mi[...omitted for brevity...].
J9l-ZhwP[...omitted for brevity...]
```

Clients using this grant must be authenticated.

#### Establishing a trust relationship

Before using this grant type, you must establish a trust relationship in Ory Hydra. Trust relationships come in two flavors:

- Trust relationships restricted to a single subject. This means that the issuer is only allowed to sign JWTs for the trusted
  subject.
- Trust relationships that allow issuing tokens for any subject. This may be useful for some cases (like implementing a Secure
  Token Service), but gives the issuer the ability to impersonate any user so you should only do this if you trust the issuer as
  much as you trust your own Ory Hydra instance.

Restricted trust relationships require registering the issuer, subject, and the public key at Ory Hydra's Admin Endpoint:

```
POST https://<admin.ory-hydra>/trust/grants/jwt-bearer/issuers
Content-Type: application/json

{
  // The issuer you want to trust.
  "issuer": "https://my-issuer.com",

  // The "sub" field of the access token to be created.
  // Let's say 7146dd0b-f243-43ba-815c-7a00216b4823 is the user ID of Alice:
  "subject": "7146dd0b-f243-43ba-815c-7a00216b4823",

  // The allowed scope of the generated access token.
  "scope": ["read"],

  // The public key with which the JWT Bearer's signature can be verified.
  "jwk": {
    "kty":"RSA",
    "e":"AQAB",
    "kid":"d8e91f55-67e0-4e56-a066-6a5f0c2efdf7",
    "n":"nzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA-kzeVOVpVWwkWdVha4s38XM_pa_yr47av7-z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr_Mrm_YtjCZVWgaOYIhwrXwKLqPr_11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e-lf4s4OxQawWD79J9_5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa-GSYOD2QU68Mb59oSk2OB-BtOLpJofmbGEGgvmwyCI9Mw"
  }

  // When this trust relationship expires.
  "expires_at": "2021-04-23T18:25:43.511Z",
}
```

If you want an issuer to provide tokens for any subject you can omit the subject field and set the `allow_any_subject` flag to
true:

```
POST https://<admin.ory-hydra>/trust/grants/jwt-bearer/issuers
Content-Type: application/json

{
  // The issuer you want to trust.
  "issuer": "https://my-issuer.com",

  // Setting this to true will allow the issuer to provide tokens for any subject.
  "allow_any_subject": true,

  // The allowed scope of the generated access token.
  "scope": ["read"],

  // The public key with which the JWT Bearer's signature can be verified.
  "jwk": {
    "kty":"RSA",
    "e":"AQAB",
    "kid":"d8e91f55-67e0-4e56-a066-6a5f0c2efdf7",
    "n":"nzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA-kzeVOVpVWwkWdVha4s38XM_pa_yr47av7-z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr_Mrm_YtjCZVWgaOYIhwrXwKLqPr_11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e-lf4s4OxQawWD79J9_5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa-GSYOD2QU68Mb59oSk2OB-BtOLpJofmbGEGgvmwyCI9Mw"
  }

  // When this trust relationship expires.
  "expires_at": "2021-04-23T18:25:43.511Z",
}
```

Both examples above would allow the following JWT Bearer

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL215LWlzc3Vlci5jb20iLCJzdWIiOiJhbGljZUBleGFtcGxlLm9yZyIsImF1ZCI6IjcxNDZkZDBiLWYyNDMtNDNiYS04MTVjLTdhMDAyMTZiNDgyMyIsIm5iZiI6MTMwMDgxNTc4MCwiZXhwIjoxMzAwODE5MzgwfQ.Dpn7zYEhaWxi7CLxr1c8Db2zxOJDzpu5QTZgeM6me68aGt7jgpKujunfx2FBhhuKY2oJmIAhXJWXplGH2NnbCGxNzx17Y4CPGJE9jLC2ZxprvV_5Cdmx5GkGcFjpOXsgBSonhmsyKkxYhS3C-mq4u2Tx9Zi494G2EbDH0L2BSuWYi411qm4LrIHQRdiFP9v34VH-5hU005bvrlGJBA9W-Eom4krFYtC4_Zgc7XY2mcChBw0AYz3A1B0_7ui95iDR-33D5tBAGRn6iGgnVBeR1GmZX5y4jz7Nht2lbPQkrCyLsoPxn2ZQPqvbOUKxdgsrhkcs0UGND8GsDwDzISuuAw
```

which has the claims

```json5
{
  iss: "https://my-issuer.com",
  sub: "7146dd0b-f243-43ba-815c-7a00216b4823",
  aud: "https://public.hydra.com/oauth2/token",
  nbf: 1300815780,
  exp: 1300819380,
}
```

to be exchanged for an OAuth2 Access Token (the `scope` parameter is optional!)

```
POST /oauth2/token HTTP/1.1
Host: public.hydra.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer
&scope=read
&assertion=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL215LWlzc3Vlci5jb20iLCJzdWIiOiJhbGljZUBleGFtcGxlLm9yZyIsImF1ZCI6IjcxNDZkZDBiLWYyNDMtNDNiYS04MTVjLTdhMDAyMTZiNDgyMyIsIm5iZiI6MTMwMDgxNTc4MCwiZXhwIjoxMzAwODE5MzgwfQ.Dpn7zYEhaWxi7CLxr1c8Db2zxOJDzpu5QTZgeM6me68aGt7jgpKujunfx2FBhhuKY2oJmIAhXJWXplGH2NnbCGxNzx17Y4CPGJE9jLC2ZxprvV_5Cdmx5GkGcFjpOXsgBSonhmsyKkxYhS3C-mq4u2Tx9Zi494G2EbDH0L2BSuWYi411qm4LrIHQRdiFP9v34VH-5hU005bvrlGJBA9W-Eom4krFYtC4_Zgc7XY2mcChBw0AYz3A1B0_7ui95iDR-33D5tBAGRn6iGgnVBeR1GmZX5y4jz7Nht2lbPQkrCyLsoPxn2ZQPqvbOUKxdgsrhkcs0UGND8GsDwDzISuuAw
```

with resulting access token claims:

```
{
  "iss": "https://public.hydra.com/",
  "sub": "7146dd0b-f243-43ba-815c-7a00216b4823",
  "scp": ["read"],
  // ...
}
```

You can also delete, get, and list trust relationships. Please check the [HTTP REST API documentation](../reference/api.mdx) for
more details.

#### OAuth2 JWT bearer grant type validation

When performing the `urn:ietf:params:oauth:grant-type:jwt-bearer` Authorization Grant, the JWT Bearer in the `assertion` parameter
is validated as follows:

1. The JWT MUST contain an `iss` (issuer) claim that contains a unique identifier for the entity that'ssued the JWT. The value
   must match the `issuer` value of the trust relationship.
2. The JWT MUST contain a `sub` (subject) claim identifying the principal that is the subject of the JWT (for example the user
   ID). The value must match the `subject` value of the trust relationship.
3. The JWT MUST contain an `aud` (audience) claim containing a value that identifies the authorization server (Hydra) as an
   intended audience. So this value must be Hydra Token URL.
4. The JWT MUST contain an `exp` (expiration time) claim that limits the time window during which the JWT can be used. Can be
   controlled by `oauth2.grant.jwt.max_ttl` setting.
5. The JWT MAY contain an `nbf` (not before) claim that identifies the time before which the token MUST NOT be accepted for
   processing by Hydra.
6. The JWT MAY contain an `iat` (issued at) claim that identifies the time at which the JWT was issued. Controlled by
   `oauth2.grant.jwt.iat_optional` (default `false`) If `iat` isn't passed, then current time (when assertion is received by
   Hydra) will be considered as issued date.
7. The JWT MAY contain a `jti` (JWT ID) claim that provides a unique identifier for the token. Controlled by
   `oauth2.grant.jwt.jti_optional` (default `false`) setting. **Note**: If `jti` is configured to be required, then Hydra will
   reject all assertions with the same `jti`, if `jti` was already used by some assertion, and this assertion isn't expired yet
   (see `exp` claim).
8. The JWT MUST be digitally signed.

If a scope was included in the OAuth2 Access Token Request

```
POST /oauth2/token HTTP/1.1
Host: public.hydra.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer
&scope=read
&assertion=...
```

Hydra will check them against scopes defined in the corresponding trust relationship.

### Using JWTs for client authentication

Ory Hydra supports OAuth 2.0 Client Authentication with RSA and ECDSA private/public keypairs with supported signing algorithms:

- RS256 (default), RS384, RS512
- PS256, PS384, PS512
- ES256, ES384, ES512
- EdDSA

This authentication method replaces the classic HTTP Basic Authorization and HTTP POST Authorization schemes. Instead of sending
the `client_id` and `client_secret`, you authenticate the client with a signed JSON Web Token.

To enable this feature for a specific OAuth 2.0 Client, you must set `token_endpoint_auth_method` to `private_key_jwt` and
register the public key of the RSA/ECDSA signing key either using the `jwks_uri` or `jwks` fields of the client.

When authenticating the client at the token endpoint, you generate and sign (with the RSA/ECDSA private key) a JSON Web Token with
the following claims:

- `iss`: REQUIRED. Issuer. This MUST contain the client_id of the OAuth Client.
- `sub`: REQUIRED. Subject. This MUST contain the client_id of the OAuth Client.
- `aud`: REQUIRED. Audience. The aud (audience) Claim. Value that identifies the Authorization Server (Ory Hydra) as an intended
  audience. The Authorization Server MUST verify that it's an intended audience for the token. The Audience SHOULD be the URL of
  the Authorization Server's Token Endpoint.
- `jti`: REQUIRED. JWT ID. A unique identifier for the token, which can be used to prevent reuse of the token. These tokens MUST
  only be used once, unless conditions for reuse were negotiated between the parties; any such negotiation is beyond the scope of
  this specification.
- `exp`: REQUIRED. Expiration time on or after which the ID Token MUST NOT be accepted for processing.
- `iat`: OPTIONAL. Time at which the JWT was issued.

When making a request to the `/oauth2/token` endpoint, you include
`client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer` and `client_assertion=<signed-jwt>` in the request
body:

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

Here's what a client with a `jwks` containing one RSA public key looks like:

```json
{
  "client_id": "rsa-client-jwks",
  "jwks": {
    "keys": [
      {
        "kty": "RSA",
        "n": "jL7h5wc-yeMUsHGJHc0xe9SbTdaLKXMHvcIHQck20Ji7SvrHPdTDQTvZtTDS_wJYbeShcCrliHvbJRSZhtEe0mPJpyWg3O_HkKy6_SyHepLK-_BR7HfcXYB6pVJCG3BW-lVMY7gl5sULFA74kNZH50h8hdmyWC9JgOHn0n3YLdaxSWlhctuwNPSwqwzY4qtN7_CZub81SXWpKiwj4UpyB10b8rM8qn35FS1hfsaFCVi0gQpd4vFDgFyqqpmiwq8oMr8RZ2mf0NMKCP3RXnMhy9Yq8O7lgG2t6g1g9noWbzZDUZNc54tv4WGFJ_rJZRz0jE_GR6v5sdqsDTdjFquPlQ",
        "e": "AQAB",
        "use": "sig",
        "kid": "rsa-jwk"
      }
    ]
  },
  "token_endpoint_auth_method": "private_key_jwt",
  "token_endpoint_auth_signing_alg": "RS256"
}
```

And here is how it looks like for a `jwks` including an ECDSA public key:

```json
{
  "client_id": "ecdsa-client-jwks",
  "jwks": {
    "keys": [
      {
        "kty": "EC",
        "use": "sig",
        "crv": "P-256",
        "kid": "ecdsa-jwk",
        "x": "nQjdhpecjZRlworpYk_TJAQBe4QbS8IwHY1DWkfR0w0",
        "y": "UQfLzHxhc4i3EETUeaAS1vDVFJ-Y01hIESiXqqS86Vc"
      }
    ]
  },
  "token_endpoint_auth_method": "private_key_jwt",
  "token_endpoint_auth_signing_alg": "ES256"
}
```

And here is how it looks like for a `jwks` including an EdDSA public key:

```json
{
  "client_id": "eddsa-client-jwks",
  "jwks": {
    "keys": [
      {
        "kty": "OKP",
        "use": "sig",
        "crv": "Ed25519",
        "kid": "eddsa-jwk",
        "x": "cg1qGqQGSF6xvzoDZVaDfxu0c2fPhUEuVHYUr1WYVXs"
      }
    ]
  },
  "token_endpoint_auth_method": "private_key_jwt",
  "token_endpoint_auth_signing_alg": "EdDSA"
}
```

And with `jwks_uri`:

```json
{
  "client_id": "client-jwks-uri",
  "jwks_uri": "http://path-to-my-public/keys.json",
  "token_endpoint_auth_method": "private_key_jwt",
  "token_endpoint_auth_signing_alg": "RS256"
}
```

The `jwks_uri` must return a JSON object containing the public keys associated with the OAuth 2.0 Client:

```json
{
  "keys": [
    {
      "kty": "RSA",
      "n": "jL7h5wc-yeMUsHGJHc0xe9SbTdaLKXMHvcIHQck20Ji7SvrHPdTDQTvZtTDS_wJYbeShcCrliHvbJRSZhtEe0mPJpyWg3O_HkKy6_SyHepLK-_BR7HfcXYB6pVJCG3BW-lVMY7gl5sULFA74kNZH50h8hdmyWC9JgOHn0n3YLdaxSWlhctuwNPSwqwzY4qtN7_CZub81SXWpKiwj4UpyB10b8rM8qn35FS1hfsaFCVi0gQpd4vFDgFyqqpmiwq8oMr8RZ2mf0NMKCP3RXnMhy9Yq8O7lgG2t6g1g9noWbzZDUZNc54tv4WGFJ_rJZRz0jE_GR6v5sdqsDTdjFquPlQ",
      "e": "AQAB",
      "use": "sig",
      "kid": "rsa-jwk"
    }
  ]
}
```
