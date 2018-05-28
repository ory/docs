# Access Control Policies

<!-- toc -->

## Overview

If you have ever worked with cloud providers, you have probably encountered IAM (Identity & Access Management) Policies.
Amazon Web Services' IAM services is the champion of enterprise IT which can be attributed to
[AWS IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).

ORY Keto uses our [Go SDK ORY Ladon](https://github.com/ory/ladon) to provide a self-hosted service that implements
a comparable experience to AWS IAM Policies, or more generally, Access Control Policies.

## Users & Permissions

Before we take a look at Access Control Policies in detail, let's get some of the basics figured out. Every app that
has users usually assigns permissions to these users ("Bob, Alice are allowed to write blog posts"). There are
various established practices for assigning one or more permissions to one or more users.

In the context of access control, you'll often encounter **identities** or **subjects** as an alias for users. In this
documentation we use the terminology **subject** as it summarizes users, robots, cronjobs, services, ... best. So
whenever you read "subject" you can substitute it with users, if it helps your understanding.

Let's begin with a short overview of the established concepts surrounding permissions. Please be aware that the next
sections are merely an overview of those topics and aimed at giving you some context. They do not explain all the
nuances of each respective approach.

### Access Control Lists (ACL)

An [Access Control List (ACL)](https://en.wikipedia.org/wiki/Access_control_list) is a matrix of users and permissions:

|       | blog_post.create | blog_post.delete | blog_post.modify | blog_post.read |
|-------|------------------|------------------|------------------|----------------|
| alice | yes              | yes              | yes              | yes            |
| bob   | no               | no               | no               | yes            |
| peter | yes              | no               | yes              | yes            |

In the example above, `alice` has the permission to create a blog post `(blog_post.create)` while bob des not. All three
(alice, bob, peter) can read blog posts.

Similarly, you can create a matrix of resources (e.g. blog articles) and each user's permissions
(`c` for `create`, `m` for `modify`, ...) with regards to that resource:

|       	| blog_post.1 	| blog_post.2 	| blog_post.3 	| blog_post.4 	|
|-------	|-------------	|-------------	|-------------	|-------------	|
| alice 	| c,r,m,d     	| c,r,m,d     	| c,r,m,d     	| c,r,m,d     	|
| bob   	| r           	| r           	| r           	| r           	|
| peter 	| c,r,m,d     	| r           	| c,r,m,d     	| r           	|

ACLs are common in filesystems (`chmod` / `chown`) and in applications with few subjects. However, the matrix becomes
unreadable and unmanagable if you have thousands or even millions of subjects. Therefore, ACLs are rarely used in
web applications.

### Role Based Access Control (RBAC)

[Role Based Access Control (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) maps subjects to roles
and roles to permissions. The goal of RBAC is to make permission management convenient by grouping subjects
in roles and assigning permissions roles. This type of access control is very common in web applications, where you often
encounter roles such as "administrator", "moderator", and so on.

What's common in RBAC is that roles can inherit permissions from one another. The role administrator, for example,
could inherit all permissions from role moderator. This further decreases management complexity as, instead of adding
all permissions to administrator or assigning a user to both moderator and administrator roles, you simply point the
administrator role to inherit from the moderator one.

Let's come back to alice, bob, peter, and blog posts and the matrix from the ACL example, but this time we define
roles "reader", "author", "admin" and model the ACL example using RBAC:

![RBAC Example](../images/rbac.png).

As you can see, `admin` inherits from `author`, which inherits from `reader`. Only `alice` (or rather `admin`) can delete blog posts,
whereas `author` can create and modify blog posts. We assign the roles to our subjects `bob`, `peter`, `alice` and
express the same permissions as in the ACL example.

RBAC is everywhere. If you ever installed a forum software such as [phpBB](https://www.phpbb.com/support/docs/en/3.1/ug/adminguide/permissions_roles/),
[Wordpress](https://codex.wordpress.org/Roles_and_Capabilities) or others, you have definitely encountered ACL, RBAC, or both.

RBAC reduces management complexity & overhead with large user/subject bases. Sometimes however, RBAC is not enough as well.
That's the case when you're trying to express ownership (e.g. `bob` can modify blog posts, but only his own), or
have attributes (e.g. `bob` works in department `blog`), or multi-tenant environments.

### Access Control Policies (ACP)

Access Control Policies (usually JSON "documents") define an `effect`, `subject`, `action`, and `resource`. For example, `alice` (subject) is
`allowed` (effect) to `delete` (action) blog article with ID `my-first-blog-post` (`resource`). This is very similar
to how ACLs work:

```json
{
    "subjects": ["alice"],
    "resources": ["blog_posts:my-first-blog-post"],
    "actions": ["delete"]
    "effect": "allow"
}
```

The policy above allows `alice` to `delete` `blog_posts:my-first-blog-post`. We could apply this policy to more subjects
and also more actions or resources, if we want to:

```json
{
    "subjects": ["alice", "bob"],
    "resources": ["blog_posts:my-first-blog-post", "blog_posts:2", "blog_posts:3"],
    "actions": ["delete", "create", "read", "modify"]
    "effect": "allow"
}
```

Well, this looks like ACL in disguise so far. So what's different?

#### Precedence

The first difference is that we can explicitly deny access:

```json
{
    "subjects": ["peter"],
    "resources": ["blog_posts:my-first-blog-post", "blog_posts:2", "blog_posts:3"],
    "actions": ["delete", "create", "read", "modify"]
    "effect": "deny"
}
```

The policy decision point (the one checking if something is allowed or not) applies the following rule set when deciding if something is allowed or not:

1. If at least one policy for a given subject, action, and resource matches, and the effect is `deny`, the request is always denied.
2. If no policy matches with effect `deny`, but at least one policy with effect `allow`, the request is allowed.
3. If no policy matches at all, the request is denied.

#### Pattern Matching with Regular Expressions

ORY Keto allows you to apply pattern matching with regular expressions as well. Depending on how you name your subjects,
resources, and actions (for more on that topic go to the [Best Practices](./4-best-practices) section), you can apply
pattern matching using regular expressions.

```json
{
    "subjects": ["users:<.*>"]
}
```

In the example above, the (incomplete) policy would match every subject that is prefixed with `users:`, so for example
`users:alice`, `users:bob`. In ORY Ladon / ORY Keto, regular expressions are delimited with `<` and `>`.
For example, `"users:.*"` is not a valid regular expression, just a simple string.

The next example will allow all subjects with prefix `user:` to read (`actions:read`) all resources that match `resources:blog_posts:<[0-9]+>`
(e.g. `resources:blog_posts:1234` but not `resources:blog_posts:abcde`):

```json
{
    "subjects": ["users:<.*>"],
    "resources": ["resources:blog_posts:<[0-9]+>"],
    "actions": ["actions:read"]
    "effect": "allow"
}
```

#### Conditions

Conditions are another powerful concept. So far, we covered that an Access Control Policies applies to a list of
`subjects`, `resources`, and `actions`. Conditions narrow down the use cases in which a certain ACP applies. A condition
may, for example, mandate that the IP Address of the client making the request has to match e.g. `192.168.0.0/16` or that
the subject is also the owner of the resource:

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "remoteIPAddress": {
      "type": "CIDRCondition",
      "options": {
        "cidr": "192.168.0.0/16"
      }
    }
  }
}
```

What conditions you can use and how you use is documented [here](./5-conditions). Since that requires knowledge of the Warden API
works, let's look at that first in the [next chapter](./2-warden).
