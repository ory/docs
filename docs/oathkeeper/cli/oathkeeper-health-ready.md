---
id: oathkeeper-health-ready
title: oathkeeper health ready
description: oathkeeper health ready Checks if an ORY Oathkeeper deployment is ready
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## oathkeeper health ready

Checks if an ORY Oathkeeper deployment is ready

### Synopsis

Usage example:
  oathkeeper health --endpoint=http://localhost:4456/ ready

Note:
  The endpoint URL should point to a single ORY Oathkeeper deployment.
  If the endpoint URL points to a Load Balancer, these commands will effective test the Load Balancer.


```
oathkeeper health ready [flags]
```

### Options

```
  -h, --help   help for ready
```

### Options inherited from parent commands

```
  -c, --config strings    Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
  -e, --endpoint string   The endpoint URL of ORY Oathkeeper&#39;s management API
```

### SEE ALSO

* [oathkeeper health](oathkeeper-health)	 - Commands for checking the status of an ORY Oathkeeper deployment

