---
id: ory-identities-get
title: ory identities get
description: ory identities get Get one or more identities by ID
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## ory identities get

Get one or more identities by ID

### Synopsis

This command gets all the details about an identity. To get an identity by some
selector, e.g. the recovery email address, use the list command in combination
with jq.

We have to admit, this is not easy if you don&#39;t speak jq fluently. What
about opening an issue and telling us what predefined selectors you want to
have? https://github.com/ory/kratos/issues/new/choose

```
ory identities get &lt;id-0 [id-1 ...]&gt; [flags]
```

### Examples

```
To get the identities with the recovery email address at the domain &#34;ory.sh&#34;, run:

	$ kratos identities get $(kratos identities list --format json | jq -r &#39;map(select(.recovery_addresses[].value | endswith(&#34;@ory.sh&#34;))) | .[].id&#39;)
```

### Options

```
  -f, --format string   Set the output format. One of table, json, and json-pretty. (default &#34;default&#34;)
  -h, --help            help for get
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
      --api-endpoint string           Use a different endpoint. (default &#34;https://oryapis.com&#34;)
      --console-api-endpoint string   Use a different URL. (default &#34;https://api.console.ory.sh&#34;)
```

### SEE ALSO

- [ory identities](ory-identities) - Manage your identities
