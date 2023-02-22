---
id: index
title: Introduction
---

Ory Permissions (based on the open-source Ory Keto Permission Server) is the first open-source implementation of
[Zanzibar: Google's Consistent, Global Authorization System](https://research.google/pubs/pub48190/).

With Ory Permissions, you can

- unify authorization logic in one service that is the authoritative source across all your applications.
- define a permission model such as RBAC, ABAC, or a more flexible model that fits your use case.
- work independent of any tech-stack, with [SDKs](./sdk/01_overview.md) available for all major programming languages.
- query permissions across the world against the globally-distributed Ory Network.
- issue fine-grained permissions, for example `user x can read document y`.
- inherit permissions through groups, roles, hierarchies, and more.

## How Ory Permissions works

### Relationships

Ory Permissions operates on and manages relationships. These relationships represent the source of truth from which all
permissions are derived. Common examples include:

- `User c is the owner of Document d`
- `User a is a member of Group b`

In most cases relationships represent a fact that is already part of your application. To ensure the Ory Permission Server always
has the most up-to-date information, you should use it as the source of truth for your application as well. There are multiple
APIs to query and manage relationships.

### Ory Permission Language

The Ory Permission Language (OPL) defines the rules by which permissions are derived from relationships. Every application has
different rules, so this allows you to customize the behavior to your permission model. Examples of rules are:

- Every `owner` of a document can also edit and view that document.
- Everyone who can view a parent directory, can also view all children.
- To view a document, the user must not be in the deny-list for that document.

The Ory Permission Language is a subset of [TypeScript](https://www.typescriptlang.org/). Have a look at this basic example, or
the [quickstart guide](../guides/permissions/overview.mdx).

```ts
import { Namespace, Context } from "@ory/keto-namespace-types"

class User implements Namespace {}

class Document implements Namespace {
  // All relationships for a single document.
  related: {
    editors: User[]
    viewers: User[]
  }

  // The permissions derived from the relationships and context.
  permits = {
    // A permission is a function that takes the context and returns a boolean. It can reference `this.related` and `this.permits`.
    write: (ctx: Context): boolean => this.related.editors.includes(ctx.subject),
    read: (ctx: Context): boolean => this.permits.write(ctx) || this.related.viewers.includes(ctx.subject),
  }
}
```

### Check permissions

The Check API is the main API. It gives a simple true or false answer to a permission request, for example
`Is user x allowed to read document y?`. The answer is calculated from all relationships and rules defined in the Ory Permission
Language. This API should be used by your application to check if a user is allowed to perform any action, so it should be in the
critical path of every request.

For more details, head over to the [gRPC API reference](./reference/proto-api.mdx#checkservice) or
[REST API reference](./reference/rest-api.mdx#check-a-relation-tuple).

### List relationships

Using the List Relationship API, you can query relationships. This can for example be used to

- implement views for reviewing and managing access.
- list all users and groups that have access to a document or directory.
- list all service accounts that have any relationship to a resource.
- list all documents that are shared with a user.
- list all documents that are owned by a group.

For more details, head over to the [gRPC API reference](./reference/proto-api.mdx#readservice) or
[REST API reference](./reference/rest-api.mdx#query-relation-tuples).

### Expand permissions

Often you want to know what a user can do, not just whether they have a certain permission. For example, you might want to get a
list of all documents that a user can read to display it in the user-interface. The expand API is able to calculate that list of
objects. This differs from the List API, which does not take into account the Ory Permission Language.

Similarly, the Expand API also allows to get a list of all subjects that have access to an object. This can for example be used to
audit permissions, or to get all direct and indirect members of a group.

For more details, head over to the [gRPC API reference](./reference/proto-api.mdx#readservice) or
[REST API reference](./reference/rest-api.mdx#query-relation-tuples).

## Get started with Ory Permissions

To get started with Ory Permissions, head over to the [quickstart guide](../guides/permissions/overview.mdx).
