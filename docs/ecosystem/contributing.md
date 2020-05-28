---
id: contributing
title: Contributing
---

This document is in progress. We will be the inner workings of the ORY GitHub
ecosystem and project structures in here.

## CI

We use [our own CircleCI Orbs](http://github.com/ory/ci):

- `ory/nancy`: Enables nancy vulnerability scanning for the repository.

## Conventions

### Checking for vulnerabilities

#### NodeJS

This is done automatically by GitHub

#### Go

```
# Outside of a go module-enabled project:
$ go get -u github.com/sonatype-nexus-community/nancy

# Inside your go module-enabled project:
$ go mod list -m all | nancy
```

### Pinning indirect `go mod require`

Sometimes a project has an indirect dependency (another dependency requires that
dependency) which does not pass, for example, `nancy` vulnerability scanning.
Because it's not possible to pin this dependency to a specific version, we need
to explicitly require it. But because it's not directly required by our code, it
will be pruned when using `go mod tidy`. To prevent that, create a file which
imports the dependency without use:

```title="go_mod_indirect_pins.go
// +build go_mod_indirect_pins

package main

import _ "github.com/my/dependency"
```

You would do the same if the project uses dev tools such as `packr2`,
`goimports`, `goreturns`, `swagutil`, ... as part of e.g. the Makefile or other
scripts.
