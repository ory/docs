---
id: mutator
title: Mutators
---

A mutator transforms the credentials from incoming requests to credentials that
your backend understands. For example, the `Authorization: basic` header might
be transformed to `X-User: <subject-id>`. This allows you to write backends that
do not care if the original request was an anonymous one, an OAuth 2.0 Access
Token, or some other credential type. All your backend has to do is understand,
for example, the `X-User:`.

The Access Control Decision API will return the mutated result as the HTTP
Response.

## `noop`

This mutator does not transform the HTTP request and simply forwards the headers
as-is. This is useful if you don't want to replace, for example,
`Authorization: basic` with `X-User: <subject-id>`.

### Global Configuration

This handler is not configurable except from dis-/enabling:

```yaml
mutators:
  noop:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
```

### Example

```shell
$ cat ./rules.json
{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/users/<[0-9]+>/<[a-zA-Z]+>",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "noop"
    }
  ]
}

$ curl -X GET http://my-app/some-route

HTTP/1.0 200 Status OK
The request has been allowed! The original HTTP Request has not been modified.
```

## `id_token`

This mutator takes the authentication information (e.g. subject) and transforms
it to a signed JSON Web Token, and more specifically to an OpenID Connect ID
Token. Your backend can verify the token by fetching the (public) key from the
`/.well-known/jwks.json` endpoint provided by the ORY Oathkeeper API.

Let's say a request is made to a resource protected by ORY Oathkeeper using
Basic Authorization:

```
GET /api/resource HTTP/1.1
Host: www.example.com
Authorization: Basic Zm9vOmJhcg==
```

Assuming that ORY Oathkeeper is granting the access request,
`Basic Zm9vOmJhcg==` will be replaced with a cryptographically signed JSON Web
Token:

```
GET /api/resource HTTP/1.1
Host: internal-api-endpoint-dns
Authorization: Bearer <jwt-signed-id-token>
```

Now, the protected resource is capable of decoding and validating the JSON Web
Token using the public key supplied by ORY Oathkeeper's API. The public key for
decoding the ID token is available at ORY Oathkeeper's `/.well-known/jwks.json`
endpoint:

```
http://oathkeeper:4456/.well-known/jwks.json
```

The related flow diagram looks like this:

<a href="https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgQyBhcyBDbGllbnRcbiAgICBwYXJ0aWNpcGFudCBPIGFzIE9hdGhrZWVwZXIgUHJveHlcbiAgICBwYXJ0aWNpcGFudCBBIGFzIFByb3RlY3RlZCBTZXJ2ZXIvQVBJXG4gICAgQy0-Pk86IEF1dGhvcml6YXRpb246IEJhc2ljIC4uLi5cbiAgICBPLS0-Pk86IFZhbGlkYXRlIGNyZWRlbnRpYWxzXG4gICAgTy0-PkE6IEF1dGhvcml6YXRpb246IEJlYXJlciBKLlcuVFxuICAgIEEtLT4-TzogRmV0Y2ggUHVibGljIEtleVxuICAgIEEtLT4-QTogVmFsaWRhdGUgSldUIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQiLCJ0aGVtZUNTUyI6Ii5sYWJlbCBmb3JlaWduT2JqZWN0IHsgb3ZlcmZsb3c6IHZpc2libGU7IGZvbnQtc2l6ZTogMTNweCB9In19">
    <img alt="ID Token Transformation" src="/images/docs/oathkeeper/id_token.svg">
<a/>

Let's say the `oauth2_client_credentials` authenticator successfully
authenticated the credentials `client-id:client-secret`. This mutator will craft
an ID Token (JWT) with the following exemplary claims:

```json
{
  "iss": "https://server.example.com",
  "sub": "client-id",
  "aud": "s6BhdRkqt3",
  "jti": "n-0S6_WzA2Mj",
  "exp": 1311281970,
  "iat": 1311280970
}
```

The ID Token Claims are as follows:

- `iss`: Issuer Identifier for the Issuer of the response. The iss value is a
  case sensitive URL using the https scheme that contains scheme, host, and
  optionally, port number and path components and no query or fragment
  components. Typically, this is the URL of ORY Oathkeeper, for example:
  `https://oathkeeper.myapi.com`.
- `sub`: Subject Identifier. A locally unique and never reassigned identifier
  within the Issuer for the End-User, which is intended to be consumed by the
  Client, e.g., 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It must not
  exceed 255 ASCII characters in length. The sub value is a case sensitive
  string. The End-User might also be an OAuth 2.0 Client, given that the access
  token was granted using the OAuth 2.0 Client Credentials flow.
- `aud`: Audience(s) that this ID Token is intended for. It MUST contain the
  OAuth 2.0 client_id of the Relying Party as an audience value. It MAY also
  contain identifiers for other audiences. In the general case, the aud value is
  an array of case sensitive strings.
- `exp`: Expiration time on or after which the ID Token MUST NOT be accepted for
  processing. The processing of this parameter requires that the current
  date/time MUST be before the expiration date/time listed in the value. Its
  value is a JSON number representing the number of seconds from
  1970-01-01T0:0:0Z as measured in UTC until the date/time. See RFC 3339
  [RFC3339] for details regarding date/times in general and UTC in particular.
- `iat`: Time at which the JWT was issued. Its value is a JSON number
  representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC
  until the date/time.
- `jti`: A cryptographically strong random identifier to ensure the ID Token's
  uniqueness.

### Global Configuration

```yaml
mutators:
  id_token:
    # Set enabled to true if the mutator should be enabled and false to disable the mutator. Defaults to false.
    enabled: true

    # REQUIRED IF ENABLED - Sets the "iss" value of the ID Token.
    issuer_url: https://my-oathkeeper/

    # REQUIRED IF ENABLED - Sets the URL where keys should be fetched from. Supports remote locations (http, https) as
    # well as local filesystem paths.
    jwks_url: https://fetch-keys/from/this/location.json
    # jwks_url: file:///from/this/absolute/location.json
    # jwks_url: file://../from/this/relative/location.json

    # Sets the time-to-live of the ID token. Defaults to one minute. Valid time units are: s (second), m (minute), h (hour).
    ttl: 60s
```

The first private key found in the JSON Web Key Set defined by
`mutators.id_token.jwks_url` will be used for signing the JWT:

- If the first key found is a symmetric key (`HS256` algorithm), that key will
  be used. That key **will not** be broadcasted at `/.well-known/jwks.json`. You
  must manually configure the upstream to be able to fetch the key (e.g. from an
  environment variable).
- If the first key found is an asymmetric private key (e.g. `RS256`, `ES256`,
  ...), that key will be used. The related public key will be broadcasted at
  `/.well-known/jwks.json`.

### Per-Rule Configuration

Additionally, this mutator allows you to specify the audience of the ID token
per access rule. Setting the audience is optional:

```json
{
  "handler": "id_token",
  "config": {
    "aud": ["https://my-backend-service/some/endpoint"]
  }
}
```

### Example

```shell
$ cat ./rules.json
{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/users/<[0-9]+>/<[a-zA-Z]+>",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "id_token",
      "config": {
        "aud": [
          "audience-1",
          "audience-2"
        ]
      }
    }
  ]  
}
```

## `header`

This mutator will transform the request, allowing you to pass the credentials to
the upstream application via the headers. This will augment, for example,
`Authorization: basic` with `X-User: <subject-id>`.

### Global Configuration

This handler is not configurable except from dis-/enabling:

```yaml
mutators:
  header:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
```

### Per-Rule Configuration

The headers are specified via the `headers` field of the mutator's `config`
field. The keys are the header name and the values are a string which will be
parsed by the Go [`text/template`](https://golang.org/pkg/text/template/)
package for value substitution, receiving the
[`AuthenticationSession`](https://github.com/ory/oathkeeper/blob/92c09fb28552949cd034ed5555c87dfda91407a3/proxy/authenticator.go#L19)
struct:

```go
type AuthenticationSession struct {
    Subject string
    Extra   map[string]interface{}
}
```

Note that the `AuthenticationSession` struct has a field named `Extra` which is
a `map[string]interface{}`, which receives varying introspection data from the
authentication process. Because the contents of `Extra` are so variable, nested
and potentially non-existent values need special handling by the `text/template`
parser, and a `print` FuncMap function has been provided to ensure that
non-existent map values will simply return an empty string, rather than
`<no value>`.

If you find that your headers contain the string `<no value>` then you have most
likely omitted the `print` function, and it is recommended you use it for all
values out of an abundance of caution and for consistency.

### Example

```json
{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/<.*>",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "headers",
      "config": {
        "headers": {
          "X-User": "{{ print .Subject }}",
          "X-Some-Arbitrary-Data": "{{ print .Extra.some.arbitrary.data }}"
        }
      }
    }
  ]
}
```

## `cookie`

This mutator will transform the request, allowing you to pass the credentials to
the upstream application via the cookies.

### Global Configuration

This handler is not configurable except from dis-/enabling:

```yaml
mutators:
  cookie:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
```

### Per-Rule Configuration

The cookies are specified via the `cookies` field of the mutators `config`
field. The keys are the cookie name and the values are a string which will be
parsed by the Go [`text/template`](https://golang.org/pkg/text/template/)
package for value substitution, receiving the
[AuthenticationSession](https://github.com/ory/oathkeeper/blob/92c09fb28552949cd034ed5555c87dfda91407a3/proxy/authenticator.go#L19)
struct:

```go
type AuthenticationSession struct {
    Subject string
    Extra   map[string]interface{}
}
```

Note that the `AuthenticationSession` struct has a field name `Extra` which is a
`map[string]interface{}`, which receives varying introspection data from the
authentication process. Because the contents of `Extra` are so variable, nested
and potentially non-existent values need special handling by the `text/template`
parser, and a `print` FuncMap function has been provided to ensure the
non-existent map values will simply return an empty string, rather than
`<no value>`.

If you find that your cookies contain the string `<no value>` then you have most
likely omitted the `print` function, and it is recommended you use it for all
values out of an abundance of caution and for consistency.

##### Example

```json
{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/<.*>",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "cookies",
      "config": {
        "cookies": {
          "user": "{{ print .Subject }}",
          "some-arbitrary-data": "{{ print .Extra.some.arbitrary.data }}"
        }
      }
    }
  ]
}
```
