# Cross Origin Resource Sharing (CORS) Configuration Schema

```
https://raw.githubusercontent.com/ory/x/master/.schemas/corsx/viper.schema.json
```

Configure [Cross Origin Resource Sharing (CORS)](http://www.w3.org/TR/cors/) using the following options.

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                                   |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | -------------------------------------------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Forbidden             | [corsx/viper.schema.json](viper.schema.json) |

# Cross Origin Resource Sharing (CORS) Configuration Properties

| Property                                | Type       | Required | Nullable | Default                                 | Defined by                                                       |
| --------------------------------------- | ---------- | -------- | -------- | --------------------------------------- | ---------------------------------------------------------------- |
| [allow_credentials](#allow_credentials) | `boolean`  | Optional | No       | `false`                                 | Cross Origin Resource Sharing (CORS) Configuration (this schema) |
| [allowed_headers](#allowed_headers)     | `string[]` | Optional | No       | `["Authorization","Content-Type"]`      | Cross Origin Resource Sharing (CORS) Configuration (this schema) |
| [allowed_methods](#allowed_methods)     | `enum[]`   | Optional | No       | `["GET","POST","PUT","PATCH","DELETE"]` | Cross Origin Resource Sharing (CORS) Configuration (this schema) |
| [allowed_origins](#allowed_origins)     | `string[]` | Optional | No       | `["*"]`                                 | Cross Origin Resource Sharing (CORS) Configuration (this schema) |
| [debug](#debug)                         | `boolean`  | Optional | No       | `false`                                 | Cross Origin Resource Sharing (CORS) Configuration (this schema) |
| [enabled](#enabled)                     | `boolean`  | Optional | No       | `false`                                 | Cross Origin Resource Sharing (CORS) Configuration (this schema) |
| [exposed_headers](#exposed_headers)     | `string[]` | Optional | No       | `["Content-Type"]`                      | Cross Origin Resource Sharing (CORS) Configuration (this schema) |
| [max_age](#max_age)                     | complex    | Optional | No       |                                         | Cross Origin Resource Sharing (CORS) Configuration (this schema) |

## allow_credentials

### Allow HTTP Credentials

Indicates whether the request can include user credentials like cookies, HTTP authentication or client side SSL
certificates.

`allow_credentials`

- is optional
- type: `boolean`
- default: `false`
- defined in this schema

### allow_credentials Type

`boolean`

## allowed_headers

### Allowed Request HTTP Headers

A list of non simple headers the client is allowed to use with cross-domain requests.

`allowed_headers`

- is optional
- type: `string[]`

- default: `["Authorization","Content-Type"]`
- defined in this schema

### allowed_headers Type

Array type: `string[]`

All items must be of the type: `string`

## allowed_methods

### Allowed HTTP Methods

A list of methods the client is allowed to use with cross-domain requests.

`allowed_methods`

- is optional
- type: `enum[]`

- default: `["GET","POST","PUT","PATCH","DELETE"]`
- defined in this schema

### allowed_methods Type

Array type: `enum[]`

All items must be of the type: `string`

## allowed_origins

### Allowed Origins

A list of origins a cross-domain request can be executed from. If the special _ value is present in the list, all
origins will be allowed. An origin may contain a wildcard (_) to replace 0 or more characters (i.e.:
http://*.domain.com). Usage of wildcards implies a small performance penality. Only one wildcard can be used per
origin.

`allowed_origins`

- is optional
- type: `string[]`

- default: `["*"]`
- defined in this schema

### allowed_origins Type

Array type: `string[]`

All items must be of the type: `string`

- minimum length: 1 characters

### allowed_origins Examples

```json
"https://example.com"
```

```json
"https://*.example.com"
```

```json
"https://*.foo.example.com"
```

## debug

### Enable Debugging

Set to true to debug server side CORS issues.

`debug`

- is optional
- type: `boolean`
- default: `false`
- defined in this schema

### debug Type

`boolean`

## enabled

### Enable CORS

If set to true, CORS will be enabled and preflight-requests (OPTION) will be answered.

`enabled`

- is optional
- type: `boolean`
- default: `false`
- defined in this schema

### enabled Type

`boolean`

## exposed_headers

### Allowed Response HTTP Headers

Indicates which headers are safe to expose to the API of a CORS API specification

`exposed_headers`

- is optional
- type: `string[]`

- default: `["Content-Type"]`
- defined in this schema

### exposed_headers Type

Array type: `string[]`

All items must be of the type: `string`

## max_age

`max_age`

- is optional
- type: complex
- defined in this schema

### max_age Type

Unknown type ``.

```json
{
  "simpletype": "complex"
}
```
