---
id: ory-resume-event-stream
title: ory resume event-stream
description: ory resume event-stream
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory resume event-stream

Resume the event stream with the given ID

### Synopsis

Resume the event stream with the given ID

Resuming a paused event stream makes it forward events again.

```
ory resume event-stream <id> [--project=PROJECT_ID] [flags]
```

### Options

```
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help               help for event-stream
      --project string     The project to use, either project ID or a (partial) slug.
  -q, --quiet              Be quiet with output printing.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### See also

* [ory resume](ory-resume) Resume Ory Network resources

