---
id: kratos-validate-identity
title: kratos validate identity
description: kratos validate identity
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## kratos validate identity

Validate local identity files

### Synopsis

This command allows validation of identity files.
It validates against the payload of the API and the identity schema as configured in Ory Kratos.
Identities can be supplied via STD_IN or JSON files containing a single or an array of identities.

```
kratos validate identity file.json [file-2.json] [file-3.json] [file-n.json] [flags]
```

### Options

```
  -h, --help   help for identity
```

### Options inherited from parent commands

```
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -q, --quiet             Be quiet with output printing.
```

### See also

* [kratos validate](kratos-validate) Validate resources

