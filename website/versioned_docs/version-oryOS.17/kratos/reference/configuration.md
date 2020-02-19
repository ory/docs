---
id: version-oryOS.17-configuration
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
dsn: deserunt enim esse

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
    default_schema_url: http://ho.bdtkYY5DK

    ## schemas ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export IDENTITY_TRAITS_SCHEMAS=<value>
    # - Windows Command Line (CMD):
    #    > set IDENTITY_TRAITS_SCHEMAS=<value>
    #
    schemas:
      - id non ex anim
      - Ut fugiat ut
      - dolor aliquip ad
      - -86184482
      - true

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
    redirect_to: http://sgkgywXURJivQeTuMWEohh.hxpgqN,cm

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
          - id: nisi irure dolor amet ut
            provider: generic
            client_id: fugiat ex adipisicing Lorem
            schema_url: http://Ra.kvklvsSrv12eE,xHbSS2CeaSV7nefQnfU4AInSCaAbOfCcy+jGLwCLcDl,
            issuer_url: http://ZCMjMaZRLDfZciLLf.twuvo42h+d5nDlgioluNafRjiMp5hZ0AfJ-5qiF9c2fBT5KpGIWfv466WH-4jIauO,YUWxA8-8FzFU0ziCM
            auth_url: http://DGtHYVpxkNEpz.hwtxKEzKDfa5s9uuaKkIkiXQ.6wODsvEYsiCqUtMSZjDYzxWD8mXTklGKIWtHr1Pr4.wowxBHIZvi
            token_url: https://dlPRwHkz.ixvhG,djgAjeKa27s0J
            scope:
              - consequat
              - qui esse consectetur sit dolore
          - id: qui
            provider: google
            client_id: in aliqua exercitation officia ipsum
            schema_url: http://RKtFsZTJXmfJhqxNaNNB.pxWKv8r8QxR9ddiq8IIEWb,ggfWBQjaSpJQnAkv-aEpfV6YJGC4O.ZvHKCHoKI15VnHLpKb
            issuer_url: http://XWlv.hmxG6mXMvgTXcR2G3u1EgxJpRg+GlCUDmGck.xPuaCJt6MK+OUnPOH1AW.7JHwsgTlU3e.I
            auth_url: http://QPeKXYCunlQFQ.hvmNNORLJVvjjjLYCweAmODsqJ
            token_url: http://xAAsXkxlEnJJPmEF.cffi7JI1OYf7JDu,R-lWm,XB4lYdu3CbelxNxK7OcafhRbYVRawz2DLeCZu0lvVEkL6U
            scope:
              - cupidatat nostrud ex
              - sit
          - id: aute in elit aliqua
            provider: google
            client_id: eiusmod dolor
            schema_url: https://NNritsliSfqsETRHufnJCGTw.dau4bhXw1PNHu0zHexcTW8fOjSDTsx0rk-x4CUMnk5,lhgZP4
            issuer_url: https://UXKQqLqUaJnmlIGtKs.jaktnTqPZlv
            auth_url: https://tDkWIintTYNVMeNzKNMvsTcFbW.ayZVg+OZLT.OsuBKBe9O
            token_url: http://YftwbPtS.ieWj5
            scope:
              - ''
              - adipisicing labore est
              - sit
          - id: anim esse sed
            provider: google
            client_id: esse
            schema_url: http://DHCrjMf.hvJliewfEJb9d,tLM5eYpgKZ19gm
            issuer_url: https://Dzq.nlcJDGxC
            auth_url: https://yaMeeizqENxxHnmlvVMvg.qoWBkK53ecaak96KrMTOR4c-BhWAcnZXFoUn3FAKwVPqvj
            token_url: https://mAJ.ykavNcetCQl0XxkNFTZNecYsuFf7.o-eJV47oeYzAvBD5WU4JCI8ITrohTQ1x17J-MD
            scope:
              - in dolor est minim
              - ali

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
    request_lifespan: 7967810ms

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
    request_lifespan: 452148672us

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
          default_redirect_url: https://dTScEmeqCRdtgYaC.ubBN0mQWEE8
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://EDJ.wbtSaTcOoLS+ZKL
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://fSLEOUMYeROWnMdpIhGL.kdnEckW4pdgGH
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://Liptq.ovsyOellJJj7UuGMU
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: http://aYMOklzHTIesMMYhoruZjcYLrO.psjyFOKODGRppy371tF9lARzl.+Kr72w
          allow_user_defined_redirect: false

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
            default_redirect_url: https://n.nygWB9KG8-KqpsfxTnGr,YWZJS
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
    request_lifespan: 243026s

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
          default_redirect_url: https://LkGToWHIuBTSLnu.dsgJ-Mk-AcCpRhnMu7P7HuxC1g0,7IJnoqCYhpOc1crcfvq
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: http://xDKcCveU.glyiBanijnh-chKbJPyYVNmWW0ez
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: https://WQBKUKJQgKbiRVyO.yfJnBbk,MhyynxYIsMr
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: http://uPSPMsUwGFroOHjzmyJHXcI.vbtJ.9Y9KfezQPF2rOMeS1qPJ7tocxW,hfonX9QhLm.F
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: http://gTvNQBSdgDOcJUppfxiGdoDlliqJpYGbe.etnzlVeDUf-Ecmak-DxWmMFjpTNsA65-MJYfEci1axl
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
            default_redirect_url: http://BdLmdRhSZukBpCEwDhNlRuPjEtXeZQKq.beoFuM5TdAlS4iYd0usSCsNvNOCxy5h3zUGUnC
            allow_user_defined_redirect: true
        - run: session
        - run: redirect
          config:
            default_redirect_url: https://RIXvuezBIiAjhRyydwFUEoWBkPyHssr.yhpicinln2JMGE
            allow_user_defined_redirect: false
        - run: redirect
          config:
            default_redirect_url: https://qpbVFiBHtqETCPPnBOiigLoYW.yceu8qSLOvh3+ZQHNrBEZCL6UkDB3z1YZ+wVsJOpIrPehkrtU8xaLPi+rW-DVEhF5Cpf.Q0GSaa3B6
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
            default_redirect_url: http://IYNAURFRiwCDVHywPMGMawiFskvnNi.nexAzV6UN2KOGC1K,YOhJhuXce60yu3rUDXqQ8x55-SDhaxDtR2s3UD
            allow_user_defined_redirect: false
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
    from_address: edlZ@oFPag.hrhm

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
  template_override_path: culpa sunt tempor in

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
    host: nulla exercitation

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
    port: 13825

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
    host: reprehenderit

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
    port: 48108

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
  profile_ui: https://ItAWd.fcuNIxbPqbs1R3LTdNdawNRBbBGMnIbYg1PFr5o6seGBxskbBO9-WzFV3-MOkyf

  ## mfa_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_MFA_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_MFA_UI=<value>
  #
  mfa_ui: http://veprbjBm.cdzJeXj8wTjqs+Hm48ANE6dgesnP2ATRYQ,NEvoQmcjpLRv+R

  ## login_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_LOGIN_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_LOGIN_UI=<value>
  #
  login_ui: http://JjiFUVP.ufaADkFJ7yDOnHEqMAbZx4d-eP5WbM

  ## registration_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_REGISTRATION_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_REGISTRATION_UI=<value>
  #
  registration_ui: http://DBDNWJLY.jtoRAfdzZ9G07d-makMrfjShOFP8dNSR

  ## error_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_ERROR_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_ERROR_UI=<value>
  #
  error_ui: http://vmDTWgZJoxfDuvAuPNpaYLcoDJHg.ubfo3u+mtXhmT+vNMIavGpzI.R3nn4NnAxHrI

  ## default_return_to ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_DEFAULT_RETURN_TO=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_DEFAULT_RETURN_TO=<value>
  #
  default_return_to: https://jEBzVwmLcowdo.bzmfru.I-cykSrswpapZKA4cC6vMzVIXkJmfi75,ZMWA0aFEHX6NrM

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
    public: https://QeElopbRi.puphdpsC.MfjAncER9Ft7Rh6G.KkcEJIsIG0HTisEuf

    ## admin ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_ADMIN=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_ADMIN=<value>
    #
    admin: https://SJZa.kxGHMT.aMjh0EUmXI2wEYlu55o+wz

  ## whitelisted_return_to_domains ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  #
  whitelisted_return_to_domains:
    - http://sDJUGq.idbkBOoO
    - http://jvgJnpRBWcoFyNqburinGrUaIYDQoKAU.cgwBq+LNNTEpbOFLIQFSp2Tb9WZPsN5uKodQEo33d

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
    - nonaliquipessecommod
    - qui dolor doloranim ea amet
    - velit fugiat cillum nisi

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
    memory: 69548893

    ## iterations ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_ITERATIONS=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_ITERATIONS=<value>
    #
    iterations: 24574645

    ## parallelism ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_PARALLELISM=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_PARALLELISM=<value>
    #
    parallelism: 78908570

    ## salt_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_SALT_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_SALT_LENGTH=<value>
    #
    salt_length: 62872605

    ## key_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_KEY_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_KEY_LENGTH=<value>
    #
    key_length: 18823607
```
