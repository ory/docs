---
id: error
title: Error Handlers
---

A error handler is responsible for executing logic after, for example, authentication or authorization failed. ORY
Oathkeeper supports different error handlers and we will add more as the project
progresses.

A error handler can be configured to match on certain conditions, for example, it is possible to configure the
`json` error handler to only be executed if the HTTP Header `Accept` contains `application/json`.

Each error handler has two keys:

- `handler` (string, required): Defines the handler (e.g. `noop`) to be used.
- `config` (object, optional): Configures the handler. Configuration keys vary
  per handler. The configuration can be defined in the global configuration
  file, or per access rule.

**Example**

```json
{
  "errors": [
    {
      "handler": "json",
      "config": {}
    }
  ]
}
```

You can define more than one error handler in the Access Rule. The first
error handler that is able to handle the error will be consulted and other
error handlers will be ignored:

```json
{
  "errors": [
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

If handler `a` is able to handle the error, then handler `b` and
`c` will be ignored. If handler `a` can not handle the error / request but
handler `b` can, then handler `a` and `c` will be ignored.

## `json`
## `redirect`
## `www_authenticate`