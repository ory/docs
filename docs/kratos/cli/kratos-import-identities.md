---
id: kratos-import-identities
title: kratos import identities
description:
  kratos import identities Import one or more identities from files or STD_IN
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## kratos import identities

Import one or more identities from files or STD_IN

### Synopsis

Import identities from files or STD_IN.

Files can contain only a single or an array of identities. The validity of files
can be tested beforehand using "... identities validate".

WARNING: Importing credentials is not yet supported.

```
kratos import identities file-1.json [file-2.json] [file-3.json] [file-n.json] [flags]
```

### Examples

```
Create an example identity:

	cat > ./file.json <<EOF
	{
	    "schema_id": "default",
	    "traits": {
	        "email": "foo@example.com"
	    }
	}
	EOF

	kratos import identities file.json

Alternatively:

	cat file.json | kratos import identities
```

### Options

```
  -h, --help   help for identities
```

### Options inherited from parent commands

```
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -q, --quiet             Be quiet with output printing.
```

### SEE ALSO

- [kratos import](kratos-import) - Import resources
