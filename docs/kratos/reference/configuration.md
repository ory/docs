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
dsn: consectetur ullamco eiusmod

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
    default_schema_url: http://WLtHOzNBqkBZXwMzYFTERPK.kmehF1TxkkLM

    ## schemas ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export IDENTITY_TRAITS_SCHEMAS=<value>
    # - Windows Command Line (CMD):
    #    > set IDENTITY_TRAITS_SCHEMAS=<value>
    #
    schemas:
      - aliqua anim pariatur Ut s
      - occaecat laborum eiusmod exercitation
      - []
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
    redirect_to: https://mIDPeDLHpROgd.xsSBdEW7v1J8Kev2CQbnXOk-lcg4

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
      enabled: true

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
          - id: eiusmod dol
            provider: github
            client_id: Ut
            schema_url: http://OMNRmETzmiKGRqijCNEiCALXqAo.baaSJkfyiHDRYimt+mfV5ChBS68J.hvCuW,r4SPxNf9+omTHsCy9
            issuer_url: https://eLiJ.gmqc+DKuCYDBGpvDP2OQ.awx,EmhfS-wCWtgdKidJknOahmpywFHMGIA0FLk9gnRqzBgSSihC
            auth_url: http://ybqDWffW.ubiWUQWdNm
            token_url: https://arPKx.jjvrxzgYHhQ-lJ4LAPuzkBvql5lQLlqN-EnHFBLB3kL4SOACuqYdO
            scope:
              - exercitation ipsum
          - id: dolor id dolore
            provider: google
            client_id: sed
            schema_url: https://JuWe.xdpdm
            issuer_url: http://Lo.olberN-y1XeJW3xsyDYze
            auth_url: https://kxIUNM.dqNfJwpNvcmNStA
            token_url: http://dxocvzXYuENBHWf.phEgfMDHjeQ,irjkgOOg-7zNyr
            scope:
              - ullamco laboris
          - id: mag
            provider: generic
            client_id: occaecat adipisicing culpa
            schema_url: http://ywuqQLrgRbuYYjcagAAeZZP.lqxeO4IE4TLVsfYDHJEGw.P
            issuer_url: http://KJj.pjbD7Xsda8Lsn3joQJ0cXEEGUVoHO
            auth_url: https://PslMkxnOUqXTqthKoleAvWLjcGOQEP.tppbyJhP.kJuAvuaFNOqC
            token_url: http://RlFsUUbusY.whqtJ4rQ70woZhOnJUsaNZoIlfS,EsKzz6um
            scope:
              - labore dolore
              - in nulla do
              - id veniam deserunt irure ea
              - in laboris ut dolor dolor

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
    request_lifespan: 547909161us

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
    request_lifespan: 6581483ns

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
          default_redirect_url: https://WGgbPzBKJJyghMEipqsJIBolX.itltXnGaTwpbH-BSFFFAhGTQhXxw5nahE4uy-kv3EHWZHKqlC1sHyoiF5gdSSJDVTV
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://Pe.cxmc0Hspr+d3xSt1ewlJ7nObqVetcq8KR.
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: http://IRKDpZHcjCKQdOzHJfIarnAqsjQ.hyojtPywkR3-ITmrGYwGjAtYIThAb.IH7D+DGnO0L7
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://MtUvDDKjSYBPpzknrEddaPhdPmdn.acpumaN-BB4NGU
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://FgHovEVFXuzsuAYfbgIHEICFJAjx.eoo0TEG2p8FnZ0+l0JGXtemhGQ3dx7S76KSQHZHyY,zDT
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
            default_redirect_url: https://AMPvaeccBKtJjDSWQhTNFfkxlSJ.zfjkXqciv9HQGEWRLvQN8itXZtsYwazGjPhNA1gDp6snGr64buPbaLekfRm09Dy6
            allow_user_defined_redirect: false
        - run: redirect
          config:
            default_redirect_url: http://ZMyEMee.zypT9nzSxoOk.uL8FWBMeJBafCfV8kk
            allow_user_defined_redirect: false

      ## oidc ##
      #
      # Set this value using environment variables on
      # - Linux/macOS:
      #    $ export SELFSERVICE_LOGIN_AFTER_OIDC=<value>
      # - Windows Command Line (CMD):
      #    > set SELFSERVICE_LOGIN_AFTER_OIDC=<value>
      #
      oidc:
        - run: redirect
          config:
            default_redirect_url: https://qtMvHGLFGi.lwpsmb1CbBt6jbDp+rKJjqDEMe,9Hv
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://bC.ehsF1DIT8E3GjrF1Exk2C8QajS4BjKy7
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://jnAyleeHMQHIZDHFeLGuMzTpKqswChG.ijqJM0X2vQpt0LgixdKFZ8c5gEk79QcQ6Zh2W20sb.9furdm6rLKw2hYCZ9
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
    request_lifespan: 38345500815h

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
          default_redirect_url: http://PYmjhoOcpgkPo.gct14Wu7fh4gYCeXLsfDQTrpKeYbVdbjg0kMYYPuYGxoX0vFVg-+mP3R7iV1DzoOae3Z.qn
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: http://PPZfmbprULBsvuNvUdtFJigDJDLUuy.pteowb1Un4lGv5DFOTfLb.1
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://NBIYpUYwEdusPSWUkMOzJBvv.yiycFSUv+qUour8wBqjzSA3r6kxeYHMFCn9DY3Dz3dSBym2itkPMtKD1KvNy
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://jXuOvQPTxuIuyRVvoZkOzcIMGmnA.cpH,bTK9GLHal
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://YdtYuH.ttjH6KXQOERpRCuTQYmfDPhb5f9ZjagRUKn0Tc7Ngb1QGufk-XOf2IccBwrwvAGxyzkop+fxiSsn0Zr4
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
        - run: session
        - run: redirect
          config:
            default_redirect_url: http://pyjxfvlSoXbGIdQTFWFszWP.ansBBfFbSMmQZnwuszzmzVStxSnOd,8nSEJ
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: http://ySJhYYiRqp.tbrp3BPg+xaq
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
        - run: redirect
          config:
            default_redirect_url: http://ylzjDWeVavtddfJMKaPhBjoqwSCl.dzmCrz01UxCy4yvmvNUlt-1Or-fdW+y+,nbfp2lgAgWWV4XGAOmki
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
    from_address: XAtmx9@Vxphq.dog

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
  template_override_path: sint aliqua adipisicing Duis

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
    host: ad cillum dolore elit laboris

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
    port: 38075

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
    host: minim do anim

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
    port: 60435

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
  profile_ui: https://kB.vzKB5rI8uaA7mZd09psJHgE.Pc21pZxBKMHWn3Y

  ## mfa_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_MFA_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_MFA_UI=<value>
  #
  mfa_ui: https://EMTgPugpdeaPRpOTQ.kmmaCQ9yjtvQ4pmNuODabaqODkF

  ## login_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_LOGIN_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_LOGIN_UI=<value>
  #
  login_ui: https://aozydEoLhmqPSYxsyjJWoyk.fikjbU8CjDN0GpI

  ## registration_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_REGISTRATION_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_REGISTRATION_UI=<value>
  #
  registration_ui: http://wcqfCNxKesVaXRjjGDLKoFz.mjbjtBHeUgk

  ## error_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_ERROR_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_ERROR_UI=<value>
  #
  error_ui: https://qdCRxq.kiP2X01qbFv1pBGIBAia0IzY0Rbd

  ## default_return_to ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_DEFAULT_RETURN_TO=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_DEFAULT_RETURN_TO=<value>
  #
  default_return_to: https://HAnwvWaZVZVGjvXVQniJAO.gaMd

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
    public: https://Oq.ywenkwnXB9Vqo3v1Fd5f.+zRXXTYK

    ## admin ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_ADMIN=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_ADMIN=<value>
    #
    admin: https://RPHNvKefCYPaITvPb.tibWjtE0C-2COtwJrjb2f,Rtl0W02QvAplvdLEJyC+t

  ## whitelisted_return_to_domains ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  #
  whitelisted_return_to_domains:
    - http://bdWPSeAQxTZhP.qqN9z.F.92zAFKDB,7a1IHPVTaz.
    - http://fOOJYXTEoARPb.dyghh
    - https://mdOgoSUTFBfjOdUQh.erllsCel0odGi,gtoQkwFxiqCNIeTFBnQvamnhfc,PA8Z5FQElJTltdNuI
    - https://vSQPoVechRG.rqqI,vT6hqsn.Zfo5dTUcFXZAypDOpmVmrOOxYLlAJLl0wU

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
  level: info

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
    - adipisicing non elit Lorem
    - tempor ea laboris ex veniam
    - culpa veniam anim deserunt

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
    memory: 22844970

    ## iterations ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_ITERATIONS=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_ITERATIONS=<value>
    #
    iterations: 31737684

    ## parallelism ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_PARALLELISM=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_PARALLELISM=<value>
    #
    parallelism: 63620359

    ## salt_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_SALT_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_SALT_LENGTH=<value>
    #
    salt_length: 3140261

    ## key_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_KEY_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_KEY_LENGTH=<value>
    #
    key_length: 60441787
```
