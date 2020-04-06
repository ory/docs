---
id: version-oryOS.9-appendix
title: Appendix
original_id: appendix
---

> You are viewing an outdated version of this documentation. Please head over
> to [www.ory.sh/docs](https://www.ory.sh/docs) for a recent version!

## `hydra serve`

```
$ hydra help serve

ORY Hydra exposes two ports, a public and an administrative port. The public port is responsible
for handling requests from the public internet, such as the OAuth 2.0 Authorize and Token URLs. The administrative
port handles administrative requests like creating OAuth 2.0 Clients, managing JSON Web Keys, and managing User Login
and Consent sessions.

It is recommended to run "hydra serve all". If you need granular control over CORS settings or similar, you may
want to run "hydra serve admin" and "admin serve public" separately.

To learn more about each individual command, run:

- hydra help serve all
- hydra help serve admin
- hydra help serve public

All sub-commands share command line flags and the following environment variable names:

CORE CONTROLS
=============

- DATABASE_URL: A URL to a persistent backend. Hydra supports various backends:
  - Memory: If DATABASE_URL is "memory", data will be written to memory and is lost when you restart this instance.
  	Example: DATABASE_URL=memory

  - Postgres: If DATABASE_URL is a DSN starting with postgres:// PostgreSQL will be used as storage backend.
	Example: DATABASE_URL=postgres://user:password@host:123/database

	If PostgreSQL is not serving TLS, append ?sslmode=disable to the url:
	DATABASE_URL=postgres://user:password@host:123/database?sslmode=disable

  - MySQL: If DATABASE_URL is a DSN starting with mysql:// MySQL will be used as storage backend.
	Example: DATABASE_URL=mysql://user:password@tcp(host:123)/database?parseTime=true

	Be aware that the ?parseTime=true parameter is mandatory, or timestamps will not work.

- SYSTEM_SECRET: A secret that is at least 16 characters long. If none is provided, one will be generated. They key
	is used to encrypt sensitive data using AES-GCM (256 bit) and validate HMAC signatures.
	Example: SYSTEM_SECRET=jf89-jgklAS9gk3rkAF90dfsk

- COOKIE_SECRET: A secret that is used to encrypt cookie sessions. Defaults to SYSTEM_SECRET. It is recommended to use
	a separate secret in production.
	Example: COOKIE_SECRET=fjah8uFhgjSiuf-AS

- PORT: The port hydra should listen on.
	Defaults to PORT=4444

- HOST: The host interface hydra should listen on. Leave empty to listen on all interfaces.
	Example: HOST=localhost

- BCRYPT_COST: Set the bcrypt hashing cost. This is a trade off between
	security and performance. Range is 4 =< x =< 31.
	Defaults to BCRYPT_COST=10

- LOG_LEVEL: Set the log level, supports "panic", "fatal", "error", "warn", "info" and "debug". Defaults to "info".
	Example: LOG_LEVEL=panic

- LOG_FORMAT: Leave empty for text based log format, or set to "json" for JSON formatting.
	Example: LOG_FORMAT="json"

- DISABLE_TELEMETRY: Set to "1" to disable telemetry collection and sharing - for more information please
	visit https://ory.gitbooks.io/hydra/content/telemetry.html
	Example: DISABLE_TELEMETRY="1"

- RESOURCE_NAME_PREFIX: Allows the alternation of the "rn:hydra:" prefix in all resource names declared by ORY Hydra.
	Defaults to "rn:hydra" if empty and removes the last trailing colon.
	Example: RESOURCE_NAME_PREFIX="resources:my-domain.com"


OAUTH2 CONTROLS
===============

- OAUTH2_ERROR_URL: A dedicated endpoint that shows critical errors in a user-friendly way.
	Example: OAUTH2_ERROR_URL=https://id.myapp.com/error

- OAUTH2_CONSENT_URL: The consent provider's URL.
	Example: OAUTH2_CONSENT_URL=https://id.myapp.com/consent

- OAUTH2_LOGIN_URL: The login provider's URL.
	Example: OAUTH2_LOGIN_URL=https://id.myapp.com/login

- OAUTH2_LOGOUT_REDIRECT_URL: The URL where the user's browser will be redirected to after successfully logging out
	of ORY Hydra.
	Example: OAUTH2_LOGOUT_REDIRECT_URL=https://myapp.com/

- OAUTH2_ISSUER_URL: This is the public URL of your ORY Hydra installation. It is used for OAuth2 and OpenID Connect and must be
	specified and using HTTPS protocol, unless --dangerous-force-http is set.
	Example: OAUTH2_ISSUER_URL=https://hydra.myapp.com/

- OAUTH2_CLIENT_REGISTRATION_URL: This is the path to the OAuth 2.0 Client Registration endpoint (as defined by OpenID
	Connect Dynamic Client Registration). Leave this value empty, if that endpoint is not publicly accessible.

- AUTH_CODE_LIFESPAN: Lifespan of OAuth2 authorize codes. Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".
	Defaults to AUTH_CODE_LIFESPAN=10m

- ID_TOKEN_LIFESPAN: Lifespan of OpenID Connect ID Tokens. Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".
	Defaults to ID_TOKEN_LIFESPAN=1h

- ACCESS_TOKEN_LIFESPAN: Lifespan of OAuth2 Access Tokens. Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".
	Defaults to ACCESS_TOKEN_LIFESPAN=1h

- REFRESH_TOKEN_LIFESPAN: Lifespan of OAuth2 Refresh Tokens. Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".
	Set REFRESH_TOKEN_LIFESPAN=-1 to disable refresh token expiry (not recommended for high traffic environments).
	Defaults to REFRESH_TOKEN_LIFESPAN=720h

- LOGIN_CONSENT_REQUEST_LIFESPAN: Maximum lifespan of a login and consent request. This specifies the maximum time a user
	may take to complete the login and consent flow, before that requests times out and results in an error. Valid time
	units are "ns", "us" (or "µs"), "ms", "s", "m", "h".
	Defaults to LOGIN_CONSENT_REQUEST_LIFESPAN=15m

- SCOPE_STRATEGY: Set this to DEPRECATED_HIERARCHICAL_SCOPE_STRATEGY to enable the deprecated hierarchical scope strategy.
	This is required if you do not want to migrate to the new wildcard strategy.

- OAUTH2_SHARE_ERROR_DEBUG: Set this to true if you want to share error debugging information with your OAuth 2.0 clients.
	Keep in mind that debug information is very valuable when dealing with errors, but might also expose database error
	codes and similar errors.
	Defaults to OAUTH2_SHARE_ERROR_DEBUG=false

- OAUTH2_ACCESS_TOKEN_STRATEGY: Sets the Access Token Strategy. Defaults to "opaque" which is the recommended strategy
	for usage with ORY Hydra. If set to "jwt", then Access Tokens will be a signed JSON Web Token. The public key
	for verifying the token can be obtained from "./well-known/jwks.json". Please note that the "jwt" strategy is currently
	in BETA and not recommended for production just yet.
	Defaults to OAUTH2_ACCESS_TOKEN_STRATEGY="opaque"


OPENID CONNECT CONTROLS
===============

- OIDC_DISCOVERY_CLAIMS_SUPPORTED: A comma separated list of supported claims to be advertised at the OpenID Connect
	Discovery endpoint /.well-known/openid-configuration. Always adds "sub" to the supported claims.

- OIDC_DISCOVERY_SCOPES_SUPPORTED: A comma separated list of supported scopes to be advertised at the OpenID Connect
	Discovery endpoint /.well-known/openid-configuration. Always adds "offline", "openid" to the supported scopes.

- OIDC_DISCOVERY_USERINFO_ENDPOINT: A URL of the userinfo endpoint to be advertised at the OpenID Connect
	Discovery endpoint /.well-known/openid-configuration. Defaults to ORY Hydra's userinfo endpoint at /userinfo.
	Set this value if you want to handle this endpoint yourself.

- OIDC_DYNAMIC_CLIENT_REGISTRATION_DEFAULT_SCOPE: The OpenID Connect Dynamic Client Registration specification
	has no concept of whitelisting OAuth 2.0 Scope. If you want to expose Dynamic Client Registration, you should set the default
	scope enabled for newly registered clients. Keep in mind that users can overwrite this default by setting the
	"scope" key in the registration payload, effectively disabling the concept of whitelisted scopes.
	Example: OIDC_DYNAMIC_CLIENT_REGISTRATION_DEFAULT_SCOPE=openid,offline,scope-a,scope-b

- OIDC_SUBJECT_TYPES_SUPPORTED: Sets which identifier algorithms (comma-separated) should be supported.
	Can be "public" or "pairwise" or both. Defaults to "public". Please note that "pairwise" does not work with the
	JWT OAuth 2.0 Access Token Strategy.
	Example: OIDC_SUBJECT_TYPES_SUPPORTED=public,pairwise

- OIDC_SUBJECT_TYPE_PAIRWISE_SALT: Is the salt of the pairwise identifier algorithm and must be set if pairwise is enabled.
	The length must be longer than 8 characters.

	!! Warning !!
	This value should not be changed once set in production. Changing it will cause all client applications
	to receive new user IDs from ORY Hydra which will lead to serious complications with authentication on their side!

	Example: OIDC_SUBJECT_TYPE_PAIRWISE_SALT=5be780ef690045aebf50845d56acd72c

HTTPS CONTROLS
==============

- HTTPS_ALLOW_TERMINATION_FROM: Whitelist one or multiple CIDR address ranges and allow them to terminate TLS connections.
	Be aware that the X-Forwarded-Proto header must be set and must never be modifiable by anyone but
	your proxy / gateway / load balancer. Supports ipv4 and ipv6.
	Hydra serves http instead of https when this option is set.
	Example: HTTPS_ALLOW_TERMINATION_FROM=127.0.0.1/32,192.168.178.0/24,2620:0:2d0:200::7/32

- HTTPS_TLS_CERT_PATH: The path to the TLS certificate (pem encoded).
	Example: HTTPS_TLS_CERT_PATH=~/cert.pem

- HTTPS_TLS_KEY_PATH: The path to the TLS private key (pem encoded).
	Example: HTTPS_TLS_KEY_PATH=~/key.pem

- HTTPS_TLS_CERT: Base64 encoded (without padding) string of the TLS certificate (PEM encoded) to be used for HTTP over TLS (HTTPS).
	Example: HTTPS_TLS_CERT="-----BEGIN CERTIFICATE-----\nMIIDZTCCAk2gAwIBAgIEV5xOtDANBgkqhkiG9w0BAQ0FADA0MTIwMAYDVQQDDClP..."

- HTTPS_TLS_KEY: Base64 encoded (without padding) string of the private key (PEM encoded) to be used for HTTP over TLS (HTTPS).
	Example: HTTPS_TLS_KEY="-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDg..."


CORS CONTROLS
==============

- CORS_ENABLED: Switch CORS support on (true) or off (false). Default is off (false).

	Example: CORS_ENABLED=true

- CORS_ALLOWED_ORIGINS: A list of origins (comma separated values) a cross-domain request can be executed from.
	If the special * value is present in the list, all origins will be allowed. An origin may contain a wildcard (*)
	to replace 0 or more characters (i.e.: http://*.domain.com). Usage of wildcards implies a small performance penality.
	Only one wildcard can be used per origin. The default value is *.

	Example: CORS_ALLOWED_ORIGINS=http://*.domain.com,http://*.domain2.com

- CORS_ALLOWED_METHODS: A list of methods  (comma separated values) the client is allowed to use with cross-domain
	requests. Default value is simple methods (GET and POST).

	Example: CORS_ALLOWED_METHODS=POST,GET,PUT

- CORS_ALLOWED_CREDENTIALS: Indicates whether the request can include user credentials like cookies, HTTP authentication
	or client side SSL certificates.

	Default: CORS_ALLOWED_CREDENTIALS=false
	Example: CORS_ALLOWED_CREDENTIALS=true

- CORS_DEBUG: Debugging flag adds additional output to debug server side CORS issues.

	Default: CORS_DEBUG=false
	Example: CORS_DEBUG=true

- CORS_MAX_AGE: Indicates how long (in seconds) the results of a preflight request can be cached. The default is 0
	which stands for no max age.

	Default: CORS_MAX_AGE=0
	Example: CORS_MAX_AGE=10

- CORS_ALLOWED_HEADERS: A list of non simple headers (comma separated values) the client is allowed to use with
	cross-domain requests.

- CORS_EXPOSED_HEADERS: Indicates which headers (comma separated values) are safe to expose to the API of a
	CORS API specification.

DEBUG CONTROLS
==============

- TRACING_PROVIDER: Set this to the tracing backend you wish to use.

	Supported tracing backends: [jaeger]

	Example: TRACING_PROVIDER=jaeger

- TRACING_PROVIDER_JAEGER_SAMPLING_SERVER_URL: The address of jaeger-agent's HTTP sampling server

	Example: TRACING_PROVIDER_JAEGER_SAMPLING_SERVER_URL=http://localhost:5778/sampling

- TRACING_PROVIDER_JAEGER_SAMPLING_TYPE: The type of the sampler you want to use

	Supported values: [const, probabilistic, ratelimiting]

	Default: const

	Example: TRACING_PROVIDER_JAEGER_SAMPLING_TYPE=const

- TRACING_PROVIDER_JAEGER_SAMPLING_VALUE: The value passed to the sampler type that has been configured.

	Supported values: This is dependant on the sampling strategy used:
		- const: 0 or 1 (all or nothing)
		- rateLimiting: a constant rate (e.g. setting this to 3 will sample requests with the rate of 3 traces per second)
		- probabilistic: a value between 0..1

	Example: TRACING_PROVIDER_JAEGER_SAMPLING_VALUE=1

- TRACING_PROVIDER_JAEGER_LOCAL_AGENT_ADDRESS: The address of the jaeger-agent where spans should be sent to

	Example: TRACING_PROVIDER_JAEGER_LOCAL_AGENT_ADDRESS=127.0.0.1:6831

- TRACING_SERVICE_NAME: Specifies the service name to use on the tracer.

	Default: ORY Hydra

	Example: TRACING_SERVICE_NAME="ORY Hydra"


- PROFILING: Set "PROFILING=cpu" to enable cpu profiling and "PROFILING=memory" to enable memory profiling.
	It is not possible to do both at the same time. DProfiling is disabled per default.

	Example: PROFILING=cpu

Usage:
  hydra serve [command]

Available Commands:
  admin       Serves Administrative HTTP/2 APIs
  all         Serves both public and administrative HTTP/2 APIs
  public      Serves Public HTTP/2 APIs

Flags:
      --dangerous-force-http   Disable HTTP/2 over TLS (HTTPS) and serve HTTP instead. Never use this in production.
      --disable-telemetry      Disable anonymized telemetry reports - for more information please visit https://www.ory.sh/docs/guides/telemetry
  -h, --help                   help for serve

Global Flags:
      --skip-tls-verify   Foolishly accept TLS certificates signed by unkown certificate authorities

Use "hydra serve [command] --help" for more information about a command.
```
