---
id: hydra-create-oauth2-client
title: hydra create oauth2-client
description: hydra create oauth2-client
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra create oauth2-client

Create an OAuth 2.0 Client

### Synopsis

This command creates an OAuth 2.0 Client which can be used to perform various OAuth 2.0 Flows like
the Authorize Code, Implicit, Refresh flow. This command allows settings all fields defined in the OpenID Connect Dynamic Client Registration standard.

To encrypt an auto-generated OAuth2 Client Secret, use flags `--pgp-key`, `--pgp-key-url` or `--keybase` flag, for example:

  hydra create oauth2-client --name "my app" --grant-type client_credentials --response-type token --scope core,foobar --keybase keybase_username


```
hydra create oauth2-client [flags]
```

### Examples

```
hydra create oauth2-client --name "my app" --redirect-uri http://localhost/cb --grant-type authorization_code --response-type code --scope core,foobar

Use the tool jq (or any other JSON tool) to get the OAuth2 Client ID and Secret:

client=$(hydra create oauth2-client \
    --format json \
    ...)
echo $client

# Parse the JSON response using jq to get the client ID and client secret:
client_id=$(echo $client | jq -r '.client_id')
client_secret=$(echo $client | jq -r '.client_secret')
```

### Options

```
      --access-token-strategy opaque                    The strategy used to generate access tokens. Valid options are opaque and `jwt`.
      --allowed-cors-origin strings                     The list of URLs allowed to make CORS requests. Requires CORS_ENABLED.
      --audience strings                                The audience this client is allowed to request.
      --backchannel-logout-callback string              Client URL that will cause the client to log itself out when sent a Logout Token by Hydra.
      --backchannel-logout-session-required             Boolean flag specifying whether the client requires that a sid (session ID) Claim be included in the Logout Token to identify the client session with the OP when the backchannel-logout-callback is used. If omitted, the default value is false.
      --client-uri string                               A URL string of a web page providing information about the client
      --contact strings                                 A list representing ways to contact people responsible for this client, typically email addresses.
      --file string                                     Read a JSON file representing a client from this location. If set, the other client flags are ignored.
      --frontchannel-logout-callback string             Client URL that will cause the client to log itself out when rendered in an iframe by Hydra.
      --frontchannel-logout-session-required            Boolean flag specifying whether the client requires that a sid (session ID) Claim be included in the Logout Token to identify the client session with the OP when the frontchannel-logout-callback is used. If omitted, the default value is false.
      --grant-type strings                              A list of allowed grant types. (default [authorization_code])
  -h, --help                                            help for oauth2-client
      --id string                                       Provide the client's id.
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
      --redirect-uri strings                            List of allowed OAuth2 Redirect URIs.
      --request-object-signing-alg string               Algorithm that must be used for signing Request Objects sent to the OP. (default "RS256")
      --request-uri strings                             Array of request_uri values that are pre-registered by the RP for use at the OP.
      --response-type strings                           A list of allowed response types. (default [code])
      --scope strings                                   The scope the client is allowed to request.
      --secret string                                   Provide the client's secret.
      --sector-identifier-uri string                    URL using the https scheme to be used in calculating Pseudonymous Identifiers by the OP. The URL references a file with a single JSON array of redirect_uri values.
      --skip-consent                                    Boolean flag specifying whether to skip the consent screen for this client. If omitted, the default value is false.
      --skip-logout-consent                             Boolean flag specifying whether to skip the logout consent screen for this client. If omitted, the default value is false.
      --subject-type public                             A identifier algorithm. Valid values are public and `pairwise`. (default "public")
      --token-endpoint-auth-method client_secret_post   Define which authentication method the client may use at the Token Endpoint. Valid values are client_secret_post, `client_secret_basic`, `private_key_jwt`, and `none`. (default "client_secret_basic")
      --tos-uri string                                  A URL string that points to a human-readable terms of service document for the client that describes a contractual relationship between the end-user and the client that the end-user accepts when authorizing the client.
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### See also

* [hydra create](hydra-create) Create resources

