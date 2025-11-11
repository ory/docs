---
id: kratos-delete-identity
title: kratos delete identity
description: kratos delete identity
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## kratos delete identity

Delete one or more identities by their ID(s)

### Synopsis

This command deletes one or more identities by ID. To delete an identity by some selector, e.g. the recovery email address, use the list command in combination with jq.

We have to admit, this is not easy if you don't speak jq fluently. What about opening an issue and telling us what predefined selectors you want to have? https://github.com/ory/kratos/issues/new/choose

```
kratos delete identity id-0 [id-1] [id-2] [id-n] [flags]
```

### Examples

```
To delete the identity with the recovery email address "foo@bar.com", run:

	kratos delete identity $(kratos list identities --format json | jq -r 'map(select(.recovery_addresses[].value == "foo@bar.com")) | .[].id')
```

### Options

```
  -h, --help   help for identity
```

### Options inherited from parent commands

```
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -q, --quiet             Be quiet with output printing.
```

### See also

* [kratos delete](kratos-delete) Delete resources

