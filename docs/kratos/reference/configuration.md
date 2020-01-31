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
dsn: ipsum ad minim

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
    default_schema_url: https://izyqxSMYyBHQqyZCbfOjNjJWz.opuun.sixP2naw0nu

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
      - []
      - -84586761.11121583

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
    redirect_to: http://BXcgEITWBSQssme.kfBjKF9G.dDaORYcnQP5KG18,l3lb3rQYp137muRSHv+cxPuG

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
          - id: occaecat sed in
            provider: github
            client_id: fugiat dolor irure
            schema_url: http://wCRJMGhelGXRxEj.nubvYUOq2E-zS11LzYLNGDPkXmYv9cckwjUt8WyhoAgh6v2otnhjijq3w
            issuer_url: http://VYuKQO.ebvOO.owZqPAzZWUp.Sz5ObTrOR9hNwfI1UPF.Sgbu+FnZUJjfdVLOt8
            auth_url: http://DgmvSc.hssieIpSicX11CbovVxfOs,RR92pRWwEWo
            token_url: https://ONTFkCjkMfDewItnLDEFKjQWmQSyxxYT.kllEk1jJhwNiGk0.LG
            scope:
              - magna adipisicing cupidatat irure
          - id: dolore sunt non ex ullamco
            provider: google
            client_id: eu
            schema_url: https://vGanheIwnmfnLwiVrhqKGkaSehIBK.gqqlbsyt.u
            issuer_url: https://MOhXnbZHxEacMhduncDpvtQxfe.rfuFCPUo4.lUQxx3D2iMBX+HblzJQlTPABkkRpq8K-NjTmpcI8mDLCBhw9,G2eokw1ToEmTjqEC1hrrVkMUTk0ktKQQfMM
            auth_url: http://vdVdaiiGuLwz.zywliM.eeASSCkT589BKm1NQM2mfrd2Rr6kBoddxaxbWzLCowYPwUJwo.LhUV.x8dkW
            token_url: http://DWcRYXLOgnCgCtthRllVykz.dcBn1i0RjnXIPaTvngNmw15aG6ugbptLM,uuBwuvZZvaoqa4sSZ+Tyb
            scope:
              - ex est
              - aute anim irure laborum
              - commodo ut veniam tempor ullamco
              - enim
              - nulla irure sint
          - id: in aute eiusmod aliquip ad
            provider: google
            client_id: Duis ex
            schema_url: http://tbuvlHKXIbosMxLakE.kvdo2WsKo+rkoqbJe,
            issuer_url: http://XIUuumxmHWuoZlfTInMdziis.operwWlTocEu35u6exyiTck3DHDE.lEu.dURm,nqlzzhCSv139MsbgIf
            auth_url: https://gDvOxgRygyVVIPJGVlGqeBlfIGs.lkbjLJX
            token_url: https://tVaoZHZlRjZEz.onMV+hSEsl2jwLSiy,bpcaoEdiCJ4gTByGlsHdSEfw7FSvYM6,J
            scope:
              - velit Ut in occaecat amet
              - commodo
          - id: consectetur veniam aute
            provider: google
            client_id: dolore est amet nulla
            schema_url: https://QITOuaHoCgAUmPZxRw.bshs
            issuer_url: http://asCtH.ynkpe4tbeYCmG7dKTUYBzdIsikfSbHwAZzA-EFGrUt5wZIUaJNp6fIhvRML
            auth_url: http://vYMsUtXFBoBGlUEUIwf.axohXq2
            token_url: https://acxRMbYXwYn.krfeY5tliX7fdG9WQKQsa6AAoxaSb19O8tJ5gEQ1
            scope:
              - Ut dolor
              - irure laboris in et ipsum
              - 'culpa elit '
          - id: velit in
            provider: google
            client_id: eiusmod mollit aute cupidatat ullamco
            schema_url: https://QjQqHiVVlBJEtxUQniz.qbceWjjsbeiGliNCjnNoLjwaGvnWeo,yFsZ3pAhhwO-8FgOvn0yCZTBl
            issuer_url: https://CtzLYAlyfnkNvS.rrynTuFn+ju4oMouozqQqE0UU1ruwygNBmN+oh6t.0gi0iTI
            auth_url: https://WjtThXZhHcMdfXw.lumoN+dZENwTOKgBaIuX6-
            token_url: http://FWvjYEQM.fpzhVu6l9gUB6-dYXWYySzhbSygXo+rvoFK-.q,7iRvF4sNlpcpcrNkEX-TksG5uLtLGYz5-HAnyjQME8-HNZIf8IX
            scope:
              - dolor elit
              - exercitation ipsum
              - cillum in
              - cillum aliquip
              - minim officia ad

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
    request_lifespan: 9946226602s

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
    request_lifespan: 6s

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
          default_redirect_url: https://fLofQbKoMoVUgjxElJukOVUQMGFXCorha.qrs6ClvRFYE1XejAk9+,gs5Qj.iC996XlS
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: https://iishSE.joDLigyn,Ck
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
            default_redirect_url: http://LuPYXKTSjwDCEIN.qjADt
            allow_user_defined_redirect: true
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
    request_lifespan: 512028757s

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
          default_redirect_url: http://fFIkfugROAGCPsYqDVhRJeVOfAJABU.lawfpMtwuP,sDd-WPu72,qAFQUtNlffH+JAK
          allow_user_defined_redirect: true
      - run: redirect
        config:
          default_redirect_url: http://noWRlC.iqk81HEdaWsjF7lB5kueuv.uFKBQZ7ZfEm
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
            default_redirect_url: https://DhdgsLkGEzwzBjdjxqmEzisS.wherzlc11
            allow_user_defined_redirect: true
        - run: session
        - run: redirect
          config:
            default_redirect_url: http://mUJXDwrUpBUb.pyZWsgek7.DKgHHPg+DC0oDvb23XTI7T9g8VHiHWwOPUgCYlgZPInuoPnNtMjJrhkV,KA+3
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
            default_redirect_url: http://bpybUIJmacCmMIiaXEoPVeAa.zcxkw+YrGLMBxwW57N2H0kS2ohxJKAj0
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
    from_address: m4wsFjsg0a3fiN@JgsVFExOMszkHSYKCmqAIKzGNUBJfR.tfpp

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
  template_override_path: reprehenderit nulla commodo ex enim

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
    host: ipsum in culpa proident

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
    port: 9464

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
    host: fugiat labore u

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
    port: 63262

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
  profile_ui: https://aXYvqRJEtJjmBWSSWQRkIvpL.hguVLedZI19Duv+tKm3HSsOUFuNasn8E6WvPm.SWtwwsFGkKOUiyghA7toPu

  ## mfa_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_MFA_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_MFA_UI=<value>
  #
  mfa_ui: http://pn.cgA-Yj8RpTyo+ad4zKRkmiurtbKj0z3-ktnPHSo-86Y,HSr0TkdEFiMU

  ## login_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_LOGIN_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_LOGIN_UI=<value>
  #
  login_ui: http://fcSJGE.xggms1azhkF+zv

  ## registration_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_REGISTRATION_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_REGISTRATION_UI=<value>
  #
  registration_ui: http://rfPjhDiywzwdQoyFWYcaYPVeLQ.dtalMRTFU+p9mIynfYplx6I5gD

  ## error_ui ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_ERROR_UI=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_ERROR_UI=<value>
  #
  error_ui: https://qRljuCEIpTeXyaQhURjsJkMmq.afczGJ8oWn9Swer02iX9w2iKYslGMg2Mvf.kmr,jb5tl7chwDbDvVlrApC,hgrcOIU2XRDSN

  ## default_return_to ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_DEFAULT_RETURN_TO=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_DEFAULT_RETURN_TO=<value>
  #
  default_return_to: http://UgfAdBSI.cxbwbutSodWrCNrK90tNxntxVgZ00j1-INZ3XbQNdsQM5lPOg.cJVsv

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
    public: https://jrzgtcBGcTcgN.natqXnli0bVrg2yiir6pBwBHbKJhN9OJS,i1fI+eaEbCE5TG,BIP6xRQpPAY

    ## admin ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export URLS_SELF_ADMIN=<value>
    # - Windows Command Line (CMD):
    #    > set URLS_SELF_ADMIN=<value>
    #
    admin: http://hX.dgifhtiwGAi5tPGE4TGjMUkugO

  ## whitelisted_return_to_domains ##
  #
  # Set this value using environment variables on
  # - Linux/macOS:
  #    $ export URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  # - Windows Command Line (CMD):
  #    > set URLS_WHITELISTED_RETURN_TO_DOMAINS=<value>
  #
  whitelisted_return_to_domains:
    - http://UhOB.uylSMl,r95FfmW7Fu4Up02a
    - http://lxrFtfFjLMxcdPRcrQVpgkHhTOdpO.gcyu2NEFp0HAQfrcA9I+eMAWsc
    - http://IgnrQyCaeZOPYfLtcYhJyOYIhoa.arrMBccuynkuWdRW,LHzDIKptaZK1Ym0mLogwgxFe8Nmh
    - https://lv.afZx.Hn+,yttROA6Z7gH7.QPaQftTGVY96kMBP3SBZAZUAnBUcvQdR1BjlIeC3D49AiEfjy
    - http://ZQdZKKpnfbhncLVCGNPEbUFh.amizAHSrU+FnBkBd

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
  level: panic

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
    - sunt qui laborum
    - tempor consequat ut
    - aliquip nisi deserunt amet non
    - ullamco in enim tempor
    - reprehenderitdolore eu mollit

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
    memory: 19065345

    ## iterations ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_ITERATIONS=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_ITERATIONS=<value>
    #
    iterations: 14329291

    ## parallelism ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_PARALLELISM=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_PARALLELISM=<value>
    #
    parallelism: 4660409

    ## salt_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_SALT_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_SALT_LENGTH=<value>
    #
    salt_length: 63087355

    ## key_length ##
    #
    # Set this value using environment variables on
    # - Linux/macOS:
    #    $ export HASHERS_ARGON2_KEY_LENGTH=<value>
    # - Windows Command Line (CMD):
    #    > set HASHERS_ARGON2_KEY_LENGTH=<value>
    #
    key_length: 15695038
```
