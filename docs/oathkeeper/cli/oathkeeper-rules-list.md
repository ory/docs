---
id: oathkeeper-rules-list
title: oathkeeper rules list
description: oathkeeper rules list List access rules
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## oathkeeper rules list

List access rules

### Synopsis

Usage example:

	oathkeeper rules --endpoint=http://localhost:4456/ list


```
oathkeeper rules list [flags]
```

### Options

```
  -h, --help        help for list
      --limit int   The maximum amount of policies returned. (default 20)
      --page int    The number of page. (default 1)
```

### Options inherited from parent commands

```
  -c, --config strings    Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
  -e, --endpoint string   The endpoint URL of ORY Oathkeeper&#39;s management API
```

### SEE ALSO

* [oathkeeper rules](oathkeeper-rules)	 - Commands for managing rules

