---
id: ory-create-organization
title: ory create organization
description: ory create organization Create a new Ory Network organization
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory create organization

Create a new Ory Network organization

```
ory create organization label [--project=PROJECT_ID] [--domains=a.example.com,b.example.com] [flags]
```

### Options

```
  -d, --domains strings   A list of domains that will be used for this organization.
      --format string     Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help              help for organization
      --project string    The project to use, either project ID or a (partial) slug.
  -q, --quiet             Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory create](ory-create)	 - Create Ory Network resources

