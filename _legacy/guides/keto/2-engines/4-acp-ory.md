# Access Control Policies: ORY

<!-- toc -->


At ORY, we use an Access Control Policy DSL modeled after AWS IAM Policies. These policies define an `effect`,
`subject`, `action`, and `resource`. For example, `alice` (subject aka identity aka user) is `allowed` (effect) to `delete` (action) blog
article with ID `my-first-blog-post` (`resource`). This is very similar to how ACLs work:

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

## Precedence

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

## Pattern Matching Strategies

ORY Keto has implements several ORY ACP pattern matching strategies.

### Case Sensitive Equality

The easiest pattern matching strategy is the case sensitive equality check. This strategy simply checks if
two strings are exactly the same. Assuming a policy defines `{"subjects": ["alice", "boB"] }`, then
it will match exactly subjects `alice` and `boB`.

### URN

ORY Keto supports matching URNs with glob pattern matching. Policy

```json
{
    "subjects": ["users:*"]
    "actions": ["get", "create"],
    "resources": ["resources:articles:*", "resources:{accounts,profiles}:*"]
    "effect": "allow",
}
```

for example will match the following inputs:

```json
{
    "subject": "users:maria",
    "action": "get",
    "resource": "resources:profiles:foo"
}
```

The `:` is always understood as a delimiter. The following syntax is supported by this strategy:

* Single symbol wildcard `?at` matches `cat` and `bat` but not `at`.
* Wildcard `foo:*:bar` matches `foo:baz:bar` and `foo:zab:bar` but not `foo:bar` nor `foo:baz:baz:bar`
* Super wildcard `foo:**:bar` matches `foo:baz:baz:bar` and `foo:baz:bar` but not `foo:bar`
* Character list `[cb]at` matches `cat` and `bat` but not `mat` nor `at`.
* Negated character list `[!cb]at` matches `tat` and `mat` but not `cat` nor `bat`.
* Ranged character list `[a-c]at` `cat` and `bat` but not `mat` nor `at`.
* Negated ranged character list `[!a-c]at` matches `mat` and `tat` but not `cat` nor `bat`.
* Alternatives list `{cat,bat,[mt]at}` matches `cat`, `bat`, `mat`, `tat` but nothing else.

### Regular Expressions

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

### Computational Overhead

Different pattern matching strategies have different computational complexity, considering performance when choosing
an approach is important:

- Case Sensitive Equality: No computational overhead.
- URN: Little computational overhead.
- Regex: Considerable computational overhead.

## Conditions

Conditions are another powerful concept. So far, we covered that an ORY ACP applies to a list of
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

Conditions are defined in policies. Context is defined when asking if someone is allowed to do something (access control). Conditions use contexts and decide
if a policy is responsible for handling the access request at hand.

Conditions are functions returning true or false given a context. Because conditions implement logic,
they must be programmed. ORY Keto provides several conditions out of the box, which can be improved or extended at any time.

A condition has always the same JSON format:

```json
{
  "subjects": ["..."],
  "actions" : ["..."],
  "effect": "allow",
  "resources": ["..."],
  "conditions": {
    "this-key-will-be-matched-with-the-context": {
      "type": "SomeConditionType",
      "options": {
        "some": "configuration options set by the condition type"
      }
    }
  }
}
```

The context in the access request made to the ORY ACP Allowed API must match the specified key in the condition
in order to be evaluated by the condition logic:

```json
{
  "subject": "...",
  "action" : "...",
  "resource": "...",
  "context": {
    "this-key-will-be-matched-with-the-context": { "foo": "bar" }
  }
}
```

### CIDR Condition

The CIDR condition matches CIDR IP Ranges. An exemplary policy definition could look as follows.

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

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "remoteIPAddress": "192.168.0.5"
  }
}
```

The next access request would be denied as the condition is not fulfilled and thus no policy is matched.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "remoteIPAddress": "255.255.0.0"
  }
}
```

The next access request would also be denied as the context is not using the key `remoteIPAddress` but instead `someOtherKey`.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someOtherKey": "192.168.0.5"
  }
}
```

##### String Equal Condition

Checks if the value passed in the access request's context is identical with the string that was given initially.

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "someKeyName": {
      "type": "StringEqualCondition",
      "options": {
        "equals": "the-value-should-be-this"
      }
    }
  }
}
```

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKeyName": "the-value-should-be-this"
  }
}
```

The following access request would be denied.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKeyName": "this-is-a-different-value"
  }
}
```

### String Match Condition

Checks if the value passed in the access request's context matches the regular expression that was given initially.

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "someKeyName": {
      "type": "StringMatchCondition",
      "options": {
        "equals": "regex-pattern-here.+"
      }
    }
  }
}
```

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKeyName": "regex-pattern-here-matches"
  }
}
```

The following access request would be denied.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKeyName": "regex-pattern-here"
  }
}
```

### Subject Condition

Checks if the access request's subject is identical with the string specified in the context.

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "owner": {
      "type": "EqualsSubjectCondition",
      "options": {}
    }
  }
}
```

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "owner": "users:maria"
  }
}
```

The following access request would be denied.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "owner": "another-user"
  }
}
```

This condition makes more sense when being used with access tokens where the subject is extracted from the token.

### String Pairs Equal Condition

Checks if the value passed in the access request's context contains two-element arrays and that both elements in each pair are equal.

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "someKey": {
      "type": "StringPairsEqualCondition",
      "options": {}
    }
  }
}
```

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKey": [
      ["some-arbitrary-pair-value", "some-arbitrary-pair-value"],
      ["some-other-arbitrary-pair-value", "some-other-arbitrary-pair-value"]
    ]
  }
}
```

The following access request would be denied.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKey": [
      ["some-arbitrary-pair-value", "some-other-arbitrary-pair-value"]
    ]
  }
}
```

## Roles

ORY ACPs support a role concept, similar to RBAC. This feature allows you to group together a number of subjects
under the same role. Whenever making a request to the Allowed API, it will check the roles of a subject (if there are any)
and use them when looking up the `subjects` field.

Assuming the following policies:

```json
{
    "subjects": ["bob"],
    "resources": ["blog_posts:my-first-blog-post"],
    "actions": ["create"]
    "effect": "allow"
}
```

```json
{
    "subjects": ["admin"],
    "resources": ["blog_posts:my-first-blog-post"],
    "actions": ["delete"]
    "effect": "allow"
}
```

As you can see, `bob` is allowed to create resource `blog_posts:my-first-blog-post` and `admin` is allowed to delete it.
Making the following request to the Allowed API

```
{
  "subject": "bob",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

will return `{ "allowed": false }` while this request

```
{
  "subject": "admin",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

will return `{ "allowed": false }`.

## Implementation Status

ORY Access Control Policies (regex, equality) are first-class citizens. We are working on adding
the urn strategy in the close future.

## Best Practices

This sections gives an overview of best practices for access control policies
we developed over the years at ORY.

### URNs

> “There are only two hard things in Computer Science: cache invalidation and naming things.”
-- Phil Karlton

URN naming is as hard as naming API endpoints. Thankfully, by doing the latter, the former is usually solved as well.
We will explore further best practices in the following sections.

### Scope the Organization Name

A rule of thumb is to prefix resource names with a domain that represents the organization creating the software.

* **Do not:** `<some-id>`
* **Do:** `<organizaion-id>:<some-id>`

### Scope Actions, Resources and Subjects

It is wise to scope actions, resources, and subjects in order to prevent name collisions:

* **Do not:** `myorg.com:<subject-id>`, `myorg.com:<resource-id>`, `myorg.com:<action-id>`
* **Do:** `myorg.com:subjects:<subject-id>`, `myorg.com:resources:<resource-id>`, `myorg.com:actions:<action-id>`
* **Do:** `subjects:myorg.com:<subject-id>`, `resources:myorg.com:<resource-id>`, `actions:myorg.com:<action-id>`

### Multi-Tenant Systems

Multi-tenant systems typically have resources which should not be access by other tenants in the system. This can be
achieved by adding the tenant id to the URN:

* **Do:** `resources:myorg.com:tenants:<tenant-id>:<resource-id>`

In some environments, it is common to have organizations and projects belonging to those organizations. Here, the
following URN semantics can be used:

* **Do:** `resources:myorg.com:organizations:<organization-id>:projects:<project-id>:<resource-id>`
