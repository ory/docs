---
id: install
title: Install
---

You can install ORY Keto by downloading the [binaries](https://github.com/ory/keto/releases), by using
the precompiled Docker Image available at [Docker Hub](https://hub.docker.com/r/oryd/keto/), or by
compiling the code yourself.

## Docker Hub

The recommended way to install and run ORY Keto is via docker:

```sh
$ docker run oryd/keto:<version> help
```

## Binaries

If you download the binaries, make sure to add them to your path (e.g. `/usr/bin`). Then, run `keto help`

## From Source

To install ORY Keto from source, you need to have Go 1.11+ installed, and run:

```
$ go get -d -u github.com/ory/keto
$ cd $(go env GOPATH)/src/github.com/ory/keto
$ make install-stable
$ $(go env GOPATH)/bin/keto help
```
