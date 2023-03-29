---
id: scalability
title: Scalability
---

Ory services are running in high-scale production environments that handle millions of requests per day. To scale Ory, spin up
another VM, Docker container, or pod of Ory Kratos, Ory Hydra or Keto with the same configuration. Ory scales effortlessly to
thousands of pods without any additional work. There is no need for complex key-value stores or message queues to serve high
traffic environments.

If you use multiple SQL instances use HAProxy or similar technology for
[SQL load balancing](https://severalnines.com/resources/database-management-tutorials/mysql-load-balancing-haproxy-tutorial).

## Mail courier

Ory Kratos processes emails by storing them in an email queue on your database and running a mail courier worker to handle this
queue. To avoid processing the same email multiple times, only one instance of this mail courier should be run at one time. For
simple single-instance Ory Kratos deployments, the courier can simply be run as a background worker, but for multi-instance Ory
Kratos deployments, it needs to be run a distinct singleton foreground worker. To learn more about setup and configuration, read
the [Mail courier in self-hosted Ory Kratos](../../kratos/self-hosted/mail-courier-selfhosted) document.

Ory Kratos doesn't have any special requirements when it comes to high availability as it doesn't manage state itself but instead
relies on the SQL database for that.

It's therefore possible to use Ory Kratos with auto-scaling groups for example in Kubernetes without any additional configuration.
