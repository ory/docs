---
id: index
title: Introduction to Ory Permissions
sidebar_label: Introduction
---

# Introduction

Ory Permissions is a modern permission system you can use to create a complete authorization system for your application or
website, no matter the size or the complexity of the ACLs (access-control lists) your use case requires. Ory Permissions, based on
the open-source Ory Keto Permission Server, is the first open-source implementation of the design principles and specifications
described in [Zanzibar: Google's Consistent, Global Authorization System](https://research.google/pubs/pub48190/).

Implementing the design principles described in the Zanzibar paper allows Ory Permissions to offer the following benefits over
older, widely adopted permission systems:

- Flexibility: Older permission systems typically rely on a fixed set of permissions and access control rules that are difficult
  to customize or modify. Ory Permissions provides a flexible data model you can customize to fit a wide range of use cases.
  Creating custom permission models is aided by Ory Permission Language, a developer-friendly, TypeScript-based configuration
  language.

- Scalability: While traditional permission systems often struggle to handle large-scale applications and services with high
  request volume, Ory Permissions is designed to be highly scalable and handle a large number of concurrent requests without
  sacrificing performance or reliability.

- Consistency: In older permissions systems, the data is often eventually consistent, which leaves windows of opportunity for
  potential unauthorized access to resources before the data is correctly propagated to all parts of the system. By implementing
  Zanzibar, Ory Permissions puts consistency in the spotlight and ensures that permission checks that are at the critical path of
  user experience, are always answered correctly.

With Ory Permissions, you can:

- Use Ory Permission Language to create permission models that fit your exact use case - RBAC, ABAC, and beyond.
- Unify authorization logic in one service that's the single source of truth for access rights across all of your applications.
- Be tech-stack agnostic and use Ory Network [SDKs](./sdk/01_overview.md) available for all major programming languages.
- Issue fine-grained permissions, for example `user x can read document y`.
- Allow permissions inheritance through groups, roles, and hierarchies to ensure organic scaling that follows the growth of your
  application.

## Ory Permission Language

The Ory Permission Language (OPL) is a developer-friendly, [TypeScript](https://www.typescriptlang.org/)-based configuration
language designed to have a low learning curve and a familiar source in contrary to other, proprietary languages used to represent
permissions, such as Rego or Casbin.

:::tip

You can create permission rules with OPL using the Ory Console. Go to [**Ory Console**](https://console.ory.sh/) → **Namespaces &
Rules** and use the editor in the **Permission Rules** tab.

:::

This is an example of OPL code:

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

## Next steps

- Complete the Ory Permissions [quickstart](../guides/permissions/overview.mdx) to see the system in action.
- Learn about the foundational concepts behind Ory Permissions: [relationships](./concepts/01_relation-tuples.mdx),
  [namespaces](./concepts/05_namespaces.mdx), [objects](./concepts/10_objects.mdx), and [subjects](./concepts/15_subjects.mdx).
- Learn [what is a permission model and how to create one](./modeling/create-permission-model.mdx).
- Read the Ory Permission Language [specification](./reference/ory-permission-language.mdx).
