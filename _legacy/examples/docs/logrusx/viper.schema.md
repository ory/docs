# Log Configuration Schema

```
https://raw.githubusercontent.com/ory/x/master/.schemas/logrusx/viper.schema.json
```

Configure logging using the following options. Logging will always be sent to stdout and stderr.

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                                     |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------------------------------------------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Forbidden             | [logrusx/viper.schema.json](viper.schema.json) |

# Log Configuration Properties

| Property          | Type   | Required | Nullable | Default  | Defined by                      |
| ----------------- | ------ | -------- | -------- | -------- | ------------------------------- |
| [format](#format) | `enum` | Optional | No       | `"text"` | Log Configuration (this schema) |
| [level](#level)   | `enum` | Optional | No       | `"info"` | Log Configuration (this schema) |

## format

### Log Format

The log format can either be text or JSON.

`format`

- is optional
- type: `enum`
- default: `"text"`
- defined in this schema

The value of this property **must** be equal to one of the [known values below](#format-known-values).

### format Known Values

| Value  | Description |
| ------ | ----------- |
| `text` |             |
| `json` |             |

## level

### Log Level

Debug enables stack traces on errors. Can also be set using environment variable LOG_LEVEL.

`level`

- is optional
- type: `enum`
- default: `"info"`
- defined in this schema

The value of this property **must** be equal to one of the [known values below](#level-known-values).

### level Known Values

| Value   | Description |
| ------- | ----------- |
| `panic` |             |
| `fatal` |             |
| `error` |             |
| `warn`  |             |
| `info`  |             |
| `debug` |             |
