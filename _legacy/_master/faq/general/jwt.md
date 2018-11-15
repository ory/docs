JSON Web Tokens make much sense, when a client needs to verify the payload of a token. For example, OpenID Connect ID Tokens
are consumed by a client. The payload of the ID token is used to authenticate the user in the client app.

The payloads of OAuth2 access and refresh tokens however are not relevant to the client. The payload is only
relevant to the protected resource (e.g. an image), as that resource must check if the token is allowed to access it.
The payload of the token is only relevant to the resource provider and the OAuth2 server. Therefore, JSON Web Tokens
are the wrong tool for this task.

Additionally, using JSON Web Tokens for access and refresh tokens adds another limitation. It becomes impossible to
blacklist the tokens. They are valid as long as their signature - and the corresponding private key - is valid and as long
as they are not expired. While it is theoretically possible to introduce a blacklist and "ban" certain tokens, it defeats
the stateless nature of JSON Web Tokens as it would be necessary to check if the token is on the blacklist on every request.

For these and other reasons, ORY Hydra does not issue JSON Web Tokens as access and refresh tokens, and never will.

There is however one caveat to this story. Can you protect your API endpoints without making a REST call to ORY Hydra
on every access request? With ORY Oathkeeper, you can!

[ORY Oathkeeper](https://github.com/ory/oathkeeper) is a HTTP Reverse Proxy which "translates" ORY Hydra's access tokens to stateless JSON Web Tokens. It
basically replaces the access token with a JSON Web Token which can be used as a stateless session identifier in your API endpoint.
