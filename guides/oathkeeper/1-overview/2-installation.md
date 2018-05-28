# Installing ORY Oathkeeper

<!-- toc -->

You can install ORY Oathkeeper by downloading the [binaries](https://github.com/ory/oathkeeper/releases), by using
the precompiled Docker Image available at [Docker Hub](https://hub.docker.com/r/oryd/oathkeeper/), or by
compiling the code yourself.

## Docker Hub

The recommended way to install and run ORY Oathkeeper is via docker:

```sh
$ docker run oryd/oathkeeper:<version> help
```

## Binaries

If you download the binaries, make sure to add them to your path (e.g. `/usr/bin`). Then, run `oathkeeper help`

## From Source

To install ORY Oathkeeper from source, you need to have Go 1.10+ installed as well as [go/dep](https://golang.github.io/dep/).
Then, run:

```
$ go get -d -u github.com/ory/oathkeeper
$ cd $GOPATH/src/github.com/ory/oathkeeper
$ dep ensure -vendor-only
$ go install .
$ oathkeeper help
```
