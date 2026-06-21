---
id: software-architecture-philosophy
title: Architecture principles
---

Ory's architecture is designed along several guiding principles:

- Minimal dependencies
- Runs everywhere
- Scales without effort
- Minimize room for human and network errors

Our architecture leans on [12factor.net principles](https://www.12factor.net) and is designed to run best on a Container
Orchestration Systems such as Kubernetes, CloudFoundry, OpenShift, and similar projects. While it's possible to run the Ory stack
on a RaspberryPI, the integration with the Docker and Container ecosystem is best documented and supported.

## Architecture philosophy

Our philosophy and assumption of how modern software works is summarized here.

### The best system dependency is no dependency

The Ory stack doesn't rely on (operating) system-wide dependencies such as Java, Apache, or other libraries. The only system-wide
dependency you may encounter is libc / libmusl, required for standard C and POSIX functions when using SQLite.

Installing an Ory project is often just one binary away - on any architecture, and operating system. Our binaries are a couple of
MB small and so are the Docker Images we distribute.

Ory exposes HTTP(s) ports and configuration of these ports. It doesn't need a webserver such as NGINX or Apache HTTP Server.

### The platform is responsible for horizontal scaling

The Ory stack scales without the need for any additional external service dependencies (such as etcd, Memcached) except for a
RDBMS (such as PostgreSQL, MySQL). To scale horizontally start another process.

The Ory Ecosystem assumes that the platform it's running on (such as Kubernetes, Google Cloud, Amazon Web Services, Azure, ...) is
capable of Load Balancing and doesn't concern itself with things like Leader Election protocols or other communicating between
process instances of the same project.

### Configuration from environment variables and configuration files

The Ory stack uses environment variables (often shortened to env vars or env) and files as a configuration source. All settings
from a configuration file can also be set using environment variables and vice versa.

This allows systems like Kubernetes to mount, and update, configuration files using volume mounts sourced from ConfigMaps and
other similar resources.

Our projects support hot-reloading of configuration files (support for hot reloading isn't yet implemented everywhere).

Configuration settings are validated using JSON Schema and we try to make it as difficult as possible to misconfigure our
software.

### The process is stateless and disposable

Ory processes are stateless and share-nothing. Any data that needs to persist must be stored in a stateful backing service,
typically a RDBMS (SQL) database.

The processes are disposable, meaning they can be started or stopped at a moment’s notice. This facilitates fast elastic scaling,
rapid deployment of code or config changes, and robustness of production deploys.

The Ory stack strives to minimize startup time, taking no more than milliseconds to be ready. The processes shut down gracefully
when they receive a SIGTERM signal from the process manager. For a web process, graceful shutdown is achieved by ceasing to listen
on the service port (thereby refusing any new requests), allowing any current requests to finish, and then exiting. Implicit in
this model is that HTTP requests are short (no more than a several seconds), or in the case of long polling, the client should
seamlessly attempt to reconnect when the connection is lost.

#### Logs are `stdout` / `stderr` streams

The Ory stack never concerns itself with routing or storage of its output stream. It doesn't attempt to write to or manage
logfiles. Instead, each running process writes its event stream, unbuffered, to stdout and stderr. During local development, the
developer will view this stream in the foreground of their terminal to observe the app’s behavior.

### Maintenance tasks run as a one-off processes

The process formation is the array of processes that are used to do the app’s regular business (such as handling web requests) as
it runs. Separately, developers will often wish to do one-off administrative or maintenance tasks for the app, such as running
database migrations (such as `hydra migrate sql`).

One-off admin processes should be run in an identical environment as the regular long-running processes of the app. They run
against a release, using the same codebase and config as any process run against that release. Admin code must ship with
application code to avoid synchronization issues.

### External services (PostgreSQL, MySQL, ...) are attached resources

A backing service is any service the app consumes over the network as part of its normal operation. Examples include datastores
(such as MySQL or CouchDB), messaging/queueing systems (such as RabbitMQ or Beanstalkd), SMTP services for outbound email (such as
Postfix), and caching systems (such as Memcached).

The Ory code makes no distinction between local and third party services. To the process, both are attached resources, accessed
via a URL or other locator/credentials stored in the config. A deploy of a Ory project should be able to swap out a local MySQL
database with one managed by a third party (such as Amazon RDS) without any changes to the app’s code. Likewise, a local SMTP
server could be swapped with a third-party SMTP service (such as Postmark) without code changes. In both cases, only the resource
handle in the config needs to change.

### Concurrency as mandated by the UNIX process model

In the Ory Ecosystem, processes are a first class citizen. Processes take strong cues from the unix process model for running
service daemons. Using this model, the developer can architect their app to handle diverse workloads by assigning each type of
work to a process type. For example, HTTP requests may be handled by a web process, and long-running background tasks handled by a
worker process.
