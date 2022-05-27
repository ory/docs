---
id: ory-lint-lint
title: ory lint lint
description: ory lint lint 
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory lint lint



### Synopsis

Lints JSONNet files using the official JSONNet linter and exits with a status code of 1 when issues are detected.

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
ory lint lint path/to/files/*.jsonnet [more/files.jsonnet] [supports/**/{foo,bar}.jsonnet] [flags]
```

### Options

```
  -h, --help   help for lint
```

### SEE ALSO

* [ory lint](ory-lint)	 - Helpers for linting code

