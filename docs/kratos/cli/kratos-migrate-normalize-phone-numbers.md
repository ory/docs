---
id: kratos-migrate-normalize-phone-numbers
title: kratos migrate normalize-phone-numbers
description: kratos migrate normalize-phone-numbers
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## kratos migrate normalize-phone-numbers

Normalize phone numbers to E.164 format in the database

### Synopsis

Normalizes all phone numbers in identity_credential_identifiers,
identity_verifiable_addresses, and identity_recovery_addresses to E.164 format.

This command uses keyset pagination to iterate over the database in batches.
It is safe to run multiple times (idempotent) and can be interrupted and resumed
using the --start-after flag with the last ID printed in the progress output.

Run this command AFTER deploying the code changes that normalize phone numbers
on write, to ensure all legacy data is also normalized.

You can read in the database URL using the -e flag, for example:
```
export DSN=...
kratos migrate normalize-phone-numbers -e
```

### WARNING ###
Before running this command on an existing database, create a back up!


```
kratos migrate normalize-phone-numbers [database-url] [flags]
```

### Options

```
      --batch-delay duration   Delay between batches to reduce database load (e.g. 100ms, 1s) (default 1s)
  -b, --batch-size int         Number of rows to process per batch (default 1000)
  -c, --config strings         Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
      --dry-run                If set, only report what would change without writing
  -h, --help                   help for normalize-phone-numbers
  -e, --read-from-env          If set, reads the database connection string from the environment variable DSN or config file key dsn.
      --start-after strings    Resume after a table's last processed ID, e.g. --start-after credentials=<id> --start-after verifiable=<id>
```

### See also

* [kratos migrate](kratos-migrate) Various migration helpers

