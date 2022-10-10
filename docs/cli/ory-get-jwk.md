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
To get the JSON Web Key Set's secret, run:

	{{ .CommandPath }} <set-id> | jq -r '.[].use'
```

### Options

```
      --format string    Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -h, --help             help for jwk
      --project string   The project to use
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory get](ory-get)	 - Get a resource

