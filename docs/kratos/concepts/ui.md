---
id: ui
title: User Interface
---

ORY Kratos has no user interface included. Instead, it provides API and uses HTTP-native flows to make it
as easy as possible to implement a UI for ORY Kratos. There are two types of UIs you might want for ORY Kratos.

## Administrative User Interface (AUI)

The AUI might show all of the Identities in the system and provide features to administrators such as editing
profiles, resetting passwords, and so on.

We do not provide an Open Source AUI for ORY Kratos. ORY Cloud customers of course do have access to such a UI
as part of the platform.

## Self-service User Interface (SSUI)

The SSUI shows screens such as "login", "registration", "update your profile", "recover your account", and others.
You can find an exemplary SSUI at [github.com/ory/kratos-selfservice-ui-node](https://github.com/ory/kratos-selfservice-ui-node).

The SSUI can be implemented in any programming language of your liking (Java, Node, ...) and can be both a server or a
client (Browser, Mobile Phone, ...) app! Implementing a SSUI is easy and straight forward. There is no complex
authentication mechanism required and you do not need to worry about possible attack vectors such as CSRF or Session Attacks
because ORY Kratos does that for you.

Chapter "Self Service" contains further information on APIs and flows related to the SSUI, and how you would implement
such an app yourself!
