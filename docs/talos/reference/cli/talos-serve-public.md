---
id: talos-serve-public
title: talos serve public
description: talos serve public
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos serve public

Run only the public-facing endpoints

### Synopsis

Runs only the public-facing endpoints (currently: proof-of-possession self-revocation).

This mode is designed to sit on the public network with no admin privileges. It does not expose any
verification, issuance, or admin lifecycle endpoints. Verification is admin-only and must be reached
through 'talos serve admin'.

Cache configuration is read from the config file (cache.type, cache.ttl, etc.).

```
talos serve public [flags]
```

### Examples

```
  talos serve public
```

### Options

```
  -h, --help   help for public
```

### Options inherited from parent commands

```
      --config string     path to a config file (without it, only schema defaults and TALOS_-prefixed env vars apply)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos serve](talos-serve.md) Start the Ory Talos server (all-in-one mode)
