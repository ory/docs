---
id: talos-serve
title: talos serve
description: talos serve
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos serve

Start the Ory Talos server (all-in-one mode)

### Synopsis

Starts the HTTP server for the API key service in all-in-one mode.

This mode runs both admin (management) and public endpoints in a single process.

For production deployments where admin and public surfaces should be isolated (different network boundaries, different scaling
profiles, etc.), consider running them as separate processes:

- 'serve public' for public-facing endpoints only (no admin privileges)
- 'serve admin' for admin endpoints only (management and verification)

```
talos serve [flags]
```

### Examples

```
  talos serve
```

### Options

```
  -h, --help   help for serve
```

### Options inherited from parent commands

```
      --config string     path to a config file (without it, only schema defaults and TALOS_-prefixed env vars apply)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos](talos.md) Multi-network API key service
- [talos serve admin](talos-serve-admin.md) - Run only the admin endpoints
- [talos serve public](talos-serve-public.md) - Run only the public-facing endpoints
