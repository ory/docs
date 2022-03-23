---
id: ory-patch-project
title: ory patch project
description: ory patch project Patch an Ory Cloud Project
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory patch project

Patch an Ory Cloud Project

```
ory patch project id [flags]
```

### Examples

```
ory patch project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--replace &#39;/name=&#34;My new project name&#34;&#39; \
	--add &#39;/services/identity/config/courier/smtp={&#34;from_name&#34;:&#34;My new email name&#34;}&#39; \
	--replace &#39;/services/identity/config/selfservice/methods/password/enabled=false&#39; \
	--delete &#39;/services/identity/config/selfservice/methods/totp/enabled&#39;
```

### Options

```
      --add stringArray       Add a specific key to the configuration
  -f, --file strings          Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the project
      --format string         Set the output format. One of table, json, and json-pretty. (default &#34;default&#34;)
  -h, --help                  help for project
  -q, --quiet                 Be quiet with output printing.
      --remove stringArray    Remove a specific key from the configuration
      --replace stringArray   Replace a specific key in the configuration
  -y, --yes                   Confirm all dialogues with yes.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
```

### SEE ALSO

* [ory patch](ory-patch)	 - Patch resources

