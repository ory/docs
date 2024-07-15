---
id: ory-import-identities
title: ory import identities
description: ory import identities Import one or more identities from files or STD_IN
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory import identities

Import one or more identities from files or STD_IN

### Synopsis

Import identities from files or STD_IN.

Files can contain only a single or an array of identities. The validity of files can be tested beforehand using "... identities validate".

```
ory import identities file-1.json [file-2.json] [file-3.json] [file-n.json] [flags]
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

	ory import identities file.json

Alternatively:

	cat file.json | ory import identities
```

### Options

```
  -h, --help               help for identities
      --project string     The project to use, either project ID or a (partial) slug.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
      --format string   Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory import](ory-import)	 - Import resources

