---
id: hydra-serve-all
title: hydra serve all
description: hydra serve all
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra serve all

Serves both public and administrative HTTP/2 APIs

### Synopsis

Starts a process which listens on two ports for public and administrative HTTP/2 API requests.

If you want more granular control (e.g. different TLS settings) over each API group (administrative, public) you
can run "serve admin" and "serve public" separately.

This command exposes a variety of controls via environment variables. You can
set environments using "export KEY=VALUE" (Linux/macOS) or "set KEY=VALUE" (Windows). On Linux,
you can also set environments by prepending key value pairs: "KEY=VALUE KEY2=VALUE2 hydra"

All possible controls are listed below. This command exposes exposes command line flags, which are listed below
the controls section.

## Configuration

Ory Hydra can be configured using environment variables as well as a configuration file. For more information
on configuration options, open the configuration documentation:

>> https://www.ory.sh/hydra/docs/reference/configuration <<


```
hydra serve all [flags]
```

### Options

```
  -h, --help   help for all
```

### Options inherited from parent commands

```
  -c, --config strings   Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
      --dev              Disables critical security checks to improve local development experience. Do not use in production.
      --sqa-opt-out      Disable anonymized telemetry reports - for more information please visit https://www.ory.sh/docs/ecosystem/sqa
```

### See also

* [hydra serve](hydra-serve) Parent command for starting public and administrative HTTP/2 APIs

