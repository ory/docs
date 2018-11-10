# Access Rules

ORY Oathkeeper decides whether or not access should be allowed with Access Rules. Access Rules can be managed using the
ORY Oathkeeper API.

<!-- toc -->

## Overview

An ORY Oathkeeper Access Rule has the following layout:

```
{
    "id": "some-id",
    "upstream": {
        "url": "http://my-backend-service"
    },
    "match": {
        "url": "http://my-app/some-route",
        "methods": [
            "GET"
        ]
    },
    "authenticators": [/* ... */],
    "authorizer": {/* ... */},
    "credentials_issuer": { /* ... */ }
}
```

In this case, if a request to `http://my-app/some-route` is made (this is where ORY Oathkeeper will listen to), then
the rule with ID `some-id` will be executed. Then:

* If the request hits the ORY Oathkeeper proxy (`oathkeeper serve proxy`): The request will be forwarded to the upstream URL.
* If the request hits the ORY Oathkeeper judge (`oathkeeper serve api` -> `/judge/some-route`): The server will respond with
status code 200 if the request is valid and any other status code if not.

The `match.url` value is capable of parsing regular expressions. Value `http://my-app/some-route` will only
match this exact URL, not `http://my-app/some-route/foo`, `http://my-app/some-ROUTE`, nor `https://my-app/some-route`.

Regular expressions are delimited with `<` and `>`. A `match.url` value of `http://my-app/some-route<.*>` will match
`http://my-app/some-route/foo`, `http://my-app/some-route`, `http://my-app/some-routeABCDEF`, and so on. You can
use multiple regular expressions: `<http|https>://my-app/some-route<.*>`.

The `match.methods` value defines which HTTP methods this access rule will match. The rule `some-id` will, for example,
not match POST requests.

ORY Oathkeeper will throw an error if more than one access rule is found for a given HTTP request. You have to make sure
that your access rules don't overlap.

Once an access rule is matched, ORY Oathkeeper will authenticate the credentials, authorize the request subject (e.g. the user),
and transform the credentials. More on that in the next sections.

### Authenticators

An authenticator is responsible for authenticating request credentials. ORY Oathkeeper supports different authenticators
and we will add more as the project progresses.

An authenticator inspects the HTTP request (e.g. the HTTP Authorization Header) and executes some business logic that
returns true (for authentication ok) or false (for authentication invalid) as well as a subject ID. The subject ID is
typically the "user" that made the request, but it could also be a machine (if you have machine-2-machine interaction) or
something different.

Each authenticator has the same configuration layout

```
"authenticators": [
    {
        "handler": "a",
        "config": {/* depends on the authenticator */}
    }
]
```

where `handler` is the name of the authenticator and `config` is an optional configuration for that specific
authenticator.

You can define more than one authenticator in the access rule. The first authenticator that is able to handle the
credentials will be consulted and other authenticators will be ignored:

```
"authenticators": [
    {
        "handler": "a"
    },
    {
        "handler": "b"
    },
    {
        "handler": "c"
    }
]
```

If handler `a` is able to handle the provided credentials, then handler `b` and `c` will be ignored. If handler `a`
can not handle the provided credentials but handler `b` can, then handler `a` and `c` will be ignored. Handling
the provided credentials means that the authenticator knows how to handle, for example, the `Authorization: basic` header.
It does not mean that the credentials are valid! If a handler encounters invalid credentials, then other handlers will be ignored too.


Let's take a look at the different supported authenticators!

#### `noop`

This is a special authenticator. It tells ORY Oathkeeper to bypass the authentication process. This also implies
that no authorization will be executed and no credentials will be issued. It's basically a pass-all authenticator
that allows any request to be forwarded to the upstream URL.

##### Example

The following rule allows all requests to `GET http://my-app/some-route`:

```
{
    "id": "some-id",
    "upstream": {
        "url": "http://my-backend-service"
    },
    "match": {
        "url": "http://my-app/some-route",
        "methods": [
            "GET"
        ]
    },
    "authenticators": [{
        "handler": "noop"
    }]
}
```

#### `anonymous`

The `anonymous` authenticator checks whether or not an `Authorization` header is set. If not, it will use the value
of the environment variable `AUTHENTICATOR_ANONYMOUS_USERNAME` as the subject name.

##### Example

The following rule allows all requests to `GET http://my-app/some-route` and sets the subject name to the value
of the environment variable `AUTHENTICATOR_ANONYMOUS_USERNAME`, as long as no `Authorization` header is set in the
HTTP request:

```
{
    "id": "some-id",
    "upstream": {
        "url": "http://my-backend-service"
    },
    "match": {
        "url": "http://my-app/some-route",
        "methods": [
            "GET"
        ]
    },
    "authenticators": [{
        "handler": "anonymous"
    }],
    /* ... */
}
```

#### `oauth2_client_credentials`

This `oauth2_client_credentials` uses the username and password from HTTP Basic Authorization (`Authorization: basic base64(<username:password>)`
to perform the OAuth 2.0 Client Credentials grant in order to detect if the provided credentials are valid.

To use this authenticator, you must provide the environment variable `AUTHENTICATOR_OAUTH2_CLIENT_CREDENTIALS_TOKEN_URL`
which sets the OAuth 2.0 Token URL that should be used to check if the provided credentials are valid or not. For
example, you could set it as follows:

```
$ export AUTHENTICATOR_OAUTH2_CLIENT_CREDENTIALS_TOKEN_URL=https://my-oauth2-server/oauth2/token
```

This authenticator will use the username from the HTTP Basic Authorization header as the subject for this request.

This authenticator has one configuration option which is `required_scope`. This option sets what scope is
required by the URL and when making performing OAuth 2.0 Client Credentials request, the scope will be included
in the request.

##### Example

The following rule allows requests to `GET http://my-app/some-route` if valid a OAuth 2.0 Client ID and Client Secret
has been provided and if that client is allowed to request scope `scope-a` and `scope-b`:

```
{
    "id": "some-id",
    "upstream": {
        "url": "http://my-backend-service"
    },
    "match": {
        "url": "http://my-app/some-route",
        "methods": [
            "GET"
        ]
    },
    "authenticators": [{
        "handler": "oauth2_client_credentials",
        "config": {
            "required_scope": ["scope-a", "scope-b"]
        }
    }],
    /* ... */
}
```

#### `oauth2_introspection`

The `oauth2_introspection` authenticator handles requests that have an Bearer Token in the Authorization Header (`Authorization: bearer <token>`).
It then uses OAuth 2.0 Token Introspection to check if the token is valid and if the token was granted the requested scope.

This authenticator is a bit more complex to set up. You have to define the following environment variables:

* Required
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_URL`: The OAuth 2.0 Token Introspection URL.
* In cases where the OAuth 2.0 Introspection Endpoint is protected and requires an OAuth 2.0 Access Token, you can configure
ORY Oathkeeper to authorize before making requests to that endpoint with the following, optional, settings:
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_CLIENT_ID`: The OAuth 2.0 Client ID the client that performs the OAuth 2.0 Token Introspection. The OAuth 2.0 Token Introspection
    endpoint is typically protected and requires a valid OAuth 2.0 Client in order to check if a token is valid or not.
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_CLIENT_SECRET`: The OAuth 2.0 Client Secret of the client that performs the OAuth 2.0 Token Introspection.
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_TOKEN_URL`: The OAuth 2.0 Token URL.
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_SCOPE`: If the OAuth 2.0 Token Introspection endpoint requires a certain OAuth 2.0 Scope
    in order to be accessed, you can set it using this environment variable. Use commas to define more than one OAuth 2.0 Scope.
    Example: `AUTHENTICATOR_OAUTH2_INTROSPECTION_SCOPE=scope-a,scope-b`
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_SCOPE_STRATEGY`: The strategy to be used to validate the scope claim. Strategies `HIERARCHIC`, `EXACT`,
    `WILDCARD`, `NONE` are supported. Defaults to `EXACT`. For more information on scope strategies, click [here](#scope-strategies)-


##### Example

The following rule allows requests to `GET http://my-app/some-route` if valid a OAuth 2.0 Access Token was provided
and if that token was granted OAuth 2.0 Scope `scope-a` and `scope-b`:

```
{
    "id": "some-id",
    "upstream": {
        "url": "http://my-backend-service"
    },
    "match": {
        "url": "http://my-app/some-route",
        "methods": [
            "GET"
        ]
    },
    "authenticators": [{
        "handler": "oauth2_introspection",
        "config": {
            "required_scope": ["scope-a", "scope-b"]
        }
    }],
    /* ... */
}
```

#### `jwt`

The `jwt` authenticator handles requests that have an Bearer Token in the Authorization Header (`Authorization: bearer <token>`).
It assumes that the token is a JSON Web Token and tries to verify the signature of it.

* Required
    * `AUTHENTICATOR_JWT_JWKS_URL`: The URL where ORY Oathkeeper can retrieve JSON Web Keys from for validating
    the JSON Web Token. Usually something like `https://my-keys.com/.well-known/jwks.json`. The response
    of that endpoint must return a [JSON Web Key Set (JWKS)](https://auth0.com/docs/jwks).
* Optional
    * `AUTHENTICATOR_JWT_SCOPE_STRATEGY`: The strategy to be used to validate the scope claim. Strategies `HIERARCHIC`, `EXACT`,
    `WILDCARD`, `NONE` are supported. Defaults to `EXACT`. For more information on scope strategies, click [here](#scope-strategies)-

##### Example

The following rule allows requests to `GET http://my-app/some-route` if valid a JSON Web Token was provided
and if that token has scope `scope-a` and `scope-b`, audience `aud-1` and was issued by `iss-1`. All configuration
items are optional and ignored if left out.

```
{
    "id": "some-id",
    "upstream": {
        "url": "http://my-backend-service"
    },
    "match": {
        "url": "http://my-app/some-route",
        "methods": [
            "GET"
        ]
    },
    "authenticators": [{
        "handler": "jwt",
        "config": {
            "required_scope": ["scope-a", "scope-b"],
            "require_audience": ["scope-a", "scope-b"],
            "trusted_issuers": ["scope-a", "scope-b"],
        }
    }],
    /* ... */
}
```

Per default, this authenticator accepts JSON Web Tokens signed with the `RS256` algorithm only. You can change that
by whitelisting the algorithms to be allowed. All common JWT singing algorihtms (except `none`) are supported:

```
{
    /* ... */
    "authenticators": [{
        "handler": "jwt",
        "config": {
            "allowed_algorithms": ["RS256", "HS256", "RS512", "ES256"]
        }
    }],
    /* ... */
}
```

### Authorizers

The authorizer takes the subject returned from the authenticator and checks if that subject is allowed to perform
the requested action.

Each authorizer has the same configuration layout

```
"authorizer": {
    "handler": "a",
    "config": {/* depends on the authorizer */}
}
```

#### `allow`

This authorizer allows every request to pass.

#### Example

```
{
    "id": "some-id",
    "upstream": {
        "url": "http://my-backend-service"
    },
    "match": {
        "url": "http://my-app/some-route",
        "methods": [
            "GET"
        ]
    },
    "authenticators": [/* ... */],
    "authorizer": {
        "handler": "allow"
    }
    /* ... */
}
```

#### `deny`

This authorizer denies every request.

#### Example

```
{
    "id": "some-id",
    "upstream": {
        "url": "http://my-backend-service"
    },
    "match": {
        "url": "http://my-app/some-route",
        "methods": [
            "GET"
        ]
    },
    "authenticators": [/* ... */],
    "authorizer": {
        "handler": "deny"
    }
    /* ... */
}
```

#### `keto_warden`

This authorizer uses the ORY Keto Warden API to perform sophisticated access control with access control policies.
Please familiarize yourself with the ORY Keto project before you set up this authorizer.

To configure this authorizer, you must set the environment variable `AUTHORIZER_KETO_WARDEN_KETO_URL` to ORY Keto's URL,
for example `AUTHORIZER_KETO_WARDEN_KETO_URL=http://keto/`. **If this environment variable is not set, then this authorizer
will be disabled.**

This authorizer has three configuration options, `required_action`, `required_resource` and `subject`:

```
"authorizer": {
    "handler": "keto_warden",
    "config": {
        "required_action": "...",
        "required_resource": "...",
        "subject": "..."
    }
}
```

These configuration options support variable expansion. Let's say you have the following match configuration:

```
"match": {
    "url": "http://my-app/api/users/<[0-9]+>/<[a-zA-Z]+>",
    "methods": ["GET"]
},
```

Here, you have two regular expressions, `<[0-9]+>` and `<[a-zA-Z]+>`. You can reference the values matched by the
regular expression with `$1` and `$2` (and more generally `$n`) and they will be substituted before making the request
to ORY Keto:

```
"config": {
    "required_action": "my:action:$1",
    "required_resource": "my:resource:$2:foo:$1"
}
```

Assuming a request to `http://my-api/api/users/1234/foobar` was made, the config from above would expand to:

```
"config": {
    "required_action": "my:action:1234",
    "required_resource": "my:resource:foobar:foo:1234"
}
```

The `subject` field configures what subject is passed on to keto warden.
The `subject` value is a string which will be parsed by the Go [`text/template`](https://golang.org/pkg/text/template/)
package for value substitution, receiving the [`AuthenticationSession`](https://github.com/ory/oathkeeper/blob/92c09fb28552949cd034ed5555c87dfda91407a3/proxy/authenticator.go#L19)
struct:

```go
type AuthenticationSession struct {
    Subject string
    Extra   map[string]interface{}
}
```

If `subject` is not specified it will default to `AuthenticationSession.Subject`.

Note that the `AuthenticationSession` struct has a field named `Extra` which is a `map[string]interface{}`, which receives
varying introspection data from the authentication process. Because the contents of `Extra` are so variable, nested and
potentially non-existent values need special handling by the `text/template` parser, and a `print` FuncMap function has
been provided to ensure that non-existent map values will simply return an empty string, rather than `<no value>`.

If you find that your headers contain the string `<no value>` then you have most likely omitted the `print` function, and
it is recommended you use it for all values out of an abundance of caution and for consistency.

#### Example

```
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
    "authenticators": [/* ... */],
    "authorizer": {
        "handler": "keto_warden",
        "config": {
            "required_action": "my:action:$1",
            "required_resource": "my:resource:$2:foo:$1"
            "subject": "{{ .Extra.email }}"
        }
    }
    /* ... */
}
```


### Credentials Issuers

A credentials issuer translates the credentials from incoming requests to credentials that you backend understands.
For example, the `Authorization: basic` header might be transformed to `X-User: <subject-id>`. This allows you to
write backends that do not care if the original request was an anonymous one, an OAuth 2.0 Access Token, or some other
credential type. All your backend has to do is understand, for example, the `X-User:`.

If you access ORY Oathkeeper using the judge endpoint, the header will be included in the HTTP response.

#### `noop`

This credentials issuer does not transform the HTTP request and simply forwards the headers as-is. This is useful
if you don't want to replace, for example, `Authorization: basic` with `X-User: <subject-id>`.

##### Example

```
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
    "authenticators": [/* ... */],
    "authorizer": {/* ... */ }
    "credentials_issuer" {
        "handler": "noop"
    }
}
```

#### `id_token`

This credentials issuer takes the authentication information (e.g. subject ID) and transforms it to a signed JSON Web Token,
and more specifically to an OpenID Connect ID Token. You backend can verify the token by fetching the (public) key
from the `/.well-known/jwks.json` endpoint.

Let's say a request is made to a resource protected by ORY Oathkeeper:

```
GET /api/resource HTTP/1.1
Host: www.example.com
Authorization: bearer <opaque-access-token>
```

Assuming that ORY Oathkeeper is granting the access request, the `<opaque-access-token>` will be replaced with a
JSON Web Token that is signed using the asymmetric RS256 key:

```
GET /api/resource HTTP/1.1
Host: internal-api-endpoint-dns
Authorization: bearer <jwt-signed-id-token>
```

Now, the protected resource is capable of decoding and validating the JSON Web Token using the public key supplied
by ORY Oathkeeper's API. The public key for decoding the ID token is available at Oathkeeper's `/.well-known/jwks.json` endpoint:

```
http://oathkeeper:4456/.well-known/jwks.json
```

That `.well-known/jwks.json` endpoint is not served by the ORY Oathkeeper proxy process, but by
the ORY Oathkeeper API process. You will learn more about the difference between the two in the next chapters.

The related flow diagram looks like this:

![ID Token Transformation](../images/id_token.svg)

Let's say the `oauth2_client_credentials` authenticator successfully authenticated the credentials `client-id:client-secret`.
This credentials issuer will craft an ID Token (JWT) with the following exemplary claims:

```
{
  "iss": "https://server.example.com",
  "sub": "client-id",
  "aud": "s6BhdRkqt3",
  "jti": "n-0S6_WzA2Mj",
  "exp": 1311281970,
  "iat": 1311280970,
}
```

The ID Token Claims are as follows:

* `iss`: Issuer Identifier for the Issuer of the response. The iss value is a case sensitive URL using the https scheme
    that contains scheme, host, and optionally, port number and path components and no query or fragment components.
    Typically, this is the URL of ORY Oathkeeper, for example: `https://oathkeeper.myapi.com`.
* `sub`: Subject Identifier. A locally unique and never reassigned identifier within the Issuer for the End-User, which
    is intended to be consumed by the Client, e.g., 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It must not
    exceed 255 ASCII characters in length. The sub value is a case sensitive string. The End-User might also
    be an OAuth 2.0 Client, given that the access token was granted using the OAuth 2.0 Client Credentials flow.
* `aud`: Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id of the Relying Party
    as an audience value. It MAY also contain identifiers for other audiences. In the general case, the aud value is an
    array of case sensitive strings.
* `exp`: Expiration time on or after which the ID Token MUST NOT be accepted for processing. The processing of this
    parameter requires that the current date/time MUST be before the expiration date/time listed in the value.
    Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the
    date/time. See RFC 3339 [RFC3339] for details regarding date/times in general and UTC in particular.
* `iat`: Time at which the JWT was issued. Its value is a JSON number representing the number of seconds
    from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* `jti`: A cryptographically strong random identifier to ensure the ID Token's uniqueness.

This credentials issuer implements several token signing algorithms, specifically:

- `HS256`: This algorithm uses a HMAC-SHA256 with a shared secret as opposed to private/public keys. This strategy
is not encouraged for production.
- `ORY-HYDRA`: This algorithm uses ORY Hydra's JWK management API to generate private/public RSA keypair. This strategy
is encouraged for use in production.

You can set the strategy using the `CREDENTIALS_ISSUER_ID_TOKEN_ALGORITHM` environment variable. There also two more environment variables which modify
the behaviour of this strategy:

* `CREDENTIALS_ISSUER_ID_TOKEN_LIFESPAN`: The lifespan of the ID Token which defaults to 10 minutes. Example:
    `CREDENTIALS_ISSUER_ID_TOKEN_LIFESPAN=1s` (1 second), `CREDENTIALS_ISSUER_ID_TOKEN_LIFESPAN=1m` (1 minute),
    `CREDENTIALS_ISSUER_ID_TOKEN_LIFESPAN=1h` (1 hour), `CREDENTIALS_ISSUER_ID_TOKEN_LIFESPAN=1d` (1 day)
* `CREDENTIALS_ISSUER_ID_TOKEN_ISSUER`: Who issued the token - this will be the value of the `iss` claim in the
    ID Token.

##### Token Signing Algorithms

###### `HS256`

The HS256 algorithm is the default one. This algorithm requires you to set the secret to be used for signing the ID Token.
Be aware that anyone in possession of this secret - also anyone having access to the `./well-known/jwks.json` URL
will be able to forge ID Tokens that will be accepted by your backends. We recommend using this strategy primarily
for development purposes.

**Do not use this strategy in production unless you know what you are doing.** If you do use this in production, make sure
that **noone** (except the services validating the tokens) have access to the `./well-known/jwks.json` URL.

Use must use the `CREDENTIALS_ISSUER_ID_TOKEN_HS256_SECRET` environment variable to set the secret.

###### `ORY-HYDRA`

This ID Token signing algorithm uses ORY Hydra's JSON Web Key API to generate, store, and fetch a RSA public/private keypair.
When using this algorithm, you have the following environment variables available:

* Required
    * `CREDENTIALS_ISSUER_ID_TOKEN_HYDRA_ADMIN_URL`: The URL where the ORY Hydra Admin API is located.
* Optional
    * `CREDENTIALS_ISSUER_ID_TOKEN_HYDRA_JWK_SET_ID`: The ID to be used to create & fetch the JSON Web Key from ORY Hydra.
    Defaults to `oathkeeper:id-token`.
    * `CREDENTIALS_ISSUER_ID_TOKEN_JWK_REFRESH_INTERVAL`: ORY Oathkeeper stores JSON Web Keys for ID Token signing in memory.
    This value sets the refresh interval. Default is 5 minutes.
* If this endpoint is protected using OAuth 2.0 Access Tokens, you can configure ORY Oathkeeper to authorize before
calling this endpoint. To do so, configure the following, optional settings:
    * CREDENTIALS_ISSUER_ID_TOKEN_HYDRA_CLIENT_ID:  The ID of the OAuth 2.0 Client.
    * CREDENTIALS_ISSUER_ID_TOKEN_HYDRA_CLIENT_SECRET: The secret of the OAuth 2.0 Client.
    * CREDENTIALS_ISSUER_ID_TOKEN_HYDRA_CLIENT_SCOPES: The OAuth 2.0 Scope the client should request.
    * CREDENTIALS_ISSUER_ID_TOKEN_HYDRA_PUBLIC_URL: The public URL where endpoint /oauth2/token is located.

##### Access Rule Configuration

Additionally, this credentials issuer allows you to specify the audience of the ID token per access rule. Setting
the audience is optional:

```
"credentials_issuer": {
    "handler": "id_token",
    "config": {
        "aud": ["audience-1", "audience-2"]
    }
}
```

##### Example

```
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
    "authenticators": [/* ... */],
    "authorizer": {/* ... */ }
    "credentials_issuer": {
        "handler": "id_token",
        "config": {
            "aud": ["audience-1", "audience-2"]
        }
    }
}
```

#### `headers`

This credentials issuer will transform the request, allowing you to pass the credentials to the upstream application via
the headers. This will augment, for example, `Authorization: basic` with `X-User: <subject-id>`.

The headers are specified via the `headers` field of the credentials issuer's `config` field. The keys are the header
name and the values are a string which will be parsed by the Go [`text/template`](https://golang.org/pkg/text/template/)
package for value substitution, receiving the [`AuthenticationSession`](https://github.com/ory/oathkeeper/blob/92c09fb28552949cd034ed5555c87dfda91407a3/proxy/authenticator.go#L19)
struct:

```go
type AuthenticationSession struct {
    Subject string
    Extra   map[string]interface{}
}
```

Note that the `AuthenticationSession` struct has a field named `Extra` which is a `map[string]interface{}`, which receives
varying introspection data from the authentication process. Because the contents of `Extra` are so variable, nested and
potentially non-existent values need special handling by the `text/template` parser, and a `print` FuncMap function has
been provided to ensure that non-existent map values will simply return an empty string, rather than `<no value>`.

If you find that your headers contain the string `<no value>` then you have most likely omitted the `print` function, and
it is recommended you use it for all values out of an abundance of caution and for consistency.

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
    "authenticators": [/* ... */],
    "authorizer": {/* ... */}
    "credentials_issuer" {
        "handler": "headers",
        "config": {
            "headers": {
                "X-User": "{{ print .Subject }}",
                "X-Some-Arbitrary-Data": "{{ print .Extra.some.arbitrary.data }}"
            }
        }
    }
}
```

#### `cookies`

This credentials issuer will transform the request, allowing you to pass the credentials to the upstream application via
the cookies.

The cookies are specified via the `cookies` field of the credentials issuers `config` field. The keys are the cookie name
and the values are a string which will be parsed by the Go [`text/template`](https://golang.org/pkg/text/template/) package
for value substitution, receiving the [AuthenticationSession](https://github.com/ory/oathkeeper/blob/92c09fb28552949cd034ed5555c87dfda91407a3/proxy/authenticator.go#L19) struct:

```go
type AuthenticationSession struct {
    Subject string
    Extra   map[string]interface{}
}
```

Note that the `AuthenticationSession` struct has a field name `Extra` which is a `map[string]interface{}`, which receives
varying introspection data from the authentication process. Because the contents of `Extra` are so variable, nested and
potentially non-existent values need special handling by the `text/template` parser, and a `print` FuncMap function has
been provided to ensure the non-existent map values will simply return an empty string, rather than `<no value>`.

If you find that your cookies contain the string `<no value>` then you have most likely omitted the `print` function, and
it is recommended you use it for all values out of an abundance of caution and for consistency.

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
    "authenticators": [/* ... */],
    "authorizer": {/* ... */}
    "credentials_issuer" {
        "handler": "cookies",
        "config": {
            "cookies": {
                "user": "{{ print .Subject }}",
                "some-arbitrary-data": "{{ print .Extra.some.arbitrary.data }}"
            }
        }
    }
}
```

## Scope Strategies

The following scope strategies are supported:

* `HIERARCHIC`: Scope `foo` matches `foo`, `foo.bar`, `foo.baz` but not `bar`
* `WILDCARD`: Scope `foo.*` matches `foo`, `foo.bar`, `foo.baz` but not `bar`. Scope `foo` matches `foo` but not `foo.bar` nor `bar`
* `EXACT`: Scope `foo` matches `foo` but not `bar` nor `foo.bar`
* `NONE`: Scope validation is disabled completely. It is expected that the upstream logic (e.g. OAuth 2.0 Token Introspection) handles scope validation
properly. If no upstream logic (e.g. JWT) exists, an error will be thrown if the scope is to be validated.

## Rule Management

### Rules REST API

For more information on available fields and exemplary payloads of rules, as well as rule management using HTTP
please refer to the [REST API docs](https://www.ory.sh/docs/api/oathkeeper/)

### Rules CLI API

Management of rules is not only possible through the REST API, but additionally using the ORY Oathkeeper CLI.
For help on how to manage the CLI, type `oathkeeper help rules`.
