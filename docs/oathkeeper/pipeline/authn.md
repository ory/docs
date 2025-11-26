---
id: authn
title: Authenticators
---

An authenticator is responsible for authenticating request credentials. Ory Oathkeeper supports different authenticators and we
will add more as the project progresses.

An authenticator inspects the HTTP request (for example the HTTP Authorization Header) and executes some business logic that
returns true (for authentication ok) or false (for authentication invalid) as well as a subject ("user"). The subject is typically
the "user" that made the request, but it could also be a machine (if you have machine-2-machine interaction) or something
different.

Each authenticator has two keys:

- `handler` (string, required): Defines the handler (for example `noop`) to be used.
- `config` (object, optional): Configures the handler. Configuration keys vary per handler. The configuration can be defined in
  the global configuration file, or per access rule.

```json
{
  "authenticators": [
    {
      "handler": "noop",
      "config": {}
    }
  ]
}
```

You can define more than one authenticator in the Access Rule. The first authenticator that's able to handle the credentials will
be consulted and other authenticators will be ignored:

```json
{
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
}
```

If handler `a` is able to handle the provided credentials, then handler `b` and `c` will be ignored. If handler `a` can't handle
the provided credentials but handler `b` can, then handler `a` and `c` will be ignored. Handling the provided credentials means
that the authenticator knows how to handle, for example, the `Authorization: basic` header. It doesn't mean that the credentials
are valid! If a handler encounters invalid credentials, then other handlers will be ignored too.

## `noop`

The `noop` handler tells Ory Oathkeeper to bypass authentication, authorization, and mutation. This implies that no authorization
will be executed and no credentials will be issued. It's basically a pass-all authenticator that allows any request to be
forwarded to the upstream URL.

> Using this handler is basically an allow-all configuration. It makes sense when the upstream handles access control itself or
> doesn't need any type of access control.

### `noop` configuration

This handler isn't configurable.

To enable this handler, set:

```yaml
# Global configuration file oathkeeper.yml
authenticators:
  noop:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
```

### `noop` access rule example

```sh
cat ./rules.json

[{
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
}]

curl -X GET http://my-app/some-route

HTTP/1.0 200 Status OK
The request has been allowed!
```

## `unauthorized`

The `unauthorized` handler tells Ory Oathkeeper to reject all requests as unauthorized.

### `unauthorized` Configuration

This handler isn't configurable.

To enable this handler, set:

```yaml
# Global configuration file oathkeeper.yml
unauthorized:
  # Set 'enabled' to 'true' if the authenticator should be enabled and 'false' to disable the authenticator. Defaults to 'false'.
  enabled: true
```

### `unauthorized` access rule example

```sh
cat ./rules.json

[{
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
    "handler": "unauthorized"
  }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 401 Unauthorized
```

## `anonymous`

The `anonymous` authenticator checks whether or not an `Authorization` header is set. If not, it will set the subject to
`anonymous`.

### `anonymous` Configuration

- `subject` (string, optional) - Sets the anonymous username. Defaults to "anonymous". Common names include "guest", "anon",
  "anonymous", "unknown".

```yaml
# Global configuration file oathkeeper.yml
authenticators:
  anonymous:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      subject: guest
```

```yaml
# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: anonymous
    config:
      subject: guest
```

### `anonymous` access rule example

The following rule allows all requests to `GET http://my-app/some-route` and sets the subject name to the anonymous username, as
long as no `Authorization` header is set in the HTTP request:

```shell
cat ./rules.json

[{
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
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 200 Status OK
The request has been allowed! The subject is: "anonymous"

curl -X GET -H "Authorization: Bearer foobar" http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because credentials have been provided but only the anonymous
authenticator is enabled for this URL.
```

## `cookie_session`

The `cookie_session` authenticator will forward the request method, path and headers to a session store. If the session store
returns `200 OK` and body `{ "subject": "...", "extra": {} }` then the authenticator will set the subject appropriately. Please
note that Gzipped responses from `check_session_url` are not supported, and will fail silently.

### `cookie_session` configuration

- `check_session_url` (string, required) - The session store to forward request method/path/headers to for validation.
- `only` ([]string, optional) - If set, only requests that have at least one of the set cookies will be forwarded, others will be
  passed to the next authenticator. If unset, all requests are forwarded.
- `preserve_path` (boolean, optional) - If set, any path in `check_session_url` will be preserved instead of replacing the path
  with the path of the request being checked.
- `preserve_query` (boolean, optional) - If unset or true, query parameters in `check_session_url` will be preserved instead of
  replacing them with the query of the request being checked.
- `force_method` (string, optional) - If set uses the given HTTP method when forwarding the request, instead of the original HTTP
  method.
- `extra_from` (string, optional - defaults to `extra`) - A [GJSON Path](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)
  pointing to the `extra` field. This defaults to `extra`, but it could also be `@this` (for the root element), `session.foo.bar`
  for `{ "subject": "...", "session": { "foo": {"bar": "whatever"} } }`, and so on.
- `subject_from` (string, optional - defaults to `subject`) - A
  [GJSON Path](https://github.com/tidwall/gjson/blob/master/SYNTAX.md) pointing to the `subject` field. This defaults to
  `subject`. Example: `identity.id` for `{ "identity": { "id": "1234" } }`.
- `additional_headers` (map[string]string, optional - defaults empty) - If set, you can either add additional headers or override
  existing ones.
- `forward_http_headers` ([]string, optional - defaults ["Authorization", "Cookie"]) - If set, you can specify which headers will
  be forwarded.

```yaml
# Global configuration file oathkeeper.yml
authenticators:
  cookie_session:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      check_session_url: https://session-store-host
```

```yaml
# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: cookie_session
    config:
      check_session_url: https://session-store-host
      only:
        - sessionid
```

```yaml
# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: cookie_session
    config:
      check_session_url: https://session-store-host
      only:
        - sessionid
      forward_http_headers:
        - Connect
        - Authorization
        - Cookie
        - X-Forwarded-For
```

```yaml
# Some Access Rule Preserving Path: access-rule-2.yaml
id: access-rule-2
# match: ...
# upstream: ...
authenticators:
  - handler: cookie_session
    config:
      check_session_url: https://session-store-host/check-session
      only:
        - sessionid
      preserve_path: true
      preserve_query: true
```

### `cookie_session` access rule example

```shell
cat ./rules.json

[{
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
    "handler": "cookie_session"
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET -b sessionid=abc http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"

curl -X GET -b sessionid=def http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.
```

## `bearer_token`

The `bearer_token` authenticator will forward the request method, path and headers to a session store. If the session store
returns `200 OK` and body `{ "subject": "...", "extra": {} }` then the authenticator will set the subject appropriately. Please
note that Gzipped responses from `check_session_url` are not supported, and will fail silently.

### `bearer_token` configuration

- `check_session_url` (string, required) - The session store to forward request method/path/headers to for validation.
- `preserve_path` (boolean, optional) - If set, any path in `check_session_url` will be preserved instead of replacing the path
  with the path of the request being checked.
- `preserve_query` (boolean, optional) - If unset or true, query parameters in `check_session_url` will be preserved instead of
  replacing them with the query of the request being checked.
- `force_method` (string, optional) - If set uses the given HTTP method when forwarding the request, instead of the original HTTP
  method.
- `extra_from` (string, optional - defaults to `extra`) - A [GJSON Path](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)
  pointing to the `extra` field. This defaults to `extra`, but it could also be `@this` (for the root element), `session.foo.bar`
  for `{ "subject": "...", "session": { "foo": {"bar": "whatever"} } }`, and so on.
- `subject_from` (string, optional - defaults to `sub`) - A [GJSON Path](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)
  pointing to the `sub` field. This defaults to `sub`. Example: `identity.id` for `{ "identity": { "id": "1234" } }`.
- `token_from` (object, optional) - The location of the bearer token. If not configured, the token will be received from a default
  location - 'Authorization' header. One and only one location (header, query, or cookie) must be specified.
  - `header` (string, required, one of) - The header (case insensitive) that must contain a Bearer token for request
    authentication. It can't be set along with `query_parameter` or `cookie`.
  - `query_parameter` (string, required, one of) - The query parameter (case sensitive) that must contain a Bearer token for
    request authentication. It can't be set along with `header` or `cookie`.
  - `cookie` (string, required, one of) - The cookie (case sensitive) that must contain a Bearer token for request authentication.
    It can't be set along with `header` or `query_parameter`
- `forward_http_headers` ([]string, optional - defaults ["Authorization", "Cookie"]) - If set, you can specify which headers will
  be forwarded.
- `prefix` (string, optional) - If the bearer token does not begin with this prefix, the `bearer_token` authenticator will not
  handle the request.

```yaml
# Global configuration file oathkeeper.yml
authenticators:
  bearer_token:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      check_session_url: https://session-store-host
      token_from:
        header: Custom-Authorization-Header
        # or
        # query_parameter: auth-token
        # or
        # cookie: auth-token
```

```yaml
# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: bearer_token
    config:
      check_session_url: https://session-store-host
      token_from:
        query_parameter: auth-token
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token
```

```yaml
# Some Access Rule Preserving Path: access-rule-2.yaml
id: access-rule-2
# match: ...
# upstream: ...
authenticators:
  - handler: bearer_token
    config:
      check_session_url: https://session-store-host/check-session
      token_from:
        query_parameter: auth-token
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token
      preserve_path: true
      preserve_query: true
      forward_http_headers:
        - Authorization
        - Cookie
        - X-Forwarded-For
```

```yaml
# Some Access Rule Handling a Token with a Specified Prefix: access-rule-3.yaml
id: access-rule-2
# match: ...
# upstream: ...
authenticators:
  - handler: bearer_token
    config:
      check_session_url: https://session-store-host/check-session
      token_from:
        header: Authorization
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token
      # Will only handle requests with Authorization: bearer custom_token_prefix_xxxxxx
      prefix: "custom_token_prefix_"
```

### `bearer_token` access rule example

```shell
cat ./rules.json

[{
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
    "handler": "bearer_token"
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET -H 'Authorization: Bearer valid-token' http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"

curl -X GET -H 'Authorization: Bearer invalid-token' http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.
```

## `oauth2_client_credentials`

This `oauth2_client_credentials` uses the username and password from HTTP Basic Authorization
(`Authorization: Basic base64(<username:password>)` to perform the OAuth 2.0 Client Credentials grant in order to detect if the
provided credentials are valid.

This authenticator will use the username from the HTTP Basic Authorization header as the subject for this request.

> If you are unfamiliar with OAuth 2.0 Client Credentials we recommend
> [reading this guide](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/).

### `oauth2_client_credentials` configuration

- `token_url` (string, required) - The OAuth 2.0 Token Endpoint that will be used to validate the client credentials.
- `retry` (object, optional) - Configures timeout and delay settings for the request against the token endpoint
  - `give_up_after` (string) timeout
  - `max_delay` (string) time to wait between retries
- `cache` (object, optional) - Enables caching of requested tokens
  - `enabled` (bool, optional) - Enable the cache, will use exp time of token to determine when to evict from cache. Defaults to
    false.
  - `ttl` (string) - Can override the default behavior of using the token exp time, and specify a set time to live for the token
    in the cache. If the token exp time is lower than the set value the token exp time will be used instead.
  - `max_tokens` (int) - Max number of tokens to cache. Defaults to 1000.
- `required_scope` ([]string, optional) - Sets what scope is required by the URL and when making performing OAuth 2.0 Client
  Credentials request, the scope will be included in the request:

```yaml
# Global configuration file oathkeeper.yml
authenticators:
  oauth2_client_credentials:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      token_url: https://my-website.com/oauth2/token
```

```yaml
# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: oauth2_client_credentials
    config:
      token_url: https://my-website.com/oauth2/token
```

### `oauth2_client_credentials` access rule example

```shell
cat ./rules.json

[{
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
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because no credentials have been provided.

curl -X GET --user idonotexist:whatever http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.

curl -X GET --user peter:somesecret http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"
```

In the background, a request to the OAuth 2.0 Token Endpoint (value of `authenticators.oauth2_client_credentials.token_url`) will
be made, using the OAuth 2.0 Client Credentials Grant:

```bash
POST /oauth2/token HTTP/1.1
Host: authorization-server.com

grant_type=client_credentials
&client_id=peter
&client_secret=somesecret
&scope=scope-a+scope-b
```

If the request succeeds, the credentials are considered valid and if the request fails, the credentials are considered invalid.

## `oauth2_introspection`

The `oauth2_introspection` authenticator handles requests that have an Bearer Token in the Authorization Header
(`Authorization: bearer <token>`) or in a different header or query parameter specified in configuration. It then uses OAuth 2.0
Token Introspection to check if the token is valid and if the token was granted the requested scope.

> If you are unfamiliar with OAuth 2.0 Introspection we recommend
> [reading this guide](https://www.oauth.com/oauth2-servers/token-introspection-endpoint/).

### `oauth2_introspection` configuration

- `introspection_url` (string, required) - The OAuth 2.0 Token Introspection endpoint.
- `scope_strategy` (string, optional) - Sets the strategy to be used to validate/match the token scope. Supports "hierarchic",
  "exact", "wildcard", "none". Defaults to "none".
- `required_scope` ([]string, optional) - Sets what scope is required by the URL and when performing OAuth 2.0 Client Credentials
  request, the scope will be included in the request.
- `target_audience` ([]string, optional) - Sets what audience is required by the URL.
- `trusted_issuers` ([]string, optional) - Sets a list of trusted token issuers.
- `pre_authorization` (object, optional) - Enable pre-authorization in cases where the OAuth 2.0 Token Introspection endpoint is
  protected by OAuth 2.0 Bearer Tokens that can be retrieved using the OAuth 2.0 Client Credentials grant.
  - `enabled` (bool, optional) - Enable pre-authorization. Defaults to false.
  - `client_id` (string, required if enabled) - The OAuth 2.0 Client ID to be used for the OAuth 2.0 Client Credentials Grant.
  - `client_secret` (string, required if enabled) - The OAuth 2.0 Client Secret to be used for the OAuth 2.0 Client Credentials
    Grant.
  - `token_url` (string, required if enabled) - The OAuth 2.0 Token Endpoint where the OAuth 2.0 Client Credentials Grant will be
    performed.
  - `audience` (string, optional) - The OAuth 2.0 Audience to be requested during the OAuth 2.0 Client Credentials Grant.
  - `scope` ([]string, optional) - The OAuth 2.0 Scope to be requested during the OAuth 2.0 Client Credentials Grant.
- `token_from` (object, optional) - The location of the bearer token. If not configured, the token will be received from a default
  location - 'Authorization' header. One and only one location (header, query, or cookie) must be specified.
  - `header` (string, required, one of) - The header (case insensitive) that must contain a Bearer token for request
    authentication. It can't be set along with `query_parameter` or `cookie`.
  - `query_parameter` (string, required, one of) - The query parameter (case sensitive) that must contain a Bearer token for
    request authentication. It can't be set along with `header` or `cookie`.
  - `cookie` (string, required, one of) - The cookie (case sensitive) that must contain a Bearer token for request authentication.
    It can't be set along with `header` or `query_parameter`
- `introspection_request_headers` (object, optional) - Additional headers to add to the introspection request.
- `retry` (object, optional) - Configure the retry policy
  - `max_delay` (string, optional, default to 500ms) - Maximum delay to wait before retrying the request
  - `give_up_after` (string, optional, default to 1s) - Maximum delay allowed for retries
- `cache` (object, optional) - Enables caching of incoming tokens
  - `enabled` (bool, optional) - Enable the cache, will use exp time of token to determine when to evict from cache. Defaults to
    false.
  - `ttl` (string) - Can override the default behavior of using the token exp time, and specify a set time to live for the token
    in the cache.
  - `max_cost` (int) - Max cost to cache. Defaults to 100000000.

Please note that caching won't be used if the scope strategy is `none` and `required_scope` isn't empty. In that case, the
configured introspection URL will always be called and is expected to check if the scope is valid or not.

```yaml
# Global configuration file oathkeeper.yml
authenticators:
  oauth2_introspection:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      introspection_url: https://my-website.com/oauth2/introspection
      scope_strategy: exact
      required_scope:
        - photo
        - profile
      target_audience:
        - example_audience
      trusted_issuers:
        - https://my-website.com/
      pre_authorization:
        enabled: true
        client_id: some_id
        client_secret: some_secret
        scope:
          - introspect
        token_url: https://my-website.com/oauth2/token
      token_from:
        header: Custom-Authorization-Header
        # or
        # query_parameter: auth-token
        # or
        # cookie: auth-token
      introspection_request_headers:
        x-forwarded-proto: https
      retry:
        max_delay: 300ms
        give_up_after: 2s
      cache:
        enabled: true
        ttl: 60s
```

```yaml
# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: oauth2_introspection
    config:
      introspection_url: https://my-website.com/oauth2/introspection
      scope_strategy: exact
      required_scope:
        - photo
        - profile
      target_audience:
        - example_audience
      trusted_issuers:
        - https://my-website.com/
      pre_authorization:
        enabled: true
        client_id: some_id
        client_secret: some_secret
        scope:
          - introspect
        token_url: https://my-website.com/oauth2/token
      token_from:
        query_parameter: auth-token
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token
      introspection_request_headers:
        x-forwarded-proto: https
        x-foo: bar
      retry:
        max_delay: 300ms
        give_up_after: 2s
```

### `oauth2_introspection` access rule example

```shell
cat ./rules.json

[{
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
      "required_scope": ["scope-a", "scope-b"],
      "target_audience": ["example_audience"]
    }
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because no credentials have been provided.

curl -X GET -H 'Authorization: Bearer invalid-token' http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.

curl -X GET -H 'Authorization: Bearer valid.access.token.from.peter' http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"
```

In the background, this handler will make a request to the OAuth 2.0 Token Endpoint (configuration value
`authenticators.oauth2_introspection.introspection_url`) to check if the Bearer Token is valid:

```bash
POST /oauth2/introspect HTTP/1.1

token=valid.access.token.from.peter
```

If pre-authorization is enabled, that request will include an Authorization Header:

```bash
POST /oauth2/introspect HTTP/1.1
Authorization: Bearer token-received-by-performing-pre-authorization

token=valid.access.token.from.peter
```

The Token is considered valid if the Introspection response is HTTP 200 OK and includes `{"active":true}` in the response payload.
The subject is extracted from the `username` field.

## `jwt`

The `jwt` authenticator handles requests that have an Bearer Token in the Authorization Header (`Authorization: bearer <token>`)
or in a different header or query parameter specified in configuration. It assumes that the token is a JSON Web Token and tries to
verify the signature of it.

### `jwt` configuration

- `jwks_urls` ([]string, required) - The URLs where Ory Oathkeeper can retrieve JSON Web Keys from for validating the JSON Web
  Token. Usually something like `https://my-keys.com/.well-known/jwks.json`. The response of that endpoint must return a JSON Web
  Key Set (JWKS).
- `jwks_max_wait` (duration, optional) - The maximum time for which the JWK fetcher should wait for the JWK request to complete.
  After the interval passes, the JWK fetcher will return expired or no JWK at all. If the initial JWK request finishes
  successfully, it will still refresh the cached JWKs. Defaults to "1s".
- `jwks_ttl` (duration, optional) - The duration for which fetched JWKs should be cached internally. Defaults to "30s".
- `scope_strategy` (string, optional) - Sets the strategy to be used to validate/match the scope. Supports "hierarchic", "exact",
  "wildcard", "none". Defaults to "none".
- If `trusted_issuers` ([]string) is set, the JWT must contain a value for claim `iss` that matches _exactly_ (case-sensitive) one
  of the values of `trusted_issuers`. If no values are configured, the issuer will be ignored.
- If `target_audience` ([]string) is set, the JWT must contain all values (exact, case-sensitive) in the claim `aud`. If no values
  are configured, the audience will be ignored.
- Value `allowed_algorithms` ([]string) sets what signing algorithms are allowed. Defaults to `RS256`.
- Value `required_scope` ([]string) validates the scope of the JWT. It will checks for claims `scp`, `scope`, `scopes` in the JWT
  when validating the scope as that claim isn't standardized.
- `token_from` (object, optional) - The location of the bearer token. If not configured, the token will be received from a default
  location - 'Authorization' header. One and only one location (header, query, or cookie) must be specified.
  - `header` (string, required, one of) - The header (case insensitive) that must contain a Bearer token for request
    authentication. It can't be set along with `query_parameter` or `cookie`.
  - `query_parameter` (string, required, one of) - The query parameter (case sensitive) that must contain a Bearer token for
    request authentication. It can't be set along with `header` or `cookie`.
  - `cookie` (string, required, one of) - The cookie (case sensitive) that must contain a Bearer token for request authentication.
    It can't be set along with `header` or `query_parameter`

```yaml
# Global configuration file oathkeeper.yml
authenticators:
  jwt:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      jwks_urls:
        - https://my-website.com/.well-known/jwks.json
        - https://my-other-website.com/.well-known/jwks.json
        - file://path/to/local/jwks.json
      scope_strategy: none
      required_scope:
        - scope-a
        - scope-b
      target_audience:
        - https://my-service.com/api/users
        - https://my-service.com/api/devices
      trusted_issuers:
        - https://my-issuer.com/
      allowed_algorithms:
        - RS256
      token_from:
        header: Custom-Authorization-Header
        # or
        # query_parameter: auth-token
        # or
        # cookie: auth-token
```

```yaml
# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: jwt
    config:
      jwks_urls:
        - https://my-website.com/.well-known/jwks.json
        - https://my-other-website.com/.well-known/jwks.json
        - file://path/to/local/jwks.json
      scope_strategy: none
      required_scope:
        - scope-a
        - scope-b
      target_audience:
        - https://my-service.com/api/users
        - https://my-service.com/api/devices
      trusted_issuers:
        - https://my-issuer.com/
      allowed_algorithms:
        - RS256
      token_from:
        query_parameter: auth-token
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token
```

#### `jwt` validation example

```json
{
  "handler": "jwt",
  "config": {
    "required_scope": ["scope-a", "scope-b"],
    "target_audience": ["https://my-service.com/api/users", "https://my-service.com/api/devices"],
    "trusted_issuers": ["https://my-issuer.com/"],
    "allowed_algorithms": ["RS256", "RS256"]
  }
}
```

That exemplary Access Rule consider the following (decoded) JSON Web Token as valid:

```json
{
  "alg": "RS256"
}
{
  "iss": "https://my-issuer.com/",
  "aud": ["https://my-service.com/api/users", "https://my-service.com/api/devices"],
  "scp": ["scope-a", "scope-b"]
}
```

And this token as invalid (audience is missing, issuer isn't matching, scope is missing, wrong algorithm):

```json
{
  "alg": "HS256"
}
{
  "iss": "https://not-my-issuer.com/",
  "aud": ["https://my-service.com/api/users"],
  "scp": ["not-scope-a", "scope-b"]
}
```

### `jwt` Scope

JSON Web Tokens can be scoped. However, that feature isn't standardized and several claims that represent the token scope have
been seen in the wild: `scp`, `scope`, `scopes`. Additionally, the claim value can be a string (`"scope-a"`), a space-delimited
string (`"scope-a scope-b"`) or a JSON string array (`["scope-a", "scope-b"]`). Because of this ambiguity, all of those claims are
checked and parsed and will be available as `scp` (string array) in the authentication session (`.Extra["scp"]`).

### `jwt` access rule example

```shell
cat ./rules.json

[{
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
      "target_audience": ["aud-1"],
      "trusted_issuers": ["iss-1"]
    }
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because no credentials have been provided.

curl -X GET -H 'Authorization: Bearer invalid-token' http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.

curl -X GET -H 'Authorization: Bearer valid.jwtfrom.peter' http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"
```

In the background, this handler will fetch all JSON Web Key Sets provided by configuration key `authenticators.jwt.jwks_urls` and
use those keys to verify the signature. If the signature can't be verified by any of those keys, the JWT is considered invalid.

## `remote_json`

The `remote_json` authenticator will forward the HTTP request (method, path, headers and body) to an upstream service. This authenticator aims to send both, the request headers and body to the authentication service, in contrast with the `bearer_token` authenticator, where the request only contains the request headers. If the service returns `200 OK` and body `{ "subject": "...", "extra": {} }`, then the authenticator will set the subject appropriately.

### `remote_json` Configuration

- `service_url` (string, required) - The service to forward request method/path/headers/body to for authentication.
- `preserve_path` (boolean, optional - defaults to `false`) - If set to `true`, any path in `service_url` will be preserved instead of replacing the path with the path of the request being checked.
- `extra_from` (string, optional - defaults to `extra`) - A [GJSON Path](https://github.com/tidwall/gjson/blob/master/SYNTAX.md) pointing to the `extra` field. This defaults to `extra`, but it could also be `@this` (for the root element), `session.foo.bar` for `{ "subject": "...", "session": { "foo": {"bar": "whatever"} } }`, and so on.
- `subject_from` (string, optional - defaults to `subject`) - A [GJSON Path](https://github.com/tidwall/gjson/blob/master/SYNTAX.md) pointing to the `subject` field. This defaults to `subject`. Example: `identity.id` for `{ "identity": { "id": "1234" } }`.
- `method` (string, optional) - The method to pass to the authenticator service. If set, the method of the original request is overwritten with the specified method. If not set, the method used will be `POST` by default, or the original request method if the `use_original_method` fiels is set to `true`.
- `use_original_method` (boolean, optional - defaults to `false`) - If set to `true`, the request to the authentication service will be performed using the original request method; otherwise, the request will be performed using the method `POST`. This field is ignored if the `method` field is set.

```yaml
# Global configuration file oathkeeper.yml
authenticators:
  remote_json:
    # Set enabled to true if authenticator should be neabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      service_url: https://auth-service-host
```

```yaml
# Some Access Rule: access-rule-1.yml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: remote_json
    config:
      service_url: https://auth-service-host
      preserve_path: false
```

```yaml
# Some Access Rule Using A Custom Method: access-rule-2.yml
id: access-rule-2
# match: ...
# upstream: ...
authenticators:
  - handler: remote_json
    config:
      service_url: https://auth-service-host
      preserve_path: true
      method: "POST"
```

### `remote_json` Access Rule Example

```shell
cat ./rules.json

[{
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
    "handler": "remote_json"
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET -H "token: my-token" -d '{ "some": "body" }' http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"

curl -X GET -H "token: invalid" -d '{ "some": "body" }' http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.
```
