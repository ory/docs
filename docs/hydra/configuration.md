---
id: configuration
title: Configuration
---

```yaml
# ORY Hydra Configuration
#
#
# !!WARNING!!
# This configuration file is for documentation purposes only. Do not use it in production. As all configuration items
# are enabled, it will not work out of the box either.
#
#
# ORY Hydra can be configured using a configuration file and passing the file location using `--config path/to/config.yaml`.
# Per default, ORY Hydra will look up and load file ~/.hydra.yaml. All configuration keys can be set using environment
# variables as well.
#
# Setting environment variables is easy:
#
## Linux / OSX
#
# $ export MY_ENV_VAR=foo
# $ hydra ...
#
# alternatively:
#
# $ MY_ENV_VAR=foo hydra ...
#
## Windows
#
### Command Prompt
#
# > set MY_ENV_VAR=foo
# > hydra ...
#
### Powershell
#
# > $env:MY_ENV_VAR="foo"
# > hydra ...
#
## Docker
#
# $ docker run -e MY_ENV_VAR=foo oryd/hydra:...
#
#
# Assuming the following configuration layout:
#
# serve:
#   public:
#     port: 4444
#     something_else: foobar
#
# Key `something_else` can be set as an environment variable by uppercasing it's path:
#   `serve.public.port.somethihng_else` -> `SERVE.PUBLIC.PORT.SOMETHING_ELSE`
# and replacing `.` with `_`:
#   `serve.public.port.somethihng_else` -> `SERVE_PUBLIC_PORT_SOMETHING_ELSE`
#
# Environment variables always override values from the configuration file. Here are some more examples:
#
# Configuration key | Environment variable |
# ------------------|----------------------|
# dsn               | DSN                  |
# serve.admin.host  | SERVE_ADMIN_HOST     |
# ------------------|----------------------|
#
#
# List items such as
#
# secrets:
#   system:
#     - this-is-the-primary-secret
#     - this-is-an-old-secret
#     - this-is-another-old-secret
#
# must be separated using `,` when using environment variables. The environment variable equivalent to the code section#
# above is:
#
# Linux/macOS: $ export SECRETS_SYSTEM=this-is-the-primary-secret,this-is-an-old-secret,this-is-another-old-secret
# Windows: > set SECRETS_SYSTEM=this-is-the-primary-secret,this-is-an-old-secret,this-is-another-old-secret

# log configures the logger
log:
  # Sets the log level, supports "panic", "fatal", "error", "warn", "info" and "debug". Defaults to "info".
  level: info
  # Sets the log format. Leave it undefined for text based log format, or set to "json" for JSON formatting.
  format: json

# serve controls the configuration for the http(s) daemon(s).
serve:
  # public controls the public daemon serving public API endpoints like /oauth2/auth, /oauth2/token, /.well-known/jwks.json
  public:
    # The port to listen on. Defaults to 4444
    port: 4444
    # The interface or unix socket ORY Hydra should listen and handle public API requests on.
    # Use the prefix "unix:" to specify a path to a unix socket.
    # Leave empty to listen on all interfaces.
    host: localhost # leave this out or empty to listen on all devices which is the default
    # host: unix:/path/to/socket

    # cors configures Cross Origin Resource Sharing for public endpoints.
    cors:
      # set enabled to true to enable CORS. Defaults to false.
      enabled: true
      # allowed_origins is a list of origins (comma separated values) a cross-domain request can be executed from.
      # If the special * value is present in the list, all origins will be allowed. An origin may contain a wildcard (*)
      # to replace 0 or more characters (i.e.: http://*.domain.com). Only one wildcard can be used per origin.
      #
      # If empty or undefined, this defaults to `*`, allowing CORS from every domain (if cors.enabled: true).
      allowed_origins:
        - https://example.com
        - https://*.example.com
      # allowed_methods is list of HTTP methods the user agent is allowed to use with cross-domain
      # requests. Defaults to the methods listed.
      allowed_methods:
        - POST
        - GET
        - PUT
        - PATCH
        - DELETE

      # A list of non simple headers the client is allowed to use with cross-domain requests. Defaults to the listed values.
      allowed_headers:
        - Authorization
        - Content-Type

      # Sets which headers (comma separated values) are safe to expose to the API of a CORS API specification. Defaults to the listed values.
      exposed_headers:
        - Content-Type

      # Sets whether the request can include user credentials like cookies, HTTP authentication
      # or client side SSL certificates. Defaults to true.
      allow_credentials: true

      # Sets how long (in seconds) the results of a preflight request can be cached. If set to 0, every request
      # is preceded by a preflight request. Defaults to 0.
      max_age: 10

      # If set to true, adds additional log output to debug server side CORS issues. Defaults to false.
      debug: true

    # Access Log configuration for public server.
    access_log:
      # Disable access log for health endpoints.
      disable_for_health: false

  # admin controls the admin daemon serving admin API endpoints like /jwk, /client, ...
  admin:
    # The port to listen on. Defaults to 4445
    port: 4444
    # The interface or unix socket ORY Hydra should listen and handle administrative API requests on.
    # Use the prefix "unix:" to specify a path to a unix socket.
    # Leave empty to listen on all interfaces.
    host: localhost # leave this out or empty to listen on all devices which is the default
    # host: unix:/path/to/socket

    # cors configures Cross Origin Resource Sharing for admin endpoints.
    cors:
      # set enabled to true to enable CORS. Defaults to false.
      enabled: true
      # allowed_origins is a list of origins (comma separated values) a cross-domain request can be executed from.
      # If the special * value is present in the list, all origins will be allowed. An origin may contain a wildcard (*)
      # to replace 0 or more characters (i.e.: http://*.domain.com). Only one wildcard can be used per origin.
      #
      # If empty or undefined, this defaults to `*`, allowing CORS from every domain (if cors.enabled: true).
      allowed_origins:
        - https://example.com
        - https://*.example.com
      # allowed_methods is list of HTTP methods the user agent is allowed to use with cross-domain
      # requests. Defaults to GET and POST.
      allowed_methods:
        - POST
        - GET
        - PUT
        - PATCH
        - DELETE

      # A list of non simple headers the client is allowed to use with cross-domain requests. Defaults to the listed values.
      allowed_headers:
        - Authorization
        - Content-Type

      # Sets which headers (comma separated values) are safe to expose to the API of a CORS API specification. Defaults to the listed values.
      exposed_headers:
        - Content-Type

      # Sets whether the request can include user credentials like cookies, HTTP authentication
      # or client side SSL certificates.
      allow_credentials: true

      # Sets how long (in seconds) the results of a preflight request can be cached. If set to 0, every request
      # is preceded by a preflight request. Defaults to 0.
      max_age: 10

      # If set to true, adds additional log output to debug server side CORS issues. Defaults to false.
      debug: true

    # Access Log configuration for admin server.
    access_log:
      # Disable access log for health endpoints.
      disable_for_health: false

  # tls configures HTTPS (HTTP over TLS). If configured, the server automatically supports HTTP/2.
  tls:
    # key configures the private key (pem encoded)
    key:
      # The key can either be loaded from a file:
      path: /path/to/key.pem
      # Or from a base64 encoded (without padding) string:
      base64: LS0tLS1CRUdJTiBFTkNSWVBURUQgUFJJVkFURSBLRVktLS0tLVxuTUlJRkRqQkFCZ2txaGtpRzl3MEJCUTB3...

    # cert configures the TLS certificate (PEM encoded)
    cert:
      # The cert can either be loaded from a file:
      path: /path/to/cert.pem
      # Or from a base64 encoded (without padding) string:
      base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...

    # Whitelist one or multiple CIDR address ranges and allow them to terminate TLS connections.
    # Be aware that the X-Forwarded-Proto header must be set and must never be modifiable by anyone but
    # your proxy / gateway / load balancer. Supports ipv4 and ipv6.
    #
    # Hydra serves http instead of https when this option is set.
    #
    # For more information head over to: https://www.ory.sh/docs/hydra/production#tls-termination
    allow_termination_from:
      - 127.0.0.1/32

# dsn sets the data source name. This configures the backend where ORY Hydra persists data.
#
## In-memory database
#
# If dsn is "memory", data will be written to memory and is lost when you restart this instance.
# You can set this value using the DSN environment variable:
#
## SQL databases
#
# ORY Hydra supports popular SQL databases. For more detailed configuration information go to:
# https://www.ory.sh/docs/hydra/dependencies-environment#sql
#
### PostgreSQL (recommended)
#
# If dsn is starting with postgres:// PostgreSQL will be used as storage backend:
# dsn: dsn=postgres://user:password@host:123/database
#
### MySQL database
#
# If dsn is starting with mysql:// MySQL will be used as storage backend:
# dsn: mysql://user:password@tcp(host:123)/database
#
### CockroachDB
#
# If dsn is starting with cockroach:// CockroachDB will be used as storage backend:
# dsn: dsn=cockroach://user:password@host:123/database
#
dsn: memory
# dsn: dsn=postgres://user:password@host:123/database
# dsn: mysql://user:password@tcp(host:123)/database

# webfinger configures ./well-known/ settings
webfinger:
  # jwks configures the /.well-known/jwks.json endpoint.
  jwks:
    # broadcast_keys is a list of JSON Web Keys that should be exposed at that endpoint. This is usually
    # the public key for verifying OpenID Connect ID Tokens. However, you might want to add additional keys here as well.
    broadcast_keys:
      - hydra.openid.id-token # This key is always exposed by default
      # - hydra.jwt.access-token # This key will be exposed when the OAuth2 Access Token strategy is set to JWT.

  # oidc_discovery configures OpenID Connect Discovery (/.well-known/openid-configuration)
  oidc_discovery:
    client_registration_url: https://my-service.com/clients
    # A list of supported claims to be broadcasted. Claim `sub` is always included:
    supported_claims:
      - email
      - username
    # The scope OAuth 2.0 Clients may request. Scope `offline`, `offline_access`, and `openid` are always included.
    supported_scope:
      - email
      - whatever
      - read.photos

    # A URL of the userinfo endpoint to be advertised at the OpenID Connect
    # Discovery endpoint /.well-known/openid-configuration. Defaults to ORY Hydra's userinfo endpoint at /userinfo.
    # Set this value if you want to handle this endpoint yourself.
    userinfo_url: https://example.org/my-custom-userinfo-endpoint

# oidc configures OpenID Connect features.
oidc:
  # subject_identifiers configures the Subject Identifier algorithm.
  #
  # For more information please head over to the documentation:
  # -> https://www.ory.sh/docs/hydra/advanced#subject-identifier-algorithms
  subject_identifiers:
    # which algorithms to enable. Defaults to "public"
    enabled:
      - pairwise
      - public
    # configures the pairwise algorithm
    pairwise:
      # if "pairwise" is enabled, the salt must be defined.
      salt: some-random-salt

  # dynamic_client_registration configures OpenID Connect Dynamic Client Registration (exposed as admin endpoints /clients/...)
  dynamic_client_registration:
    # The OpenID Connect Dynamic Client Registration specification has no concept of whitelisting OAuth 2.0 Scope. If you
    # want to expose Dynamic Client Registration, you should set the default scope enabled for newly registered clients.
    # Keep in mind that users can overwrite this default by setting the "scope" key in the registration payload,
    # effectively disabling the concept of whitelisted scopes.
    default_scope:
      - openid
      - offline
      - offline_access

urls:
  self:
    # This value will be used as the "issuer" in access and ID tokens. It must be
    # specified and using HTTPS protocol, unless --dangerous-force-http is set. This should typically be equal
    # to the public value.
    issuer: https://localhost:4444/

    # This is the base location of the public endpoints of your ORY Hydra installation. This should typically be equal
    # to the issuer value. If left unspecified, it falls back to the issuer value.
    public: https://localhost:4444/

  # Sets the login endpoint of the User Login & Consent flow. Defaults to an internal fallback URL.
  login: https://my-login.app/login
  # Sets the consent endpoint of the User Login & Consent flow. Defaults to an internal fallback URL.
  consent: https://my-consent.app/consent
  # Sets the logout endpoint. Defaults to an internal fallback URL.
  logout: https://my-logout.app/logout
  # Sets the error endpoint. The error ui will be shown when an OAuth2 error occurs that which can not be sent back
  # to the client. Defaults to an internal fallback URL.
  error: https://my-error.app/error
  # When a user agent requests to logout, it will be redirected to this url afterwards per default.
  post_logout_redirect: https://my-example.app/logout-successful

strategies:
  scope: DEPRECATED_HIERARCHICAL_SCOPE_STRATEGY
  # You may use JSON Web Tokens as access tokens.
  #
  # But seriously. Don't do that. It's not a great idea and has a ton of caveats and subtle security implications. Read more:
  # -> https://www.ory.sh/docs/hydra/advanced#json-web-tokens
  #
  #  access_token: jwt

# configures time to live
ttl:
  # configures how long a user login and consent flow may take. Defaults to 1h.
  login_consent_request: 1h
  # configures how long access tokens are valid. Defaults to 1h.
  access_token: 1h
  # configures how long refresh tokens are valid. Defaults to 720h. Set to -1 for refresh tokens to never expire.
  refresh_token: 720h
  # configures how long id tokens are valid. Defaults to 1h.
  id_token: 1h
  # configures how long auth codes are valid. Defaults to 10m.
  auth_code: 10m

oauth2:
  # Set this to true if you want to share error debugging information with your OAuth 2.0 clients.
  #	Keep in mind that debug information is very valuable when dealing with errors, but might also expose database error
  #	codes and similar errors. Defaults to false.
  expose_internal_errors: true
  # Configures hashing algorithms. Supports only BCrypt at the moment.
  hashers:
    # Configures the BCrypt hashing algorithm used for hashing Client Secrets.
    bcrypt:
      # Sets the BCrypt cost. Minimum value is 4 and default value is 10. The higher the value, the more CPU time is being
      # used to generate hashes.
      cost: 10

# The secrets section configures secrets used for encryption and signing of several systems. All secrets can be rotated,
# for more information on this topic navigate to:
# -> https://www.ory.sh/docs/hydra/advanced#rotation-of-hmac-token-signing-and-database-and-cookie-encryption-keys
secrets:
  # The system secret must be at least 16 characters long. If none is provided, one will be generated. They key
  #	is used to encrypt sensitive data using AES-GCM (256 bit) and validate HMAC signatures.
  #
  # The first item in the list is used for signing and encryption. The whole list is used for verifying signatures
  # and decryption.
  system:
    - this-is-the-primary-secret
    - this-is-an-old-secret
    - this-is-another-old-secret
  # A secret that is used to encrypt cookie sessions. Defaults to secrets.system. It is recommended to use
  #	a separate secret in production.
  #
  # The first item in the list is used for signing and encryption. The whole list is used for verifying signatures
  # and decryption.
  cookie:
    - this-is-the-primary-secret
    - this-is-an-old-secret
    - this-is-another-old-secret

# Enables profiling if set. Use "cpu" to enable cpu profiling and "mem" to enable memory profiling. For more details
# on profiling, head over to: https://blog.golang.org/profiling-go-programs
profiling: cpu
# profiling: mem

# ORY Hydra supports distributed tracing.
tracing:
  # Set this to the tracing backend you wish to use. Currently supports jaeger. If omitted or empty, tracing will
  # be disabled.
  provider: jaeger
  # Specifies the service name to use on the tracer.
  service_name: ORY Hydra
  providers:
    # Configures the jaeger tracing backend.
    jaeger:
      # The address of the jaeger-agent where spans should be sent to
      local_agent_address: 127.0.0.1:6831
      # The tracing header format
      propagation: jaeger
      sampling:
        # The type of the sampler you want to use. Supports:
        # - const
        # - probabilistic
        # - ratelimiting
        type: const
        # The value passed to the sampler type that has been configured.
        # Supported values: This is dependant on the sampling strategy used:
        # - const: 0 or 1 (all or nothing)
        # - rateLimiting: a constant rate (e.g. setting this to 3 will sample requests with the rate of 3 traces per second)
        # - probabilistic: a value between 0..1
        value: 1.0
        # The address of jaeger-agent's HTTP sampling server
        server_url: http://localhost:5778/sampling
```
