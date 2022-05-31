---
id: ory-get-identity-config
title: ory get identity-config
description: ory get identity-config Get an Ory Cloud project's identity configuration
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory get identity-config

Get an Ory Cloud project's identity configuration

### Synopsis

You can use this command to render Ory Kratos configurations as well.

```
ory get identity-config <project-id> [flags]
```

### Examples

```
$ ory get kratos-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 --format yaml > kratos-config.yaml

$ ory get kratos-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 --format json

{
  "selfservice": {
	"methods": {
	  "password": { "enabled": false }
	}
	// ...
  }
}
```

### Options

```
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -h, --help            help for identity-config
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory get](ory-get)	 - Get a resource

