---
id: ory-identities-delete
title: ory identities delete
description: ory identities delete Delete identities by ID
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## ory identities delete

Delete identities by ID

### Synopsis

This command deletes one or more identities by ID. To delete an identity by some
selector, e.g. the recovery email address, use the list command in combination
with jq.

We have to admit, this is not easy if you don&#39;t speak jq fluently. What
about opening an issue and telling us what predefined selectors you want to
have? https://github.com/ory/kratos/issues/new/choose

```
ory identities delete &lt;id-0 [id-1 ...]&gt; [flags]
```

### Examples

```
To delete the identity with the recovery email address &#34;foo@bar.com&#34;, run:

	$ kratos identities delete $(kratos identities list --format json | jq -r &#39;map(select(.recovery_addresses[].value == &#34;foo@bar.com&#34;)) | .[].id&#39;)
```

### Options

```
  -h, --help   help for delete
```

### Options inherited from parent commands

```
      --api-endpoint string           Use a different endpoint. (default &#34;https://oryapis.com&#34;)
      --console-api-endpoint string   Use a different URL. (default &#34;https://api.console.ory.sh&#34;)
```

### SEE ALSO

- [ory identities](ory-identities) - Manage your identities
