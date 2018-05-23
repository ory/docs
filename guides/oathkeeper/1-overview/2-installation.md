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

The only way to install ORY Oathkeeper currently is through [Docker Hub]. ORY Oathkeeper is a private docker repository
and to gain access to it you have create an ORY Gatekeeper instance at the [ORY Admin Console](https://admin.ory.am).

Once your account is authorized to access the repository, log in to docker using `docker login`. Then you should
be able to fetch the ory/oathkeeper image and also be able to see it on [Docker Hub](https://hub.docker.com/r/oryd/oathkeeper/).

To run any oathkeeper command, do:

```
$ docker run oryd/oathkeeper:<version> <command>
```

for example (this guide is written for ORY Oathkeeper 0.0.20:

```
$ docker run oryd/oathkeeper:v0.0.20 help
```
