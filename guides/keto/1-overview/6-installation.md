# Installing ORY Keto

<!-- toc -->

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

To install ORY Keto from source, you need to have Go 1.10+ installed as well as [go/dep](https://golang.github.io/dep/).
Then, run:

```
$ go get -d -u github.com/ory/keto
$ cd $GOPATH/src/github.com/ory/keto
$ dep ensure -vendor-only
$ go install .
$ keto help
```
