---
id: kratos-get-identity
title: kratos get identity
description: kratos get identity
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## kratos get identity

Get one or more identities by their ID(s)

### Synopsis

This command gets all the details about an identity. To get an identity by some selector, e.g. the recovery email address, use the list command in combination with jq.

Use the --external-id flag to look up identities by their external ID instead of their Ory-internal ID.

We have to admit, this is not easy if you don't speak jq fluently. What about opening an issue and telling us what predefined selectors you want to have? https://github.com/ory/kratos/issues/new/choose

```
kratos get identity [id-1] [id-2] [id-n] [flags]
```

### Examples

```
To get the identities with the recovery email address at the domain "ory.sh", run:

	kratos get identity $(kratos ls identities --format json | jq -r 'map(select(.recovery_addresses[].value | endswith("@ory.sh"))) | .[].id')

To get an identity by its external ID, run:

	kratos get identity --external-id customer-12345
```

### Options

```
      --external-id                       Treat the provided ID(s) as external IDs and look up the identities by their external ID instead of their Ory-internal ID.
  -h, --help                              help for identity
  -i, --include-credentials stringArray   Include third party tokens (only "oidc" supported) 
```

### Options inherited from parent commands

```
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -q, --quiet             Be quiet with output printing.
```

### See also

* [kratos get](kratos-get) Get resources

