
### Access Control Policies

Access Control Policies are a way of authorizing requests. Alternatives are Role Based Access
Control, Access Control Lists, Discretionary Access Control, and others.

Access Control Policies are provided by the Ladon SDK and while Access Control Policies are not standardized,
we analyzed various popular Access Control Policy Mechanisms such as AWS IAM or Google IAM and
modeled Ladon after those.

The Ladon SDK has seen adoption across various Go projects, yields good test coverage and includes a magnitude
of test cases for the vital parts of the library. The API has not seen any breaking changes or security
issues since its inception.




#########


Access Control Policies say what permissions a user has. For example, a user may be allowed to upload and view pictures,
but not ban other users. The latter permission is only allowed if the user is an administrator. Access Control Policies
cover use cases where you would use RBAC or ACL - but are generally more powerful. A user may be an administrator and
thus allowed to ban user, but the user might choose to not grant this capability (OAuth 2.0 scope) to some OAuth 2.0 Client.


###########


In ORY Hydra, almost all APIs are protected by Access Control Policies. To make requests, you will need to have a valid
access token with the right scopes. Additionally, the user who granted the token must also be allowed to access that API
and resource. What permissions you need for which endpoint can be seen [in the API docs](https://www.ory.sh/docs/api/hydra/).

Access Control Policies are very powerful. They are modeled after Amazon Web Service Identity and Access Management Policies (AWS IAM Policies),
and have tremendous flexibility.
