---
id: passwordless
title: Passkeys and passwordless sign-in
sidebar_label: Passkeys and passwordless
---

## Use case: Using passwordless authentication to protect users against phishing attacks

Example corporation is considering the requirements for an authentication system that will be integrated into their new browser-based application.
They would prefer to avoid using a traditional password-based solution, because they have had bad experiences in the past, where some of their users were successfully targeted in phishing attacks.
They are also concerned about the possibility of a credentials stuffing attack on their system.
They have heard about passkeys and passwordless authentication as a potential solution which could protect their system against phishing attacks, but they would like to understand more, and to find out how Ory supports this solution.

## How does Ory support passwordless authentication?

For _browser-based apps_, Ory supports passwordless authentication out of the box.
Ory's self-service flows (for example, registration and login) support passwordless authentication by integrating with the W3C Web Authentication (WebAuthn) specification for browsers.
After enabling WebAuthn in an Ory project, the registration and login flows automatically present passwordless as an option.

Support for passkeys and passwordless varies, depending on whether you are using a browser-based app or a native app:
- For browser-based apps, passwordless works out of the box (leveraging WebAuthn).
- For native apps, you need to implement your own integration with the underlying platform, using the protocol defined in the CTAP2 specification.

Because passwordless is a relatively new technology, at the time of writing (in 2023) it has not yet been rolled out across all browsers and platforms, but adoption is spreading rapidly.
Very soon, passwordless authentication is expected to become available on all major platforms and browsers.
To check the current status of adoption, consult the FAQ on the [FIDO Alliance](https://fidoalliance.org/passkeys/) website.


### What is passwordless authentication?

Passkeys and passwordless authentication is a technology based on the specifications published by the [FIDO Alliance](https://fidoalliance.org/), sponsored by software companies with an interest in security technology and standards.
As the name implies, passwordless authentication is intended to replace traditional password-based authentication, enabling users to verify their identity using authenticators bound to the device they are using&mdash;for example, biometric measurement or PIN.

#### A sample login flow with passwordless

From the end user's perspective, logging in with passwordless is remarkably simple:

1. Ory's self-service login flow presents an option to log in using passwordless.
-> Screenshot of Ory Account Experience login
2. If the user chooses passwordless, the browser opens a special dialog (powered by WebAuthn), asking the user to choose one of the available verification methods (biometric, USB key, device pin, and so on).
-> Screenshot (example) of special dialog
3. The platform verifies the users identity using the chosen method.
4. Login/registration completes automatically.

#### Authenticator options with passwordless

These are some of the options that users might have for signing up or logging in, during a passwordless flow:

- Fingerprint
- Voice recognition
- Facial recognition
- Iris scan
- Handwriting recognition
- USB key &mdash; for example, YubiKey
- Device unlock / PIN (mobile phones)

#### Secrets stay on your device

It is important to note that, during a passwordless flow, "secrets" never leave your local device, in particular:

- The passkeys (private keys) are never sent to the server.
- Biometric data is never sent to the server.
- Codes from a USB key are never sent to the server.
- Device unlock code is never sent to the server.
- Passwords are never sent to the server.

In summary, passwordless is much easier to use, does not require you to remember a password, and is more secure than password-based login.

### How does passwordless work?

Given how easy and secure passwordless authentication is, it seems almost too good to be true.
The trick with passwordless, however, is that it leverages a powerful existing technology to verify the user's identity: symmetric keys and a challenge/response algorithm.
The underlying symmetric key technology is not new &mdash; for example, it is already commonly used for pushing commits to Git repositories &mdash; but FIDO automates the process, making it much more user friendly.

To understand how the WebAuthn leverages symmetric keys to implement the passwordless authentication flow, consider the following diagram, which illustrates the passwordless-based login flow.

TBD - DIAGRAM SHOWING PASSWORDLESS LOGIN FLOW

The main steps in the passwordless login flow are, as follows:

1. The app (running in the browser) requests FIDO authentication through the browser (leveraging the browser's support for WebAuthn).
2. WebAuthn pops up a dialog in the browser, presenting the user with options for verifying their identity.
3. After the user selects a verification option, WebAuthn asks the platform to verify the user's identity using that option (leveraging the CTAP2 standard for communication with the platform).
4. The platform prompts the user to verify their identity using either:
    - On-device authenticator, or
    - External authenticator
5. If the user identity is verified successfully, the platform finds the matching key-pair for the application in its keychain, and returns the public key to the browser (WebAuthn).
   The browser then forwards the public key to the app.
6. Now that the app has the user's public key, it can initiate the challenge/response protocol, to verify that the user is actually in possession of the corresponding private key.
   This is a critical step in the authentication flow, because this is the step where the app effectively confirms the user's identity.
   At the same time, note that the app is not in possession of any secrets from the user &mdash; in particular, the corresponding passkey (private key) has never left the keychain on the user's device.
   This is the step of the protocol that leverages the power of symmetric key authentication.
7. If the challenge/response step is successful, the Ory login flow creates a new login session and the user is logged in.


Contrast password approach
Passwordless registration
Passwordless login
Logging in across devices (use of Bluetooth technology - BLE)
Logging in across devices - use of O/S backup to transfer passkeys between devices (e.g. iCloud Keychain)

FIDO2 standards and protocols:
- WebAuthn (browser)
- CTAP2 (Client to Authenticator - communication with the O/S)

### Resistance to phishing

Explain how passwordless is immune to phishing.

### Log in with passwordless across multiple devices

Unique situation with passwordless, because the passkey is stored on the device.
Two possibilities for moving between devices:
- Once-off authentication using an external device
- Securely transfer passkey to new device

Platform support for transferring passkeys between devices:
- Apple iCloud Keychain -> makes passkeys available to of your Apple devices
