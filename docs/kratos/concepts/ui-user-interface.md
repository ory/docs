---
id: ui-user-interface
title: User Interface
---

ORY Kratos has no user interface included. Instead, it defines HTTP flows and APIs that make it incredibly easy to
write your own UI in the language and framework you like best!

There are two types of UIs you might want for ORY Kratos.

## Administrative User Interface (Admin UI)

The AUI might show all of the Identities in the system and provide features to
administrators such as editing profiles, resetting passwords, and so on.

We do not provide an Open Source AUI for ORY Kratos. ORY Cloud (TBA) customers of
course do have access to such a UI as part of the platform.

## Self-service User Interface (SSUI)

The SSUI shows screens such as "login", "registration", "update your profile",
"recover your account", and others. You can find a reference SSUI at
[github.com/ory/kratos-selfservice-ui-node](https://github.com/ory/kratos-selfservice-ui-node).

The SSUI can be implemented in any programming language  (Java,
Node, ...) and can be run both a server or a end-user device (Browser, Mobile Phone, ...)! Implementing a
SSUI is easy and straight forward. There is no complex
authentication mechanism required and you do not need to worry about possible
attack vectors such as CSRF or Session Attacks because ORY Kratos does that for
you.

Chapter [Self-Service Flows](../self-service/flows/index.md) contains further information on APIs and flows related to
the SSUI, and how you would implement such an app yourself!
