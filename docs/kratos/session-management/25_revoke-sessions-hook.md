---
id: revoke-sessions-hook
title: Revoke other active user sessions after changing the password
sidebar_label: Revoke sessions with hooks
---

In certain use cases, it is important to increase security by terminating active user sessions when they change their password. To
do this, you can add the `revoke_active_sessions` Ory Action to the `hooks` configuration.

## Configuration overview

Add the `revoke_active_sessions' action to the settings hook configuration in the config file.

```yaml title="config.yml"
selfservice:
  settings:
    after:
      password:
        hooks:
          - hook: revoke_active_sessions
```
