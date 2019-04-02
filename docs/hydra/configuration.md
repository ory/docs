---
id: configuration
title: Configuration
---

```yaml
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

  # Sets the login ui endpoint of the User Login & Consent flow. Defaults to an internal fallback URL.
  login: https://my-login.app/login
  # Sets the consent ui endpoint of the User Login & Consent flow. Defaults to an internal fallback URL.
  consent: https://my-consent.app/consent
  # Sets the error ui endpoint. The error ui will be shown when an OAuth2 error occurs that which can not be sent back
  # to the client. Defaults to an internal fallback URL.
  error: https://my-error.app/error
  # When a user agent requests to remove the authentication session, it will be redirected to this url afterwards.
  post_logout_redirect: https://my-example.app/logout-successful

strategies:
  scope: DEPRECATED_HIERARCHICAL_SCOPE_STRATEGY
  # You may use JSON Web Tokens as access tokens.
  #
  # But seriously. Don't do that. It's not a great idea and has a ton of caveats and subtle security implications. Read more:
  # -> https://www.ory.sh/docs/hydra/advanced#json-web-tokens
  #
  #  access_token: jwt

oauth2:
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
    # configures how long id tokens are valid. Defaults to 10m.
    auth_code: 10m

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
# -> https://www.ory.sh/docs/hydra/advanced#system-secret-rotation
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
