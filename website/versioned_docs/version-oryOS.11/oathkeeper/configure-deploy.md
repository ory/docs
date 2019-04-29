---
id: version-oryOS.11-configure-deploy
title: Configure and Deploy
original_id: configure-deploy
---

ORY Oathkeeper has two servers that run on separate ports:

* The api server: This server is responsible for exposing the management REST API.
* The proxy server: This server is responsible for evaluating access requests and forwarding them to the backend.

For detailed documentation on the two servers, run `oathkeeper help serve api` and `oathkeeper help serve proxy`.

ORY Oathkeeper supports two types of storage adapters:

* In-memory: This adapter does not work with more than one instance ("cluster") and any state is lost after restarting the instance.
* SQL: This adapter works with more than one instance and state is not lost after restarts.

The SQL adapter supports two DBMS: PostgreSQL 9.6+ and MySQL 5.7+. Please note that
older MySQL versions have issues with the database schema.
For more information [go here](https://github.com/ory/hydra/issues/377).

ORY Oathkeeper supports various authentication, authorization, and credential strategies. Depending on what strategies
you want to use, you will have to configure more services (e.g. ORY Hydra or ORY Keto). In this tutorial, we will
set up ORY Oathkeeper without any of the other services. Please refer to the [authenticator, authorizer, and credentials
issuer documentation](oathkeeper/api-access-rules.md) to see what you need to configure in order to get the strategies you need.

This guide will:

1. Download and run a PostgreSQL container in Docker.
2. Download and run ORY Oathkeeper using Docker.

## Installation

You can install ORY Oathkeeper by downloading the [binaries](https://github.com/ory/oathkeeper/releases), by using
the precompiled Docker Image available at [Docker Hub](https://hub.docker.com/r/oryd/oathkeeper/), or by
compiling the code yourself.

### Docker Hub

The recommended way to install and run ORY Oathkeeper is via docker:

```sh
$ docker run oryd/oathkeeper:<version> help
```

### Without Docker

#### Binaries

If you [download the binaries](https://github.com/ory/oathkeeper/releases), make sure
to add them to your path (e.g. `/usr/bin`). Then, run `oathkeeper help`

#### From Source

To install ORY Oathkeeper from source, you need to have Go 1.11+ installed.
Then, run:

```
go get -d -u github.com/ory/oathkeeper
cd $(go env GOPATH)/src/github.com/ory/oathkeeper
OATHKEEPER_LATEST=$(git describe --abbrev=0 --tags)
git checkout $OATHKEEPER_LATEST
GO111MODULE=on go install \
    -ldflags "-X github.com/ory/oathkeeper/cmd.Version=$OATHKEEPER_LATEST -X github.com/ory/oathkeeper/cmd.BuildTime=`TZ=UTC date -u '+%Y-%m-%dT%H:%M:%SZ'` -X github.com/ory/oathkeeper/cmd.GitHash=`git rev-parse HEAD`" \
    github.com/ory/oathkeeper
git checkout master
oathkeeper help
```

## Create a Network

Before we can start, a network must be created which we will attach all our Docker containers to. That way, the containers
can talk to one another.

```
$ docker network create oathkeeperguide
```

## Start the PostgreSQL Container

For the purpose of this tutorial, we will use PostgreSQL as a database. As you probably already know, don't run databases in Docker in production!
For the sake of this tutorial however, let's use Docker to quickly deploy the database.

```
$ docker run \
  --network oathkeeperguide \
  --name ory-oathkeeper-example--postgres \
  -e POSTGRES_USER=oathkeeper \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=oathkeeper \
  -d postgres:9.6
```

This command wil start a postgres instance with name `ory-oathkeeper-example--postgres`, set up a database called `oathkeeper`
and create a user `oathkeeper` with password `secret`.

## Run the ORY Oathkeeper API Proxy

```
# The database url points us at the postgres instance. This could also be an ephermal in-memory database (`export DATABASE_URL=memory`)
# or a MySQL URI.
$ export DATABASE_URL=postgres://oathkeeper:secret@ory-oathkeeper-example--postgres:5432/oathkeeper?sslmode=disable

# This pulls the latest image from Docker Hub
$ docker pull oryd/oathkeeper:v0.15.0

# ORY Oathkeeper does not do magic, it requires conscious decisions, for example running SQL migrations which is required
# when installing a new version of ORY Oathkeeper, or upgrading an existing installation.
# It is the equivalent to `oathkeeper migrate sql postgres://oathkeeper:secret@ory-oathkeeper-example--postgres:5432/oathkeeper?sslmode=disable`
$ docker run -it --rm \
  --network oathkeeperguide \
  oryd/oathkeeper:v0.15.0 \
  migrate sql $DATABASE_URL

Applying `client` SQL migrations...
[...]
Migration successful!

# Next, let's run the API server!
#
# Please make sure to use your own secret.
$ docker run -d \
  --name ory-oathkeeper-example--oathkeeper-api \
  --network oathkeeperguide \
  -p 4456:4456 \
  -e DATABASE_URL=$DATABASE_URL \
  -e PORT=4456 \
  -e CREDENTIALS_ISSUER_ID_TOKEN_HS256_SECRET=changemechangemechangemechangemedo \
  oryd/oathkeeper:v0.15.0 \
  serve api

# And the proxy server too - take not that we need to link the proxy serve with the API server!
#
# Please make sure to use your own secret.
$ docker run -d \
  --name ory-oathkeeper-example--oathkeeper-proxy \
  --network oathkeeperguide \
  -p 4455:4455 \
  -e OATHKEEPER_API_URL=http://ory-oathkeeper-example--oathkeeper-api:4456/ \
  -e PORT=4455 \
  -e CREDENTIALS_ISSUER_ID_TOKEN_HS256_SECRET=changemechangemechangemechangeme \
  oryd/oathkeeper:v0.15.0 \
  serve proxy
```

Great, both the API and the proxy server are running now! Make sure to check the logs and see if there were
any errors or issues before going to the next steps:

```
$ docker logs ory-oathkeeper-example--oathkeeper-api
$ docker logs ory-oathkeeper-example--oathkeeper-proxy
```

### Creating your first access rule

**Sorry, this section is still work in progress.**

1. Create the rule using `oathkeeper rules import` - need to figure out how to add the file to docker to make this work.
2. Have a rule that works immediately, e.g. protect an Oathkeeper API URL using the Oathkeeper proxy
3. Have two CURL requests where one fails and one passes. Explain why that happens
4. Clean up
