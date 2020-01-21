---
id: configuration
title: Configuration
---

<!-- THIS FILE IS BEING AUTO-GENERATED. DO NOT MODIFY IT AS ALL CHANGES WILL BE OVERWRITTEN.
OPEN AN ISSUE IF YOU WOULD LIKE TO MAKE ADJUSTMENTS HERE AND MAINTAINERS WILL HELP YOU LOCATE THE RIGHT
FILE -->

If file `$HOME/.kratos.yaml` exists, it will be used as a configuration file which supports all
configuration settings listed below.

You can load the config file from another source using the `-c path/to/config.yaml` or `--config path/to/config.yaml`
flag: `kratos --config path/to/config.yaml`.

Config files can be formatted as JSON, YAML and TOML. Some configuration values support reloading without server restart.
All configuration values can be set using environment variables, as documented below.

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
dsn: id

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
    default_schema_url: https://WUaktPy.ngiv6PeNdvRUJh8sbpA4Y1-zwC7h5V0xKtl-+rac2,hwbmcWU36,49XIcdNld,1rQUVSWNE

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
    redirect_to: http://aKeERtRnLA.snyxLovn

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
          - id: nostrud labore et enim ad
            provider: github
            client_id: mollit
            schema_url: http://tDXRajv.rjvaFFGF1o-5OSvK2zIQlMQEQeVd+YyB7Wh4nOGPePiALPMv2wbRC
            issuer_url: http://Wc.ouWdU0uju9w24ZBwi9LANohWNdxo7oMbkpoVmWXiuCRZ+KUNNJLwPAt1Up4Yksv
            auth_url: http://GUyW.pitsae9OgXONmoiMEMVyoOCsc.WtbtRgRC,
            token_url: http://HaEDybUEalcyRJjfdtySxpWZaOTUTFs.mmswry4uQkH8F4N,ZOQK
            scope:
              - fugiat
              - ex cillum mollit
              - dolor
          - id: id
            provider: google
            client_id: ipsum sunt voluptate ex esse
            schema_url: https://hVqCi.pydwQCqlgbLduR6qJ6ecWq
            issuer_url: http://wuHVJBpDHgCvxnZR.cxA4bfAgM3U35UAJl4xDs.amlISjQz-0
            auth_url: http://LbA.heolsa8G9ov71wZRM2MYSX43Jv7AnS-TzJwrearDR3yVfAXtcFJA
            token_url: https://QyYZzNvnVqUuATbwewNzymSwPUB.hsbvxaHWh-gUOdQPFXSc862,ExghexwM26IH
            scope:
              - ""
              - laborum officia elit veniam consequat
              - consectetur ea Lorem
          - id: in su
            provider: google
            client_id: reprehenderit nisi
            schema_url: http://DFzmkwwrQlhqARFOyHmTcMmaNvw.zhaFhUoY-8,9dRnJqmFE.HrcYh5P+d+
            issuer_url: https://DQw.fgdeVKww.XJtU
            auth_url: http://etOOBB.xgmb6tqvuEXLmvnRR7SBWDUl7I-T5f4jMgsYAyYs2vmOIlJKWM8CFAhmN6,YVUkuj
            token_url: http://tWBjkxAIWVWvNIAJmHMsgTmzoiNNxpbL.cdmfc-4,0obXwrtDuXjPoFb03ZdkD1VjgzJGNprrJUy0AdaUX16kBlojSpG+w8I6XoYLP3AjV0Kzwn
            scope:
              - reprehenderit non eu pariatur
              - eu nostrud adipisicing Ut
              - proident
          - id: Ut Duis aliquip irure
            provider: google
            client_id: sunt eu
            schema_url: https://oEowYOxSeZHZTjiiUMPBiSjc.jmgkvOq7EgHEm97k7ifFM9NvzquAMstNaZBp-IPmq67Uib.kigMW8JrlAhmvdM4Z486K7lXCr3mEq
            issuer_url: https://eZNyJHyDu.jdrwsxObX0eh4HJvMfvAjnRXA1HEHDn88ADk.sn14ZQJPy
            auth_url: http://BsPfNrtPtBAqcCppCwACH.emiECT7,l.OtRfgpQ1Oa.G2Nyspm3YaynVXSwm9OEJJa2,lohdVZkfkghidTqZu9PGQORIqR7
            token_url: http://mLaKHyiSXZeGVDUerbCGqa.ioUYgIRRfuoDi.rniNUlhkgfu8C1sACi
            scope:
              - sed irure
              - fugiat Ut minim ut consequat
              - dolor aliquip esse cupidatat
              - enim
              - eiusmod Except

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
    request_lifespan: 3875034036m

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
    request_lifespan: 1m

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
          default_redirect_url: https://VsPtPVpHbQMKAsltsNNox.qyfY5-gglmeMc-8mY9yEuP3tWL-cVVI
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: http://xLvFfSAZNweOYPmCkQhgkeBX.enmaAd69MT6jjmhW9iwBa2nahRwRXNBQgy+BD1Cy3fps
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://v.zknwIVyYlziKFr9l
          allow_user_defined_redirect: false
      - run: redirect
        config:
          default_redirect_url: http://VIOluCejccCuFGSWQBmZjQcaGzaDhdko.zaaiOHuq8RnKFAxLyUDsWXHJ
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
        - run: revoke_active_sessions
        - run: redirect
          config:
            default_redirect_url: https://mnpkC.uiaTt+XzijhNdahlZWHaS7wbqm1csF8gWb77xOJJ2ZnEm4OfTXA.fdxy,zgUy
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: http://lKESFsFulyd.bttdAyfkVnjngze0vhYhMjv8bJH,bua.MVUaF,mpM8T
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://UoTRU.lzxmmDN5EG,bE3Lh3qm+khyTC1wdoY.ebHn+ichxR7aUQNHDhGUQugv2B6+bzTGFY
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
    request_lifespan: 502185106ms

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
          default_redirect_url: https://t.ygobncpr2LRpPViGq1VELXXQLV2yklyuEAtbuqiD+eXY6Njur13WqJQl3ab
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://KK.cqjEM0wSwRpgEXza,,SJhEcr++KMBvjGIoRaNOHsBv7UZUkhVXespXik4TYN,UEaCtCqMEeX
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
            default_redirect_url: https://rqyxpsnNoaKmHQArvNtkNdK.lkndRRMG5M9SaMHFPoasU.WodCqjXfjCaaDL2Xh5,aVsx3Pdm5SfAHOmY4n+
            allow_user_defined_redirect: true
        - run: redirect
          config:
            default_redirect_url: https://iCU.bvlgogBMkwlmexgtmPIekqv,BQSJO0nyXXESzChkzQVx
            allow_user_defined_redirect: false
        - run: redirect
          config:
            default_redirect_url: http://sXuHHpgA.tytuJgZuM4BWexlbBR9tQlTrsijA0s
            allow_user_defined_redirect: false
        - run: redirect
          config:
            default_redirect_url: https://NKURBoVSXLBEnzWnVWsLIDmR.gllnwIlE20xKzjvbBpl5ymTnM,H0
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
        - run: redirect
          config:
            default_redirect_url: http://PluPEnflJzbWLsDHyieCxk.jbid
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
    from_address: KtqkIOP9P1sE9Dg@pqwlhp.rcn

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
  template_override_path: consequat laboris fugiat nisi veniam

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
    host: nulla culpa id

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
    port: 27537

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
    host: ipsum

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
    port: 12964

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
  profile_ui: https://UCRkNhxsyYNlFTFuuN.qgQQnjEpJxnwCw9eY-6oPz+sNf8ujN3,qt4bsMzpbC68eTthGiKPMtmJTTkjtBdcFALy2xNrKnkTGWwx+qooFFgv

  ## mfa_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_MFA_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_MFA_UI=<value>
  #
  mfa_ui: http://JxpwgHjPorIcgBUZhXukQugdV.nboxqlAg9dnFcnQC1lGuxf--.IWK08Xen2jvKvBEVQF.oLgsU

  ## login_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_LOGIN_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_LOGIN_UI=<value>
  #
  login_ui: https://HrzTltjNOJKWajVHQteotGae.huUmRq-izXQRrD.Mbedpe3suV3.9aHCK0S

  ## registration_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_REGISTRATION_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_REGISTRATION_UI=<value>
  #
  registration_ui: http://jGnfbk.vhLV.8gW1c

  ## error_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_ERROR_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_ERROR_UI=<value>
  #
  error_ui: https://cKrjORdM.jlfzinaON6Z+tBUpi

  ## default_return_to ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_DEFAULT_RETURN_TO=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_DEFAULT_RETURN_TO=<value>
  #
  default_return_to: http://BOnePUgW.vxpAJobnHLvDTJUyPQds2yqpuI+PLHfvrLc6IcCT1V8+8fOcd5bmT.,dtSM4ECp0

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
    public: http://ffWGHicIssbzwyJixoXNbYrJzApxZ.ibCV3IAsr4ZqfdEVPPw4OlvK+bsFQFLZ4STL9UH5ORPLYQeGRPISK

    ## admin ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_ADMIN=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_ADMIN=<value>
    #
    admin: http://PZJbacQxnOe.gvvQOHT-VVBe8dJLlWknjmRRawbM91bbDZ

  ## whitelisted_return_to_domains ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  #
  whitelisted_return_to_domains:
    - http://VgLerTs.mhjymeJXqfYfuOqtwS
    - http://EVLJDMNfOZXdfofPTMQIrLhQLNIQ.ynwPN2gCEO6K,Dp4
    - https://yHrcjakhsucxtPOgCAsTuEQvInNUEms.fimnicLgdUHXHGHOLzKOj-

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
    - magna Loremamet velit Ut labore

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
    memory: 69144322

    ## iterations ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_ITERATIONS=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_ITERATIONS=<value>
    #
    iterations: 41138244

    ## parallelism ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_PARALLELISM=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_PARALLELISM=<value>
    #
    parallelism: 30456609

    ## salt_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_SALT_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_SALT_LENGTH=<value>
    #
    salt_length: 47642854

    ## key_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_KEY_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_KEY_LENGTH=<value>
    #
    key_length: 81135665


