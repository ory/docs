---
id: configuring
title: Configuration
---

All Ory services share the same configuration system. This page documents the details and edge cases that apply to all Ory
services.

:::info

Please note that Ory Oathkeeper uses an old configuration library and doesn't yet respect everything explained in this document.

:::

To find out more about configuring the individual services head to their corresponding sections.

## Configuration Format

In Ory, configuration keys use underscores to separate words:

```yaml
some_config: value
# Not:
# someConfig: value
```

Often, configuration keys have sub-keys

```yaml
oauth2:
  require_client_auth: true
```

or arrays:

```yaml
social_sign_in:
  providers:
    - provider: google
```

## Loading Configuration from Files

Configuration can be loaded from the file system. Ory supports loading configuration from YAML

```yaml
some_config: value
```

and JSON files

```json
{
  "some_config": "value"
}
```

You can combine several configuration files by defining the `-c` or `--config` flag multiple times when calling the CLI command or
when importing configuration files to Ory Network:

```
someCommand --config file/a.yml --config file/b.yml
```

The files are then merged in order. Here, `a.yml`'s values are overwritten by `b.yml`.

:::info

When merging configuration values, the configuration system will try its best to merge the keys. Please note that array values
will be overwritten!

```yml
--- # file A
foo:
  - id: bar
--- # file B
foo:
  - id: baz
--- # Result
foo:
  - id: baz
```

:::

## Loading Configuration from Environment Variables

In cases where you need to load secret values - this is usually the case when deploying Ory open source services yourself - you
can use environment variables to override configuration values from files or CLI flags.

It's possible to set _any_ configuration value from environment variables. To understand how this works, let's look at an example:

```yaml
some:
  nested_key:
    with_a_value: foo
    and_array:
      - id: foo
      - id: bar
```

The above values can be set with using the following environment variables:

```shell
# Linux / macOS
export SOME_NESTED_KEY_WITH_A_VALUE=foo
export SOME_NESTED_KEY_AND_ARRAY_0_ID=foo
export SOME_NESTED_KEY_AND_ARRAY_1_ID=bar

# Windows CMD
set SOME_NESTED_KEY_WITH_A_VALUE=foo
set SOME_NESTED_KEY_AND_ARRAY_0_ID=foo
set SOME_NESTED_KEY_AND_ARRAY_1_ID=bar

# Windows Powershell
$env:SOME_NESTED_KEY_WITH_A_VALUE = foo
$env:SOME_NESTED_KEY_AND_ARRAY_0_ID = foo
$env:SOME_NESTED_KEY_AND_ARRAY_1_ID = bar
```

As you can see, subkeys are separated with an underscore `_`. If a subkey is an array, you can reference the array item by using
the array index (`0`, `1`). It is also possible to define a new array by using an array index that isn't yet set:

```shell
export SOME_NESTED_KEY_AND_ARRAY_2_ID=baz
```

The above would result in:

```yaml
some:
  nested_key:
    with_a_value: foo
    and_array:
      - id: foo
      - id: bar
      - id: baz
```

It's also possible to use JSON strings to denote complex configuration keys:

```shell
# Linux / macOS
export SOME_NESTED_KEY_AND_ARRAY='[{"id":"foo"},{"id":"bar"}]'
# Windows CMD
set SOME_NESTED_KEY_AND_ARRAY='[{"id":"foo"},{"id":"bar"}]'
# Windows Powershell
$env:SOME_NESTED_KEY_AND_ARRAY = '[{"id":"foo"},{"id":"bar"}]'
```

## Loading Configuration from CLI Flags

When using the CLI, you can also set configuration values using CLI flags. This option however is very rare and you will usually
find configuration files or environment variables to set configuration values. To find information about CLI flags, append the
help flag (`-h`) to the command you wish to use.

## Configuration Types

Ory uses JSON Schemas to define the configuration layout. JSON Schema defines types, which means that Ory is able to guess the
type and convert strings (for example when using environment variables) to the correct type! A boolean type is converted to `true`
or `false` accordingly for:

```bash
export SOME_VAR=true
export SOME_OTHER_VAR=false
```

The same applies to strings and numbers!
