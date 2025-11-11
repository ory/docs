---
id: kratos-cleanup-sql
title: kratos cleanup sql
description: kratos cleanup sql
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## kratos cleanup sql

Cleanup sql database from expired flows and sessions

### Synopsis

Run this command as frequently as you need.
It is recommended to run this command close to the SQL instance (e.g. same subnet) instead of over the public internet.
This decreases risk of failure and decreases time required.
You can read in the database URL using the -e flag, for example:
```
export DSN=...
kratos cleanup sql -e
```
### WARNING ###
Before running this command on an existing database, create a back up!


```
kratos cleanup sql <database-url> [flags]
```

### Options

```
  -c, --config strings                           Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
  -b, --database.cleanup.batch_size int          Set the number of records to be cleaned per run (default 100)
      --database.cleanup.sleep.tables duration   How long to wait between each table cleanup (default 1m0s)
  -h, --help                                     help for sql
      --keep-last duration                       Don't remove records younger than
  -e, --read-from-env                            If set, reads the database connection string from the environment variable DSN or config file key dsn. (default true)
```

### See also

* [kratos cleanup](kratos-cleanup) Various cleanup helpers

