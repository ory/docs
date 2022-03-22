---
id: ory-update-project
title: ory update project
description: ory update project Update Ory Cloud Project Service Configuration
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory update project

Update Ory Cloud Project Service Configuration

### Synopsis

Use this command to replace your current Ory Cloud Project&#39;s service configuration. All values
will be overwritten. To update individual files use the `patch` command instead.

If the `--name` flag is not set, the project&#39;s name will not be changed.

The configuration file format can be found at:

	https://www.ory.sh/docs/reference/api#operation/updateProject


```
ory update project id [flags]
```

### Examples

```
ory update project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
--name \&#34;my updated name\&#34; \
--file /path/to/config.json \
--file /path/to/config.yml \
--file https://example.org/config.yaml \
--file base64://&lt;json&gt;
```

### Options

```
  -f, --file strings    Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the project
      --format string   Set the output format. One of table, json, and json-pretty. (default &#34;default&#34;)
  -h, --help            help for project
  -n, --name string     The name of the project, required when quiet mode is used
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogues with yes.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
```

### SEE ALSO

* [ory update](ory-update)	 - Update resources

