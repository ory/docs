---
id: talos-migrate
title: talos migrate
description: talos migrate
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos migrate

Database migration tools

### Synopsis

Run database migrations for the API Key service

### Options

```
  -h, --help   help for migrate
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos](talos.md) Multi-tenant API key management service
- [talos migrate down](talos-migrate-down.md) - Rollback migrations
- [talos migrate force](talos-migrate-force.md) - Force set migration version (use with caution)
- [talos migrate status](talos-migrate-status.md) - Show migration status
- [talos migrate up](talos-migrate-up.md) - Run all pending migrations
