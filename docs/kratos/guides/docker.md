---
id: docker
title: Ory Kratos Docker images
sidebar_label: Docker images
---

# Docker images

Images are published on Docker Hub as [`oryd/kratos`](https://hub.docker.com/r/oryd/kratos) with these tags:

- [`latest`, `v1.1.0`, `v1.1`, `v1`](https://github.com/ory/kratos/blob/master/.docker/Dockerfile-alpine) (Alpine-based, with
  SQLite support)
- [`v1.1.0-distroless`](https://github.com/ory/kratos/blob/master/.docker/Dockerfile-distroless-static) (distroless, no SQLite
  support)

Supported architectures are `amd64`, `arm64`, `arm/v7`, `arm/v6`.

## Using the images

To make the provided Docker images as useful as possible they can be configured through a set of supported environment variables.
In addition, you can bind the default configuration directory to a directory of your choice to make it easier to pass in your own
configuration files, unless you extend the base image.

:::caution

Don't use the `latest` Docker images.

Always use a tagged version. This helps ensure that your deployment doesn't unexpectedly update with an incompatible version!

:::

## Running migrations

To run SQL migrations, which are required for new installations and when upgrading, run:

```shell
docker -e DSN="{your database URL}" run oryd/kratos:<version> migrate sql -e
```

Migrations also run automatically whenever you run the `serve` command.

## Environment variables

### DSN

This environment variable allows you to specify the database source name. As the `DSN` normally consists of the URL to the
database system and the credentials to access the database, it's recommended to specify the `DSN` through an environment variable.

```shell
## Example

docker run -e DSN="memory" oryd/kratos:{version}
```

### SECRETS_DEFAULT

This environment variable allows you to specify the secret used to sign and verify signatures and encrypt data.

```shell
## Example:

docker run -e SECRETS_DEFAULT="CHANGE-ME" oryd/kratos:{version}
```

## Binding configuration directory

You must supply the location of the configuration file using the `--config` flag when running the container.

```shell
docker run {image-name} serve --config /home/ory/kratos.yml
```

### Example

In this example we start the standard Docker container with SQLite support and use the quickstart email-password example
configuration files by bind mounting the local directory.

This example assumes that you checked out the Kratos Git repo and execute the Docker command in the Kratos Git repo directory, it
mounts the configuration files [here](https://github.com/ory/kratos/tree/master/contrib/quickstart/kratos/email-password) to `~/`.

```shell
docker run -it -e DSN="memory" \
  --mount type=bind,source="$(pwd)"/contrib/quickstart/kratos/email-password,target=/home/ory \
  oryd/kratos:{version} serve --config /home/ory/kratos.yml
```

:::note

We recommend this approach for local development only.

:::

## Creating custom Docker images

You can create custom Kratos Docker images that embed your configuration files by using the official Kratos Docker images as the
base image and adding your configuration file(s) as shown in the example:

```dockerfile
FROM oryd/kratos:{version}
COPY contrib/quickstart/kratos/email-password/kratos.yml /home/ory
```
