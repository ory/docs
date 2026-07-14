---
id: ory-pause-event-stream
title: ory pause event-stream
description: ory pause event-stream
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory pause event-stream

Pause the event stream with the given ID

### Synopsis

Pause the event stream with the given ID

A paused event stream does not forward any events until it is resumed.

```
ory pause event-stream <id> [--project=PROJECT_ID] [flags]
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

* [ory pause](ory-pause) Pause Ory Network resources

