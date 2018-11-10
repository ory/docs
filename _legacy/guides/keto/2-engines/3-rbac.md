# (H)RBAC: (Hierarchical) Role Based Access Control

[Role Based Access Control (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) maps subjects to roles
and roles to permissions. The goal of (H)RBAC is to make permission management convenient by grouping subjects
in roles and assigning permissions roles. This type of access control is very common in web applications, where you often
encounter roles such as "administrator", "moderator", and so on.

What's common in RBAC is that roles can inherit permissions from one another. This concept is called **HRBAC or
Hierarchical Role Based Access Control**. The role administrator, for example, could inherit all permissions from role
moderator. This further decreases management complexity as, instead of adding all permissions to administrator or
assigning a user to both moderator and administrator roles, you simply point the administrator role to inherit
from the moderator one.

Let's come back to alice, bob, peter, and blog posts and the matrix from the ACL example, but this time we define
roles "reader", "author", "admin" and model the ACL example using (H)RBAC:

![(H)RBAC Example](../images/rbac.png).

As you can see, `admin` inherits from `author`, which inherits from `reader`. Only `alice` (or rather `admin`) can delete blog posts,
whereas `author` can create and modify blog posts. We assign the roles to our subjects `bob`, `peter`, `alice` and
express the same permissions as in the ACL example.

(H)RBAC is everywhere. If you ever installed a forum software such as [phpBB](https://www.phpbb.com/support/docs/en/3.1/ug/adminguide/permissions_roles/),
[Wordpress](https://codex.wordpress.org/Roles_and_Capabilities) or others, you have definitely encountered ACL, (H)RBAC, or both.

(H)RBAC reduces management complexity & overhead with large user/subject bases. Sometimes however, (H)RBAC is not enough as well.
That's the case when you're trying to express ownership (e.g. `bob` can modify blog posts, but only his own), or
have attributes (e.g. `bob` works in department `blog`), or multi-tenant environments.

**Benefits:**
* Reduces management complexity where many identities share the same permissions.
* Makes management even easier with role hierarchy.
* Is well established and easily understood by many developers as it is a de-facto standard for web applications.

**Shortcomings:**
* Has no concept of context:
  * There is no concept of ownership: *Dan is the author of article "Hi World" and is thus allowed to update it*.
  * There is no concept of environment: *Dan is allowed to access accounting services when the request comes from IP 10.0.0.3*.
  * There is no concept of tenants: *Dan is allowed to access resources on the "dan's test" tenant*.
  * ...

**Implementation status:** (Hierarchical) Role Based Access Control is currently not implemented but will be first-class citizens in the future.
To bump this in priority, [click here](https://github.com/ory/keto/issues/60).
