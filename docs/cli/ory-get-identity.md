---
id: ory-get-identity
title: ory get identity
description: ory get identity Get one or more identities by their ID(s)
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory get identity

Get one or more identities by their ID(s)

### Synopsis

This command gets all the details about an identity. To get an identity by some selector, e.g. the recovery email address, use the list command in combination with jq.

We have to admit, this is not easy if you don't speak jq fluently. What about opening an issue and telling us what predefined selectors you want to have? https://github.com/ory/kratos/issues/new/choose

```
ory get identity [id-1] [id-2] [id-n] [flags]
```

### Examples

```
To get the identities with the recovery email address at the domain "ory.sh", run:

	ory get identity $(ory ls identities --format json | jq -r 'map(select(.recovery_addresses[].value | endswith("@ory.sh"))) | .[].id')
```

### Options

```
      --format string                     Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -h, --help                              help for identity
  -i, --include-credentials stringArray   Include third party tokens (only "oidc" supported) 
      --project string                    The project to use
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory get](ory-get)	 - Get a resource

