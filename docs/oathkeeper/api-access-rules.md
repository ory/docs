---
id: api-access-rules
title: API Access Rules
---

ORY Oathkeeper reaches decisions to allow or deny access by applying Access
Rules. Access Rules can be stored on the file system, set as an environment
variable, or fetched from HTTP(s) remotes. These repositories can be configured
in the configuration file (`oathkeeper -c ./path/to/config.yml ...`)

```yaml
# Configures Access Rules
access_rules:
  # Locations (list of URLs) where access rules should be fetched from on boot.
  # It is expected that the documents at those locations return a JSON or YAML Array containing ORY Oathkeeper Access Rules.
  repositories:
    # If the URL Scheme is `file://`, the access rules (an array of access rules is expected) will be
    # fetched from the local file system.
    - file://path/to/rules.json
    # If the URL Scheme is `inline://`, the access rules (an array of access rules is expected)
    # are expected to be a base64 encoded (with padding!) JSON/YAML string (base64_encode(`[{"id":"foo-rule","authenticators":[....]}]`)):
    - inline://W3siaWQiOiJmb28tcnVsZSIsImF1dGhlbnRpY2F0b3JzIjpbXX1d
    # If the URL Scheme is `http://` or `https://`, the access rules (an array of access rules is expected) will be
    # fetched from the provided HTTP(s) location.
    - https://path-to-my-rules/rules.json
```

or by setting the equivalent environment variable:

```bash
$ export ACCESS_RULES_REPOSITORIES='file://path/to/rules.json,https://path-to-my-rules/rules.json,inline://W3siaWQiOiJmb28tcnVsZSIsImF1dGhlbnRpY2F0b3JzIjpbXX1d'
```

The repository (file, inline, remote) must be formatted either as a JSON or a
YAML array containing the access rules:

```shell
$ cat ./rules.json
[{
    "id": "my-first-rule"
},{
    "id": "my-second-rule"
}]

$ cat ./rules.yaml
- id: my-first-rule
  authenticators:
    - handler: noop
- id: my-second-rule
  authorizer:
    handler: allow
```

## Access Rule Format

Access Rules have four principal keys:

- `id` (string): The unique ID of the Access Rule.
- `upstream` (object): The location of the server where requests matching this
  rule should be forwarded to. This only needs to be set when using the ORY
  Oathkeeper Proxy as the Decision API does not forward the request to the
  upstream.
  - `url` (string): The URL the request will be forwarded to.
  - `preserve_host` (bool): If set to `false` (default), the forwarded request
    will include the host and port of the `url` value. If `true`, the host and
    port of the ORY Oathkeeper Proxy will be used instead:
    - `false`: Incoming HTTP Header `Host: mydomain.com`-> Forwarding HTTP
      Header `Host: someservice.intranet.mydomain.com:1234`
  - `strip_path` (string): If set, replaces the provided path prefix when
    forwarding the requested URL to the upstream URL:
    - set to `/api/v1`: Incoming HTTP Request at `/api/v1/users` -> Forwarding
      HTTP Request at `/users`.
    - unset: Incoming HTTP Request at `/api/v1/users` -> Forwarding HTTP Request
      at `/api/v1/users`.
- `match` (object): Defines the URL(s) this Access Rule should match.
  - `methods` (string[]): Array of HTTP methods (e.g. GET, POST, PUT, DELETE,
    ...).
  - `url` (string): The URL that should be matched. Currently supports `regex`
    templates and will support glob matching in the future:
    - `regex`: Matches the URL against the string. You can use regular
      expressions in this field to match more than one url. This matcher ignores
      query parameters. Regular expressions are encapsulated in brackets `<` and
      `>`: _ `https://mydomain.com/` _ matches: `https://mydomain.com/`. _ does
      not match: `https://mydomain.com/foo`. _ does not match:
      `https://mydomain.com`. _
      `<https|http>://mydomain.com/<._>`* matches:`https://mydomain.com/`. _
      matches: `http://mydomain.com/`. _ matches: `http://mydomain.com/foo`. _
      does not match: `https://other-domain.com/`. _ does not match:
      `https://mydomain.com`.
    - `glob` (NOT YET AVAILABLE): Matches the URL against the string and
      supports glob matching.
- `authenticators`: A list of authentication handlers that authenticate the
  provided credentials. Authenticators are checked iteratively from index `0` to
  `n` and the first authenticator to return a positive result will be the one
  used. If you want the rule to first check a specific authenticator before
  "falling back" to others, have that authenticator as the first item in the
  array. For the full list of available authenticators, click
  [here](pipeline/authn.md).
- `authorizer`: The authorization handler which will try to authorize the
  subject ("user") from the previously validated credentials making the request.
  For example, you could check if the subject ("user") is part of the "admin"
  group or if he/she has permission to perform that action. For the full list of
  available authorizers, click [here](pipeline/authz.md).
- `mutators`: A list of mutation handlers that transform the HTTP request before forwarding it. A common use case
  is generating a new set of credentials (e.g. JWT) which then will be forwarded
  to the upstream server. When using ORY Oathkeeper's Decision API, it is
  expected that the API Gateway forwards the mutated HTTP Headers to the
  upstream server. For the full list of available mutators, click
  [here](pipeline/mutator.md).

**Examples**

Rule in JSON format:

```json
{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service",
    "preserve_host": true,
    "strip_path": "/api/v1"
  },
  "match": {
    "url": "http://my-app/some-route/<.*>",
    "methods": ["GET", "POST"]
  },
  "authenticators": [{ "handler": "noop" }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}
```

Rule in YAML format:

```yaml
id: some-id
upstream:
  url: http://my-backend-service
  preserve_host: true
  strip_path: /api/v1
match:
  url: http://my-app/some-route/<.*>
  methods:
    - GET
    - POST
authenticators:
  - handler: noop
authorizer:
  hander: allow
mutators:
  - handler: noop
```

## Scoped Credentials

Some credentials are scoped. For example, OAuth 2.0 Access Tokens usually are
scoped ("OAuth 2.0 Scope"). Scope validation depends on the meaning of the
scope. Therefore, wherever ORY Oathkeeper validates a scope, these scope
strategies are supported:

- `hierarchic`: Scope `foo` matches `foo`, `foo.bar`, `foo.baz` but not `bar`
- `wildcard`: Scope `foo.*` matches `foo`, `foo.bar`, `foo.baz` but not `bar`.
  Scope `foo` matches `foo` but not `foo.bar` nor `bar`
- `exact`: Scope `foo` matches `foo` but not `bar` nor `foo.bar`
- `none`: Scope validation is disabled. If however a scope is configured to be
  validated, the request will fail with an error message.
