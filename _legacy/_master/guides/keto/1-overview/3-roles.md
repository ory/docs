# Roles

ORY Keto supports the concept of roles (like in RBAC). This feature allows you to group together a number of subjects
under the same role. Whenever making a request to the Warden API, it will check the role's of a subject (if there are any)
and use them when looking up Access Control Policies.

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
Warden request

```
{
  "subject": "bob",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

will return `{ "allowed": false }` while Warden request

```
{
  "subject": "admin",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

will return `{ "allowed": true }`. If we add `bob` to role `admin` using the [Role API](https://www.ory.sh/docs/api/keto)
or the CLI:

```
$ keto roles create admin \
    --endpoint http://your-keto-server/

$ keto roles members add admin bob \
    --endpoint http://your-keto-server/
```

and redo the same Warden request

```
{
  "subject": "bob",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

the response will return `{ "allowed": true }` as well.

Currently, we do not support hierarchy in roles but we might add that at a later stage.
