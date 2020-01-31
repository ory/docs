---
id: configuration
title: Configuration
---

<!-- THIS FILE IS BEING AUTO-GENERATED. DO NOT MODIFY IT AS ALL CHANGES WILL BE OVERWRITTEN.
OPEN AN ISSUE IF YOU WOULD LIKE TO MAKE ADJUSTMENTS HERE AND MAINTAINERS WILL HELP YOU LOCATE THE RIGHT
FILE -->

If file `$HOME/.kratos.yaml` exists, it will be used as a configuration file
which supports all configuration settings listed below.

You can load the config file from another source using the
`-c path/to/config.yaml` or `--config path/to/config.yaml` flag:
`kratos --config path/to/config.yaml`.

Config files can be formatted as JSON, YAML and TOML. Some configuration values
support reloading without server restart. All configuration values can be set
using environment variables, as documented below.

```yaml
## ORY Kratos Configuration
#

## dsn ##
#
# Set this value using environment variables on
# - Linux/macOS:
#    $ export DSN=<value>
# - Windows Command Line (CMD):
#    > set DSN=<value>
#
dsn: nisi occaecat ea magna

## identity ##
#
identity:
  ## traits ##
  #
  traits:
    ## default_schema_url ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export IDENTITY_TRAITS_DEFAULT_SCHEMA_URL=<value>
    # - Windows Command Line (CMD):
    #    > set IDENTITY_TRAITS_DEFAULT_SCHEMA_URL=<value>
    #
    default_schema_url: https://XbzaMmXBSQezGAdWgijTZGIjsYmyzb.lrPobEhGGRIMSo3+GfF98lN3z2KrXb7FRwAGTV-MMKkQOCrPqHYA76Y5gJg18,RNZudehdCe

    ## schemas ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export IDENTITY_TRAITS_SCHEMAS=<value>
    # - Windows Command Line (CMD):
    #    > set IDENTITY_TRAITS_SCHEMAS=<value>
    #
    schemas:
      - null
      - null
      - null

## selfservice ##
#
selfservice:
  ## logout ##
  #
  logout:
    ## redirect_to ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SELFSERVICE_LOGOUT_REDIRECT_TO=<value>
    # - Windows Command Line (CMD):
    #    > set SELFSERVICE_LOGOUT_REDIRECT_TO=<value>
    #
    redirect_to: http://tfNjzoLzLaH.qjyl1bfP0ZSihEPM4luVHtgKAv4VgH9g+i

  ## strategies ##
  #
  strategies:
    ## password ##
    #
    password:
      ## enabled ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SELFSERVICE_STRATEGIES_PASSWORD_ENABLED=<value>
      # - Windows Command Line (CMD):
      #    > set SELFSERVICE_STRATEGIES_PASSWORD_ENABLED=<value>
      #
      enabled: false

    ## oidc ##
    #
    oidc:
      ## enabled ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SELFSERVICE_STRATEGIES_OIDC_ENABLED=<value>
      # - Windows Command Line (CMD):
      #    > set SELFSERVICE_STRATEGIES_OIDC_ENABLED=<value>
      #
      enabled: false

      ## config ##
      #
      config:
        ## providers ##
        #
        # Set this value using environment variables on
        # - Linux/macOS:
        #    $ export SELFSERVICE_STRATEGIES_OIDC_CONFIG_PROVIDERS=<value>
        # - Windows Command Line (CMD):
        #    > set SELFSERVICE_STRATEGIES_OIDC_CONFIG_PROVIDERS=<value>
        #
        providers:
          - id: quis culpa aliquip
            provider: google
            client_id: incididunt
            schema_url: http://TxJum.xezwaljHYUXftZ
            issuer_url: http://gsRwWoimJkOZMgMOCZOOOvZRE.zmS+AmQCv7GSkWaIz.wwv1s,nhz6Yv8cHdK1k
            auth_url: http://GSIjrYQX.mhIMeyiYfyUagQ-UyEEpWJ5d.zz.pl1l5KOi3
            token_url: http://DsguUeC.jphvyxCj2Me6XyortF5V5OoJ-9srayf.2MXvNIDyV55CkSjXHmloJXjY79GTPArUhNta
            scope:
              - in mollit
              - irure
              - fugiat enim irure
              - Ut nostrud
              - magna nulla
          - id: ut
            provider: google
            client_id: dolor eu incididunt
            schema_url: http://wOGlHvsasIt.nlGbXG4eLBe4mXvd3-PMbhdvyYCNIilQqYdvrcQKAa9ZXjGOlxWwTq-AQYA0DFe1
            issuer_url: https://ofQKi.pwd6f4OUPMaaHYyBUU-Oed,Y2,K
            auth_url: https://BPAEoWDIgKWqfnIEkrYGstmDERIm.hkQTgXPzQSYCJ50fYtd.zmCVyduKbNYB1D7bWpf1.g6rj+
            token_url: https://QrZhCNgkWbsMmxOGEbeSOZFhsnFyBZRf.hjbWMpMl94Ot1-u6MJM+B.BVUFk5hkASHqpBvuol8jXXBB.L6b3
            scope:
              - ea occaecat dolore
              - elit dolor sit

  ## profile ##
  #
  profile:
    ## request_lifespan ##
    #
    # Default value: 1h
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SELFSERVICE_PROFILE_REQUEST_LIFESPAN=<value>
    # - Windows Command Line (CMD):
    #    > set SELFSERVICE_PROFILE_REQUEST_LIFESPAN=<value>
    #
    request_lifespan: 93479515us

  ## login ##
  #
  login:
    ## request_lifespan ##
    #
    # Default value: 1h
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SELFSERVICE_LOGIN_REQUEST_LIFESPAN=<value>
    # - Windows Command Line (CMD):
    #    > set SELFSERVICE_LOGIN_REQUEST_LIFESPAN=<value>
    #
    request_lifespan: 89591ns

    ## before ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SELFSERVICE_LOGIN_BEFORE=<value>
    # - Windows Command Line (CMD):
    #    > set SELFSERVICE_LOGIN_BEFORE=<value>
    #
    before:
      - run: redirect
        config:
          default_redirect_url: https://vGndMaFtCZbciW.rwwhHDI6JqOib86VuMRb2N07MMFiwZgZ.YAORLJwem.resLfqrpdNSGJtAwFjdeu
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: http://WDsErbiEiHZYpKrTkMXpS.oxlWRIwjG3WqXBZDuDMsT4LcgrEUDHNm8tbIlQbC
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: http://FfnyiyDTJVuUksNtqubZmm.ltcVjTktD16ASu.eLB7JIvMyIFysyRKpCCRgSpdFdjyhBFO+QAR9eR4JKKwMXTJm1fVPOSE6Sl19
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: http://cjfUkWRPdFKHMxpaNWSbdOBdBtUsDAoO.cwlgFMtGwtX9
          allow_user_defined_redirect: true

    ## after ##
    #
    after:
      ## password ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SELFSERVICE_LOGIN_AFTER_PASSWORD=<value>
      # - Windows Command Line (CMD):
      #    > set SELFSERVICE_LOGIN_AFTER_PASSWORD=<value>
      #
      password:
        - run: redirect
          config:
            default_redirect_url: http://EPGubGHgLJgSZtIvPiUaulQBUyek.rhqyL.7YGUvv0FfYi
            allow_user_defined_redirect: false
        - run: session

      ## oidc ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SELFSERVICE_LOGIN_AFTER_OIDC=<value>
      # - Windows Command Line (CMD):
      #    > set SELFSERVICE_LOGIN_AFTER_OIDC=<value>
      #
      oidc:
        - run: session
        - run: revoke_active_sessions
        - run: redirect
          config:
            default_redirect_url: http://UUyLzkTFMoLQceMppnLaPpSNRqtlt.iuxgxskzt27c
            allow_user_defined_redirect: true

  ## registration ##
  #
  registration:
    ## request_lifespan ##
    #
    # Default value: 1h
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SELFSERVICE_REGISTRATION_REQUEST_LIFESPAN=<value>
    # - Windows Command Line (CMD):
    #    > set SELFSERVICE_REGISTRATION_REQUEST_LIFESPAN=<value>
    #
    request_lifespan: 713189260s

    ## before ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SELFSERVICE_REGISTRATION_BEFORE=<value>
    # - Windows Command Line (CMD):
    #    > set SELFSERVICE_REGISTRATION_BEFORE=<value>
    #
    before:
      - run: redirect
        config:
          default_redirect_url: http://jcFqBHUuZzyGJuGNFjQSGBkmeZaMX.ooewieD+XQOmGT+S6KQFu4Bn2ncBVPZvQLhaVbQB5V5oxKuvYuaQ
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: http://aACDLdaCsYzAkzoNjjNDGWLDSk.qkAc+DvBxLr8AgGZl3CfG5qUgHm+Ch5h0e
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://QkPIvDvDjh.vznYgkvWxdm
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://nsRgMqe.dkqevZ1sHoU5W4i30BVsFe8OiUH5OCwAFMmZRxLCd-
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://HqPAdPEOIdYJuVfovhOzvfBdwkKEHq.awoEdZpSdU2WgdeQdbrCpee9bU3IwCFGHctTFFs9DWFWGu
          allow_user_defined_redirect: false

    ## after ##
    #
    after:
      ## password ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SELFSERVICE_REGISTRATION_AFTER_PASSWORD=<value>
      # - Windows Command Line (CMD):
      #    > set SELFSERVICE_REGISTRATION_AFTER_PASSWORD=<value>
      #
      password:
        - run: redirect
          config:
            default_redirect_url: https://pC.ltrD0w3HigRV5jUSrFp5kEmLpsnWUKRJZjtadVNdxWHbMZ2OJ4
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: http://zFjmuVsOHDkXOvlfdTqnfhpRc.mqrsInfT0A9NGu5DNO4InnUIjoBU.-,hZ+JckutxrMgc
            allow_user_defined_redirect: false

      ## oidc ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SELFSERVICE_REGISTRATION_AFTER_OIDC=<value>
      # - Windows Command Line (CMD):
      #    > set SELFSERVICE_REGISTRATION_AFTER_OIDC=<value>
      #
      oidc:
        - run: session

## Courier configuration ##
#
# The courier is responsible for sending and delivering messages over email, sms, and other means.
#
courier:
  ## SMTP Configuration ##
  #
  # Configures outgoing emails using the SMTP protocol.
  #
  smtp:
    ## SMTP connection string ##
    #
    # This URI will be used to connect to the SMTP server.
    #
    # Examples:
    # - smtps://foo:bar@my-mailserver:1234/
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export COURIER_SMTP_CONNECTION_URI=<value>
    # - Windows Command Line (CMD):
    #    > set COURIER_SMTP_CONNECTION_URI=<value>
    #
    connection_uri: smtps://foo:bar@my-mailserver:1234/

    ## SMTP Sender Address ##
    #
    # The recipient of an email will see this as the sender address.
    #
    # Default value: no-reply@ory.kratos.sh
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export COURIER_SMTP_FROM_ADDRESS=<value>
    # - Windows Command Line (CMD):
    #    > set COURIER_SMTP_FROM_ADDRESS=<value>
    #
    from_address: c4Q9DwI@brqdApcCJzBwWCRT.acym

  ## Override message templates ##
  #
  # You can override certain or all message templates by pointing this key to the path where the templates are located.
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export COURIER_TEMPLATE_OVERRIDE_PATH=<value>
  # - Windows Command Line (CMD):
  #    > set COURIER_TEMPLATE_OVERRIDE_PATH=<value>
  #
  template_override_path: dolore

## serve ##
#
serve:
  ## admin ##
  #
  admin:
    ## host ##
    #
    # Default value: 0.0.0.0
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SERVE_ADMIN_HOST=<value>
    # - Windows Command Line (CMD):
    #    > set SERVE_ADMIN_HOST=<value>
    #
    host: ''

    ## port ##
    #
    # Default value: 4434
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SERVE_ADMIN_PORT=<value>
    # - Windows Command Line (CMD):
    #    > set SERVE_ADMIN_PORT=<value>
    #
    port: 59101

  ## public ##
  #
  public:
    ## host ##
    #
    # Default value: 0.0.0.0
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SERVE_PUBLIC_HOST=<value>
    # - Windows Command Line (CMD):
    #    > set SERVE_PUBLIC_HOST=<value>
    #
    host: proident

    ## port ##
    #
    # Default value: 4433
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export SERVE_PUBLIC_PORT=<value>
    # - Windows Command Line (CMD):
    #    > set SERVE_PUBLIC_PORT=<value>
    #
    port: 27386

## urls ##
#
urls:
  ## profile_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_PROFILE_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_PROFILE_UI=<value>
  #
  profile_ui: https://VimedYkQACKCZApfFUFWJp.zpSRDK5Rpa

  ## mfa_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_MFA_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_MFA_UI=<value>
  #
  mfa_ui: http://BwLeWVECfNuMZptCkzU.eivOJDtEB2w,vOIvf

  ## login_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_LOGIN_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_LOGIN_UI=<value>
  #
  login_ui: https://mnofBS.hjxiqm4fnjmprQd3J0mHEYLANfPOoQaUz706GT

  ## registration_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_REGISTRATION_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_REGISTRATION_UI=<value>
  #
  registration_ui: https://XwdjeRrFemWQFyrxWFlodnP.czep2Ejb-PJuUHA.NRcRkcpH.S6tUYqs

  ## error_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_ERROR_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_ERROR_UI=<value>
  #
  error_ui: https://Jl.xsmYJgQR08vqVPhq9FLjaDbMxl+bTLQteflMnYOmrvo8zaNWXSQ

  ## default_return_to ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_DEFAULT_RETURN_TO=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_DEFAULT_RETURN_TO=<value>
  #
  default_return_to: http://mstJi.wapi-Fa5K

  ## self ##
  #
  self:
    ## public ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_PUBLIC=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_PUBLIC=<value>
    #
    public: http://eJMuSlfv.ldjfSE4uu6NnpqI3F,tW.8j6aQpA8BzrPkFdZy15+oSITfo3zLXBieA1sPeB42.Oc3o6

    ## admin ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_ADMIN=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_ADMIN=<value>
    #
    admin: http://Gi.ghtgJJtOBTdi

  ## whitelisted_return_to_domains ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  #
  whitelisted_return_to_domains:
    - http://vVdIMOkzgHwfxqVmghIteQOZfR.jviKX9-27,l.QNfrHoZjJ.5QedQHsrYMAJYnufKeD63SnWOCweY3olkSTXbSY0u
    - http://GPXcv.omBtIEaz6fOYzOFQcysKs.I,qPEshl-goMSk-l9jO5FIZgLb6X.xVzyeS8O,E7drdLzHJ4b
    - http://SBdQMltAY.zmP,wlVOinFPg6gENRH,d1yoLezSHki0NkRUr8dfw7zfDfuE17KQLxIzGI4Qub0nPxHE0QlPaC6
    - https://evWNlDhFeDStejo.btLDQ-N-PK4OzDN.qpYB2GzY6vAwqXx0QLNxYOlMJzaNa5z0UDbTp7fk8Q
    - https://xVsJQe.cpfFk+lNdnHUg8IPc3zrbZka0eKBbL0daEF+F.TgwE3CSA6x0m0iWsKQYDUKpWvfCx7Ox

## log ##
#
log:
  ## level ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export LOG_LEVEL=<value>
  # - Windows Command Line (CMD):
  #    > set LOG_LEVEL=<value>
  #
  level: trace

  ## format ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export LOG_FORMAT=<value>
  # - Windows Command Line (CMD):
  #    > set LOG_FORMAT=<value>
  #
  format: text

## secrets ##
#
secrets:
  ## session ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export SECRETS_SESSION=<value>
  # - Windows Command Line (CMD):
  #    > set SECRETS_SESSION=<value>
  #
  session:
    - Ut temporsunt non sint Excepteur
    - in commodolabore
    - ad consectetur irure commodo
    - et irure non dolor nulla
    - tempor minimmagna labore veniam aliquip

## hashers ##
#
hashers:
  ## argon2 ##
  #
  argon2:
    ## memory ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_MEMORY=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_MEMORY=<value>
    #
    memory: 81000766

    ## iterations ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_ITERATIONS=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_ITERATIONS=<value>
    #
    iterations: 46252587

    ## parallelism ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_PARALLELISM=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_PARALLELISM=<value>
    #
    parallelism: 98831815

    ## salt_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_SALT_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_SALT_LENGTH=<value>
    #
    salt_length: 14653256

    ## key_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_KEY_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_KEY_LENGTH=<value>
    #
    key_length: 89357905
```
