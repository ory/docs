---
id: ory-update-event-stream
title: ory update event-stream
description: ory update event-stream Update the event stream with the given ID
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory update event-stream

Update the event stream with the given ID

```
ory update event-stream id [--project=PROJECT_ID] [--type=sns] [--aws-iam-role-arn=arn:aws:iam::123456789012:role/MyRole] [--aws-sns-topic-arn=arn:aws:sns:us-east-1:123456789012:MyTopic] [flags]
```

### Options

```
      --format string    Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help             help for event-stream
      --project string   The project to use, either project ID or a (partial) slug.
  -q, --quiet            Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory update](ory-update)	 - Update resources

