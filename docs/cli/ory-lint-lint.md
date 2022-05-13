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

Lints JSONNet files using the official JSONNet linter and exits with a status
code of 1 when issues are detected.

Glob Syntax:

    pattern:
        { term }

    term:
        &#39;*&#39;         matches any sequence of non-separator characters
        &#39;**&#39;        matches any sequence of characters
        &#39;?&#39;         matches any single non-separator character
        &#39;[&#39; [ &#39;!&#39; ] { character-range } &#39;]&#39;
                    character class (must be non-empty)
        &#39;{&#39; pattern-list &#39;}&#39;
                    pattern alternatives
        c           matches character c (c != &#39;*&#39;, &#39;**&#39;, &#39;?&#39;, &#39;\&#39;, &#39;[&#39;, &#39;{&#39;, &#39;}&#39;)
        &#39;\&#39; c       matches character c

    character-range:
        c           matches character c (c != &#39;\\&#39;, &#39;-&#39;, &#39;]&#39;)
        &#39;\&#39; c       matches character c
        lo &#39;-&#39; hi   matches character c for lo &lt;= c &lt;= hi

    pattern-list:
        pattern { &#39;,&#39; pattern }
                    comma-separated (without spaces) patterns

```
ory lint lint path/to/files/*.jsonnet [more/files.jsonnet] [supports/**/{foo,bar}.jsonnet] [flags]
```

### Options

```
  -h, --help   help for lint
```

### SEE ALSO

- [ory lint](ory-lint) - Helpers for linting code
