---
id: software-architecture-philosophy
title: Software Architecture and Philosophy
---

Ory's architecture is designed along several guiding principles:

- Minimal dependencies
- Runs everywhere
- Scales without effort
- Minimize room for human and network errors

Our architecture leans on [12factor.net principles](https://www.12factor.net)
and is designed to run best on a Container Orchestration Systems such as
Kubernetes, CloudFoundry, OpenShift, and similar projects. While it is possible
to run the Ory stack on a RaspberryPI, the integration with the Docker and
Container ecosystem is best documented and supported.

## Architecture Philosophy

Our philosophy and assumption of how modern software works is summarized here.

### The Best System Dependency is no Dependency

The Ory stack does not rely on (operating) system-wide dependencies such as
Java, Apache, or other libraries. The only system-wide dependency you may
encounter is libc / libmusl, required for standard C and POSIX functions when
using SQLite.

Installing an Ory project is often just one binary away - on any architecture,
and operating system. Our binaries are a couple of MB small and so are the
Docker Images we distribute.

Ory exposes HTTP(s) ports and configuration of these ports. It does not need a
webserver such as NGINX or Apache HTTP Server.

### The Platform is Responsible for Horizontal Scaling

The Ory stack scales without the need for any additional external service
dependencies (e.g. etcd, Memcached) except for a RDBMS (e.g. PostgreSQL, MySQL).
Scaling horizontally is as easy as starting another process.

The Ory Ecosystem assumes that the platform it's running on (e.g. Kubernetes,
Google Cloud, Amazon Web Services, Azure, ...) is capable of Load Balancing and
does not concern itself with things like Leader Election protocols or other
communicating between process instances of the same project.

### Configuration from Environment Variables and Configuration Files

The Ory stack uses environment variables (often shortened to env vars or env)
and files as a configuration source. All settings from a configuration file can
also be set using environment variables and vice versa.

This allows systems like Kubernetes to mount, and update, configuration files
using volume mounts sourced from ConfigMaps and other similar resources.

Our projects support hot-reloading of configuration files (support for hot
reloading is not yet implemented everywhere).

Configuration settings are validated using JSON Schema and we try to make it as
difficult as possible to misconfigure our software.

### The Process is Stateless and Disposable

Ory processes are stateless and share-nothing. Any data that needs to persist
must be stored in a stateful backing service, typically a RDBMS (SQL) database.

The processes are disposable, meaning they can be started or stopped at a
moment’s notice. This facilitates fast elastic scaling, rapid deployment of code
or config changes, and robustness of production deploys.

The Ory stack strives to minimize startup time, taking no more than a few
milliseconds to be ready. The processes shut down gracefully when they receive a
SIGTERM signal from the process manager. For a web process, graceful shutdown is
achieved by ceasing to listen on the service port (thereby refusing any new
requests), allowing any current requests to finish, and then exiting. Implicit
in this model is that HTTP requests are short (no more than a few seconds), or
in the case of long polling, the client should seamlessly attempt to reconnect
when the connection is lost.

#### Logs are `stdout` / `stderr` Streams

The Ory stack never concerns itself with routing or storage of its output
stream. It does not attempt to write to or manage logfiles. Instead, each
running process writes its event stream, unbuffered, to stdout and stderr.
During local development, the developer will view this stream in the foreground
of their terminal to observe the app’s behavior.

### Maintenance tasks run as a one-off processes

The process formation is the array of processes that are used to do the app’s
regular business (such as handling web requests) as it runs. Separately,
developers will often wish to do one-off administrative or maintenance tasks for
the app, such as running database migrations (e.g. `hydra migrate sql`).

One-off admin processes should be run in an identical environment as the regular
long-running processes of the app. They run against a release, using the same
codebase and config as any process run against that release. Admin code must
ship with application code to avoid synchronization issues.

### External Services (PostgreSQL, MySQL, ...) are Attached Resources

A backing service is any service the app consumes over the network as part of
its normal operation. Examples include datastores (such as MySQL or CouchDB),
messaging/queueing systems (such as RabbitMQ or Beanstalkd), SMTP services for
outbound email (such as Postfix), and caching systems (such as Memcached).

The Ory code makes no distinction between local and third party services. To the
process, both are attached resources, accessed via a URL or other
locator/credentials stored in the config. A deploy of a Ory project should be
able to swap out a local MySQL database with one managed by a third party (such
as Amazon RDS) without any changes to the app’s code. Likewise, a local SMTP
server could be swapped with a third-party SMTP service (such as Postmark)
without code changes. In both cases, only the resource handle in the config
needs to change.

### Concurrency as mandated by the UNIX Process Model

In the Ory Ecosystem, processes are a first class citizen. Processes take strong
cues from the unix process model for running service daemons. Using this model,
the developer can architect their app to handle diverse workloads by assigning
each type of work to a process type. For example, HTTP requests may be handled
by a web process, and long-running background tasks handled by a worker process.
