---
id: oathkeeper-health-alive
title: oathkeeper health alive
description: oathkeeper health alive Checks if an ORY Oathkeeper deployment is alive
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## oathkeeper health alive

Checks if an ORY Oathkeeper deployment is alive

### Synopsis

Usage example:
  oathkeeper health --endpoint=http://localhost:4456/ alive

Note:
  The endpoint URL should point to a single ORY Oathkeeper deployment.
  If the endpoint URL points to a Load Balancer, these commands will effective test the Load Balancer.


```
oathkeeper health alive [flags]
```

### Options

```
  -h, --help   help for alive
```

### Options inherited from parent commands

```
  -c, --config string     Path to config file. Supports .json, .yaml, .yml, .toml. Default is &#34;$HOME/.oathkeeper.(yaml|yml|toml|json)&#34;
  -e, --endpoint string   The endpoint URL of ORY Oathkeeper&#39;s management API
```

### SEE ALSO

* [oathkeeper health](oathkeeper-health)	 - Commands for checking the status of an ORY Oathkeeper deployment

