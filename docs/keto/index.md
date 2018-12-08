---
id: index
title: Introduction
---

ORY Keto is an permission server that implements best practice access control mechanisms. If you came looking for
the answer to the question:

* is certain user is allowed to modify that blog article?
* is this service is allowed to print a document?
* is the user of the ACME organisation allowed to modify data in one of their tenants?
* is this process allowed to execute the worker when coming from IP 10.0.0.2 between 4pm and 5pm on every monday?
* ...

ORY Keto provides various access control engines:

* Available today:
  * ORY-flavored Access Control Policies with exact, glob, and regexp matching strategies
* Available soon:
  * [Access Control Lists](https://en.wikipedia.org/wiki/Access_control_list)
  * [Role Based Access Control](https://de.wikipedia.org/wiki/Role_Based_Access_Control)
  * Role Based Access Control with Context (Google/Kubernetes-flavored)
  * Amazon Web Services Identity & Access Management Policies (AWS IAM Policies)

Each mechanism is powered by a decision engine implemented on top of the
[Open Policy Agent](https://www.openpolicyagent.org/) and provides well-defined management and authorization REST API endpoints.
