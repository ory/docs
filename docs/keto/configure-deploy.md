---
id: configure-deploy
title: Configure and Deploy
---

As all other ORY services, ORY Keto is implemented according to 12factor principles and completely stateless. To store
state, ORY Keto supports two types of storage adapters:

* In-memory: This adapter does not work with more than one instance ("cluster") and any state is lost after restarting the instance.
* SQL: This adapter works with more than one instance and state is not lost after restarts.

The SQL adapter supports two DBMS: PostgreSQL 9.6+ and MySQL 5.7+. Please note that
older MySQL versions may have issues with the database schema. We recommend working with PostgreSQL as migrations will be
faster.

This guide will:

1. Download and run a PostgreSQL container in Docker.
2. Download and run ORY Keto using Docker.

## Create a Network

Before we can start, a network must be created which we will attach all our Docker containers to. That way, the containers
can talk to one another.

```
$ docker network create ketoguide
```

## Start the PostgreSQL Container

For the purpose of this tutorial, we will use PostgreSQL as a database. As you probably already know, don't run databases in Docker in production!
For the sake of this tutorial however, let's use Docker to quickly deploy the database.

```
$ docker run \
  --network ketoguide \
  --name ory-keto-example--postgres \
  -e POSTGRES_USER=keto \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=keto \
  -d postgres:9.6
```

This command wil start a postgres instance with name `ory-keto-example--postgres`, set up a database called `keto`
and create a user `keto` with password `secret`.

## Run the ORY Keto Service

```
# The database url points us at the postgres instance. This could also be an ephermal in-memory database (`export DATABASE_URL=memory`)
# or a MySQL URI.
$ export DATABASE_URL=postgres://keto:secret@ory-keto-example--postgres:5432/keto?sslmode=disable

# This pulls the latest image from Docker Hub
$ docker pull oryd/keto:unstable

# ORY Keto does not do magic, it requires conscious decisions, for example running SQL migrations which is required
# when installing a new version of ORY Keto, or upgrading an existing installation.
# It is the equivalent to `DATABASE_URL=postgres://keto:secret@ory-keto-example--postgres:5432/keto?sslmode=disable keto migrate sql`
$ docker run -it --rm \
  --network ketoguide \
  -e DATABASE_URL=$DATABASE_URL \
  oryd/keto:unstable \
  migrate sql -e

Applying `client` SQL migrations...
[...]
Migration successful!

# Next, let's run the server!
$ docker run -d \
  --name ory-keto-example--keto \
  --network ketoguide \
  -p 4466:4466 \
  -e DATABASE_URL=$DATABASE_URL \
  oryd/keto:unstable \
  serve
```

Great, the server running now! Make sure to check the logs and see if there were
any errors or issues before going to the next steps:

```
$ docker logs ory-keto-example--keto
```

You should see one line showing where the server is running:

```
time="2018-10-27T11:48:56Z" level=info msg="Listening on http://localhost:4466"
```

## Working with the CLI

Let's examine how we can work with the CLI to manage ORY Keto. We will use the ORY Access Control Policy Engine (`/engines/acp/ory`)
with the `exact` matcher and define policies and check if certain users are allowed to do certain things. Let's create
the first policy:

```
$ mkdir policies

$ cat > policies/example-policy.json <<EOL
[{
    "id": "example-policy",
    "subjects": ["alice"],
    "resources": ["blog_posts:my-first-blog-post"],
    "actions": ["delete"],
    "effect": "allow"
}]
EOL

$ docker run -it --rm \
  --network ketoguide \
  -v $(pwd)/policies:/policies \
  -e KETO_URL=http://ory-keto-example--keto:4466/ \
  oryd/keto:unstable \
  engines acp ory policies import exact /policies/example-policy.json
```

Check if the policy has been created:

```
$ docker run -it --rm \
  --network ketoguide \
  -e KETO_URL=http://ory-keto-example--keto:4466/ \
  oryd/keto:unstable \
  engines acp ory policies get exact example-policy
{
  "actions": [
    "delete"
  ],
...
```

And check if certain users are allowed to do things:

```
$ docker run -it --rm \
  --network ketoguide \
  -e KETO_URL=http://ory-keto-example--keto:4466/ \
  oryd/keto:unstable \
  engines acp ory allowed exact alice blog_posts:my-first-blog-post delete
{
        "allowed": true
}

$ docker run -it --rm \
  --network ketoguide \
  -e KETO_URL=http://ory-keto-example--keto:4466/ \
  oryd/keto:unstable \
  engines acp ory allowed exact bob blog_posts:my-first-blog-post delete
{
        "allowed": false
}
```
