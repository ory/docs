---
title: Install
description: Install Ory Talos with Homebrew or Scoop, a Docker image, or a pre-built binary
---

<!-- doctest:setup:file tools/doctest/setup-build.sh -->

Ory Talos runs on Linux, macOS, and Windows on the AMD64 and ARM64 architectures. Install with Homebrew or Scoop, run the Docker
image, or download a pre-built binary.

## Install with Homebrew

On macOS and Linux, install Ory Talos from the Ory [Homebrew](https://brew.sh/) tap:

```shell
brew install ory/tap/talos
talos help
```

## Install with Scoop

On Windows, install Ory Talos from the Ory [Scoop](https://scoop.sh/) bucket:

```shell
scoop bucket add ory https://github.com/ory/scoop.git
scoop install ory/talos
```

## Docker

Ory Talos publishes a Docker image to [Docker Hub](https://hub.docker.com/r/oryd/talos):

```shell
docker pull oryd/talos:<version-you-want>
docker run --rm -it oryd/talos:<version-you-want> help
```

A Docker Compose stack ships with the source tree for local development. Clone the repository to fetch the compose file:

```shell
git clone https://github.com/ory/talos.git
cd talos
docker compose -f docker-compose.oss.yaml up --build
```

This builds the OSS binary, runs migrations against SQLite, and serves the API on `http://localhost:8080`, with the health
endpoint at `http://localhost:4422/health/alive`. See [Docker deployment](deploy/docker.md) for production images and
configuration.

## Download a pre-built binary

Every [GitHub release](https://github.com/ory/talos/releases) ships pre-built archives for Linux, macOS, and Windows on AMD64 and
ARM64, alongside a `checksums.txt` file. Download the archive for your platform, verify it against the checksum, and extract the
`talos` binary. There is no installer.

```shell
# Example: Linux AMD64. Replace the version and platform to match your system.
VERSION=<version-you-want>
curl -sSL -o talos.tar.gz \
  "https://github.com/ory/talos/releases/download/v${VERSION}/talos_${VERSION}_linux_amd64.tar.gz"
tar -xzf talos.tar.gz talos
./talos help
```

To run Ory Talos from anywhere, move the binary into your `$PATH`:

```shell
sudo mv ./talos /usr/local/bin/
talos help
```

Windows archives are `.zip` files. Extract `talos.exe` and add it to your `PATH`.

## Verify the installation

<!-- doctest:exec -->

```shell
talos --version
```

## Run database migrations

Create the database schema before you start the server:

```shell
# SQLite (OSS)
talos migrate up --database "sqlite3://./data/talos.db"
```

The Commercial edition adds PostgreSQL, MySQL, and CockroachDB backends. Run migrations for those with the `oryd/talos-commercial`
Docker image. See the [migrations guide](database/migrations.md) for details.

## Start the server

```shell
talos serve --config config.yaml
```

`serve` requires at minimum these keys: `db.dsn`, `secrets.hmac.current` (32+ chars), and `credentials.issuer`. See
[Configure](configure.md#minimal-configuration) for the minimal YAML and the [Configuration reference](../reference/config.mdx)
for all keys.
