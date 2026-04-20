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

- [talos](talos) High-performance multi-network API key service
- [talos migrate down](talos-migrate-down) - Rollback migrations
- [talos migrate force](talos-migrate-force) - Force set migration version (use with caution)
- [talos migrate status](talos-migrate-status) - Show migration status
- [talos migrate up](talos-migrate-up) - Run all pending migrations
