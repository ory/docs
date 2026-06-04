---
id: talos-serve-admin
title: talos serve admin
description: talos serve admin
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos serve admin

Run only the admin endpoints

### Synopsis

WARNING: this command serves unauthenticated admin endpoints. You are responsible for placing it behind a trusted network boundary
that authenticates and authorizes every admin request (for example, an IAM proxy, mTLS gateway, or a reverse proxy with
internal-only routing). Talos itself adds no authN or authZ middleware on the admin surface.

Runs only the admin endpoints for API key and network management.

This mode is designed for internal tools, CI/CD, and operator workflows. It exposes the full read/write management surface: API
key creation, rotation, revocation, verification, network management, and signing-key management.

Deploy this server behind a trusted network boundary (private VPC, admin VLAN, or authenticating reverse proxy) — never expose it
to the public internet without an external authZ layer in front.

```
talos serve admin [flags]
```

### Examples

```
  talos serve admin
```

### Options

```
  -h, --help   help for admin
```

### Options inherited from parent commands

```
      --config string     path to a config file (without it, only schema defaults and TALOS_-prefixed env vars apply)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos serve](talos-serve.md) Start the Ory Talos server (all-in-one mode)
