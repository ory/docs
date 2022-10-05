---
id: oathkeeper-health
title: oathkeeper health
description: oathkeeper health Commands for checking the status of an ORY Oathkeeper deployment
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## oathkeeper health

Commands for checking the status of an ORY Oathkeeper deployment

### Synopsis

Note:
  The endpoint URL should point to a single ORY Oathkeeper deployment.
  If the endpoint URL points to a Load Balancer, these commands will effective test the Load Balancer.


```
oathkeeper health [flags]
```

### Options

```
  -e, --endpoint string   The endpoint URL of ORY Oathkeeper&#39;s management API
  -h, --help              help for health
```

### Options inherited from parent commands

```
  -c, --config strings   Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
```

### SEE ALSO

* [oathkeeper](oathkeeper)	 - A cloud native Access and Identity Proxy
* [oathkeeper health alive](oathkeeper-health-alive)	 - Checks if an ORY Oathkeeper deployment is alive
* [oathkeeper health ready](oathkeeper-health-ready)	 - Checks if an ORY Oathkeeper deployment is ready

