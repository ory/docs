---
id: version-oryOS.11-install
title: Installation
original_id: install
---

Installing ORY Keto on any system is straight forward. We provide pre-built
binaries, Docker Images and support various package managers.

## Docker

We recommend using Docker to run ORY Keto:

```shell
$ docker pull oryd/keto
$ docker run --rm -it oryd/keto help
```

## macOS

You can install ORY Keto using [homebrew](https://brew.sh/) on macOS:

```shell
$ brew tap ory/keto
$ brew install ory/keto/keto
$ keto help
```

## Linux

On linux, you can use `curl | bash` to fetch the latest stable binary using:

```shell
$ curl https://raw.githubusercontent.com/ory/keto/master/install.sh | bash -s -- -b .
$ ./keto help
```

You may want to move ORY Keto to your `$PATH`:

```shell
$ sudo mv ./keto /usr/local/bin/
$ keto help
```

## Windows

You can install ORY Keto using [scoop](https://scoop.sh) on Windows:

```shell
> scoop bucket add ory-keto https://github.com/ory/scoop-keto.git
> scoop install keto
> keto help
```

## Download Binaries

The client and server **binaries are downloadable at the
[releases tab](https://github.com/ory/keto/releases)**. There is currently no
installer available. You have to add the Keto binary to the PATH environment
variable yourself or put the binary in a location that is already in your
`$PATH` (e.g. `/usr/local/bin`, ...).

Once installed, you should be able to run:

```shell
$ keto help
```

## Building from Source

If you wish to compile ORY Keto yourself, you need to install and set up
[Go 1.12+](https://golang.org/) and add `$GOPATH/bin` to your `$PATH`.

The following commands will check out the latest release tag of ORY Keto and
compile it and set up flags so that `keto version` works as expected. Please
note that this will only work with a linux shell like bash or sh.

```shell
$ go get -d -u github.com/ory/keto
$ cd $(go env GOPATH)/src/github.com/ory/keto
$ GO111MODULE=on make install-stable
$ $(go env GOPATH)/bin/keto help
```
