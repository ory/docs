---
id: index
title: Overview
---

ORY Kratos stands out because it runs on any operating system (Linux, macOS,
Windows) and on most processors (i386, amd64, arm, ...). The compiled binary has
_no system or library or file dependencies_ and can be run as a single, static
binary ontop of a, for example, raw Linux kernel. The binary and Docker Image is
less than 20MB small.

ORY Kratos scales horizontally without effort. The only external dependency is a
RDBMS - we currently support only PostgreSQL. You will not need memcached, etcd,
or any other system to scale ORY Kratos.

We believe in strong separation of concerns, it is a guiding principle in the
design of each ORY project. As such, we build software that solves specific
problems very well and offloads adjacent issues (such as a user interface) to
other applications.

ORY Kratos does not require a "username", or a "first name", or any other type
of trait. Instead, we allow you to define your own data model (now you can
finally add the "favorite_animal" trait!) and validate that model using
[JSON Schema](https://json-schema.org).
