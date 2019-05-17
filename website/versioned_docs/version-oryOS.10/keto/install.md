---
id: version-oryOS.10-install
title: Install
original_id: install
---

You can install ORY Keto by downloading the
[binaries](https://github.com/ory/keto/releases), by using the precompiled
Docker Image available at [Docker Hub](https://hub.docker.com/r/oryd/keto/), or
by compiling the code yourself.

## Docker Hub

The recommended way to install and run ORY Keto is via docker:

```sh
$ docker run oryd/keto:<version> help
# Minimal server:
$ docker run --rm -e "DATABASE_URL=memory" -d --name my-keto -p 4466:4466 oryd/keto serve
```

## Binaries

If you download the binaries, make sure to add them to your path (e.g.
`/usr/bin`). Then, run `keto help`

## From Source

To install ORY Keto from source, you need to have Go 1.11+ installed, and run:

```
$ go get -d -u github.com/ory/keto
$ cd $(go env GOPATH)/src/github.com/ory/keto
$ make init
$ make install-stable # or make install if you want the latest changes
$ $(go env GOPATH)/bin/keto help
# Minimal server:
$ DATABASE_URL=memory $(go env GOPATH)/bin/keto serve
```
