The `password` strategy implements the most-common used form of authentication and registration: An identifier (username,
email, phone number, ...) and a password.

## Considerations

It's not just an email and a password!

Before you start, you need to decide what data you want to collect from your users
and why! It is hard to impossible to change this decision afterwards, so make sure you've taken everything into account!

### Defining Identifier ("Username") Patterns

When logging in, the user will use a login identifier and a password to sign up and in. The identifier can be

- a username - e.g. "john.doe" or "johndoe123" or "oryuser",
- an email address - e.g. `john.doe@gmail.com`,
- a phone number - e.g. `+49 1234 4321 1234 4321`.

All of these approaches have up- and downsides.

Using the email address as the login identifier is easy to remember, does not require additional fields (because the email
address is already being collected), and is usually unique. It's usually unique because sometimes companies use a
"shared" email account (e.g. office@acme.org) to access services. In that case, multiple real identities are using
the same email identifier to log in.

The email address however represents a unique identifier and personally identifiable information (PII). An attacker
could for example check if an email address (e.g. `john.doe@gmail.com`) is registered at a site (e.g. an adult website)
and use that information for blackmail.

The same considerations apply to using a phone number as the login identifier.

Using a free text username reduces the privacy risk because it is much harder to make a connection between the username
and a real world identity. It's still possible in cases where users choose a username such as "john.doe.from.mineapolis.1970",
but finding the right username identifier is still difficult and there is plausible deniability because anyone
could use that username.

A free text username however requires capturing additional fields (e.g. an email address for password resets / account recovery)
and is hard to remember. It is often very difficult to find unique usernames as people tend to use a combination of their
names and initials (e.g. `john.doe`) which has a high chance of collision. Therefore, one ends up with usernames such as
`john.doe1234432`. 

You need to decide which route you want to take. ORY Kratos has [Account Enumeration Defenses](#account-enumeration-defenses)
built in which are enabled by default and supports email, phone, and free text username login identifiers.

#### Email Login Identifier

To use the email address as the login identifier, define the following Identity Traits Schema:

```json
{
  "$id": "https://example.com/registration.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": "email",
      "ory.sh/kratos": {
        "credentials": {
          "password": {
            "identifier": true
          }
        }
      }
    }
  }
}
```

#### Username Login Identifier

To use the email address as the login identifier, define the following Identity Traits Schema:

```json
{
  "$id": "https://example.com/registration.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": "email",
      "ory.sh/kratos": {
        "credentials": {
          "password": {
            "identifier": true
          }
        }
      }
    }
  }
}
```

#### Phone Number Login Identifier

This feature is not yet available but planned, see: https://github.com/ory/kratos/issues/137

### Verification

## Security

### Anti-automation

Actions that cause out-of-band communications, such as sending an activation link via email or an activation code
via SMS, can be abused by automated systems. The goal of such an attack is to send out so many emails or SMS, that your
reputation worsens (spam filters) or you're faced with massive costs (carrier fees).

CAPTCHA renders these attacks either very difficult or impossible. ORY Kratos has CAPTCHA support built-in. ORY Kratos
will prompt the user to complete a CAPTCHA in the following scenarios:

- The user tries to register more than one account within 72 hours.
- The user failed provide valid credentials for the third time within 12 hours.
- The user tries to recover their account for the second time within 72 hours.

Please note that this feature is on the roadmap and not yet implemented. You can check the status
of this feature at: https://github.com/ory/kratos/issues/138

For integration guidelines, please check the individual flow's (registration, login, account recovery)
integration documentation.

### Account Enumeration Defenses

Account enumeration attacks allow a attacker to find out who is signed up. This compromises the privacy of your users
and can hurt reputation depending on the service (e.g. "adult content").

This attack usually makes only sense if an email address or a phone number is collected during registration. For
chosen usernames, this attack is much more difficult, as the attacker has to know what usernames the victim is using.

There are three common ways an attacker can figure out if a user is signed up at a service:

- During login: "No user with this email address was found"
- During registration: "A user with this email address exists already"
- During password reset: "No user with this email address was found"

To mitigate this attack, the following strategies need to be deployed:

- The login form should return the same message regardless of whether the password is wrong or the email/username does
not exist: "The provided credentials are invalid."
- The password reset form should always return a success message and send out an email. If the email address is registered,
a normal password reset email is sent. If the email address is not registered, an email is sent to the address indicating
that no account is set up with that email address. This is helpful to users that have multiple email addresses and are
using the wrong email address for the password reset.
- The registration form should also always return a success message and send out an email. If the email address is not yet registered,
a regular "account activation" email is sent out. If the email address is registered already, a email is sent out
telling the user that the account is already set up, and link to the login screen.

If you wish to mitigate account enumeration attacks, it is important to note that you can not sign in users
directly after sign up! Depending on the type of service you provide, you might not care about this specific attack
in which case direct login after sign up would be ok.

#### Enabling Account Enumeration Defenses

Assuming you wish to enable account enumeration defenses, you need to configure ORY Kratos as follows:

- Collect one or more email addresses during sign up and enable email verification.
- **Do not** enable the `session` post-registration workflow. Use only the `redirect` post-registration workflow.

```yaml
selfservice:
  registration:
    after:
      password:
        # !! DO NOT enable `session` or all registration processes will fail!!
        # - run: session
  
        # You **must** enable identifier verification or no email will be sent and the registration is thus just a blank
        # entry in the database with no way of logging in.
        - run: verify

        # You **must** enable redirection. The page should show a message such as: "Registration complete, please
        # check your email for further steps". The user will be redirected to this page regardless of the registration
        # status (success, invalid).
        - run: redirect
          config:
            default_redirect_url: http://test.kratos.ory.sh:4000/registration_next_steps
```

#### Disable Account Enumeration Defenses

Enforcing email verification, which requires an email round trip and disrupts the sign up process, is not always
feasible. In these cases, you might want to disable account enumeration defenses.

You can disable the defense mechanism on a per-field basis in your Identity Traits Schema:

```yaml
{
  "$id": "https://example.com/registration.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "ory.sh/kratos": {
        "credentials": {
          "password": {
            "identifier": true,
            "disable_account_enumeration_defenses": true
          }
        }
      }
    }
  }
}
```

This will tell ORY Kratos to display messages such as "a user with this email address exists already" and "no user with
this email address is registered on this site". You can then enable the `session` post-registration workflow:

```yaml
selfservice:
  registration:
    after:
      password:
        - run: session

        # You can optionally enable verification of the provided email address(es) or phone number(s)
        # - run: verify
        
        # You may now directly redirect to e.g. the dashboard:
        - run: redirect
          config:
            default_redirect_url: http://test.kratos.ory.sh:4000/dashboard
```

### Passwords

Almost every service with a login offers some type of registration using a password. Therefore, there are many
strategies floating around, with many of them implementing terrible and insecure patterns such as:

- Not allowing special characters in passwords.
- Not allowing the use of password managers by disabling the "paste" functionality in password fields.
- Requiring you to rotate your password every month.
- ...

ORY Kratos implements best practices, established by authorities such as the
[National Institute of Standards and Technology](https://www.nist.gov) and security researches
like [Troy Hunt](https://www.troyhunt.com), to provide you with maximum security when it comes to protecting your
users and their data!

This is a rundown of all the practices ORY Kratos implements and why. **Some things need to be implemented by yourself**
as they must be implemented in the User Interface that interfaces with ORY Kratos. You can find these in section
[User Interface Guidelines](#user-interface-guidelines).

#### Password Complexity

This outline and quotes are defined in the 
[NIST Digital Identity Guidelines - 5.1.1.2 Memorized Secret Verifiers](https://pages.nist.gov/800-63-3/sp800-63b.html).
ORY Kratos, unless explicitly advertised, implements these guidelines and best practices.

Passwords must have a minimum length of 8 characters and all characters (unicode, ASCII) must be allowed:

> Verifiers SHALL require subscriber-chosen memorized secrets to be at least 8 characters in length. Verifiers SHOULD permit subscriber-chosen memorized secrets at least 64 characters in length. All printing ASCII [RFC 20] characters as well as the space character SHOULD be acceptable in memorized secrets. Unicode [ISO/ISC 10646] characters SHOULD be accepted as well. To make allowances for likely mistyping, verifiers MAY replace multiple consecutive space characters with a single space character prior to verification, provided that the result is at least 8 characters in length. Truncation of the secret SHALL NOT be performed. For purposes of the above length requirements, each Unicode code point SHALL be counted as a single character.

Passwords must be checked against a database of compromised secrets such as [Have I Been Pwnd](https://haveibeenpwned.com):

> When processing requests to establish and change memorized secrets, verifiers SHALL compare the prospective
>secrets against a list that contains values known to be commonly-used, expected, or compromised. For example, the
>list MAY include, but is not limited to:
>
> * Passwords obtained from previous breach corpuses.
> * Dictionary words.
> * Repetitive or sequential characters (e.g. ‘aaaaaa’, ‘1234abcd’).
> * Context-specific words, such as the name of the service, the username, and derivatives thereof.
>
> If the chosen secret is found in the list, the CSP or verifier SHALL advise the subscriber that they need to select a
> different secret, SHALL provide the reason for rejection, and SHALL require the subscriber to choose a different value.

Show the user a password-strength meter (to be implemented, see [#136](https://github.com/ory/kratos/issues/136)):

> Verifiers SHOULD offer guidance to the subscriber, such as a password-strength meter [Meters], to assist the user in
> choosing a strong memorized secret. This is particularly important following the rejection of a memorized secret on
> the above list as it discourages trivial modification of listed (and likely very weak) memorized secrets

Do not require mixtures of characters types or prohibiting repeated characters:

> Verifiers SHOULD NOT impose other composition rules (e.g., requiring mixtures of different character types or
> prohibiting consecutively repeated characters) for memorized secrets. Verifiers SHOULD NOT require memorized
> secrets to be changed arbitrarily (e.g., periodically). However, verifiers SHALL force a change if there is
> evidence of compromise of the authenticator.

#### User Interface Guidelines

These best practices need to be implemented in your User Interface and can not be handled by ORY Kratos. All
ORY-built reference and demo applications implement these best practices:

Allow pasting of passwords:
  
> Verifiers SHOULD permit claimants to use “paste” functionality when entering a memorized secret. This facilitates
> the use of password managers, which are widely used and in many cases increase the likelihood that users will choose
> stronger memorized secrets.

Allow the user to show the secret in the UI:

> In order to assist the claimant in successfully entering a memorized secret, the verifier SHOULD offer an option
>to display the secret — rather than a series of dots or asterisks — until it is entered. This allows the claimant
>to verify their entry if they are in a location where their screen is unlikely to be observed. The verifier MAY also
>permit the user’s device to display individual entered characters for a short time after each character is typed to
>verify correct entry. This is particularly applicable on mobile devices.

## Password Hints

> Memorized secret verifiers SHALL NOT permit the subscriber to store a “hint” that is accessible to an unauthenticated claimant.
>
> [NIST Digital Identity Guidelines - 5.1.1.2 Memorized Secret Verifiers](https://pages.nist.gov/800-63-3/sp800-63b.html)



###### from passwords.md

## Password Strategies


DefaultPasswordValidationStrategy implements a default strategy for validating passwords. It is based on best
practices as defined in the following blog posts:

- https://www.troyhunt.com/passwords-evolved-authentication-guidance-for-the-modern-era/
- https://www.microsoft.com/en-us/research/wp-content/uploads/2016/06/Microsoft_Password_Guidance-1.pdf

Additionally passwords are being checked against Troy Hunt's
[haveibeenpwnd](https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange) service to check if the
password has been breached in a previous data leak using k-anonymity.


## No password repeat

https://uxmovement.com/forms/why-the-confirm-password-field-must-die/

