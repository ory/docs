---
id: hydra-janitor
title: hydra janitor
description: hydra janitor
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra janitor

This command cleans up stale database rows.

### Synopsis

This command cleans up stale database rows. This will select records to delete with a limit
and delete records in batch to ensure that no table locking issues arise in big production
databases.

### Warning ###

This command is irreversible. Proceed with caution!

This is a destructive command and will purge data directly from the database. Please use
this command with caution.

###############

Janitor can be used in several ways.

1. By passing the database connection string (DSN) as an argument
   Pass the database url (dsn) as an argument to janitor. E.g. janitor {database-url}
2. By passing the DSN as an environment variable

```
	export DSN=...
	janitor -e
```

3. By passing a configuration file containing the DSN
   janitor -c /path/to/conf.yml
4. Extra *optional* parameters can also be added such as

```
	hydra janitor --keep-if-younger 23h --access-lifespan 1h --refresh-lifespan 40h --consent-request-lifespan 10m {database-url}
```

5. Running only a certain cleanup

```
	hydra janitor --tokens {database-url}
```

   or

```
	hydra janitor --requests {database-url}
```

```
or
```

```
	hydra janitor --grants {database-url}
```

   or any combination of them

```
	hydra janitor --tokens --requests --grants {database-url}
```


```
hydra janitor [[database_url]] [flags]
```

### Examples

```
hydra janitor --keep-if-younger 23h --access-lifespan 1h --refresh-lifespan 40h --consent-request-lifespan 10m [database_url]
```

### Options

```
      --access-lifespan duration            Set the access token lifespan e.g. 1s, 1m, 1h.
      --batch-size int                      Define how many records are deleted with each iteration. (default 100)
  -c, --config strings                      Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
      --consent-request-lifespan duration   Set the login/consent request lifespan e.g. 1s, 1m, 1h
      --grants                              This will only run the cleanup on trust relationships and will skip requests and token cleanup.
  -h, --help                                help for janitor
      --keep-if-younger duration            Keep database records that are younger than a specified duration e.g. 1s, 1m, 1h.
      --limit int                           Limit the number of records retrieved from database for deletion. (default 10000)
  -e, --read-from-env                       If set, reads the database connection string from the environment variable DSN or config file key dsn.
      --refresh-lifespan duration           Set the refresh token lifespan e.g. 1s, 1m, 1h.
      --requests                            This will only run the cleanup on requests and will skip token and trust relationships cleanup.
      --tokens                              This will only run the cleanup on tokens and will skip requests and trust relationships cleanup.
```

### See also

* [hydra](hydra) Run and manage Ory Hydra

