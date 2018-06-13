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
go get -d -u github.com/ory/oathkeeper
cd $(go env GOPATH)/src/github.com/ory/oathkeeper
OATHKEEPER_LATEST=$(git describe --abbrev=0 --tags)
git checkout $OATHKEEPER_LATEST
dep ensure -vendor-only
go install \
    -ldflags "-X github.com/ory/oathkeeper/cmd.Version=$OATHKEEPER_LATEST -X github.com/ory/oathkeeper/cmd.BuildTime=`TZ=UTC date -u '+%Y-%m-%dT%H:%M:%SZ'` -X github.com/ory/oathkeeper/cmd.GitHash=`git rev-parse HEAD`" \
    github.com/ory/oathkeeper
git checkout master
oathkeeper help
```
