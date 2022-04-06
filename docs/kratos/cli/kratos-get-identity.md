---
id: kratos-get-identity
title: kratos get identity
description: kratos get identity Get one or more identities by their ID(s)
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## kratos get identity

Get one or more identities by their ID(s)

### Synopsis

This command gets all the details about an identity. To get an identity by some
selector, e.g. the recovery email address, use the list command in combination
with jq.

We have to admit, this is not easy if you don&#39;t speak jq fluently. What
about opening an issue and telling us what predefined selectors you want to
have? https://github.com/ory/kratos/issues/new/choose

```
kratos get identity [id-1] [id-2] [id-n] [flags]
```

### Examples

```
To get the identities with the recovery email address at the domain &#34;ory.sh&#34;, run:

	kratos get identity $(kratos ls identities --format json | jq -r &#39;map(select(.recovery_addresses[].value | endswith(&#34;@ory.sh&#34;))) | .[].id&#39;)
```

### Options

```
  -h, --help                              help for identity
  -i, --include-credentials stringArray   Include third party tokens (only &#34;oidc&#34; supported)
```

### Options inherited from parent commands

```
  -e, --endpoint string   The URL of Ory Kratos&#39; Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
  -f, --format string     Set the output format. One of table, json, and json-pretty. (default &#34;default&#34;)
  -q, --quiet             Be quiet with output printing.
```

### SEE ALSO

- [kratos get](kratos-get) - Get resources
