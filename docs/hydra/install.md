---
id: install
title: Installation
---

Installing ORY Hydra on any system is straight forward. We provide pre-built
binaries, Docker Images and support various package managers.

## Docker

We recommend using Docker to run ORY Hydra:

```shell
$ docker pull oryd/hydra
$ docker run --rm -it oryd/hydra help
```

## macOS

You can install ORY Hydra using [homebrew](https://brew.sh/) on macOS:

```shell
$ brew tap ory/hydra
$ brew install ory/hydra/hydra
$ hydra help
```

## Linux

On linux, you can use `curl | bash` to fetch the latest stable binary using:

```shell
$ curl https://raw.githubusercontent.com/ory/hydra/master/install.sh | bash -s -- -b .
$ ./hydra help
```

You may want to move ORY Hydra to your `$PATH`:

```shell
$ sudo mv ./hydra /usr/local/bin/
$ hydra help
```

## Windows

You can install ORY Hydra using [scoop](https://scoop.sh) on Windows:

```shell
> scoop bucket add ory-hydra https://github.com/ory/scoop-hydra.git
> scoop install hydra
> hydra help
```

## Download Binaries

The client and server **binaries are downloadable at the
[releases tab](https://github.com/ory/hydra/releases)**. There is currently no
installer available. You have to add the Hydra binary to the PATH environment
variable yourself or put the binary in a location that is already in your
`$PATH` (e.g. `/usr/local/bin`, ...).

Once installed, you should be able to run:

```shell
$ hydra help
```

## Building from Source

If you wish to compile ORY Hydra yourself, you need to install and set up
[Go 1.12+](https://golang.org/) and add `$GOPATH/bin` to your `$PATH`.

The following commands will check out the latest release tag of ORY Hydra and
compile it and set up flags so that `hydra version` works as expected. Please
note that this will only work with a linux shell like bash or sh.

```shell
$ go get -d -u github.com/ory/hydra
$ cd $(go env GOPATH)/src/github.com/ory/hydra
$ GO111MODULE=on make install-stable
$ $(go env GOPATH)/bin/hydra help
```
