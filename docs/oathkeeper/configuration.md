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
    port: -94998334.30248082

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
    host: localhost

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
      enabled: true

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
      allowed_origins: https://*.example.com

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
        - POST
        - HEAD
        - PATCH
        - TRACE

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
        - in
        - voluptate
        - adipisicing et fugiat
        - voluptate occaecat
        - ipsum velit

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
        - ut est veniam
        - consectetur

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
      max_age: 83430541.36091375

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
      key:
        ## path ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export SERVE_API_TLS_KEY_PATH=<value>
        # - Windows Command Line (CMD):
        #    > set SERVE_API_TLS_KEY_PATH=<value>
        #
        path: path/to/file.pem

        ## base64 ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export SERVE_API_TLS_KEY_BASE64=<value>
        # - Windows Command Line (CMD):
        #    > set SERVE_API_TLS_KEY_BASE64=<value>
        #
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...

      ## TLS Certificate (PEM) ##
      #
      cert:
        ## path ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export SERVE_API_TLS_CERT_PATH=<value>
        # - Windows Command Line (CMD):
        #    > set SERVE_API_TLS_CERT_PATH=<value>
        #
        path: path/to/file.pem

        ## base64 ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export SERVE_API_TLS_CERT_BASE64=<value>
        # - Windows Command Line (CMD):
        #    > set SERVE_API_TLS_CERT_BASE64=<value>
        #
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...

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
    port: 33482635.91813621

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
      read: 5s

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
      idle: 120s

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
      allowed_origins: https://example.com

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
        - CONNECT
        - PUT
        - TRACE
        - GET

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
        - elit
        - ipsum amet qui proident

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
        - ea veniam id
        - adipisicing nulla dolore

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
      max_age: -64813752.32182605

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
      debug: true

    ## HTTPS ##
    #
    # Configure HTTP over TLS (HTTPS). All options can also be set using environment variables by replacing dots (`.`) with underscores (`_`) and uppercasing the key. For example, `some.prefix.tls.key.path` becomes `export SOME_PREFIX_TLS_KEY_PATH`. If all keys are left undefined, TLS will be disabled.
    #
    tls:
      ## Private Key (PEM) ##
      #
      key:
        ## path ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export SERVE_PROXY_TLS_KEY_PATH=<value>
        # - Windows Command Line (CMD):
        #    > set SERVE_PROXY_TLS_KEY_PATH=<value>
        #
        path: path/to/file.pem

        ## base64 ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export SERVE_PROXY_TLS_KEY_BASE64=<value>
        # - Windows Command Line (CMD):
        #    > set SERVE_PROXY_TLS_KEY_BASE64=<value>
        #
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...

      ## TLS Certificate (PEM) ##
      #
      cert:
        ## path ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export SERVE_PROXY_TLS_CERT_PATH=<value>
        # - Windows Command Line (CMD):
        #    > set SERVE_PROXY_TLS_CERT_PATH=<value>
        #
        path: path/to/file.pem

        ## base64 ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export SERVE_PROXY_TLS_CERT_BASE64=<value>
        # - Windows Command Line (CMD):
        #    > set SERVE_PROXY_TLS_CERT_BASE64=<value>
        #
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...

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
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_ANONYMOUS_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_ANONYMOUS_ENABLED=<value>
    #
    enabled: true

    ## Anonymous Authenticator Configuration ##
    #
    # This section is optional when the authenticator is disabled.
    #
    config:
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
      #    $ export AUTHENTICATORS_ANONYMOUS_CONFIG_SUBJECT=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_ANONYMOUS_CONFIG_SUBJECT=<value>
      #
      subject: anonymous

  ## No Operation (noop) ##
  #
  # The [`noop` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#noop).
  #
  noop:
    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_NOOP_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_NOOP_ENABLED=<value>
    #
    enabled: true

  ## Unauthorized ##
  #
  # The [`unauthorized` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#unauthorized).
  #
  unauthorized:
    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_UNAUTHORIZED_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_UNAUTHORIZED_ENABLED=<value>
    #
    enabled: false

  ## Cookie Session ##
  #
  # The [`cookie_session` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#cookie_session).
  #
  cookie_session:
    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_COOKIE_SESSION_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_COOKIE_SESSION_ENABLED=<value>
    #
    enabled: true

  ## JSON Web Token (jwt) ##
  #
  # The [`jwt` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#jwt).
  #
  jwt:
    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_JWT_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_JWT_ENABLED=<value>
    #
    enabled: false

  ## OAuth 2.0 Client Credentials ##
  #
  # The [`oauth2_client_credentials` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#oauth2_client_credentials).
  #
  oauth2_client_credentials:
    ## config ##
    #
    config:
      ## token_url ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_CONFIG_TOKEN_URL=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_CONFIG_TOKEN_URL=<value>
      #
      token_url: https://my-website.com/oauth2/token

      ## required_scope ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_CONFIG_REQUIRED_SCOPE=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_CONFIG_REQUIRED_SCOPE=<value>
      #
      required_scope:
        - amet Ut

    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_OAUTH2_CLIENT_CREDENTIALS_ENABLED=<value>
    #
    enabled: true

  ## OAuth 2.0 Token Introspection ##
  #
  # The [`oauth2_introspection` authenticator](https://www.ory.sh/docs/oathkeeper/pipeline/authn#oauth2_introspection).
  #
  oauth2_introspection:
    ## config ##
    #
    config:
      ## introspection_url ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_INTROSPECTION_URL=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_INTROSPECTION_URL=<value>
      #
      introspection_url: https://my-website.com/oauth2/introspection

      ## scope_strategy ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_SCOPE_STRATEGY=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_SCOPE_STRATEGY=<value>
      #
      scope_strategy: wildcard

      ## pre_authorization ##
      #
      pre_authorization:
        ## client_id ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_CLIENT_ID=<value>
        # - Windows Command Line (CMD):
        #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_CLIENT_ID=<value>
        #
        client_id: Excepteur nisi tempor dolore

        ## client_secret ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_CLIENT_SECRET=<value>
        # - Windows Command Line (CMD):
        #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_CLIENT_SECRET=<value>
        #
        client_secret: sed nisi sint

        ## token_url ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_TOKEN_URL=<value>
        # - Windows Command Line (CMD):
        #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_TOKEN_URL=<value>
        #
        token_url: http://TW.uwykqHBqHnitAC3xMOVYbMzYD+5YXvX1lx2Hg7HAGAP0X+XHXEnd

        ## enabled ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_ENABLED=<value>
        # - Windows Command Line (CMD):
        #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_ENABLED=<value>
        #
        enabled: true

        ## scope ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_SCOPE=<value>
        # - Windows Command Line (CMD):
        #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_PRE_AUTHORIZATION_SCOPE=<value>
        #
        scope:
          - '["foo", "bar"]'

      ## required_scope ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_REQUIRED_SCOPE=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_REQUIRED_SCOPE=<value>
      #
      required_scope:
        - elit
        - anim magna occaecat
        - ut nostrud
        - 'quis '
        - esse

      ## target_audience ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_TARGET_AUDIENCE=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_TARGET_AUDIENCE=<value>
      #
      target_audience:
        - commodo

      ## trusted_issuers ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_TRUSTED_ISSUERS=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_TRUSTED_ISSUERS=<value>
      #
      trusted_issuers:
        - voluptate a
        - cillum occaecat

      ## introspection_request_headers ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_INTROSPECTION_REQUEST_HEADERS=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_INTROSPECTION_REQUEST_HEADERS=<value>
      #
      introspection_request_headers: {}

      ## token_from ##
      #
      token_from:
        ## cookie ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_TOKEN_FROM_COOKIE=<value>
        # - Windows Command Line (CMD):
        #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_CONFIG_TOKEN_FROM_COOKIE=<value>
        #
        cookie: sunt dolore pariatur cillum ea

    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHENTICATORS_OAUTH2_INTROSPECTION_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHENTICATORS_OAUTH2_INTROSPECTION_ENABLED=<value>
    #
    enabled: false

## Error Handling ##
#
errors:
  ## Error Handling Fallback ##
  #
  # This array defines how to handle errors when no "when" clause matches. If you have, for example, enabled redirect and json in your access rule, you could tell ORY Oathkeeper to try sending JSON if the request does not match the access rule definition
  #
  # Default value: json
  #
  # Examples:
  # - json
  # - redirect
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export ERRORS_FALLBACK=<value>
  # - Windows Command Line (CMD):
  #    > set ERRORS_FALLBACK=<value>
  #
  fallback:
    - json

  ## Individual Error Handler Configuration ##
  #
  handlers:
    ## HTTP WWW-Authenticate Handler ##
    #
    # Responds with the WWW-Authenticate HTTP Response
    #
    www_authenticate:
      ## Enabled ##
      #
      # En-/disables this component.
      #
      # Default value: false
      #
      # Examples:
      # - true
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export ERRORS_HANDLERS_WWW_AUTHENTICATE_ENABLED=<value>
      # - Windows Command Line (CMD):
      #    > set ERRORS_HANDLERS_WWW_AUTHENTICATE_ENABLED=<value>
      #
      enabled: false

    ## HTTP Redirect Error Handler ##
    #
    # Responds with a 301/302 HTTP redirect.
    #
    redirect:
      ## config ##
      #
      config:
        ## to ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export ERRORS_HANDLERS_REDIRECT_CONFIG_TO=<value>
        # - Windows Command Line (CMD):
        #    > set ERRORS_HANDLERS_REDIRECT_CONFIG_TO=<value>
        #
        to: https://BpUmE.xtrkJfcKixxdYxS

        ## code ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export ERRORS_HANDLERS_REDIRECT_CONFIG_CODE=<value>
        # - Windows Command Line (CMD):
        #    > set ERRORS_HANDLERS_REDIRECT_CONFIG_CODE=<value>
        #
        code: 302

        ## when ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export ERRORS_HANDLERS_REDIRECT_CONFIG_WHEN=<value>
        # - Windows Command Line (CMD):
        #    > set ERRORS_HANDLERS_REDIRECT_CONFIG_WHEN=<value>
        #
        when:
          - error:
              - internal_server_error
            request:
              cidr:
                - ut
                - in do magna exercitation esse
              header:
                content_type: []
                accept: []
          - error:
              - forbidden
              - internal_server_error
            request:
              cidr:
                - ullamco
                - Duis Ut aute
                - sed consequat velit irure
                - in mollit aliqua est veli
                - adipisicing sed sunt dolor non
              header:
                content_type: []
                accept: []
          - error:
              - unauthorized
              - forbidden
              - forbidden
              - internal_server_error
              - internal_server_error
            request:
              cidr:
                - consectetur deserunt nulla reprehenderit
                - qu
              header:
                content_type: []
                accept: []
          - error:
              - unauthorized
              - not_found
              - forbidden
              - unauthorized
              - forbidden
            request:
              cidr:
                - fugiat ex
                - irure est
                - in proident fugiat nostrud dolore
                - pariatur dolor aliqua et
                - dolore et magna in
              header:
                content_type: []
                accept: []

      ## Enabled ##
      #
      # En-/disables this component.
      #
      # Default value: false
      #
      # Examples:
      # - true
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export ERRORS_HANDLERS_REDIRECT_ENABLED=<value>
      # - Windows Command Line (CMD):
      #    > set ERRORS_HANDLERS_REDIRECT_ENABLED=<value>
      #
      enabled: true

    ## JSON Error Handler ##
    #
    # Responds with a JSON error response
    #
    json:
      ## config ##
      #
      config:
        ## verbose ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export ERRORS_HANDLERS_JSON_CONFIG_VERBOSE=<value>
        # - Windows Command Line (CMD):
        #    > set ERRORS_HANDLERS_JSON_CONFIG_VERBOSE=<value>
        #
        verbose: true

        ## when ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export ERRORS_HANDLERS_JSON_CONFIG_WHEN=<value>
        # - Windows Command Line (CMD):
        #    > set ERRORS_HANDLERS_JSON_CONFIG_WHEN=<value>
        #
        when:
          - error:
              - internal_server_error
              - forbidden
              - forbidden
            request:
              cidr:
                - est ullamco ani
                - Excepteur exercitation aute
                - proident sed aute
                - exercitation sunt cillum do
              header:
                content_type: []
                accept: []
          - error:
              - not_found
              - internal_server_error
              - unauthorized
            request:
              cidr:
                - ut dolor dolore eiusmod
                - consectetur
                - culpa
                - ipsum deserunt proident
                - qui proident labore
              header:
                content_type: []
                accept: []
          - error:
              - unauthorized
              - internal_server_error
              - forbidden
              - not_found
              - forbidden
            request:
              cidr:
                - Lorem consectetur si
                - qui officia ad
                - ipsum amet nostrud
                - consectetur
                - sed dolor occaecat
              header:
                content_type: []
                accept: []
          - error:
              - forbidden
              - unauthorized
              - not_found
            request:
              cidr:
                - Duis
                - consequat
                - eiusmod sed in
              header:
                content_type: []
                accept: []
          - error:
              - unauthorized
              - forbidden
              - internal_server_error
            request:
              cidr:
                - non est id
                - dolore in anim amet incididunt
                - ea sunt incididunt
                - dolor
              header:
                content_type: []
                accept: []

      ## Enabled ##
      #
      # En-/disables this component.
      #
      # Default value: true
      #
      # Examples:
      # - true
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export ERRORS_HANDLERS_JSON_ENABLED=<value>
      # - Windows Command Line (CMD):
      #    > set ERRORS_HANDLERS_JSON_ENABLED=<value>
      #
      enabled: true

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
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
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
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHORIZERS_DENY_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHORIZERS_DENY_ENABLED=<value>
    #
    enabled: true

  ## ORY Keto Access Control Policies Engine ##
  #
  # The [`keto_engine_acp_ory` authorizer](https://www.ory.sh/docs/oathkeeper/pipeline/authz#keto_engine_acp_ory).
  #
  keto_engine_acp_ory:
    ## config ##
    #
    config:
      ## base_url ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_BASE_URL=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_BASE_URL=<value>
      #
      base_url: http://my-keto/

      ## required_action ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_REQUIRED_ACTION=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_REQUIRED_ACTION=<value>
      #
      required_action: tempor exercitati

      ## required_resource ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_REQUIRED_RESOURCE=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_REQUIRED_RESOURCE=<value>
      #
      required_resource: anim ad enim

      ## subject ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_SUBJECT=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_SUBJECT=<value>
      #
      subject: fugiat enim voluptate ipsum ex

      ## flavor ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_FLAVOR=<value>
      # - Windows Command Line (CMD):
      #    > set AUTHORIZERS_KETO_ENGINE_ACP_ORY_CONFIG_FLAVOR=<value>
      #
      flavor: amet dolor ex tempor

    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export AUTHORIZERS_KETO_ENGINE_ACP_ORY_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set AUTHORIZERS_KETO_ENGINE_ACP_ORY_ENABLED=<value>
    #
    enabled: false

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
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_NOOP_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_NOOP_ENABLED=<value>
    #
    enabled: false

  ## HTTP Cookie ##
  #
  # The [`cookie` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#cookie).
  #
  cookie:
    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_COOKIE_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_COOKIE_ENABLED=<value>
    #
    enabled: true

  ## HTTP Header ##
  #
  # The [`header` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#header).
  #
  header:
    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_HEADER_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_HEADER_ENABLED=<value>
    #
    enabled: false

  ## Hydrator ##
  #
  # The [`hydrator` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#hydrator).
  #
  hydrator:
    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_HYDRATOR_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_HYDRATOR_ENABLED=<value>
    #
    enabled: false

  ## ID Token (JSON Web Token) ##
  #
  # The [`id_token` mutator](https://www.ory.sh/docs/oathkeeper/pipeline/mutator#id_token).
  #
  id_token:
    ## config ##
    #
    config:
      ## jwks_url ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export MUTATORS_ID_TOKEN_CONFIG_JWKS_URL=<value>
      # - Windows Command Line (CMD):
      #    > set MUTATORS_ID_TOKEN_CONFIG_JWKS_URL=<value>
      #
      jwks_url: https://fetch-keys/from/this/location.json

      ## issuer_url ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export MUTATORS_ID_TOKEN_CONFIG_ISSUER_URL=<value>
      # - Windows Command Line (CMD):
      #    > set MUTATORS_ID_TOKEN_CONFIG_ISSUER_URL=<value>
      #
      issuer_url: Duis nulla proident fugiat labore

      ## claims ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export MUTATORS_ID_TOKEN_CONFIG_CLAIMS=<value>
      # - Windows Command Line (CMD):
      #    > set MUTATORS_ID_TOKEN_CONFIG_CLAIMS=<value>
      #
      claims: aliqua mollit

      ## ttl ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export MUTATORS_ID_TOKEN_CONFIG_TTL=<value>
      # - Windows Command Line (CMD):
      #    > set MUTATORS_ID_TOKEN_CONFIG_TTL=<value>
      #
      ttl: 1m

    ## Enabled ##
    #
    # En-/disables this component.
    #
    # Default value: false
    #
    # Examples:
    # - true
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export MUTATORS_ID_TOKEN_ENABLED=<value>
    # - Windows Command Line (CMD):
    #    > set MUTATORS_ID_TOKEN_ENABLED=<value>
    #
    enabled: false

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
  level: panic

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
profiling: ''
```
