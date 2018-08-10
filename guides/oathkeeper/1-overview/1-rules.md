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
can not handle the provided credentials but handler `b` can, then handler `a` and `b` will be ignored. Handling
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
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_CLIENT_ID`: The OAuth 2.0 Client ID the client that performs the OAuth 2.0 Token Introspection. The OAuth 2.0 Token Introspection
    endpoint is typically protected and requires a valid OAuth 2.0 Client in order to check if a token is valid or not.
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_CLIENT_SECRET`: The OAuth 2.0 Client Secret of the client that performs the OAuth 2.0 Token Introspection.
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_TOKEN_URL`: The OAuth 2.0 Token URL.
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_INTROSPECT_URL`: The OAuth 2.0 Token Introspection URL.
* Optional
    * `AUTHENTICATOR_OAUTH2_INTROSPECTION_SCOPE`: If the OAuth 2.0 Token Introspection endpoint requires a certain OAuth 2.0 Scope
    in order to be accessed, you can set it using this environment variable. Use commas to define more than one OAuth 2.0 Scope.
    Example: `AUTHENTICATOR_OAUTH2_INTROSPECTION_SCOPE=scope-a,scope-b`


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

This authorizer has two configuration options, `required_action` and `required_resource`:

```
"authorizer": {
    "handler": "keto_warden",
    "config": {
        "required_action": "..."
        "required_resource": "..."
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
    * `CREDENTIALS_ISSUER_ID_TOKEN_HYDRA_URL`: The URL where ORY Hydra is located.
* Optional
    * `CREDENTIALS_ISSUER_ID_TOKEN_HYDRA_JWK_SET_ID`: The ID to be used to create & fetch the JSON Web Key from ORY Hydra.
    Defaults to `oathkeeper:id-token`.
    * `CREDENTIALS_ISSUER_ID_TOKEN_JWK_REFRESH_INTERVAL`: ORY Oathkeeper stores JSON Web Keys for ID Token signing in memory.
    This value sets the refresh interval. Default is 5 minutes.

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

## Reference

This section summarizes all handlers mentioned above in a readable manner.

### Authenticators

#### `noop`

```json
{
    "handler": "noop"
}
```

The `noop` handler does not have any configuration options in the access rule nor as environment variables. It is very
similar to the `anonymous` handler but does not set a subject ID.

#### `noop`

```json
{
    "handler": "anonymous"
}
```

The `anonymous` handler does not have any configuration options in the access rule. You can configure the
anonymous ID using the `AUTHENTICATOR_ANONYMOUS_USERNAME` environment variable.

#### `oauth2_client_credentials`

```
{
    "handler": "oauth2_client_credentials",
    "config": {
        "required_scope": ["scope-a", "scope-b"]
    }
}
```

The `oauth2_client_credentials` handler has the `required_scope` configuration option which sets the scope that is
required for the request to be allowed. If the OAuth 2.0 Client is not allowed to request said scope, the request will be
denied.

You can set the endpoint for the OAUth 2.0 Client Credentials flow using the `AUTHENTICATOR_OAUTH2_CLIENT_CREDENTIALS_TOKEN_URL`
environment variable.

#### `oauth2_introspection`

```json
{
    "handler": "oauth2_introspection",
    "config": {
        "required_scope": ["scope-a", "scope-b"]
    }
}
```

The `oauth2_introspection` handler has the `required_scope` configuration option which sets the scope that is
required for the request to be allowed. If the OAuth 2.0 Access Token was not granted on of those permissions (scope),
the request will be denied.

For a list of environment variables please [look here](#oauth2introspection).

### Authorizers

#### `allow`

```json
{
    "handler": "allow"
}
```

The `allow` handler does not have any configuration options in the access rule nor as environment variables.

#### `deny`

```json
{
    "handler": "deny"
}
```

The `deny` handler does not have any configuration options in the access rule nor as environment variables.

#### `keto_warden`

```json
{
    "handler": "keto_warden",
    "config": {
        "required_action": "..."
        "required_resource": "..."
    }
}
```

The `keto_warden` handler has to configuration options (`required_action`, `required_resource`). Both of them are
strings and support variable expansion using the match URL's regular expression.

To enable this handler, the `AUTHORIZER_KETO_WARDEN_KETO_URL` environment variable must be set and must point to
the URL where ORY Keto is hosted.

### Credentials Issuers

#### `noop`

```json
{
    "handler": "noop"
}
```

The `noop` handler does not have any configuration options in the access rule nor as environment variables.

#### `id_token`

```json
{
   "handler": "id_token",
   "config": {
       "aud": ["audience-1", "audience-2"]
   }
}
```

The `id_token` handler allows the configuration of the `aud` (audience) claim. This enables you to scope the validity
of the ID Token to a specific set of APIs/servers/services.

For a list of environment variables please [look here](#idtoken).

## Rule Management

### Rules REST API

For more information on available fields and exemplary payloads of rules, as well as rule management using HTTP
please refer to the [REST API docs](https://www.ory.sh/docs/api/oathkeeper/)

### Rules CLI API

Management of rules is not only possible through the REST API, but additionally using the ORY Oathkeeper CLI.
For help on how to manage the CLI, type `oathkeeper help rules`.
