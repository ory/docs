---
id: ory-patch-opl
title: ory patch opl
description: ory patch opl Update the Ory Permission Language file in Ory Network
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory patch opl

Update the Ory Permission Language file in Ory Network

### Synopsis

Update the Ory Permission Language file in Ory Network. Legacy namespace definitions will be overwritten.

```
ory patch opl [flags]
```

### Examples

```
$ ory patch opl --file /path/to/namespace_config.ts

class Example implements Namespace {}

```

### Options

```
  -f, --file string        Configuration file (file://namespace_config.ts, https://example.org/namespace_config.ts, ...) to update the Ory Permission Language config
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for opl
      --project string     The project to use, either project ID or a (partial) slug.
  -q, --quiet              Be quiet with output printing.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
  -y, --yes                Confirm all dialogs with yes.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
```

### SEE ALSO

* [ory patch](ory-patch)	 - Patch resources

