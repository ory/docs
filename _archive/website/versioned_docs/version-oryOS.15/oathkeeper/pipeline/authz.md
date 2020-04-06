---
id: version-oryOS.15-authz
title: Authorizers
original_id: authz
---

> You are viewing an outdated version of this documentation. Please head over
> to [www.ory.sh/docs](https://www.ory.sh/docs) for a recent version!

An authorizer is responsible for authorizing a subject. ORY Oathkeeper supports
different authorizers and we will add more as the project progresses.

Conceptually, an authorizer makes sure that a subject ("user") has the right
permissions. For example, a specific endpoint might only be accessible to
subjects ("users") from group "admin". The authorizer handles that logic.

Each authorizer has two keys:

- `handler` (string, required): Defines the handler (e.g. `noop`) to be used.
- `config` (object, optional): Configures the handler. Configuration keys vary
  per handler.

**Example**

```json
{
  "authorizer": {
    "handler": "noop",
    "config": {}
  }
}
```

It is not possible to configure more than one authorizer per Access Rule.

## `allow`

This authorizer considers every action authorized.

### Configuration

This handler is not configurable.

To enable this handler, set:

```yaml
# Global configuration file oathkeeper.yml
authorizers:
  allow:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
```

### Access Rule Example

```sh
$ cat ./rules.json

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
  "authenticators": [{ "handler": "anonymous" }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

$ curl -X GET http://my-app/some-route

HTTP/1.0 200 Status OK
The request has been allowed!
```

## `deny`

This authorizer considers every action unauthorized ("forbidden" /
"disallowed").

### Configuration

This handler is not configurable.

To enable this handler, set:

```yaml
# Global configuration file oathkeeper.yml
authorizers:
  deny:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
```

### Access Rule Example

```sh
$ cat ./rules.json

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
  "authenticators": [{ "handler": "anonymous" }],
  "authorizer": { "handler": "deny" },
  "mutators": [{ "handler": "noop" }]
}]

$ curl -X GET http://my-app/some-route

HTTP/1.0 403 Forbidden
The request is forbidden!
```

## `keto_engine_acp_ory`

This authorizer uses the ORY Keto API to perform access control using
ORY-flavored Access Control Policies. Please familiarize yourself with the ORY
Keto project before you set up this authorizer.

### Configuration

- `base_url` (string, required) - The base URL of ORY Keto, typically something
  like http(s)://<host>[:<port>]/
- `required_action` (string, required) - See section below.
- `required_resource` (string, required) - See section below.
- `subject` (string, optional) - See section below.
- `flavor` (string, optional) - See section below.

#### Resource, Action, Subject

This authorizer has four configuration options, `required_action`,
`required_resource`, `subject`, and `flavor`:

```json
{
  "handler": "keto_engine_acp_ory",
  "config": {
    "required_action": "...",
    "required_resource": "...",
    "subject": "...",
    "flavor": "..."
  }
}
```

All configuration options except `flavor` support variable expansion. Let's say
you have the following match configuration:

```json
{
  "match": {
    "url": "http://my-app/api/users/<[0-9]+>/<[a-zA-Z]+>",
    "methods": ["GET"]
  }
}
```

Here, you have two regular expressions, `<[0-9]+>` and `<[a-zA-Z]+>`. You can
reference the values matched by the regular expression with `$1` and `$2` (and
more generally `$n`) and they will be substituted before making the request to
ORY Keto:

```json
{
  "handler": "keto_engine_acp_ory",
  "config": {
    "required_action": "my:action:$1",
    "required_resource": "my:resource:$2:foo:$1"
  }
}
```

Assuming a request to `http://my-api/api/users/1234/foobar` was made, the config
from above would expand to:

```json
{
  "handler": "keto_engine_acp_ory",
  "config": {
    "required_action": "my:action:1234",
    "required_resource": "my:resource:foobar:foo:1234"
  }
}
```

The `subject` field configures what subject is passed on to the ORY Keto
endpoint. The `subject` value is a string which will be parsed by the Go
[`text/template`](https://golang.org/pkg/text/template/) package for value
substitution, receiving the
[`AuthenticationSession`](https://github.com/ory/oathkeeper/blob/92c09fb28552949cd034ed5555c87dfda91407a3/proxy/authenticator.go#L19)
struct:

```go
type AuthenticationSession struct {
    Subject string
    Extra   map[string]interface{}
}
```

If `subject` is not specified it will default to
`AuthenticationSession.Subject`.

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

#### Example

```yaml
# Global configuration file oathkeeper.yml
authorizers:
  keto_engine_acp_ory:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      base_url: http://my-keto/
      required_action: ...
      required_resource: ...
      subject: ...
      flavor: ...
```

```yaml
# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authorizers:
  - handler: keto_engine_acp_ory
    config:
      base_url: http://my-keto/
      required_action: ...
      required_resource: ...
      subject: ...
      flavor: ...
```

### Access Rule Example

```shell
$ cat ./rules.json

[{
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
    "handler": "keto_engine_acp_ory",
    "config": {
      "required_action": "my:action:$1",
      "required_resource": "my:resource:$2:foo:$1"
      "subject": "{{ .Extra.email }}",
      "flavor": "exact"
    }
  }
  "mutators": [
    {
      "handler": "noop"
    }
  ]
}]
```
