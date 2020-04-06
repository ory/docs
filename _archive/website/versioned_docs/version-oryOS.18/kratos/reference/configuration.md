---
id: version-oryOS.18-configuration
title: Configuration
original_id: configuration
---

> You are viewing an outdated version of this documentation. Please head over
> to [www.ory.sh/docs](https://www.ory.sh/docs) for a recent version!

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

To find out more about edge cases like setting string array values through
environmental variables head to the
[Configuring ORY services](../../ecosystem/configuring) section.

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
dsn: cupidatat aliquip sit

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
    default_schema_url: https://tEeDEFabVWHacyUcsRog.kkdco

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
    redirect_to: https://AxeuFcIhevEhSRjUUjrnoInVvcANtS.xeyeOtcAMbNW-HS0KchUIxxNQHob.4SccsltbRvT2S

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
          - id: eu n
            provider: google
            client_id: dolor ex
            schema_url: http://tFsM.upVBbRZpZo3CrKI
            issuer_url: http://mwFYFUssKEXRj.ppbVRvudC8LQozq.jmtIbHDzkKuiKexXF
            auth_url: http://ugkeMMRjKG.nslqLoWSRpC
            token_url: https://EvJfWSvxsXXazdVDnmHANjVjTiMQ.hspGmkhKpr7h9fJT,2gV8gLSZe5ZE.faNrcVGIK1ye0gW.FMDd9s
            scope:
              - enim aliqua minim nulla in

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
    request_lifespan: 234us

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
    request_lifespan: 33114ms

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
          default_redirect_url: https://zRSISKBZtFFq.pri8F4xFdbfsq4zqy+HLhnxvb
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://QSLibOZNgldbeQGJdvkRaFWQoOIu.uoluf0HbmmtGEans.hvIak-4CU9f,Bs0iHlGMR0uhUUdKi9
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: http://OvYICyNdtfYVnBSBsmNLxxKfEMcRa.dkmvY8uH9lYvG0
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://INz.vqvC7HI9dOOri4+EYhkjHLG3-PuicSd19i
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
            default_redirect_url: https://Qxthg.kwbwG-MttrGIRNg07sbLrnB0+8LSZ3WT46MpV7EoJxP,+RPtWXM6bEWvluOXb
            allow_user_defined_redirect: true
        - run: revoke_active_sessions
        - run: redirect
          config:
            default_redirect_url: https://RVwxfJUjetZVWd.syyB6PR3AC06YzUcM8A-gbtUGvCnUX-ChkJiw7JQPM6WIM
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: http://FiaSMlIScXpzicHIzyGEd.hyybKbxdTY,AQGX2sRW5ij92MCmL8D9Ee,qKSalJ3YRONzUYyVIzP+KnXL
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
        - run: session
        - run: revoke_active_sessions
        - run: redirect
          config:
            default_redirect_url: http://tjlqTIWwbwqBTwWsopiWAXuN.ynM2S6Rj,W-MaOjMKHlWFBB.dANE0.,D4thgPegBO5,EQZqmNJ,vIwrpEcjklnn6Bly
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: http://CviiBogsrnFBqLVGy.ttuU+96FLadf6IufDEX7yYQuMlnzvsOh+U+ADD1N+eIqruwn
            allow_user_defined_redirect: false
        - run: redirect
          config:
            default_redirect_url: http://aLwegmtireDsLWLeks.fdsVF-BM6dK
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
    request_lifespan: 744409s

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
          default_redirect_url: http://zoTmmYhRT.tdmoQwpBuJmV,nHbm8x5d2hse,YQ-kW1t
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
        - run: session
        - run: redirect
          config:
            default_redirect_url: https://CMCpPcjpqvCbp.obgbIyHqhj6UNVv56lmQ5+KV8QgbY.f8a7
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://iQmytAm.arxhk1d5PSILnu4qzyIZzWhRFDQsbK+ZwgvbR7XB4PcP
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://bwtCJJvshNPgXiIHRiIj.mutmEDQF+JftnoZTabf5cvdl28qSn7Rs2STwRV7kXLBPDjupywnf0DyG
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://THZobot.vooeQ9fwvoXRgKv2W3OxB0zQf95q8UyneZU
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
            default_redirect_url: https://UTyvoIt.wtwkuuvFA-EGYI5QJgO,qbJkQkAz
            allow_user_defined_redirect: false
        - run: session
        - run: redirect
          config:
            default_redirect_url: https://sZEWuWaweTet.ccl,u3AIgRxtL3lynFKiLY.VKVelQzvp
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://UZrvijTWfegBLcrhY.vnxfHozlCmjS6aVe8woKnqpmDm3ug3KhNFyQqvVClncdAe0MHtb0ZBpu,B4NIcS3iNAdqqbqp
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: http://ofFEMHlYnSDadMdFlb.uyjmf7Ppd9jcDFVNkWPStwC8w3rcfDCXF5koKLIXqVes2tNKNafCf,LTr+Oc2fv+n,D8
            allow_user_defined_redirect: true

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
    from_address: gHiVx7v8QOzkJ@ppfyjdGFdNqzhdoonZdJRcjWWaffpcwx.myg

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
  template_override_path: Excepteur veniam

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
    host: sed consequat exercitation

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
    port: 20584

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
    host: ''

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
    port: 21600

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
  profile_ui: https://MPNJewuHUHqAIXasoTpdSloMamlyZdZpC.eozY1QWisNgOaiErgO7GruMdRo5Rj.K9Cxg3+-N+VjWV7CGCvPyyC+zbLW2kMof

  ## mfa_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_MFA_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_MFA_UI=<value>
  #
  mfa_ui: https://nMOpAqKLZFzqGvcEaVWDOngAVjwv.psnaL9de.b8AJT6CYMnEJC.1S9e-cLAMRtGSDQByj

  ## login_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_LOGIN_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_LOGIN_UI=<value>
  #
  login_ui: https://ZoMNUZrtpfBarvSCOzc.vanLGu-moRWqufb6Vme9mDIcsayzHVfpegMg

  ## registration_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_REGISTRATION_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_REGISTRATION_UI=<value>
  #
  registration_ui: https://Rg.bmK4,qBZQ,JWWcDMs1lzwBn2a

  ## error_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_ERROR_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_ERROR_UI=<value>
  #
  error_ui: https://GdPIizcZoxlAdh.qvzmC8k7FObBk0FHfw8tQDnpqm84vBZoUhjlIlm.L-rTVyH5.qAicuVRO

  ## default_return_to ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_DEFAULT_RETURN_TO=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_DEFAULT_RETURN_TO=<value>
  #
  default_return_to: https://wHfu.yewdRP8x.9wZgWZcc0l.NeyfVquUQEffu

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
    public: https://PECzRUsR.jxnRYpL9DJmdw80AvQZzu1bmf9Zdl7IekvibKOuOCpY7.a0ejqt3kvyBObAQY.SmUm9ezmGC18tMNCc

    ## admin ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_ADMIN=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_ADMIN=<value>
    #
    admin: https://UWodpE.bcnnlwVTjpQ6E2MgpjTl3Id4nYwqtRYoQL0Fzj+abhFjDX1

  ## whitelisted_return_to_domains ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  #
  whitelisted_return_to_domains:
    - http://XZHAt.idmzvFnDjO6kRfDQyRE9aDUdANhOMNjfcDe,hK3sXk
    - https://xSUnvafAzXXVsGLZKHRTf.odKwo58qlurKQbaO3jVDEYhZb0yCCwSEwrl
    - http://MhQaBiyiHZMQjfIrEldIHig.tqlSIDCtz+useJ
    - http://kodhv.gfaVtQF.4uLI3RBcgyWMS2iJEQRWzMwF7SJCsPCIZbmujFjoE2CFt8ZFQGRcW

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
  level: debug

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
    - utsed in magna tempor ut

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
    memory: 36273934

    ## iterations ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_ITERATIONS=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_ITERATIONS=<value>
    #
    iterations: 27360948

    ## parallelism ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_PARALLELISM=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_PARALLELISM=<value>
    #
    parallelism: 44051406

    ## salt_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_SALT_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_SALT_LENGTH=<value>
    #
    salt_length: 72723803

    ## key_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_KEY_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_KEY_LENGTH=<value>
    #
    key_length: 5084742
```
