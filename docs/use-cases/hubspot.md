---
id: hubspot
title: Integration with Hubspot
sidebar_label: Integration with Hubspot
---

# Use case: Integrate Ory Actions with the Hubspot CRM platform

[Hubspot](https://www.hubspot.com/) is a CRM platform that can be used to manage and integrate data from marketing, sales, content
management, and customer services. The Hubspot platform also offers an extensive API, which can be used for developing
integrations. In particular, you can integrate Hubspot with the Ory Network registration flow, so that new contacts are
automatically created in the Hubspot contacts list whenever users register with an Ory Network project.

The advantage of integrating Ory Network with Hubspot is that users signing up with the Ory Network project automatically become
available to the CRM platform, facilitating lead generation and marketing campaigns (provided that users give the appropriate
consents).

## How Ory integrates with Hubspot

The following diagram illustrates how Ory integrates with Hubspot. In this example, we consider the case where the registration
flow in Ory triggers an API call to Hubspot, automatically creating a new contact in Hubspot. In other words, a new record is
created simultaneously in the Ory Identities database and in the Hubspot contacts list.

![Registration flow with Hubspot integration](./_static/hubspot-reg-flow.png)

In this example, the API call to Hubspot is triggered as follows:

1. The end user signs up to a new account using Ory Identities, completing the registration self-service flow.
2. Upon completion, the registration flow triggers any actions registered under the `flows.registration.after.hooks` section of
   Ory Identities configuration.
3. The hook for the Hubspot CRM platform, registered under `flows.registration.after.hooks`, is now triggered, and Ory evaluates
   the Jsonnet template to construct the body of the API call.
4. The Ory action invokes the `/com/v3/objects/conteacts` Hubspot API endpoint to create a new contact in Hubspot.

## Enabling webhooks for integration with Hubspot

To enable the registration flow described above, a system administrator must first set up the integration with Hubspot.

![Configuring Hubspot integration](./_static/hubspot-config.png)

In outline, the main steps for setting up the integration are, as follows:

1. The system administrator goes to the settings in the Hubspot dashboard and creates a new private app for this integration. For
   details of how to create a private app in Hubspot, see the
   [Private apps](https://developers.hubspot.com/docs/api/private-apps#make-api-calls-with-your-app-s-access-token) page in the
   Hubspot documentation.

2. The system administrator copies the access token (API key) from the new private app.

3. Using the API key from the previous step, the system administrator creates and registers an Ory Action for triggering a Hubspot
   API call whenever a user completes the registration flow. See
   [Hubspot integration with Ory Actions](https://www.ory.sh/docs/actions/integrations/hubspot) in the Ory documentation.
