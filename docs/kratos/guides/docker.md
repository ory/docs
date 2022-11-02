---
id: docker
title: Docker images
---

## Supported tags and respective `Dockerfile` links

- [`latest`, `v0.8.0-alpha.1`, `v0.8.0`, `v0.8`, `v0`](https://github.com/ory/kratos/blob/master/.docker/Dockerfile-alpine)

## Image variants

The `Kratos` Docker images use Alpine Linux as their base image and come with SQLite support build in.

## How to use these images

In order to make the provided Docker images as useful as possible they can be partially configured through a set of supported
Environment variables. In addition to the environment variables, the image needs you to bind a directory to pass in your
configuration files (unless you extend the base docker image).

## Do not use `latest`

Please, always use a tagged version and never use `latest` Docker images. This ensures that your deployment doesn't unexpectedly
update with an incompatible version!

## Running migrations

To run SQL migrations, which are required for new installations and when upgrading, run:

```shell
docker -e DSN="<your database URL>" run oryd/kratos:<version> migrate sql -e
```

They'll also be automatically run whenever the `serve` command is run.

### Environment variables

#### `DSN`

This environment variable allows you to specify the database source name. As the `DSN` normally consists of the url to the
database system and the credentials to access the database it's recommended to specify the `DSN` using a Environment variable.

##### example

```sh
docker run -e DSN="memory" oryd/kratos:<version>
```

#### `SECRETS_DEFAULT`

This environment variable allows you to specify the secret used to sign and verify signatures and encrypt things:

##### example

`docker run -e SECRETS_DEFAULT="CHANGE-ME" oryd/kratos:<version>`

#### Binding configuration directory

**Note that for both of these methods** you must supply the location of the configuration file using the `--config` flag when
running the container.

```sh
docker run <theimage> serve --config /home/ory/kratos.yml
```

##### Binding host directory example

In this example we start the standard Docker container with SQLite support and use the quickstart email-password example
configuration files by bind mounting the local directory.

This example assumes that you checked out the Kratos Git repo and execute the Docker command in the Kratos Git repo directory, it
mounts the configuration files [here](https://github.com/ory/kratos/tree/master/contrib/quickstart/kratos/email-password) to `~/`.

```sh
docker run -it -e DSN="memory" \
   --mount type=bind,source="$(pwd)"/contrib/quickstart/kratos/email-password,target=/home/ory \
   oryd/kratos:<version> serve --config /home/ory/kratos.yml
```

We only recommend this approach for local development.

#### Creating custom Docker image

You can create your own, custom Kratos Docker images which embeds your configuration files by simply using the official Kratos
Docker images as the Base Image and just adding your configuration file(s) as shown in the example below:

```dockerfile
FROM oryd/kratos:latest
COPY contrib/quickstart/kratos/email-password/kratos.yml /home/ory
```
