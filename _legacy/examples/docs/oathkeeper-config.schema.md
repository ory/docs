# ORY Oathkeeper Configuration Schema

```
https://raw.githubusercontent.com/ory/oathkeeper/master/config.schema.json
```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                                                     |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | -------------------------------------------------------------- |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Forbidden             | [oathkeeper-config.schema.json](oathkeeper-config.schema.json) |

## Schema Hierarchy

- ORY Oathkeeper Configuration `https://raw.githubusercontent.com/ory/oathkeeper/master/config.schema.json`
  - [Log Configuration](logrusx/viper.schema.md)
    `https://raw.githubusercontent.com/ory/x/master/.schemas/logrusx/viper.schema.json`
  - [Profiling Configuration](proxilingx/viper.schema.md)
    `https://raw.githubusercontent.com/ory/x/master/.schemas/profilingx/viper.schema.json`

# ORY Oathkeeper Configuration Properties

| Property                          | Type                    | Required | Nullable | Defined by                                 |
| --------------------------------- | ----------------------- | -------- | -------- | ------------------------------------------ |
| [access_rules](#access_rules)     | `object`                | Optional | No       | ORY Oathkeeper Configuration (this schema) |
| [authenticators](#authenticators) | `object`                | Optional | No       | ORY Oathkeeper Configuration (this schema) |
| [authorizers](#authorizers)       | `object`                | Optional | No       | ORY Oathkeeper Configuration (this schema) |
| [log](#log)                       | Log Configuration       | Optional | No       | ORY Oathkeeper Configuration (this schema) |
| [mutators](#mutators)             | `object`                | Optional | No       | ORY Oathkeeper Configuration (this schema) |
| [profiling](#profiling)           | Profiling Configuration | Optional | No       | ORY Oathkeeper Configuration (this schema) |
| [serve](#serve)                   | `object`                | Optional | No       | ORY Oathkeeper Configuration (this schema) |

## access_rules

### Access Rules

Configure access rules. All sub-keys support configuration reloading without restarting.

`access_rules`

- is optional
- type: `object`
- defined in this schema

### access_rules Type

`object` with following properties:

| Property       | Type  | Required |
| -------------- | ----- | -------- |
| `repositories` | array | Optional |

#### repositories

##### Repositories

Locations (list of URLs) where access rules should be fetched from on boot. It is expected that the documents at those
locations return a JSON or YAML Array containing ORY Oathkeeper Access Rules:

- If the URL Scheme is `file://`, the access rules (an array of access rules is expected) will be fetched from the
  local file system.
- If the URL Scheme is `inline://`, the access rules (an array of access rules is expected) are expected to be a base64
  encoded (with padding!) JSON/YAML string (base64_encode(`[{"id":"foo-rule","authenticators":[....]}]`)).
- If the URL Scheme is `http://` or `https://`, the access rules (an array of access rules is expected) will be fetched
  from the provided HTTP(s) location.

`repositories`

- is optional
- type: `string[]`

##### repositories Type

Array type: `string[]`

All items must be of the type: `string`

##### repositories Example

```json
[
  "file://path/to/rules.json",
  "inline://W3siaWQiOiJmb28tcnVsZSIsImF1dGhlbnRpY2F0b3JzIjpbXX1d",
  "https://path-to-my-rules/rules.json"
]
```

## authenticators

### Authenticators

For more information on authenticators head over to: https://www.ory.sh/docs/oathkeeper/pipeline/authn

`authenticators`

- is optional
- type: `object`
- defined in this schema

### authenticators Type

`object` with following properties:

| Property                    | Type   | Required |
| --------------------------- | ------ | -------- |
| `anonymous`                 | object | Optional |
| `cookie_session`            | object | Optional |
| `jwt`                       | object | Optional |
| `noop`                      | object | Optional |
| `oauth2_client_credentials` | object | Optional |
| `oauth2_introspection`      | object | Optional |

#### anonymous

##### Anonymous

The [`anonymous` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#anonymous).

`anonymous`

- is optional
- type: `object`

##### anonymous Type

`object` with following properties:

| Property  | Type    | Required | Default       |
| --------- | ------- | -------- | ------------- |
| `enabled` | boolean | Optional |               |
| `subject` | string  | Optional | `"anonymous"` |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### subject

##### Anonymous Subject

Sets the anonymous username.

`subject`

- is optional
- type: `string`
- default: `"anonymous"`

##### subject Type

`string`

##### subject Examples

```json
guest
```

```json
anon
```

```json
anonymous
```

```json
unknown
```

#### cookie_session

##### Cookie Session

The [`cookie_session` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#cookie_session).

`cookie_session`

- is optional
- type: `object`

##### cookie_session Type

`object` with following properties:

| Property            | Type    | Required |
| ------------------- | ------- | -------- |
| `check_session_url` | string  | Optional |
| `enabled`           | boolean | Optional |
| `only`              | array   | Optional |

#### check_session_url

##### Session Check URL

The origin to proxy requests to. If the response is a 200 with body `{ "subject": "...", "extra": {} }`. The request
will pass the subject through successfully, otherwise it will be marked as unauthorized.

> If this authenticator is enabled, this value is required.

`check_session_url`

- is optional
- type: `string`

##### check_session_url Type

`string`

##### check_session_url Example

```json
https://session-store-host
```

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### only

##### Only Cookies

A list of possible cookies to look for on incoming requests, and will fallthrough to the next authenticator if none of
the passed cookies are set on the request.

`only`

- is optional
- type: `string[]`

##### only Type

Array type: `string[]`

All items must be of the type: `string`

#### jwt

##### JSON Web Token (jwt)

The [`jwt` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#jwt).

`jwt`

- is optional
- type: `object`

##### jwt Type

`object` with following properties:

| Property         | Type    | Required |
| ---------------- | ------- | -------- |
| `enabled`        | boolean | Optional |
| `jwks_urls`      | boolean | Optional |
| `scope_strategy` |         | Optional |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### jwks_urls

##### JSON Web Key URLs

URLs where ORY Oathkeeper can retrieve JSON Web Keys from for validating the JSON Web Token. Usually something like
"https://my-keys.com/.well-known/jwks.json". The response of that endpoint must return a JSON Web Key Set (JWKS).

> If this authenticator is enabled, this value is required.

`jwks_urls`

- is optional
- type: `boolean`

##### jwks_urls Type

`boolean`

##### jwks_urls Examples

```json
https://my-website.com/.well-known/jwks.json
```

```json
https://my-other-website.com/.well-known/jwks.json
```

```json
file://path/to/local/jwks.json
```

#### scope_strategy

`scope_strategy`

- is optional
- type: complex

##### scope_strategy Type

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/scopeStrategy`

#### noop

##### No Operation (noop)

The [`noop` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#noop).

`noop`

- is optional
- type: `object`

##### noop Type

`object` with following properties:

| Property  | Type    | Required |
| --------- | ------- | -------- |
| `enabled` | boolean | Optional |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### oauth2_client_credentials

##### OAuth 2.0 Client Credentials

The
[`oauth2_client_credentials` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#oauth2_client_credentials).

`oauth2_client_credentials`

- is optional
- type: `object`

##### oauth2_client_credentials Type

`object` with following properties:

| Property    | Type    | Required |
| ----------- | ------- | -------- |
| `enabled`   | boolean | Optional |
| `token_url` | string  | Optional |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### token_url

The OAuth 2.0 Token Endpoint that will be used to validate the client credentials.

> If this authenticator is enabled, this value is required.

`token_url`

- is optional
- type: `string`

##### token_url Type

`string`

##### token_url Example

```json
https://my-website.com/oauth2/token
```

#### oauth2_introspection

##### OAuth 2.0 Token Introspection

The [`oauth2_introspection` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#oauth2_introspection).

`oauth2_introspection`

- is optional
- type: `object`

##### oauth2_introspection Type

`object` with following properties:

| Property            | Type    | Required |
| ------------------- | ------- | -------- |
| `enabled`           | boolean | Optional |
| `introspection_url` | string  | Optional |
| `pre_authorization` | object  | Optional |
| `scope_strategy`    |         | Optional |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### introspection_url

##### OAuth 2.0 Introspection URL

The OAuth 2.0 Token Introspection endpoint URL.

> If this authenticator is enabled, this value is required.

`introspection_url`

- is optional
- type: `string`

##### introspection_url Type

`string`

##### introspection_url Example

```json
https://my-website.com/oauth2/introspection
```

#### pre_authorization

##### Pre-Authorization

Enable pre-authorization in cases where the OAuth 2.0 Token Introspection endpoint is protected by OAuth 2.0 Bearer
Tokens that can be retrieved using the OAuth 2.0 Client Credentials grant.

`pre_authorization`

- is optional
- type: `object`

##### pre_authorization Type

`object` with following properties:

| Property        | Type    | Required |
| --------------- | ------- | -------- |
| `client_id`     | string  | Optional |
| `client_secret` | string  | Optional |
| `enabled`       | boolean | Optional |
| `scope`         | array   | Optional |
| `token_url`     | string  | Optional |

#### client_id

##### OAuth 2.0 Client ID

The OAuth 2.0 Client ID to be used for the OAuth 2.0 Client Credentials Grant.

> If pre-authorization is enabled, this value is required.

`client_id`

- is optional
- type: `string`

##### client_id Type

`string`

#### client_secret

##### OAuth 2.0 Client Secret

The OAuth 2.0 Client Secret to be used for the OAuth 2.0 Client Credentials Grant.

> If pre-authorization is enabled, this value is required.

`client_secret`

- is optional
- type: `string`

##### client_secret Type

`string`

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### scope

##### OAuth 2.0 Scope

The OAuth 2.0 Scope to be requested during the OAuth 2.0 Client Credentials Grant.

`scope`

- is optional
- type: `string[]`

##### scope Type

Array type: `string[]`

All items must be of the type: `string`

##### scope Example

```json
["foo", "bar"]
```

#### token_url

##### OAuth 2.0 Token URL

The OAuth 2.0 Token Endpoint where the OAuth 2.0 Client Credentials Grant will be performed.

> If pre-authorization is enabled, this value is required.

`token_url`

- is optional
- type: `string`

##### token_url Type

`string`

#### scope_strategy

`scope_strategy`

- is optional
- type: complex

##### scope_strategy Type

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/scopeStrategy`

## authorizers

### Authorizers

For more information on authorizers head over to: https://www.ory.sh/docs/oathkeeper/pipeline/authz

`authorizers`

- is optional
- type: `object`
- defined in this schema

### authorizers Type

`object` with following properties:

| Property              | Type   | Required |
| --------------------- | ------ | -------- |
| `allow`               | object | Optional |
| `deny`                | object | Optional |
| `keto_engine_acp_ory` | object | Optional |

#### allow

##### Allow

The [`allow` authorizer](https://www.ory.sh/docs/oathkeeper/pipeline/authz#allow).

`allow`

- is optional
- type: `object`

##### allow Type

`object` with following properties:

| Property  | Type    | Required |
| --------- | ------- | -------- |
| `enabled` | boolean | Optional |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### deny

##### Deny

The [`deny` authorizer](https://www.ory.sh/docs/oathkeeper/pipeline/authz#allow).

`deny`

- is optional
- type: `object`

##### deny Type

`object` with following properties:

| Property  | Type    | Required |
| --------- | ------- | -------- |
| `enabled` | boolean | Optional |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### keto_engine_acp_ory

##### ORY Keto Access Control Policies Engine

The [`keto_engine_acp_ory` authorizer](https://www.ory.sh/docs/oathkeeper/pipeline/authz#keto_engine_acp_ory).

`keto_engine_acp_ory`

- is optional
- type: `object`

##### keto_engine_acp_ory Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `base_url` | string  | Optional |
| `enabled`  | boolean | Optional |

#### base_url

##### Base URL

The base URL of ORY Keto.

> If this authorizer is enabled, this value is required.

`base_url`

- is optional
- type: `string`

##### base_url Type

`string`

##### base_url Example

```json
http://my-keto/
```

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

## log

`log`

- is optional
- type: Log Configuration
- defined in this schema

### log Type

- [Log Configuration](logrusx/viper.schema.md) –
  `https://raw.githubusercontent.com/ory/x/master/.schemas/logrusx/viper.schema.json#`

## mutators

### Mutators

For more information on mutators head over to: https://www.ory.sh/docs/oathkeeper/pipeline/mutator

`mutators`

- is optional
- type: `object`
- defined in this schema

### mutators Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `cookie`   | object | Optional |
| `header`   | object | Optional |
| `id_token` | object | Optional |
| `noop`     | object | Optional |

#### cookie

##### HTTP Cookie

The [`cookie` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#cookie).

`cookie`

- is optional
- type: `object`

##### cookie Type

`object` with following properties:

| Property  | Type    | Required |
| --------- | ------- | -------- |
| `enabled` | boolean | Optional |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### header

##### HTTP Header

The [`header` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#header).

`header`

- is optional
- type: `object`

##### header Type

`object` with following properties:

| Property  | Type    | Required |
| --------- | ------- | -------- |
| `enabled` | boolean | Optional |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### id_token

##### ID Token (JSON Web Token)

The [`header` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#header).

`id_token`

- is optional
- type: `object`

##### id_token Type

`object` with following properties:

| Property     | Type    | Required | Default |
| ------------ | ------- | -------- | ------- |
| `enabled`    | boolean | Optional |         |
| `issuer_url` | string  | Optional |         |
| `jwks_url`   | string  | Optional |         |
| `ttl`        | string  | Optional | `"1m"`  |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

#### issuer_url

##### Issuer URL

Sets the "iss" value of the ID Token.

> If this mutator is enabled, this value is required.

`issuer_url`

- is optional
- type: `string`

##### issuer_url Type

`string`

#### jwks_url

##### JSON Web Key URL

Sets the URL where keys should be fetched from. Supports remote locations (http, https) as well as local filesystem
paths.

> If this mutator is enabled, this value is required.

`jwks_url`

- is optional
- type: `string`

##### jwks_url Type

`string`

##### jwks_url Examples

```json
https://fetch-keys/from/this/location.json
```

```json
file:///from/this/absolute/location.json
```

```json
file://../from/this/relative/location.json
```

#### ttl

##### Expire After

Sets the time-to-live of the JSON Web Token.

`ttl`

- is optional
- type: `string`
- default: `"1m"`

##### ttl Type

`string`

All instances must conform to this regular expression

```regex
^[0-9]+(ns|us|ms|s|m|h)$
```

- test example: [1h](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=1h>)
- test example: [1m](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=1m>)
- test example: [30s](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=30s>)

##### ttl Examples

```json
1h
```

```json
1m
```

```json
30s
```

#### noop

##### No Operation (noop)

The [`noop` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#noop).

`noop`

- is optional
- type: `object`

##### noop Type

`object` with following properties:

| Property  | Type    | Required |
| --------- | ------- | -------- |
| `enabled` | boolean | Optional |

#### enabled

##### Enabled

`enabled`

- is optional
- type: `boolean`

##### enabled Type

`boolean`

## profiling

`profiling`

- is optional
- type: Profiling Configuration
- defined in this schema

### profiling Type

- [Profiling Configuration](proxilingx/viper.schema.md) –
  `https://raw.githubusercontent.com/ory/x/master/.schemas/profilingx/viper.schema.json#`

## serve

### HTTP(s)

`serve`

- is optional
- type: `object`
- defined in this schema

### serve Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `api`    | object | Optional |
| `proxy`  | object | Optional |

#### api

##### HTTP REST API

`api`

- is optional
- type: `object`

##### api Type

`object` with following properties:

| Property | Type   | Required | Default |
| -------- | ------ | -------- | ------- |
| `cors`   |        | Optional |         |
| `host`   | string | Optional | `""`    |
| `port`   | number | Optional | `4456`  |
| `tls`    |        | Optional |         |

#### cors

`cors`

- is optional
- type: reference

##### cors Type

- []() – `https://raw.githubusercontent.com/ory/x/master/.schemas/corsx/viper.schema.json#`

#### host

##### Host

The network interface to listen on.

`host`

- is optional
- type: `string`
- default: `""`

##### host Type

`string`

##### host Examples

```json
localhost
```

```json
127.0.0.1
```

#### port

##### Port

The port to listen on.

`port`

- is optional
- type: `number`
- default: `4456`

##### port Type

`number`

#### tls

`tls`

- is optional
- type: reference

##### tls Type

- []() – `https://raw.githubusercontent.com/ory/x/master/.schemas/tlsx/viper.schema.json#`

#### proxy

##### HTTP Reverse Proxy

`proxy`

- is optional
- type: `object`

##### proxy Type

`object` with following properties:

| Property  | Type   | Required | Default |
| --------- | ------ | -------- | ------- |
| `cors`    |        | Optional |         |
| `host`    | string | Optional | `""`    |
| `port`    | number | Optional | `4455`  |
| `timeout` | object | Optional |         |
| `tls`     |        | Optional |         |

#### cors

`cors`

- is optional
- type: reference

##### cors Type

- []() – `https://raw.githubusercontent.com/ory/x/master/.schemas/corsx/viper.schema.json#`

#### host

##### Host

The network interface to listen on.

`host`

- is optional
- type: `string`
- default: `""`

##### host Type

`string`

##### host Examples

```json
localhost
```

```json
127.0.0.1
```

#### port

##### Port

The port to listen on.

`port`

- is optional
- type: `number`
- default: `4455`

##### port Type

`number`

#### timeout

##### HTTP Timeouts

Control the reverse proxy's HTTP timeouts.

`timeout`

- is optional
- type: `object`

##### timeout Type

`object` with following properties:

| Property | Type   | Required | Default  |
| -------- | ------ | -------- | -------- |
| `idle`   | string | Optional | `"120s"` |
| `read`   | string | Optional | `"5s"`   |
| `write`  | string | Optional | `"120s"` |

#### idle

##### HTTP Idle Timeout

The maximum amount of time to wait for any action of a request session, reading data or writing the response.

`idle`

- is optional
- type: `string`
- default: `"120s"`

##### idle Type

`string`

All instances must conform to this regular expression

```regex
^[0-9]+(ns|us|ms|s|m|h)$
```

- test example: [5s](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=5s>)
- test example: [5m](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=5m>)
- test example: [5h](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=5h>)

##### idle Examples

```json
5s
```

```json
5m
```

```json
5h
```

#### read

##### HTTP Read Timeout

The maximum duration for reading the entire request, including the body.

`read`

- is optional
- type: `string`
- default: `"5s"`

##### read Type

`string`

All instances must conform to this regular expression

```regex
^[0-9]+(ns|us|ms|s|m|h)$
```

- test example: [5s](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=5s>)
- test example: [5m](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=5m>)
- test example: [5h](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=5h>)

##### read Examples

```json
5s
```

```json
5m
```

```json
5h
```

#### write

##### HTTP Write Timeout

The maximum duration before timing out writes of the response. Increase this parameter to prevent unexpected closing a
client connection if an upstream request is responding slowly.

`write`

- is optional
- type: `string`
- default: `"120s"`

##### write Type

`string`

All instances must conform to this regular expression

```regex
^[0-9]+(ns|us|ms|s|m|h)$
```

- test example: [5s](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=5s>)
- test example: [5m](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=5m>)
- test example: [5h](<https://regexr.com/?expression=%5E%5B0-9%5D%2B(ns%7Cus%7Cms%7Cs%7Cm%7Ch)%24&text=5h>)

##### write Examples

```json
5s
```

```json
5m
```

```json
5h
```

#### tls

`tls`

- is optional
- type: reference

##### tls Type

- []() – `https://raw.githubusercontent.com/ory/x/master/.schemas/tlsx/viper.schema.json#`
