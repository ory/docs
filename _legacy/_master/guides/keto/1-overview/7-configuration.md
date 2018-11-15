# Configuring and Running ORY Keto

ORY Keto supports two types of storage adapters:

* In-memory: This adapter does not work with more than one instance ("cluster") and any state is lost after restarting the instance.
* SQL: This adapter works with more than one instance and state is not lost after restarts.

The SQL adapter supports two DBMS: PostgreSQL 9.6+ and MySQL 5.7+. Please note that
older MySQL versions have issues with the database schema.
For more information [go here](https://github.com/ory/hydra/issues/377).

ORY Keto supports various authentication strategies. Depending on what strategies
you want to use, you will have to configure more services (e.g. ORY Hydra). In this tutorial, we will
set up ORY Keto without any of the other services. Please refer to the [warden chapter](./2-warden)
to see how to configure each authentication strategy.

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
$ docker pull oryd/keto:v1.0.0-beta.5

# ORY Keto does not do magic, it requires conscious decisions, for example running SQL migrations which is required
# when installing a new version of ORY Keto, or upgrading an existing installation.
# It is the equivalent to `keto migrate sql postgres://keto:secret@ory-keto-example--postgres:5432/keto?sslmode=disable`
$ docker run -it --rm \
  --network ketoguide \
  oryd/keto:v1.0.0-beta.5 \
  migrate sql $DATABASE_URL

Applying `client` SQL migrations...
[...]
Migration successful!

# Next, let's run the server!
$ docker run -d \
  --name ory-keto-example--keto \
  --network ketoguide \
  -p 4466:4466 \
  -e DATABASE_URL=$DATABASE_URL \
  oryd/keto:v1.0.0-beta.5 \
  serve
```

Great, the server running now! Make sure to check the logs and see if there were
any errors or issues before going to the next steps:

```
$ docker logs ory-keto-example--keto
```

## Running CLI Commands

You can now create your first policy:

```
$ docker run -it --rm \
  --network ketoguide \
  oryd/keto:v1.0.0-beta.5 \
  policies create --endpoint http://ory-keto-example--keto:4466/ \
    --id example-policy \
    --allow \
    -a delete \
    -s alice \
    -r "blog_posts:my-first-blog-post"
```

List all existing policies:

```
$ docker run -it --rm \
  --network ketoguide \
  oryd/keto:v1.0.0-beta.5 \
    --endpoint http://ory-keto-example--keto:4466/ \
    policies get example-policy
```

And make some Warden requests:

```
$ docker run -it --rm \
  --network ketoguide \
  oryd/keto:v1.0.0-beta.5 \
  warden authorize subject --endpoint http://ory-keto-example--keto:4466/ \
      --action delete \
      --subject alice \
      --resource "blog_posts:my-first-blog-post"
```

## Securing ORY Keto

Similar to other services in our ecosystem, ORY Keto has no native access control. This means that any request
made to e.g. `/policies` or `/warden/...` is considered authenticated and thus executed. However, these endpoints
are very sensitive as they define who is allowed to do what in your system.

Please use an API Gateway or a similar mechanism to protect these endpoints. How you protect them, is up to you.

If you require dedicated help with this, consider asking us for [consultancy](mailto:hi@ory.sh).
