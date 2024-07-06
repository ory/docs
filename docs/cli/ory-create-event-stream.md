---
id: ory-create-event-stream
title: ory create event-stream
description: ory create event-stream Create a new event stream
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory create event-stream

Create a new event stream

```
ory create event-stream [--project=PROJECT_ID] --type=sns --aws-iam-role-arn=arn:aws:iam::123456789012:role/MyRole --aws-sns-topic-arn=arn:aws:sns:us-east-1:123456789012:MyTopic [flags]
```

### Options

```
      --aws-iam-role-arn string    The ARN of the AWS IAM role to assume when publishing messages to the SNS topic.
      --aws-sns-topic-arn string   The ARN of the AWS SNS topic.
      --format string              Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help                       help for event-stream
      --project string             The project to use, either project ID or a (partial) slug.
  -q, --quiet                      Be quiet with output printing.
      --type string                The type of the event stream destination. Only "sns" is supported at the moment.
      --workspace string           The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory create](ory-create)	 - Create Ory Network resources

