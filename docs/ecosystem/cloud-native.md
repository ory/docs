---
id: cloud-native
title: Cloud Native Architecture
---

All ORY technology is built cloud native and follows [12factor.net](https://www.12factor.net) principles.

## 12 Factor Concepts

The following is a collection of core concepts to ORY's technological ideology. They are summaries of the
[12factor principles](https://www.12factor.net) written by Adam Wiggins.

### Codebase: One codebase tracked in revision control, many deploys

A twelve-factor app is always tracked in a version control system, such as Git, Mercurial, or Subversion. A copy of the
revision tracking database is known as a code repository, often shortened to code repo or just repo.

A codebase is any single repo (in a centralized revision control system like Subversion), or any set of repos who share
a root commit (in a decentralized revision control system like Git).

### Dependencies: Explicitly declare and isolate dependencies

A twelve-factor app never relies on implicit existence of system-wide packages. It declares all dependencies,
completely and exactly, via a dependency declaration manifest. Furthermore, it uses a dependency isolation tool
during execution to ensure that no implicit dependencies “leak in” from the surrounding system. The full and explicit
dependency specification is applied uniformly to both production and development.

### Config: Store config in the environment

The twelve-factor app stores config in environment variables (often shortened to env vars or env). Env vars are easy
to change between deploys without changing any code; unlike config files, there is little chance of them being checked
into the code repo accidentally; and unlike custom config files, or other config mechanisms such as Java System
Properties, they are a language- and OS-agnostic standard.

### Backing services: Treat backing services as attached resources

A backing service is any service the app consumes over the network as part of its normal operation. Examples
include datastores (such as MySQL or CouchDB), messaging/queueing systems (such as RabbitMQ or Beanstalkd), SMTP
services for outbound email (such as Postfix), and caching systems (such as Memcached).

The code for a twelve-factor app makes no distinction between local and third party services. To the app, both are
attached resources, accessed via a URL or other locator/credentials stored in the config. A deploy of the twelve-factor
app should be able to swap out a local MySQL database with one managed by a third party (such as Amazon RDS) without
any changes to the app’s code. Likewise, a local SMTP server could be swapped with a third-party SMTP service
(such as Postmark) without code changes. In both cases, only the resource handle in the config needs to change.

### Build, release, run: Strictly separate build and run stages

The twelve-factor app uses strict separation between the build, release, and run stages. For example, it is
impossible to make changes to the code at runtime, since there is no way to propagate those changes back
to the build stage.

### Processes: Execute the app as one or more stateless processes

Twelve-factor processes are stateless and share-nothing. Any data that needs to persist must be stored
in a stateful backing service, typically a database.

### Port binding: Export services via port binding

The twelve-factor app is completely self-contained and does not rely on runtime injection of a webserver into
the execution environment to create a web-facing service. The web app exports HTTP as a service by binding to a
port, and listening to requests coming in on that port.

### Concurrency: Scale out via the process model

In the twelve-factor app, processes are a first class citizen. Processes in the twelve-factor app take strong
cues from the unix process model for running service daemons. Using this model, the developer can architect
their app to handle diverse workloads by assigning each type of work to a process type. For example, HTTP requests may
be handled by a web process, and long-running background tasks handled by a worker process.

### Disposability: Maximize robustness with fast startup and graceful shutdown

The twelve-factor app’s processes are disposable, meaning they can be started or stopped at a moment’s notice.
This facilitates fast elastic scaling, rapid deployment of code or config changes, and robustness of production deploys.

Processes should strive to minimize startup time. Ideally, a process takes a few seconds from the time the launch
command is executed until the process is up and ready to receive requests or jobs. Short startup time provides more
agility for the release process and scaling up; and it aids robustness, because the process manager can more easily
move processes to new physical machines when warranted.

Processes shut down gracefully when they receive a SIGTERM signal from the process manager. For a web process, graceful
shutdown is achieved by ceasing to listen on the service port (thereby refusing any new requests), allowing any current
requests to finish, and then exiting. Implicit in this model is that HTTP requests are short (no more than a few seconds),
or in the case of long polling, the client should seamlessly attempt to reconnect when the connection is lost.

### Admin processes: Run admin/management tasks as one-off processes

The process formation is the array of processes that are used to do the app’s regular business (such as handling web
requests) as it runs. Separately, developers will often wish to do one-off administrative or maintenance tasks for
the app, such as running database migrations (e.g. `hydra migrate sql`).

One-off admin processes should be run in an identical environment as the regular long-running processes of the app.
They run against a release, using the same codebase and config as any process run against that release. Admin code
must ship with application code to avoid synchronization issues.

### Logs: Treat logs as event streams

A twelve-factor app never concerns itself with routing or storage of its output stream. It should not attempt
to write to or manage logfiles. Instead, each running process writes its event stream, unbuffered, to stdout.
During local development, the developer will view this stream in the foreground of their terminal to observe
the app’s behavior.