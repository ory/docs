---
id: ory-get-jwk
title: ory get jwk
description: ory get jwk Get one or more JSON Web Key Set by its ID(s)
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory get jwk

Get one or more JSON Web Key Set by its ID(s)

### Synopsis

This command gets all the details about an JSON Web Key. You can use this command in combination with jq.

```
ory get jwk set-1 [set-2] ... [flags]
```

### Examples

```
To get the JSON Web Key Set's use, run:

	ory get jwk <set-id> | jq -r '.[].use'

To get the JSON Web Key Set as only public keys:

	ory get jwk --public <set-id>'

```

### Options

```
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help              help for jwk
      --project string    The project to use, either project ID or a (partial) slug.
      --public            Only return public keys
  -q, --quiet             Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory get](ory-get)	 - Get a resource

