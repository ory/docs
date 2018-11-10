# ACL: Access Control Lists

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
| -------	| -------------	| -------------	| -------------	| -------------	|
| alice 	| c,r,m,d     	| c,r,m,d     	| c,r,m,d     	| c,r,m,d     	|
| bob   	| r           	| r           	| r           	| r           	|
| peter 	| c,r,m,d     	| r           	| c,r,m,d     	| r           	|

ACLs are common in filesystems (`chmod` / `chown`) and in applications with few subjects.

**Benefits:**
* Fine-grained control that can be fine-tuned per identity and permission.
* Works really well in systems where each identity has a different set of permissions.

**Shortcomings:**
* As more identities and resources are added, the matrix grows larger and larger and becomes harder to maintain.
* If you have many identities that are allowed to do the same thing, choose a system like RBAC.

**Implementation status:** Access Control Lists are currently not implemented but will be first-class citizens in the future.
To bump this in priority, [click here](https://github.com/ory/keto/issues/61).
