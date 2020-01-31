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
dsn: deserunt dolor occaecat nulla commodo

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
    default_schema_url: https://BLDrxZDQAHUqGvYePclsYmhj.exdnBlJcYlBh.QEJvmWo3TS7cTMUPZwRT

    ## schemas ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export IDENTITY_TRAITS_SCHEMAS=<value>
    # - Windows Command Line (CMD):
    #    > set IDENTITY_TRAITS_SCHEMAS=<value>
    #
    schemas:
      - -38675851.07662084
      - null
      - -12496043.728079438

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
    redirect_to: http://wxrgScsgsagrtXFpzxfeDHn.jsrrYoakY1HGi4gqluST1pSDi

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
          - id: dolore sint est esse cupidatat
            provider: generic
            client_id: anim sint
            schema_url: https://XkBQ.sswo3fOTiUuHZ6wDIMt7xxlk0xUpfUu7Y
            issuer_url: https://LNzqWnzNiUfngadxwPbWXswNKYQD.mhFbT-C7wWwi,.tvd308pJwPUCtJ915rVRtNF5P..RkQeW2JQoOJkxgrJLXDOMJVG-cuM-It
            auth_url: http://vFtN.eqgQkvEzJC9fpqpJaweCKrlWSIbJT1x7w
            token_url: https://aWHrMPDvxrmPJ.otnnDEjdHC2cVisnkpjYj9xKUTxao2hqFKy81iCuV7tJkmcK
            scope:
              - minim occaecat labore adipisicing dolor
              - deserunt oc
          - id: nisi voluptate Excepteur est
            provider: github
            client_id: nisi
            schema_url: http://zUDPVVHGemIqO.ehx1cXAILOGezrFtR2drb+7tSeh+ugDOkNkPQHT
            issuer_url: http://xWQAx.hcrxqMsbVo
            auth_url: https://qnGqtZjVXonwaDMkkyTrPldPaFdPdFk.rzvzqUjCLERkywVV7y9ay
            token_url: http://PLqAigZXYIGGSqDrcbifvKWDxns.ifufmVN1FIcFSmafi1fa.2xzOUgMEsSWoNa5Q2k74jdoiHsXdj5M4uXIWe9KK46YcmDfHFlwhg,s+vqt3vYU.d
            scope:
              - dolor
              - commodo aliquip non
              - qui pariatur cillum reprehenderit
              - enim amet officia Duis aliqua
              - 'aliquip cupidatat '
          - id: sunt et ad Lorem cupidatat
            provider: google
            client_id: quis anim ad id
            schema_url: https://GqNeAxXUjMwBOcmHnDvIetuoRwy.xkhavZhTzXMlhh-zQHPGHaFIuRXA,ZSkoOIRWqr,44BHl7b,MZvwQHac-kLaJ1xEoCp4
            issuer_url: https://lUsufWiTcGhNbooseWz.nhdpECOn1,yCLFBCEmM-fD6SNGp2qn7yfOVygkR
            auth_url: https://RbtgMBhqqpoHuvLqTGyaBkLuuEHMgNTz.joqEcaFNaOUJN0-yMMFGhzvtrLViQoBBUZ
            token_url: https://oLlQgavabKPH.luDxqaz3y1Bz9zsLFKt8jANMC954DsXq2VBVxn6SlCw-0VjeI6HW4oK2Mdh
            scope:
              - ut aliqua consectetur sint aliquip
              - qui dolor officia consectetur ullamco
              - in occa

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
    request_lifespan: 33431569402s

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
    request_lifespan: 3ns

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
          default_redirect_url: https://wlazzEfTHHzqnsyajdKcpgHzhXLCa.lfhPaMmeRRgLmotGElU3eZyvQ5MpXcLwFnVwje5yR5+uTwYinWAHtNmO8rtdBt
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: http://isVOR.nlteBunXr8oVBp6bwo-x
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
            default_redirect_url: http://vECgrIjoSiPvkbkLMILAUUjvDUfgtcj.epgzegQo.kH5TDEhtNKvsdc5omj..JMHXfJMROCXezhEuI9XtS2najIKdlqCWoB7C,TGG
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
        - run: revoke_active_sessions
        - run: session
        - run: redirect
          config:
            default_redirect_url: https://PRZhV.sffxHjuUiPOSTg+BX3Mw
            allow_user_defined_redirect: false
        - run: redirect
          config:
            default_redirect_url: http://J.szaAMCoonhXNeQiS0wwBxir.SpFwHQ7LPY9PNyH3xbzviKPUbaX
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
    request_lifespan: 47s

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
          default_redirect_url: https://rDZaaxFraBwe.njqxoxDKdT
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://EGDhsAUcfymScztxBI.qkzGm3jKmZXuq4aKGlR-vjzg7Rc28WyPJM4
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
            default_redirect_url: http://GlZwJex.ntmdbAtPprDWMITgAfRlnsmzfK7wtuRx
            allow_user_defined_redirect: false
        - run: redirect
          config:
            default_redirect_url: https://WpfmJcmo.ywGDCqCJLJlxjChJ,RVlSvgwI8ZZPUQ2TPp6bSn4Ed9N-bU
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://KUOdoDBFifQsYIRZvIQBLFlkGFL.cianswWtehroqXGQ2+pkW
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
    from_address: VKY6UOQ9ldQQ@ZaPQOM.mdm

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
  template_override_path: et qui

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
    host: incididunt ut

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
    port: 57769

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
    host: dolor sint cillum in deserunt

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
    port: 49539

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
  profile_ui: http://XyVOgLaXFvgFmd.zsxOvg4EuxD9,vPFPvm

  ## mfa_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_MFA_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_MFA_UI=<value>
  #
  mfa_ui: http://LhKUtBeIYxzQbJffjExsfLTdYxzbeFgAV.vifetUfaHUtqvlIEaqOOgnMjp1GTJKG5m.20m

  ## login_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_LOGIN_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_LOGIN_UI=<value>
  #
  login_ui: https://MUhPrAUGjlbOBGjhNgIAGGIUbEEFrmmb.otQZhkCd2,Xto

  ## registration_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_REGISTRATION_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_REGISTRATION_UI=<value>
  #
  registration_ui: http://goCNO.cknnNCPeD2OAqyj4n2Il7Mz3EBkxfjiQbMHOACataU

  ## error_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_ERROR_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_ERROR_UI=<value>
  #
  error_ui: https://WkrAEanwToeclAmURDHOxlkhWjIUx.kkeqm-4xAFCNzJW2uvXcuYfOPhcMe,aJcKFedE9A6x6dunQqmqip4oCg.xtvOUaelaz7,

  ## default_return_to ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_DEFAULT_RETURN_TO=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_DEFAULT_RETURN_TO=<value>
  #
  default_return_to: https://d.yhirsCt1kLAazgkFAq6sKDNwZYUCg0bKkcEluYAlJCXgokGSYpU3pgQ

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
    public: https://vcoPyRlxjBZhICkX.iyolhbBNIdUDudM-DO1EIQv,vXwmjt2CYSegPJHJym8YVo9VK-SYXrqAxVj7TWY

    ## admin ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_ADMIN=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_ADMIN=<value>
    #
    admin: https://wScBJdCJkBQuRvyzDGf.ydpSnQGzkvHHWTQ2

  ## whitelisted_return_to_domains ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  #
  whitelisted_return_to_domains:
    - http://okyZyqokw.hxwPJLTv8IWPcbEm55wiDMtGRD2ca57IpCl
    - http://xlPUOgXYnoxRLmf.dlHpPzecXGV4aM6,yhhHMG52vubJjotZ1NNrXmQyfpUX1ZAbHGg

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
    - laborecupidatat esse

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
    memory: 65072856

    ## iterations ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_ITERATIONS=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_ITERATIONS=<value>
    #
    iterations: 55638257

    ## parallelism ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_PARALLELISM=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_PARALLELISM=<value>
    #
    parallelism: 83983775

    ## salt_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_SALT_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_SALT_LENGTH=<value>
    #
    salt_length: 50425807

    ## key_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_KEY_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_KEY_LENGTH=<value>
    #
    key_length: 30268713
```
