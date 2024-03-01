---
id: ory-delete-identity
title: ory delete identity
description: ory delete identity Delete one or more identities by their ID(s)
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory delete identity

Delete one or more identities by their ID(s)

### Synopsis

This command deletes one or more identities by ID. To delete an identity by some selector, e.g. the recovery email address, use the list command in combination with jq.

We have to admit, this is not easy if you don't speak jq fluently. What about opening an issue and telling us what predefined selectors you want to have? https://github.com/ory/kratos/issues/new/choose

```
ory delete identity id-0 [id-1] [id-2] [id-n] [flags]
```

### Examples

```
To delete the identity with the recovery email address "foo@bar.com", run:

	ory delete identity $(ory list identities --format json | jq -r 'map(select(.recovery_addresses[].value == "foo@bar.com")) | .[].id')
```

### Options

```
      --format string    Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help             help for identity
      --project string   The project to use, either project ID or a (partial) slug.
  -q, --quiet            Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory delete](ory-delete)	 - Delete resources

