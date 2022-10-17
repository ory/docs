---
id: ory-create-oauth2-client
title: ory create oauth2-client
description: ory create oauth2-client Create an OAuth 2.0 Client
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory create oauth2-client

Create an OAuth 2.0 Client

### Synopsis

This command creates an OAuth 2.0 Client which can be used to perform various OAuth 2.0 Flows like
the Authorize Code, Implicit, Refresh flow. This command allows settings all fields defined in the OpenID Connect Dynamic Client Registration standard.

To encrypt an auto-generated OAuth2 Client Secret, use flags `--pgp-key`, `--pgp-key-url` or `--keybase` flag, for example:

  {{ .CommandPath }} -n "my app" -g client_credentials -r token -a core,foobar --keybase keybase_username


```
ory create oauth2-client [flags]
```

### Examples

```
{{ .CommandPath }} -n "my app" -c http://localhost/cb -g authorization_code -r code -a core,foobar

Use the tool jq (or any other JSON tool) to get the OAuth2 Client ID and and Secret:

client=$({{ .CommandPath }} \
    --format json \
    ...)
echo $client

# Parse the JSON response using jq to get the client ID and client secret:
client_id=$(echo $client | jq -r '.client_id')
client_secret=$(echo $client | jq -r '.client_secret')
```

### Options

```
      --allowed-cors-origin strings                     The list of URLs allowed to make CORS requests. Requires CORS_ENABLED.
      --audience strings                                The audience this client is allowed to request.
      --backchannel-logout-callback string              Client URL that will cause the client to log itself out when sent a Logout Token by Hydra.
      --backchannel-logout-session-required             Boolean flag specifying whether the client requires that a sid (session ID) Claim be included in the Logout Token to identify the client session with the OP when the backchannel-logout-callback is used. If omitted, the default value is false.
      --client-uri string                               A URL string of a web page providing information about the client
      --contact strings                                 A list representing ways to contact people responsible for this client, typically email addresses.
      --frontchannel-logout-callback string             Client URL that will cause the client to log itself out when rendered in an iframe by Hydra.
      --frontchannel-logout-session-required            Boolean flag specifying whether the client requires that a sid (session ID) Claim be included in the Logout Token to identify the client session with the OP when the frontchannel-logout-callback is used. If omitted, the default value is false.
      --grant-type strings                              A list of allowed grant types. (default [authorization_code])
  -h, --help                                            help for oauth2-client
      --jwks-uri private_key_jwt                        Define the URL where the JSON Web Key Set should be fetched from when performing the private_key_jwt client authentication method.
      --keybase string                                  Keybase username for encrypting client secret.
      --logo-uri string                                 A URL string that references a logo for the client
      --metadata string                                 Metadata is an arbitrary JSON String of your choosing. (default "{}")
      --name string                                     The client's name.
      --owner string                                    The owner of this client, typically email addresses or a user ID.
      --pgp-key string                                  Base64 encoded PGP encryption key for encrypting client secret.
      --pgp-key-url string                              PGP encryption key URL for encrypting client secret.
      --policy-uri string                               A URL string that points to a human-readable privacy policy document that describes how the deployment organization collects, uses, retains, and discloses personal data.
      --post-logout-callback strings                    List of allowed URLs to be redirected to after a logout.
      --project string                                  The project to use
      --redirect-uri strings                            List of allowed OAuth2 Redirect URIs.
      --request-object-signing-alg string               Algorithm that must be used for signing Request Objects sent to the OP. (default "RS256")
      --request-uri strings                             Array of request_uri values that are pre-registered by the RP for use at the OP.
      --response-type strings                           A list of allowed response types. (default [code])
      --scope strings                                   The scope the client is allowed to request.
      --secret string                                   Provide the client's secret.
      --sector-identifier-uri string                    URL using the https scheme to be used in calculating Pseudonymous Identifiers by the OP. The URL references a file with a single JSON array of redirect_uri values.
      --subject-type public                             A identifier algorithm. Valid values are public and `pairwise`. (default "public")
      --token-endpoint-auth-method client_secret_post   Define which authentication method the client may use at the Token Endpoint. Valid values are client_secret_post, `client_secret_basic`, `private_key_jwt`, and `none`. (default "client_secret_basic")
      --tos-uri string                                  A URL string that points to a human-readable terms of service document for the client that describes a contractual relationship between the end-user and the client that the end-user accepts when authorizing the client.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory create](ory-create)	 - Create Ory Cloud resources

