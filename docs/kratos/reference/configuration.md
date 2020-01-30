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
dsn: et dolore pariatur exercitati

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
    default_schema_url: https://LXDDeSwgBZZMuXhc.wuvlIxQkEB6uTTq.zo+xO9omaNe4Imwjcb+Idg5EvOQ8

    ## schemas ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export IDENTITY_TRAITS_SCHEMAS=<value>
    # - Windows Command Line (CMD):
    #    > set IDENTITY_TRAITS_SCHEMAS=<value>
    #
    schemas:
      - []
      - -29518502.164242208
      - []
      - ut

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
    redirect_to: https://FpFWsLgxTVTeBTLFSeDJjlOCiOw.lbwsHS,b0cRTuVoffB3

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
          - id: dolore elit cupidatat officia sunt
            provider: github
            client_id: Lor
            schema_url: http://PfiSN.ykyXmYSgH++0S,dOUNZgWYS4+Yq,gBwffcmttaxP.HL41FU-
            issuer_url: https://UeMPnWLiFUjc.pyrOgDRmR.lpi
            auth_url: https://BQa.fjwm5nJm+q-,qq,rdI
            token_url: http://zzkGnGgwtrHLakWeFfjyyJFtaEcZc.zhtzQH-BlFKTJ8LDwYiObGxbOn3Ka9d+gnGqkTMFSM6uq0JlXR6uXe
            scope:
              - fugiat
              - et velit mollit qui
          - id: dolore dolor sed
            provider: google
            client_id: ex eu
            schema_url: https://FrbxKAu.vhX+YR8jUF8,F2nqSWZHKZiVPUnwKLUhxihGB7g887f6VlWRRpoGUv
            issuer_url: http://iecUUbbOXtYncAfKLvvKyefBDvqxSHHDH.ebrmp8lmfeV50uE8dv.2qjEGtxgQ6EO8Yn.QW+1oysKtN7O,1MtcyjTvF
            auth_url: https://dQwoTEQeSP.fprsmiyBVpLqP5GbaEeWY4DYuWtkHwyvWdeENhZhPaJcRDwI
            token_url: https://uLwXpgqazdYAQCGMiQhRWnHNTDo.cioUOckTVk
            scope:
              - mollit
              - reprehenderit
              - re
              - aliqua tempor dolor
          - id: nostrud dolore anim
            provider: generic
            client_id: laborum irure in ipsum
            schema_url: https://eObygNFAXxfEZgnqkPHjlm.wuAO
            issuer_url: http://TcEPjhvXdMF.pexuSI7+6NMgevjT1,SXuc9fX
            auth_url: https://FXYkPgSfgH.igsxtwG0yRvISqiewd0MfD,ctKInVlLqV0KUKqOPmTbjLtYSeNU7YWoewtU
            token_url: https://Xm.regQvsE8jHbthokTeX,Hqj2OdT-EpDvpZSuMC7AhNTEqbmOUvLIYo2xj2MhdI
            scope:
              - velit ut minim eiusmod
              - elit enim consectetur dolor
              - labore anim Duis

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
    request_lifespan: 815720us

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
    request_lifespan: 7ns

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
          default_redirect_url: http://XsIckTEmDiPNXYxVPuKVtDgYAbJUXd.lxuGad6jVtVczl6jYbjAH59NE83Sb3n
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://EVucedwSDNrGx.cuvsunKV6pfucMMykvzc5
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
        - run: revoke_active_sessions
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
        - run: revoke_active_sessions
        - run: redirect
          config:
            default_redirect_url: https://UBQzcUxlNkuQmIuMTbNWAZKStZOMBJbOI.edynUqVUugowG+92oCmImv6keODHAEi31zZlGAnEwww4024Alzkf+vYAbiNgvjIqG
            allow_user_defined_redirect: false

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
    request_lifespan: 73026220s

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
          default_redirect_url: https://AcA.qwgqA
          allow_user_defined_redirect: true

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
            default_redirect_url: http://IomWENTHFQDtvtqcCQnqEIzMNjV.vcIX3iBmL,sKof
            allow_user_defined_redirect: true

      ## oidc ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SELFSERVICE_REGISTRATION_AFTER_OIDC=<value>
      # - Windows Command Line (CMD):
      #    > set SELFSERVICE_REGISTRATION_AFTER_OIDC=<value>
      #
      oidc:
        - run: redirect
          config:
            default_redirect_url: https://GqhXfdjnOQTiISMtcjziR.zdtefjVjP-6b.4lp,21ethH
            allow_user_defined_redirect: false

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
    from_address: M9f4TUW0J@Emv.rrw

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
  template_override_path: ut pariatur enim non ex

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
    host: sint Excepteur esse tempor

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
    port: 436

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
    host: Excepteur

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
    port: 33920

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
  profile_ui: https://QBakeFpsCRkAelfyCGXlPguJi.blq0,GuJCFuxqPC+llawS,fIo5j3

  ## mfa_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_MFA_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_MFA_UI=<value>
  #
  mfa_ui: http://wfUWfFHnHNxWipkVPKamHv.vyqW.FuPMesYaeJFQCU5xwaQARGtE8A

  ## login_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_LOGIN_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_LOGIN_UI=<value>
  #
  login_ui: http://vgexHpQa.psBA3yxIfhKWSCMT,nZ-IgT-tHU7BjXKaO1ePSdUuZVRpxIcL

  ## registration_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_REGISTRATION_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_REGISTRATION_UI=<value>
  #
  registration_ui: https://HISvOvasmSSkXwLzJpQdvmSjzRem.yklkFK0O7yvYcRpviQ3-glRhFZ-3io

  ## error_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_ERROR_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_ERROR_UI=<value>
  #
  error_ui: https://zNG.jejqCFRNwOqrJYXM.

  ## default_return_to ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_DEFAULT_RETURN_TO=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_DEFAULT_RETURN_TO=<value>
  #
  default_return_to: https://jlHwcW.qooRmJD-e5y9OPNN5-Ur.aaWWHl1

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
    public: https://TNzOVmWJMPlLGjiWIZCtSxRdfd.xuQX,c8kq

    ## admin ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_ADMIN=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_ADMIN=<value>
    #
    admin: https://PqXCGJxDGwFliBMJbrfPactjG.rhJ6TT-o

  ## whitelisted_return_to_domains ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  #
  whitelisted_return_to_domains:
    - http://uqDfMLMFHeYAFqHBhJkPcGfLWEISjEPw.bpcaUSj9FoUv3kBX+avN5HgrAS6O66VKDnopnHTBSi0Qq8B5-sfGQOCJJqK7LbSd1KKZ-3O
    - http://vHUuEqfCPbbAcE.ccclBDoCX7NtE8fe0HBxjKTCDDDCW2iRl3tq9vmuODwNgT4cg5cuAdohWG+f7fWf
    - http://assABm.pzmE5DSaz1mHCwFAQIn0bmNY60s5vxlhCrWe7e5alWa8Zm3aSMEj,u
    - http://wL.fkgfXNQEiwuG58kDCEmNDn9X5PQEWXgLe7AMbUjOoGmrtWSs1q4Wm
    - https://SYKE.njqkyv1Q6on

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
  level: error

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
    - quiset nisi in culpa
    - pariatur qui consectetur
    - in et quislaborum consectetur qui dolor ea

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
    memory: 85025245

    ## iterations ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_ITERATIONS=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_ITERATIONS=<value>
    #
    iterations: 24722398

    ## parallelism ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_PARALLELISM=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_PARALLELISM=<value>
    #
    parallelism: 35610152

    ## salt_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_SALT_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_SALT_LENGTH=<value>
    #
    salt_length: 64982600

    ## key_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_KEY_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_KEY_LENGTH=<value>
    #
    key_length: 89001647
```
