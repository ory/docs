---
id: version-oryOS.16-configuration
title: Configuration
original_id: configuration
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
dsn: voluptate sed

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
    default_schema_url: https://NRZtTuNdGhKuMBrhNXmbmOoWufxDVLmO.hnrl0-stK9YVU

    ## schemas ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export IDENTITY_TRAITS_SCHEMAS=<value>
    # - Windows Command Line (CMD):
    #    > set IDENTITY_TRAITS_SCHEMAS=<value>
    #
    schemas:
      - -38457946
      - []

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
    redirect_to: https://qhVEFKSTHiWaOKxygZIvxoZFpftYTBeHp.vxjrjX2b

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
      enabled: true

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
          - id: sunt ut dolor sit
            provider: google
            client_id: dolor ipsum Duis sunt
            schema_url: https://PAORLplDnKCzMSXRPUcuCYWbm.jiym3w3PgXyVjFFciNh+UOfHEa8-f5GA5WRDL6eeDjFe-q5CKg
            issuer_url: http://BjnvJmnaMLCTyYLNWoHMyYkavVU.icjcItKdXaswQ1qkHb.PwHtnJwTI4dN69aNgifelaaVnFPtheQJaO
            auth_url: http://LCAFUUstfSixlGil.nzivWXyw4PJH6JxEzg
            token_url: https://LScceUVELEfQtYbgUmruxhAa.irbwEC-oiLqcYueOaqEq9wPgIiJ2Ln
            scope:
              - Ut adipisicing deserunt
              - dolore culpa qui consectetur
              - ea sed
          - id: in
            provider: generic
            client_id: eu consequat
            schema_url: http://TxpnLNzOOYaGjOHlqhdBsvo.cmD7A88TJ.BiEIdmEeCkABDNI+2LnHRLcsuJ6,Ir4GTXBRirwTQhNfCyqn-GIdtjpYK
            issuer_url: http://BehxNvEQTMuHfLvoxNCHAGot.jnoSzSCmv5v+RaQXvGBbfuij181zvMtbYlgYLjIMc,pIjCnZ
            auth_url: https://krGCVhgkEuGaQvAAnAFybSAQeYr.mbDTKvH809IpC3vbAM3NqEKhBGfyXRFD12XDWvK
            token_url: https://wGEzscqNEQcRCgKrnbfePwokuSaMrzyXf.iialxvNxLpyoEJEI66IUG+EIUE-CRtO88CiXInn+RQ+m
            scope:
              - ullamco aliqua laboris
              - Lorem
              - eu cillum laboris nulla
          - id: ad ut nulla laborum
            provider: google
            client_id: esse non aliquip
            schema_url: http://QBTWxnM.wzggtzQRD.Hl39S8Ji
            issuer_url: https://ecXCmIkinbEjiMqVzEtcrTP.tgdiW9PIjoerw1.
            auth_url: http://uiBOrmqkzyBfzTvkMbMwzgrUVZxZEyX.sdgWrf8j3UFPw
            token_url: https://sbwplR.gctpl85w2Znpw
            scope:
              - minim tempor est eu
              - E
              - adipisicing ad
          - id: aliquip do voluptate
            provider: google
            client_id: dolore
            schema_url: https://gNpLvuSDEBEd.frFODxWSVlqsbUT2.L+2,cZTkroq7sipoikk3QCHo7TbZwEdMNCA1.z2BV6Li7+D6vzv
            issuer_url: https://aRlNPhDZDbaPwZxSrDMLOkNiwoIncDNo.uvcw8fm1NkGG3AWzgJRBbhwR1PBziLwB5sls9T5T+JOI
            auth_url: https://VNxpHsmSdtaSYVbdmioZkbss.rxyGg
            token_url: https://EzXNwAjZcpgTp.deA241Q2qkLLZi8caKj8HihadHFtJh
            scope:
              - do proident
              - exercitation id
              - incididunt deserunt sint sunt
              - mi

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
    request_lifespan: 625040h

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
    request_lifespan: 445661us

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
          default_redirect_url: http://GJOQ.lsOw,j
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://otjnMPYKCocPVnsMbyHFKWKaLaTDAbjy.lulgFUbfQKZdixk0
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: http://yhu.lbP.DXK+--5qaEzAMBcXA8WuuF+1bnd83NUQGkt-CdL4TIWnWrsqmVe0lQMVBh8aJqQUtMW7
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
        - run: session
        - run: redirect
          config:
            default_redirect_url: http://cKVuu.zbtjhNpZ2FdRezf3D.XYC54Bb8+tnQpvZmuwlZcsjBYXuDei-Megib+QxCk1Wgw2R9v00pIgYsb8
            allow_user_defined_redirect: true
        - run: revoke_active_sessions
        - run: redirect
          config:
            default_redirect_url: http://JIJSPFHbPNCukuyjwvZVmga.pbsfm.ccrQ
            allow_user_defined_redirect: false
        - run: redirect
          config:
            default_redirect_url: https://vsMK.fhpuHl4t56bpzBC7JkZ
            allow_user_defined_redirect: true

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
    request_lifespan: 620ms

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
          default_redirect_url: https://UEtPXWeketgpYgXFt.pwd57BiC3eC1e.NrWfwCw6pg6ZV
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://pYghTRSRBTMhFCydffBKVSQ.dvlzA1+B-Ol.wbI,uFXQuWUvuhUD4.fS4VXhIPp+lbNdPuEP,kfbBqRGIlVY,6v7cz4f3+43lZ
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://RwEWPcZEqbN.qauFYILw,UdgY.Ej2
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://XXyjievNYJFxFTsXcVFHMQfQqUg.zjeY5BGocAmQWMEqigE1Q,y1ZJDXPIj4LQmInLm
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
            default_redirect_url: https://fXacOUXeaACcyItiwG.kpoBhWp0FDsPZiu1iAYpucab+KoFBpX24tpa6Bj93b
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://lcwFrsKNrWYAQP.xxnowFcUbNHH9P
            allow_user_defined_redirect: false
        - run: redirect
          config:
            default_redirect_url: https://YZtRaZActH.jmyLS-fLKXOU74
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: http://mNlPMTbeYMveRcqZh.rmbpZpYDL--N
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
    from_address: NU-4YyuY@fzwvncSWOw.qg

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
  template_override_path: do tempor dolore

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
    host: eu in esse Ut

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
    port: 49765

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
    host: incididunt aliquip dolore dolor

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
    port: 30104

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
  profile_ui: https://eNSk.wpgzqkAC9hQAYewSv9CoUT9gmO3FCckJhNxPcL6WbqXZrNu+jYGXN

  ## mfa_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_MFA_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_MFA_UI=<value>
  #
  mfa_ui: https://jVxFBjMkyYoODZGqFHELAy.jdvo.beieNGmVhnFB5+TzBbOLo-cFtjrXFi0vvfRfqtgs

  ## login_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_LOGIN_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_LOGIN_UI=<value>
  #
  login_ui: http://iPXxFcrDQPA.ogihI8ioha+Pn0I

  ## registration_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_REGISTRATION_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_REGISTRATION_UI=<value>
  #
  registration_ui: http://KWiMxqxCilfsKCKxCNyuFgt.dkhzVYdXNoWUExhE1taNfqC,UtNO

  ## error_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_ERROR_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_ERROR_UI=<value>
  #
  error_ui: https://PypUMIrXEFXnbcsHoYHZvizgXCEb.txnpthxknGu

  ## default_return_to ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_DEFAULT_RETURN_TO=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_DEFAULT_RETURN_TO=<value>
  #
  default_return_to: http://xVvcNjNjOHhUcCKJQfgvvPzbV.srkB

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
    public: https://jchfhiDEnRMHHIGBKrQ.zxEJO18Zjrn6cNX6xP2rO6QuvGcub

    ## admin ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_ADMIN=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_ADMIN=<value>
    #
    admin: http://PueenSzrvItxBuauMKshYghGujqLPwLZN.pql+y8pDVuVd

  ## whitelisted_return_to_domains ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  #
  whitelisted_return_to_domains:
    - https://GmPGljFCGvnOcifrGUibNZwzgXzVNakCZ.vqIzMhhPuKt6OKRlqj5mFmxGzuQjMPzwHgM,DBi
    - http://DDobvXREuhDRstmNpkpT.obyzeoQj5XN4ogb9wZmuNMBJ1IS
    - http://jvp.xvvuNHHB1oIjzG
    - http://eaguOU.uiQP-oNb2dyM

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
  format: json

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
    - sunt nulla dolore mollit

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
    memory: 23724359

    ## iterations ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_ITERATIONS=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_ITERATIONS=<value>
    #
    iterations: 91396691

    ## parallelism ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_PARALLELISM=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_PARALLELISM=<value>
    #
    parallelism: 82303146

    ## salt_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_SALT_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_SALT_LENGTH=<value>
    #
    salt_length: 96038372

    ## key_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_KEY_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_KEY_LENGTH=<value>
    #
    key_length: 8770507
```
