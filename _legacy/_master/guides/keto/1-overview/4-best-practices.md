# Best Practices

This sections gives an overview of best practices for access control policies
we developed over the years at ORY.

<!-- toc -->

## Scalability

Access Control Policies not using any regular expressions are quite scalable. Defining many regular expressions and
a lot of policies (50.000+) may have a notable performance impact on CPU, your database and generally increase response
times. This is because regular expressions can not be indexed. Regular expressions have a complexity of `O(n)` in Go,
but that is still getting slow when you define too many.

Try to solve your access control definitions with a few generalized policies, and try to leverage Warden Groups.

## URNs

> “There are only two hard things in Computer Science: cache invalidation and naming things.”
-- Phil Karlton

URN naming is as hard as naming API endpoints. Thankfully, by doing the latter, the former is usually solved as well.
We will explore further best practices in the following sections.

## Scope the Organization Name

A rule of thumb is to prefix resource names with a domain that represents the organization creating the software.

* **Do not:** `<some-id>`
* **Do:** `<organizaion-id>:<some-id>`

## Scope Actions, Resources and Subjects

It is wise to scope actions, resources, and subjects in order to prevent name collisions:

* **Do not:** `myorg.com:<subject-id>`, `myorg.com:<resource-id>`, `myorg.com:<action-id>`
* **Do:** `myorg.com:subjects:<subject-id>`, `myorg.com:resources:<resource-id>`, `myorg.com:actions:<action-id>`
* **Do:** `subjects:myorg.com:<subject-id>`, `resources:myorg.com:<resource-id>`, `actions:myorg.com:<action-id>`

## Multi-Tenant Systems

Multi-tenant systems typically have resources which should not be access by other tenants in the system. This can be
achieved by adding the tenant id to the URN:

* **Do:** `resources:myorg.com:tenants:<tenant-id>:<resource-id>`

In some environments, it is common to have organizations and projects belonging to those organizations. Here, the
following URN semantics can be used:

* **Do:** `resources:myorg.com:organizations:<organization-id>:projects:<project-id>:<resource-id>`
