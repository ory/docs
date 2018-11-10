OAuth 2.0 scopes and Access Control Policies cover different aspects of access control. OAuth 2.0 scopes do not represent
what a resource owner ("user") is able to do in a system or not. They do not express things like administrative rights.

OAuth 2.0 scopes express what a user allowed a token to do on his/her behalf. For example, an access token might be allowed
to see a user's pictures, but not upload new pictures on his/her behalf. The user him/herself however is generally allowed
to view and upload pictures. OAuth 2.0 scopes do not express a user's permissions. They express what an OAuth 2.0 Client
may do on the user's behalf - independently of whether or not the user is actually allowed to do that.

Access Control Policies say what permissions a user has. For example, a user may be allowed to upload and view pictures,
but not ban other users. The latter permission is only allowed if the user is an administrator. Access Control Policies
cover use cases where you would use RBAC or ACL - but are generally more powerful. A user may be an administrator and thus
allowed to ban user, but the user might choose to not grant this capability (OAuth 2.0 scope) to some OAuth 2.0 Client.