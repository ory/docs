---
id: ory-format-jsonnet
title: ory format jsonnet
description: ory format jsonnet 
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory format jsonnet



### Synopsis

Formats JSONNet files using the official JSONNet formatter.

Use -w or --write to write output back to files instead of stdout.

Glob Syntax:

    pattern:
        { term }

    term:
        '*'         matches any sequence of non-separator characters
        '**'        matches any sequence of characters
        '?'         matches any single non-separator character
        '[' [ '!' ] { character-range } ']'
                    character class (must be non-empty)
        '{' pattern-list '}'
                    pattern alternatives
        c           matches character c (c != '*', '**', '?', '\', '[', '{', '}')
        '\' c       matches character c

    character-range:
        c           matches character c (c != '\\', '-', ']')
        '\' c       matches character c
        lo '-' hi   matches character c for lo <= c <= hi

    pattern-list:
        pattern { ',' pattern }
                    comma-separated (without spaces) patterns

```
ory format jsonnet path/to/files/*.jsonnet [more/files.jsonnet] [supports/**/{foo,bar}.jsonnet] [flags]
```

### Options

```
  -h, --help    help for jsonnet
  -w, --write   Write formatted output back to file.
```

### SEE ALSO

* [ory format](ory-format)	 - Helpers for formatting code

