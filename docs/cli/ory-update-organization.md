---
id: ory-update-organization
title: ory update organization
description: ory update organization Update the organization with the given ID
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory update organization

Update the organization with the given ID

```
ory update organization id [--project=PROJECT_ID] [--domains=a.example.com,b.example.com] [--label=LABEL] [flags]
```

### Options

```
  -d, --domains strings   A list of domains that will be used for this organization.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help              help for organization
  -l, --label string      The label of the organization.
      --project string    The project to use, either project ID or a (partial) slug.
  -q, --quiet             Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory update](ory-update)	 - Update resources

