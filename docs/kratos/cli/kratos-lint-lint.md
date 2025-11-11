---
id: kratos-lint-lint
title: kratos lint lint
description: kratos lint lint
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## kratos lint lint



### Synopsis

Lints JSONNet files using the official JSONNet linter and exits with a status code of 1 when issues are detected.

Glob Syntax:

```
pattern:
    { term }
```

```
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
```

```
character-range:
    c           matches character c (c != '\\', '-', ']')
    '\' c       matches character c
    lo '-' hi   matches character c for lo <= c <= hi
```

```
pattern-list:
    pattern { ',' pattern }
                comma-separated (without spaces) patterns
```

```
kratos lint lint path/to/files/*.jsonnet [more/files.jsonnet] [supports/**/{foo,bar}.jsonnet] [flags]
```

### Options

```
  -h, --help   help for lint
```

### See also

* [kratos lint](kratos-lint) Helpers for linting code

