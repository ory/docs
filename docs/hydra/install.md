---
id: install
title: Installation
---

Installing ORY Hydra on any system is straight forward. We provide pre-built
binaries, Docker Images and support various package managers.

## Docker

We recommend using Docker to run ORY Hydra:

```shell
$ docker pull oryd/hydra:v1.10.6
$ docker run --rm -it oryd/hydra:v1.10.6 help
```

## macOS

You can install ORY Hydra using [homebrew](https://brew.sh/) on macOS:

```shell
$ brew install ory/tap/hydra
$ hydra help
```

## Linux

On linux, you can use `bash <(curl ...)` to fetch the latest stable binary
using:

```shell
$ bash <(curl https://raw.githubusercontent.com/ory/meta/master/install.sh) -d -b . hydra v1.10.6
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
> scoop bucket add ory https://github.com/ory/scoop.git
> scoop install hydra
> hydra help
```

## Kubernetes

Please head over to the [Kubernetes Helm Chart](guides/kubernetes-helm-chart)
documentation.

## Download Binaries

You can download the client and server binaries on our
[Github releases](https://github.com/ory/hydra/releases) page. There is
currently no installer available. You have to add the Hydra binary to the PATH
in your environment yourself, for example by putting it into `/usr/local/bin` or
something comparable.

Once installed, you should be able to run:

```shell
$ hydra help
```

## Building from Source

If you wish to compile ORY Hydra yourself, you need to install and set up
[Go 1.15+](https://golang.org/) and add `$GOPATH/bin` to your `$PATH`.

The following commands will check out the latest release tag of ORY Hydra,
compile it, and set up flags so that `hydra version` works as expected. Please
note that this will only work in a Bash-like shell.

```shell
$ git clone https://github.com/ory/hydra.git
$ cd hydra
$ GO111MODULE=on make install-stable
$ $(go env GOPATH)/bin/hydra help
```
