---
id: ory-validate-identity
title: ory validate identity
description: ory validate identity Validate local identity files
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory validate identity

Validate local identity files

### Synopsis

This command allows validation of identity files.
It validates against the payload of the API and the identity schema as configured in Ory Kratos.
Identities can be supplied via STD_IN or JSON files containing a single or an array of identities.

```
ory validate identity file.json [file-2.json] [file-3.json] [file-n.json] [flags]
```

### Options

```
  -h, --help   help for identity
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory validate](ory-validate)	 - Validate resources

