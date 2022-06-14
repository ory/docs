---
id: ory-get-permission-config
title: ory get permission-config
description: ory get permission-config Get an Ory Cloud project's permission configuration
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory get permission-config

Get an Ory Cloud project's permission configuration

### Synopsis

You can use this command to render Ory Keto configurations as well.

```
ory get permission-config <project-id> [flags]
```

### Examples

```
$ ory get keto-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 --format yaml > keto-config.yaml

$ ory get keto-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 --format json

{
  "namespaces": [
    {
      "name": "files",
      "id": 1
	},1
    // ...
  ]
}
```

### Options

```
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -h, --help            help for permission-config
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory get](ory-get)	 - Get a resource

