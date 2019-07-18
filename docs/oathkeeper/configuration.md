---
id: configuration
title: Configuration
---

<!-- THIS FILE IS BEING AUTO-GENERATED. DO NOT MODIFY IT AS ALL CHANGES WILL BE OVERWRITTEN.
OPEN AN ISSUE IF YOU WOULD LIKE TO MAKE ADJUSTMENTS HERE AND MAINTAINERS WILL HELP YOU LOCATE THE RIGHT
FILE -->

If file `$HOME/.oathkeeper.yaml` exists, it will be used as a configuration file
which supports all configuration settings listed below.

You can load the config file from another source using the
`-c path/to/config.yaml` or `--config path/to/config.yaml` flag:
`oathkeeper --config path/to/config.yaml`.

Config files can be formatted as JSON, YAML and TOML. Some configuration values
support reloading without server restart. All configuration values can be set
using environment variables, as documented below.

```yaml
## ORY Oathkeeper Configuration
#

## HTTP(s) ##
#
serve:
  ## HTTP REST API ##
  #
  api:
    ## Port ##
    #
    # The port to listen on.
    #
    # Default value: 4456
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SERVE_API_PORT=<value>
    # - Windows Command Line (CMD):
    #    > set SERVE_API_PORT=<value>
    #
    port: 4456

    ## Host ##
    #
    # The network interface to listen on.
    #
    # Examples:
    # - localhost
    # - 127.0.0.1
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SERVE_API_HOST=<value>
    # - Windows Command Line (CMD):
    #    > set SERVE_API_HOST=<value>
    #
    host: ''

    ## Cross Origin Resource Sharing (CORS) ##
    #
    # Configure [Cross Origin Resource Sharing (CORS)](http://www.w3.org/TR/cors/) using the following options.
    #
    cors:
      ## Enable CORS ##
      #
      # If set to true, CORS will be enabled and preflight-requests (OPTION) will be answered.
      #
      # Default value: false
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_CORS_ENABLED=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_CORS_ENABLED=<value>
      #
      enabled: false

      ## Allowed Origins ##
      #
      # A list of origins a cross-domain request can be executed from. If the special * value is present in the list, all origins will be allowed. An origin may contain a wildcard (*) to replace 0 or more characters (i.e.: http://*.domain.com). Usage of wildcards implies a small performance penality. Only one wildcard can be used per origin.
      #
      # Default value: *
      #
      # Examples:
      # - https://example.com
      # - https://*.example.com
      # - https://*.foo.example.com
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_CORS_ALLOWED_ORIGINS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_CORS_ALLOWED_ORIGINS=<value>
      #
      allowed_origins: https://example.com

      ## Allowed HTTP Methods ##
      #
      # A list of methods the client is allowed to use with cross-domain requests.
      #
      # Default value: GET,POST,PUT,PATCH,DELETE
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_CORS_ALLOWED_METHODS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_CORS_ALLOWED_METHODS=<value>
      #
      allowed_methods:
        - GET
        - POST
        - PUT
        - PATCH
        - DELETE

      ## Allowed Request HTTP Headers ##
      #
      # A list of non simple headers the client is allowed to use with cross-domain requests.
      #
      # Default value: Authorization,Content-Type
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_CORS_ALLOWED_HEADERS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_CORS_ALLOWED_HEADERS=<value>
      #
      allowed_headers:
        - Authorization
        - Content-Type

      ## Allowed Response HTTP Headers ##
      #
      # Indicates which headers are safe to expose to the API of a CORS API specification
      #
      # Default value: Content-Type
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_CORS_EXPOSED_HEADERS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_CORS_EXPOSED_HEADERS=<value>
      #
      exposed_headers:
        - Content-Type

      ## Allow HTTP Credentials ##
      #
      # Indicates whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates.
      #
      # Default value: false
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_CORS_ALLOW_CREDENTIALS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_CORS_ALLOW_CREDENTIALS=<value>
      #
      allow_credentials: false

      ## Maximum Age ##
      #
      # Indicates how long (in seconds) the results of a preflight request can be cached. The default is 0 which stands for no max age.
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_CORS_MAX_AGE=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_CORS_MAX_AGE=<value>
      #
      max_age: 0

      ## Enable Debugging ##
      #
      # Set to true to debug server side CORS issues.
      #
      # Default value: false
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_CORS_DEBUG=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_CORS_DEBUG=<value>
      #
      debug: false

    ## HTTPS ##
    #
    # Configure HTTP over TLS (HTTPS). All options can also be set using environment variables by replacing dots (`.`) with underscores (`_`) and uppercasing the key. For example, `some.prefix.tls.key.path` becomes `export SOME_PREFIX_TLS_KEY_PATH`. If all keys are left undefined, TLS will be disabled.
    #
    tls:
      ## Private Key (PEM) ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_TLS_KEY=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_TLS_KEY=<value>
      #
      key: {}

      ## TLS Certificate (PEM) ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_API_TLS_CERT=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_API_TLS_CERT=<value>
      #
      cert: {}

  ## HTTP Reverse Proxy ##
  #
  proxy:
    ## Port ##
    #
    # The port to listen on.
    #
    # Default value: 4455
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SERVE_PROXY_PORT=<value>
    # - Windows Command Line (CMD):
    #    > set SERVE_PROXY_PORT=<value>
    #
    port: 4455

    ## Host ##
    #
    # The network interface to listen on. Leave empty to listen on all interfaces.
    #
    # Examples:
    # - localhost
    # - 127.0.0.1
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SERVE_PROXY_HOST=<value>
    # - Windows Command Line (CMD):
    #    > set SERVE_PROXY_HOST=<value>
    #
    host: ''

    ## HTTP Timeouts ##
    #
    # Control the reverse proxy's HTTP timeouts.
    #
    timeout:
      ## HTTP Read Timeout ##
      #
      # The maximum duration for reading the entire request, including the body.
      #
      # Default value: 5s
      #
      # Examples:
      # - 5s
      # - 5m
      # - 5h
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_TIMEOUT_READ=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_TIMEOUT_READ=<value>
      #
      read: 5h

      ## HTTP Write Timeout ##
      #
      # The maximum duration before timing out writes of the response. Increase this parameter to prevent unexpected closing a client connection if an upstream request is responding slowly.
      #
      # Default value: 120s
      #
      # Examples:
      # - 5s
      # - 5m
      # - 5h
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_TIMEOUT_WRITE=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_TIMEOUT_WRITE=<value>
      #
      write: 5h

      ## HTTP Idle Timeout ##
      #
      #  The maximum amount of time to wait for any action of a request session, reading data or writing the response.
      #
      # Default value: 120s
      #
      # Examples:
      # - 5s
      # - 5m
      # - 5h
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_TIMEOUT_IDLE=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_TIMEOUT_IDLE=<value>
      #
      idle: 5h

    ## Cross Origin Resource Sharing (CORS) ##
    #
    # Configure [Cross Origin Resource Sharing (CORS)](http://www.w3.org/TR/cors/) using the following options.
    #
    cors:
      ## Enable CORS ##
      #
      # If set to true, CORS will be enabled and preflight-requests (OPTION) will be answered.
      #
      # Default value: false
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_CORS_ENABLED=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_CORS_ENABLED=<value>
      #
      enabled: false

      ## Allowed Origins ##
      #
      # A list of origins a cross-domain request can be executed from. If the special * value is present in the list, all origins will be allowed. An origin may contain a wildcard (*) to replace 0 or more characters (i.e.: http://*.domain.com). Usage of wildcards implies a small performance penality. Only one wildcard can be used per origin.
      #
      # Default value: *
      #
      # Examples:
      # - https://example.com
      # - https://*.example.com
      # - https://*.foo.example.com
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_CORS_ALLOWED_ORIGINS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_CORS_ALLOWED_ORIGINS=<value>
      #
      allowed_origins: https://*.foo.example.com

      ## Allowed HTTP Methods ##
      #
      # A list of methods the client is allowed to use with cross-domain requests.
      #
      # Default value: GET,POST,PUT,PATCH,DELETE
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_CORS_ALLOWED_METHODS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_CORS_ALLOWED_METHODS=<value>
      #
      allowed_methods:
        - GET
        - POST
        - PUT
        - PATCH
        - DELETE

      ## Allowed Request HTTP Headers ##
      #
      # A list of non simple headers the client is allowed to use with cross-domain requests.
      #
      # Default value: Authorization,Content-Type
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_CORS_ALLOWED_HEADERS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_CORS_ALLOWED_HEADERS=<value>
      #
      allowed_headers:
        - Authorization
        - Content-Type

      ## Allowed Response HTTP Headers ##
      #
      # Indicates which headers are safe to expose to the API of a CORS API specification
      #
      # Default value: Content-Type
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_CORS_EXPOSED_HEADERS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_CORS_EXPOSED_HEADERS=<value>
      #
      exposed_headers:
        - Content-Type

      ## Allow HTTP Credentials ##
      #
      # Indicates whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates.
      #
      # Default value: false
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_CORS_ALLOW_CREDENTIALS=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_CORS_ALLOW_CREDENTIALS=<value>
      #
      allow_credentials: false

      ## Maximum Age ##
      #
      # Indicates how long (in seconds) the results of a preflight request can be cached. The default is 0 which stands for no max age.
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_CORS_MAX_AGE=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_CORS_MAX_AGE=<value>
      #
      max_age: 0

      ## Enable Debugging ##
      #
      # Set to true to debug server side CORS issues.
      #
      # Default value: false
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_CORS_DEBUG=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_CORS_DEBUG=<value>
      #
      debug: false

    ## HTTPS ##
    #
    # Configure HTTP over TLS (HTTPS). All options can also be set using environment variables by replacing dots (`.`) with underscores (`_`) and uppercasing the key. For example, `some.prefix.tls.key.path` becomes `export SOME_PREFIX_TLS_KEY_PATH`. If all keys are left undefined, TLS will be disabled.
    #
    tls:
      ## Private Key (PEM) ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_TLS_KEY=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_TLS_KEY=<value>
      #
      key: {}

      ## TLS Certificate (PEM) ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SERVE_PROXY_TLS_CERT=<value>
      # - Windows Command Line (CMD):
      #    > set SERVE_PROXY_TLS_CERT=<value>
      #
      cert: {}

## Access Rules ##
#
# Configure access rules. All sub-keys support configuration reloading without restarting.
#
access_rules:
  ## Repositories ##
  #
  # Locations (list of URLs) where access rules should be fetched from on boot. It is expected that the documents at those locations return a JSON or YAML Array containing ORY Oathkeeper Access Rules:
  #
  # - If the URL Scheme is `file://`, the access rules (an array of access rules is expected) will be fetched from the local file system.
  # - If the URL Scheme is `inline://`, the access rules (an array of access rules is expected) are expected to be a base64 encoded (with padding!) JSON/YAML string (base64_encode(`[{"id":"foo-rule","authenticators":[....]}]`)).
  # - If the URL Scheme is `http://` or `https://`, the access rules (an array of access rules is expected) will be fetched from the provided HTTP(s) location.
  #
  # Examples:
  # - '["file://path/to/rules.json","inline://W3siaWQiOiJmb28tcnVsZSIsImF1dGhlbnRpY2F0b3JzIjpbXX1d","https://path-to-my-rules/rules.json"]'
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export ACCESS_RULES_REPOSITORIES=<value>
  # - Windows Command Line (CMD):
  #    > set ACCESS_RULES_REPOSITORIES=<value>
  #
  repositories: '["file://path/to/rules.json","inline://W3siaWQiOiJmb28tcnVsZSIsImF1dGhlbnRpY2F0b3JzIjpbXX1d","https://path-to-my-rules/rules.json"]'

## Authenticators ##
#
# For more information on authenticators head over to: https://www.ory.sh/docs/oathkeeper/pipeline/authn
#
authenticators:
  ## Anonymous ##
  #
  # The [`anonymous` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#anonymous).
  #
  anonymous:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_ANONYMOUS_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_ANONYMOUS_ENABLED=<value>
    #
    enabled: true

    ## Anonymous Subject ##
    #
    # Sets the anonymous username.
    #
    # Default value: anonymous
    #
    # Examples:
    # - guest
    # - anon
    # - anonymous
    # - unknown
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_ANONYMOUS_SUBJECT=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_ANONYMOUS_SUBJECT=<value>
    #
    subject: anonymous

  ## No Operation (noop) ##
  #
  # The [`noop` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#noop).
  #
  noop:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_NOOP_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_NOOP_ENABLED=<value>
    #
    enabled: false

  ## Unauthorized ##
  #
  # The [`unauthorized` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#unauthorized).
  #
  unauthorized:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_UNAUTHORIZED_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_UNAUTHORIZED_ENABLED=<value>
    #
    enabled: true

  ## Cookie Session ##
  #
  # The [`cookie_session` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#cookie_session).
  #
  cookie_session:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_COOKIE_SESSION_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_COOKIE_SESSION_ENABLED=<value>
    #
    enabled: true

    ## Session Check URL ##
    #
    # The origin to proxy requests to. If the response is a 200 with body `{ "subject": "...", "extra": {} }`. The request will pass the subject through successfully, otherwise it will be marked as unauthorized.
    #
    # >If this authenticator is enabled, this value is required.
    #
    # Examples:
    # - https://session-store-host
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_COOKIE_SESSION_CHECK_SESSION_URL=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_COOKIE_SESSION_CHECK_SESSION_URL=<value>
    #
    check_session_url: https://session-store-host

    ## Only Cookies ##
    #
    # A list of possible cookies to look for on incoming requests, and will fallthrough to the next authenticator if none of the passed cookies are set on the request.
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_COOKIE_SESSION_ONLY=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_COOKIE_SESSION_ONLY=<value>
    #
    only:
      - minim ex sit fugiat laborum
      - mollit cupidatat laborum

  ## JSON Web Token (jwt) ##
  #
  # The [`jwt` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#jwt).
  #
  jwt:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_JWT_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_JWT_ENABLED=<value>
    #
    enabled: true

    ## JSON Web Key URLs ##
    #
    # URLs where ORY Oathkeeper can retrieve JSON Web Keys from for validating the JSON Web Token. Usually something like "https://my-keys.com/.well-known/jwks.json". The response of that endpoint must return a JSON Web Key Set (JWKS).
    #
    # >If this authenticator is enabled, this value is required.
    #
    # Examples:
    # - https://my-website.com/.well-known/jwks.json
    # - https://my-other-website.com/.well-known/jwks.json
    # - file://path/to/local/jwks.json
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_JWT_JWKS_URLS=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_JWT_JWKS_URLS=<value>
    #
    jwks_urls: https://my-website.com/.well-known/jwks.json

    ## Scope Strategy ##
    #
    # Sets the strategy validation algorithm.
    #
    # Default value: none
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_JWT_SCOPE_STRATEGY=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_JWT_SCOPE_STRATEGY=<value>
    #
    scope_strategy: none

  ## OAuth 2.0 Client Credentials ##
  #
  # The [`oauth2_client_credentials` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#oauth2_client_credentials).
  #
  oauth2_client_credentials:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_ENABLED=<value>
    #
    enabled: true

    ## token_url ##
    #
    # The OAuth 2.0 Token Endpoint that will be used to validate the client credentials.
    #
    # >If this authenticator is enabled, this value is required.
    #
    # Examples:
    # - https://my-website.com/oauth2/token
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_TOKEN_URL=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_TOKEN_URL=<value>
    #
    token_url: https://my-website.com/oauth2/token

  ## OAuth 2.0 Token Introspection ##
  #
  # The [`oauth2_introspection` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#oauth2_introspection).
  #
  oauth2_introspection:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_ENABLED=<value>
    #
    enabled: true

    ## OAuth 2.0 Introspection URL ##
    #
    # The OAuth 2.0 Token Introspection endpoint URL.
    #
    # >If this authenticator is enabled, this value is required.
    #
    # Examples:
    # - https://my-website.com/oauth2/introspection
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_INTROSPECTION_URL=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_INTROSPECTION_URL=<value>
    #
    introspection_url: https://my-website.com/oauth2/introspection

    ## Scope Strategy ##
    #
    # Sets the strategy validation algorithm.
    #
    # Default value: none
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_SCOPE_STRATEGY=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_SCOPE_STRATEGY=<value>
    #
    scope_strategy: none

    ## Pre-Authorization ##
    #
    # Enable pre-authorization in cases where the OAuth 2.0 Token Introspection endpoint is protected by OAuth 2.0 Bearer Tokens that can be retrieved using the OAuth 2.0 Client Credentials grant.
    #
    pre_authorization:
      ## Enabled ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_ENABLED=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_ENABLED=<value>
      #
      enabled: false

      ## OAuth 2.0 Client ID ##
      #
      # The OAuth 2.0 Client ID to be used for the OAuth 2.0 Client Credentials Grant.
      #
      # >If pre-authorization is enabled, this value is required.
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_CLIENT_ID=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_CLIENT_ID=<value>
      #
      client_id: labore commodo laboris

      ## OAuth 2.0 Client Secret ##
      #
      # The OAuth 2.0 Client Secret to be used for the OAuth 2.0 Client Credentials Grant.
      #
      # >If pre-authorization is enabled, this value is required.
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_CLIENT_SECRET=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_CLIENT_SECRET=<value>
      #
      client_secret: sit consectetur

      ## OAuth 2.0 Token URL ##
      #
      # The OAuth 2.0 Token Endpoint where the OAuth 2.0 Client Credentials Grant will be performed.
      #
      # >If pre-authorization is enabled, this value is required.
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_TOKEN_URL=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_TOKEN_URL=<value>
      #
      token_url: http://HqCbZNZGP.gmVWDsl4ISwqdf,X6MDJczvLXGPgCW-54Z66rLBCLwnHeLcOKgeko0XrB4v

      ## OAuth 2.0 Scope ##
      #
      # The OAuth 2.0 Scope to be requested during the OAuth 2.0 Client Credentials Grant.
      #
      # Examples:
      # - - '["foo", "bar"]'
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_SCOPE=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_PRE_AUTHORIZATION_SCOPE=<value>
      #
      scope:
        - '["foo", "bar"]'

## Authorizers ##
#
# For more information on authorizers head over to: https://www.ory.sh/docs/oathkeeper/pipeline/authz
#
authorizers:
  ## Allow ##
  #
  # The [`allow` authorizer](https://www.ory.sh/docs/oathkeeper/pipeline/authz#allow).
  #
  allow:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHORIZERS_ALLOW_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHORIZERS_ALLOW_ENABLED=<value>
    #
    enabled: false

  ## Deny ##
  #
  # The [`deny` authorizer](https://www.ory.sh/docs/oathkeeper/pipeline/authz#allow).
  #
  deny:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHORIZERS_DENY_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHORIZERS_DENY_ENABLED=<value>
    #
    enabled: false

  ## ORY Keto Access Control Policies Engine ##
  #
  # The [`keto_engine_acp_ory` authorizer](https://www.ory.sh/docs/oathkeeper/pipeline/authz#keto_engine_acp_ory).
  #
  keto_engine_acp_ory:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHORIZERS_KETO_ENGINE_ACP_ORY_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHORIZERS_KETO_ENGINE_ACP_ORY_ENABLED=<value>
    #
    enabled: false

    ## Base URL ##
    #
    # The base URL of ORY Keto.
    #
    # >If this authorizer is enabled, this value is required.
    #
    # Examples:
    # - http://my-keto/
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHORIZERS_KETO_ENGINE_ACP_ORY_BASE_URL=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHORIZERS_KETO_ENGINE_ACP_ORY_BASE_URL=<value>
    #
    base_url: http://my-keto/

## Mutators ##
#
# For more information on mutators head over to: https://www.ory.sh/docs/oathkeeper/pipeline/mutator
#
mutators:
  ## No Operation (noop) ##
  #
  # The [`noop` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#noop).
  #
  noop:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_NOOP_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_NOOP_ENABLED=<value>
    #
    enabled: true

  ## HTTP Cookie ##
  #
  # The [`cookie` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#cookie).
  #
  cookie:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_COOKIE_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_COOKIE_ENABLED=<value>
    #
    enabled: false

  ## HTTP Header ##
  #
  # The [`header` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#header).
  #
  header:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_HEADER_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_HEADER_ENABLED=<value>
    #
    enabled: false

  ## ID Token (JSON Web Token) ##
  #
  # The [`header` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#header).
  #
  id_token:
    ## Enabled ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_ID_TOKEN_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_ID_TOKEN_ENABLED=<value>
    #
    enabled: false

    ## Issuer URL ##
    #
    # Sets the "iss" value of the ID Token.
    #
    # >If this mutator is enabled, this value is required.
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_ID_TOKEN_ISSUER_URL=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_ID_TOKEN_ISSUER_URL=<value>
    #
    issuer_url: http://xFkjVJEPTaIzNlfkMFXAUFBX.pnrY--mIe1RxVU.BJcGaqrKbc

    ## JSON Web Key URL ##
    #
    # Sets the URL where keys should be fetched from. Supports remote locations (http, https) as well as local filesystem paths.
    #
    # >If this mutator is enabled, this value is required.
    #
    # Examples:
    # - https://fetch-keys/from/this/location.json
    # - file:///from/this/absolute/location.json
    # - file://../from/this/relative/location.json
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_ID_TOKEN_JWKS_URL=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_ID_TOKEN_JWKS_URL=<value>
    #
    jwks_url: https://fetch-keys/from/this/location.json

    ## Expire After ##
    #
    # Sets the time-to-live of the JSON Web Token.
    #
    # Default value: 1m
    #
    # Examples:
    # - 1h
    # - 1m
    # - 30s
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_ID_TOKEN_TTL=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_ID_TOKEN_TTL=<value>
    #
    ttl: 1m

## Log ##
#
# Configure logging using the following options. Logging will always be sent to stdout and stderr.
#
log:
  ## Level ##
  #
  # Debug enables stack traces on errors. Can also be set using environment variable LOG_LEVEL.
  #
  # Default value: info
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export LOG_LEVEL=<value>
  # - Windows Command Line (CMD):
  #    > set LOG_LEVEL=<value>
  #
  level: info

  ## Format ##
  #
  # The log format can either be text or JSON.
  #
  # Default value: text
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export LOG_FORMAT=<value>
  # - Windows Command Line (CMD):
  #    > set LOG_FORMAT=<value>
  #
  format: text

## Profiling ##
#
# Enables CPU or memory profiling if set. For more details on profiling Go programs read [Profiling Go Programs](https://blog.golang.org/profiling-go-programs).
#
# Set this value using environment variables on
# - Linux/macOS:
#    $ export PROFILING=<value>
# - Windows Command Line (CMD):
#    > set PROFILING=<value>
#
profiling: cpu
```
