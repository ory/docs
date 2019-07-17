# HTTPS Configuration Schema

```
https://raw.githubusercontent.com/ory/x/master/.schemas/tlsx/viper.schema.json
```

Configure HTTP over TLS (HTTPS). All options can also be set using environment variables by replacing dots (`.`) with
underscores (`_`) and uppercasing the key. For example, `some.prefix.tls.key.path` becomes
`export SOME_PREFIX_TLS_KEY_PATH`. If all keys are left undefined, TLS will be disabled.

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                                  |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ------------------------------------------- |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Forbidden             | [tlsx/viper.schema.json](viper.schema.json) |

# HTTPS Configuration Definitions

| Property          | Type     | Group                                                                                                |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| [base64](#base64) | `string` | `https://raw.githubusercontent.com/ory/x/master/.schemas/tlsx/viper.schema.json#/definitions/source` |
| [path](#path)     | `string` | `https://raw.githubusercontent.com/ory/x/master/.schemas/tlsx/viper.schema.json#/definitions/source` |

## base64

### Base64 Encoded

The base64 string of the PEM-encoded file content. Can be generated using for example `base64 -i path/to/file.pem`.

`base64`

- is optional
- type: `string`
- defined in this schema

### base64 Type

`string`

### base64 Example

```json
"LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr..."
```

## path

### Path to PEM-encoded Fle

`path`

- is optional
- type: `string`
- defined in this schema

### path Type

`string`

### path Example

```json
"path/to/file.pem"
```

# HTTPS Configuration Properties

| Property      | Type    | Required | Nullable | Defined by                        |
| ------------- | ------- | -------- | -------- | --------------------------------- |
| [cert](#cert) | complex | Optional | No       | HTTPS Configuration (this schema) |
| [key](#key)   | complex | Optional | No       | HTTPS Configuration (this schema) |

## cert

### TLS Certificate (PEM) Configuration

`cert`

- is optional
- type: complex
- defined in this schema

### cert Type

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

## key

### Private Key (PEM) Configuration

`key`

- is optional
- type: complex
- defined in this schema

### key Type

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1
