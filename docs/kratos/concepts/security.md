---
id: security
title: Threat Models and Security Profiles
---

Running any software that stores personal information exposes the developer/company to risks. Analyzing which threat agents
pose a risk, understanding the possible motivations for an attack, or why an agent is a threat, knowing the attack surface, the likelihood, and the impact are important all aspects of a threat model.

This documentation can not substitute a thorough and serious threat model, yet it will provide some guidelines to help configure ORY Kratos in a way that makes it best suited for any risk assessment.

> Please be aware that this chapter is still work in progress. Not all mitigation strategies have been implemented yet
> in ORY Kratos!

## Understanding Threats

This section examines several threat vectors in systems that manage identities.

### Account Enumeration Attacks

> "Often, web applications reveal when a username exists on system, either as a consequence of a misconfiguration or as a design decision. For example, sometimes, when we submit wrong credentials, we receive a message that states that either the username is present on the system or the provided password is wrong. The information obtained can be used by an attacker to gain a list of users on system. This information can be used to attack the web application, for example, through a brute force or default username/password attack.
  Description of the Issue"
>
> [Source](https://wiki.owasp.org/index.php/Testing_for_User_Enumeration_and_Guessable_User_Account_(OWASP-AT-002))

#### Scenarios

Considering the above, an example would be for example an adult website. A threat agent wants to blackmail a well known politician by checking if someone can sign up at that website using the `well-known-politician@email.com` email.

If the service responds with `Sorry, that email is already signed up here. Did you try to log in instead?`, the agent
is able to proceed with some type of blackmail scheme.

[OWASP defines several Black-Box tests](https://wiki.owasp.org/index.php/Testing_for_User_Enumeration_and_Guessable_User_Account_(OWASP-AT-002)#Black_Box_testing_and_example)
that cover Account Enumeration Scenarios.

#### Mitigation

ORY Kratos can be configured to send an out-of-band message to the email used for login, registration, account recovery,
etc.:

- If an application or user tries to sign in using an unknown email address, an email will be sent to that address reading "You tried
to sign in at X but you do not have an account yet, did you mean to sign up instead?"
- ...

### Bruteforce Attacks

Will be addressed in a future release.

### Phishing Attacks

Will be addressed in a future release.

### Social Engineering Attacks

Will be addressed in a future release.

### SMS Spoofing Attacks

Will be addressed in a future release.

## Choosing the right Security Profile and Configuration

Will be addressed in a future release.

### Argon2

Will be addressed in a future release.

## Digital Identity Guidelines

There is no one standard to digital identity. ORY Kratos closely follows emerging frameworks and guidelines such as:
[Digital Identity Guidelines established by the National Institute of Standards and Technology (NIST)](https://pages.nist.gov/800-63-3/)
(and a follow-up [FAQ](https://pages.nist.gov/800-63-3/)) .

As ORY Kratos grows, this document will continue to expand and add sections covering individual security recommendations established by NIST.

### Password Policy

Troy Hunt has written an [excellent piece on password policies](https://www.troyhunt.com/passwords-evolved-authentication-guidance-for-the-modern-era/)
and why they recently changed and how.

ORY Kratos implements a password policy that:

- Checks if a password has previously been leaked using the [HIBP API](https://haveibeenpwned.com/API/v2); and
- Checks if a password is too similar to one of the identifiers [kratos#184](https://github.com/ory/kratos/issues/184).
