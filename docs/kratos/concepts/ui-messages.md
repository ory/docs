<!-- START MESSAGE TABLE -->

###### Sign in (1010001)

```json
{
  "id": 1010001,
  "text": "Sign in",
  "type": "info"
}
```

###### Sign in with {provider} (1010002)

```json
{
  "id": 1010002,
  "text": "Sign in with {provider}",
  "type": "info",
  "context": {
    "provider": "{provider}",
    "provider_id": "{providerID}"
  }
}
```

###### Please confirm this action by verifying that it is you. (1010003)

```json
{
  "id": 1010003,
  "text": "Please confirm this action by verifying that it is you.",
  "type": "info"
}
```

###### Please complete the second authentication challenge. (1010004)

```json
{
  "id": 1010004,
  "text": "Please complete the second authentication challenge.",
  "type": "info"
}
```

###### Verify (1010005)

```json
{
  "id": 1010005,
  "text": "Verify",
  "type": "info"
}
```

###### Authentication code (1010006)

```json
{
  "id": 1010006,
  "text": "Authentication code",
  "type": "info"
}
```

###### Backup recovery code (1010007)

```json
{
  "id": 1010007,
  "text": "Backup recovery code",
  "type": "info"
}
```

###### Sign in with hardware key (1010008)

```json
{
  "id": 1010008,
  "text": "Sign in with hardware key",
  "type": "info"
}
```

###### Use Authenticator (1010009)

```json
{
  "id": 1010009,
  "text": "Use Authenticator",
  "type": "info"
}
```

###### Use backup recovery code (1010010)

```json
{
  "id": 1010010,
  "text": "Use backup recovery code",
  "type": "info"
}
```

###### Sign in with hardware key (1010011)

```json
{
  "id": 1010011,
  "text": "Sign in with hardware key",
  "type": "info"
}
```

###### Prepare your WebAuthn device (e.g. security key, biometrics scanner, ...) and press continue. (1010012)

```json
{
  "id": 1010012,
  "text": "Prepare your WebAuthn device (e.g. security key, biometrics scanner, ...) and press continue.",
  "type": "info"
}
```

###### Continue (1010013)

```json
{
  "id": 1010013,
  "text": "Continue",
  "type": "info"
}
```

###### A code has been sent to the address you provided. If you have not received an message, check the spelling of the address and retry the login. (1010014)

```json
{
  "id": 1010014,
  "text": "A code has been sent to the address you provided. If you have not received an message, check the spelling of the address and retry the login.",
  "type": "info"
}
```

###### Send sign in code (1010015)

```json
{
  "id": 1010015,
  "text": "Send sign in code",
  "type": "info"
}
```

###### You tried to sign in with "{duplicateIdentifier}", but that email is already used by another account. Sign in to your account with one of the options below to add your account "{duplicateIdentifier}" at "{provider}" as another way to sign in. (1010016)

```json
{
  "id": 1010016,
  "text": "You tried to sign in with \"{duplicateIdentifier}\", but that email is already used by another account. Sign in to your account with one of the options below to add your account \"{duplicateIdentifier}\" at \"{provider}\" as another way to sign in.",
  "type": "info",
  "context": {
    "available_credential_types": ["{available_credential_types_list}"],
    "available_providers": ["{available_oidc_providers_list}"],
    "duplicateIdentifier": "{duplicateIdentifier}",
    "duplicate_identifier": "{duplicateIdentifier}",
    "newLoginUrl": "{newLoginUrl}",
    "new_login_url": "{newLoginUrl}",
    "provider": "{provider}"
  }
}
```

###### Sign in and link (1010017)

```json
{
  "id": 1010017,
  "text": "Sign in and link",
  "type": "info"
}
```

###### Confirm with {provider} (1010018)

```json
{
  "id": 1010018,
  "text": "Confirm with {provider}",
  "type": "info",
  "context": {
    "provider": "{provider}"
  }
}
```

###### Request code to continue (1010019)

```json
{
  "id": 1010019,
  "text": "Request code to continue",
  "type": "info"
}
```

###### Sign in with passkey (1010021)

```json
{
  "id": 1010021,
  "text": "Sign in with passkey",
  "type": "info"
}
```

###### Sign in with password (1010022)

```json
{
  "id": 1010022,
  "text": "Sign in with password",
  "type": "info"
}
```

###### Send code to {address} (1010023)

```json
{
  "id": 1010023,
  "text": "Send code to {address}",
  "type": "info",
  "context": {
    "address": "{address}",
    "channel": "{channel}"
  }
}
```

###### Sign up (1040001)

```json
{
  "id": 1040001,
  "text": "Sign up",
  "type": "info"
}
```

###### Sign up with {provider} (1040002)

```json
{
  "id": 1040002,
  "text": "Sign up with {provider}",
  "type": "info",
  "context": {
    "provider": "{provider}",
    "provider_id": "{providerID}"
  }
}
```

###### Continue (1040003)

```json
{
  "id": 1040003,
  "text": "Continue",
  "type": "info"
}
```

###### Sign up with security key (1040004)

```json
{
  "id": 1040004,
  "text": "Sign up with security key",
  "type": "info"
}
```

###### A code has been sent to the address(es) you provided. If you have not received a message, check the spelling of the address and retry the registration. (1040005)

```json
{
  "id": 1040005,
  "text": "A code has been sent to the address(es) you provided. If you have not received a message, check the spelling of the address and retry the registration.",
  "type": "info"
}
```

###### Send sign up code (1040006)

```json
{
  "id": 1040006,
  "text": "Send sign up code",
  "type": "info"
}
```

###### Sign up with passkey (1040007)

```json
{
  "id": 1040007,
  "text": "Sign up with passkey",
  "type": "info"
}
```

###### Back (1040008)

```json
{
  "id": 1040008,
  "text": "Back",
  "type": "info"
}
```

###### Please choose a credential to authenticate yourself with. (1040009)

```json
{
  "id": 1040009,
  "text": "Please choose a credential to authenticate yourself with.",
  "type": "info"
}
```

###### Your changes have been saved! (1050001)

```json
{
  "id": 1050001,
  "text": "Your changes have been saved!",
  "type": "success"
}
```

###### Link {provider} (1050002)

```json
{
  "id": 1050002,
  "text": "Link {provider}",
  "type": "info",
  "context": {
    "provider": "{provider}"
  }
}
```

###### Unlink {provider} (1050003)

```json
{
  "id": 1050003,
  "text": "Unlink {provider}",
  "type": "info",
  "context": {
    "provider": "{provider}"
  }
}
```

###### Unlink TOTP Authenticator App (1050004)

```json
{
  "id": 1050004,
  "text": "Unlink TOTP Authenticator App",
  "type": "info"
}
```

###### Authenticator app QR code (1050005)

```json
{
  "id": 1050005,
  "text": "Authenticator app QR code",
  "type": "info"
}
```

###### {secret} (1050006)

```json
{
  "id": 1050006,
  "text": "{secret}",
  "type": "info",
  "context": {
    "secret": "{secret}"
  }
}
```

###### Reveal backup recovery codes (1050007)

```json
{
  "id": 1050007,
  "text": "Reveal backup recovery codes",
  "type": "info"
}
```

###### Generate new backup recovery codes (1050008)

```json
{
  "id": 1050008,
  "text": "Generate new backup recovery codes",
  "type": "info"
}
```

###### {secret} (1050009)

```json
{
  "id": 1050009,
  "text": "{secret}",
  "type": "info",
  "context": {
    "secret": "{secret}"
  }
}
```

###### These are your back up recovery codes. Please keep them in a safe place! (1050010)

```json
{
  "id": 1050010,
  "text": "These are your back up recovery codes. Please keep them in a safe place!",
  "type": "info"
}
```

###### Confirm backup recovery codes (1050011)

```json
{
  "id": 1050011,
  "text": "Confirm backup recovery codes",
  "type": "info"
}
```

###### Add security key (1050012)

```json
{
  "id": 1050012,
  "text": "Add security key",
  "type": "info"
}
```

###### Name of the security key (1050013)

```json
{
  "id": 1050013,
  "text": "Name of the security key",
  "type": "info"
}
```

###### Secret was used at 2020-01-01 00:59:59 +0000 UTC (1050014)

```json
{
  "id": 1050014,
  "text": "Secret was used at 2020-01-01 00:59:59 +0000 UTC",
  "type": "info",
  "context": {
    "used_at": "2020-01-01T00:59:59Z",
    "used_at_unix": 1577840399
  }
}
```

###### {secrets_list} (1050015)

```json
{
  "id": 1050015,
  "text": "{secrets_list}",
  "type": "info",
  "context": {
    "secrets": [
      {
        "id": 1050009,
        "text": "{secret}",
        "type": "info",
        "context": {
          "secret": "{secret}"
        }
      },
      {
        "id": 1050014,
        "text": "Secret was used at 2020-01-01 00:59:59 +0000 UTC",
        "type": "info",
        "context": {
          "used_at": "2020-01-01T00:59:59Z",
          "used_at_unix": 1577840399
        }
      }
    ]
  }
}
```

###### Disable this method (1050016)

```json
{
  "id": 1050016,
  "text": "Disable this method",
  "type": "info"
}
```

###### This is your authenticator app secret. Use it if you can not scan the QR code. (1050017)

```json
{
  "id": 1050017,
  "text": "This is your authenticator app secret. Use it if you can not scan the QR code.",
  "type": "info"
}
```

###### Remove security key "{display_name}" (1050018)

```json
{
  "id": 1050018,
  "text": "Remove security key \"{display_name}\"",
  "type": "info",
  "context": {
    "added_at": "2020-01-01T00:59:59Z",
    "added_at_unix": 1577840399,
    "display_name": "{display_name}"
  }
}
```

###### Add passkey (1050019)

```json
{
  "id": 1050019,
  "text": "Add passkey",
  "type": "info"
}
```

###### Remove passkey "{display_name}" (1050020)

```json
{
  "id": 1050020,
  "text": "Remove passkey \"{display_name}\"",
  "type": "info",
  "context": {
    "added_at": "2020-01-01T00:59:59Z",
    "added_at_unix": 1577840399,
    "display_name": "{display_name}"
  }
}
```

###### You successfully recovered your account. Please change your password or set up an alternative login method (e.g. social sign in) within the next 1.00 minutes. (1060001)

```json
{
  "id": 1060001,
  "text": "You successfully recovered your account. Please change your password or set up an alternative login method (e.g. social sign in) within the next 1.00 minutes.",
  "type": "success",
  "context": {
    "privilegedSessionExpiresAt": "2020-01-01T01:01:00Z",
    "privileged_session_expires_at": "2020-01-01T01:01:00Z",
    "privileged_session_expires_at_unix": 1577840460
  }
}
```

###### An email containing a recovery link has been sent to the email address you provided. If you have not received an email, check the spelling of the address and make sure to use the address you registered with. (1060002)

```json
{
  "id": 1060002,
  "text": "An email containing a recovery link has been sent to the email address you provided. If you have not received an email, check the spelling of the address and make sure to use the address you registered with.",
  "type": "info"
}
```

###### An email containing a recovery code has been sent to the email address you provided. If you have not received an email, check the spelling of the address and make sure to use the address you registered with. (1060003)

```json
{
  "id": 1060003,
  "text": "An email containing a recovery code has been sent to the email address you provided. If you have not received an email, check the spelling of the address and make sure to use the address you registered with.",
  "type": "info"
}
```

###### A recovery code has been sent to {masked_address}. If you have not received it, check the spelling of the address and make sure to use the address you registered with. (1060004)

```json
{
  "id": 1060004,
  "text": "A recovery code has been sent to {masked_address}. If you have not received it, check the spelling of the address and make sure to use the address you registered with.",
  "type": "info",
  "context": {
    "masked_address": "{masked_address}"
  }
}
```

###### Recover access to your account by providing your recovery address in full. (1060005)

```json
{
  "id": 1060005,
  "text": "Recover access to your account by providing your recovery address in full.",
  "type": "info"
}
```

###### How do you want to recover your account? (1060006)

```json
{
  "id": 1060006,
  "text": "How do you want to recover your account?",
  "type": "info"
}
```

###### Back (1060007)

```json
{
  "id": 1060007,
  "text": "Back",
  "type": "info"
}
```

###### Password (1070001)

```json
{
  "id": 1070001,
  "text": "Password",
  "type": "info"
}
```

###### {title} (1070002)

```json
{
  "id": 1070002,
  "text": "{title}",
  "type": "info",
  "context": {
    "title": "{title}"
  }
}
```

###### Save (1070003)

```json
{
  "id": 1070003,
  "text": "Save",
  "type": "info"
}
```

###### ID (1070004)

```json
{
  "id": 1070004,
  "text": "ID",
  "type": "info"
}
```

###### Submit (1070005)

```json
{
  "id": 1070005,
  "text": "Submit",
  "type": "info"
}
```

###### Verify code (1070006)

```json
{
  "id": 1070006,
  "text": "Verify code",
  "type": "info"
}
```

###### Email (1070007)

```json
{
  "id": 1070007,
  "text": "Email",
  "type": "info"
}
```

###### Resend code (1070008)

```json
{
  "id": 1070008,
  "text": "Resend code",
  "type": "info"
}
```

###### Continue (1070009)

```json
{
  "id": 1070009,
  "text": "Continue",
  "type": "info"
}
```

###### Recovery code (1070010)

```json
{
  "id": 1070010,
  "text": "Recovery code",
  "type": "info"
}
```

###### Verification code (1070011)

```json
{
  "id": 1070011,
  "text": "Verification code",
  "type": "info"
}
```

###### Registration code (1070012)

```json
{
  "id": 1070012,
  "text": "Registration code",
  "type": "info"
}
```

###### Login code (1070013)

```json
{
  "id": 1070013,
  "text": "Login code",
  "type": "info"
}
```

###### Login and link credential (1070014)

```json
{
  "id": 1070014,
  "text": "Login and link credential",
  "type": "info"
}
```

###### Please complete the captcha challenge to continue. (1070015)

```json
{
  "id": 1070015,
  "text": "Please complete the captcha challenge to continue.",
  "type": "info"
}
```

###### Recovery address (1070016)

```json
{
  "id": 1070016,
  "text": "Recovery address",
  "type": "info"
}
```

###### Phone number (1070017)

```json
{
  "id": 1070017,
  "text": "Phone number",
  "type": "info"
}
```

###### An email containing a verification link has been sent to the email address you provided. If you have not received an email, check the spelling of the address and make sure to use the address you registered with. (1080001)

```json
{
  "id": 1080001,
  "text": "An email containing a verification link has been sent to the email address you provided. If you have not received an email, check the spelling of the address and make sure to use the address you registered with.",
  "type": "info"
}
```

###### You successfully verified your email address. (1080002)

```json
{
  "id": 1080002,
  "text": "You successfully verified your email address.",
  "type": "success"
}
```

###### An email containing a verification code has been sent to the email address you provided. If you have not received an email, check the spelling of the address and make sure to use the address you registered with. (1080003)

```json
{
  "id": 1080003,
  "text": "An email containing a verification code has been sent to the email address you provided. If you have not received an email, check the spelling of the address and make sure to use the address you registered with.",
  "type": "info"
}
```

###### {reason} (4000001)

```json
{
  "id": 4000001,
  "text": "{reason}",
  "type": "error",
  "context": {
    "reason": "{reason}"
  }
}
```

###### Property {property} is missing. (4000002)

```json
{
  "id": 4000002,
  "text": "Property {property} is missing.",
  "type": "error",
  "context": {
    "property": "{property}"
  }
}
```

###### length must be >= 5, but got 3 (4000003)

```json
{
  "id": 4000003,
  "text": "length must be \u003e= 5, but got 3",
  "type": "error",
  "context": {
    "actual_length": 3,
    "min_length": 5
  }
}
```

###### does not match pattern "{pattern}" (4000004)

```json
{
  "id": 4000004,
  "text": "does not match pattern \"{pattern}\"",
  "type": "error",
  "context": {
    "pattern": "{pattern}"
  }
}
```

###### The password can not be used because {reason}. (4000005)

```json
{
  "id": 4000005,
  "text": "The password can not be used because {reason}.",
  "type": "error",
  "context": {
    "reason": "{reason}"
  }
}
```

###### The provided credentials are invalid, check for spelling mistakes in your password or username, email address, or phone number. (4000006)

```json
{
  "id": 4000006,
  "text": "The provided credentials are invalid, check for spelling mistakes in your password or username, email address, or phone number.",
  "type": "error"
}
```

###### An account with the same identifier (email, phone, username, ...) exists already. (4000007)

```json
{
  "id": 4000007,
  "text": "An account with the same identifier (email, phone, username, ...) exists already.",
  "type": "error"
}
```

###### The provided authentication code is invalid, please try again. (4000008)

```json
{
  "id": 4000008,
  "text": "The provided authentication code is invalid, please try again.",
  "type": "error"
}
```

###### Could not find any login identifiers. Did you forget to set them? This could also be caused by a server misconfiguration. (4000009)

```json
{
  "id": 4000009,
  "text": "Could not find any login identifiers. Did you forget to set them? This could also be caused by a server misconfiguration.",
  "type": "error"
}
```

###### Account not active yet. Did you forget to verify your email address? (4000010)

```json
{
  "id": 4000010,
  "text": "Account not active yet. Did you forget to verify your email address?",
  "type": "error"
}
```

###### You have no TOTP device set up. (4000011)

```json
{
  "id": 4000011,
  "text": "You have no TOTP device set up.",
  "type": "error"
}
```

###### This backup recovery code has already been used. (4000012)

```json
{
  "id": 4000012,
  "text": "This backup recovery code has already been used.",
  "type": "error"
}
```

###### You have no WebAuthn device set up. (4000013)

```json
{
  "id": 4000013,
  "text": "You have no WebAuthn device set up.",
  "type": "error"
}
```

###### You have no backup recovery codes set up. (4000014)

```json
{
  "id": 4000014,
  "text": "You have no backup recovery codes set up.",
  "type": "error"
}
```

###### This account does not exist or has no security key set up. (4000015)

```json
{
  "id": 4000015,
  "text": "This account does not exist or has no security key set up.",
  "type": "error"
}
```

###### The backup recovery code is not valid. (4000016)

```json
{
  "id": 4000016,
  "text": "The backup recovery code is not valid.",
  "type": "error"
}
```

###### length must be <= 5, but got 6 (4000017)

```json
{
  "id": 4000017,
  "text": "length must be \u003c= 5, but got 6",
  "type": "error",
  "context": {
    "actual_length": 6,
    "max_length": 5
  }
}
```

###### must be >= 5 but found 3 (4000018)

```json
{
  "id": 4000018,
  "text": "must be \u003e= 5 but found 3",
  "type": "error",
  "context": {
    "actual": 3,
    "minimum": 5
  }
}
```

###### must be > 5 but found 5 (4000019)

```json
{
  "id": 4000019,
  "text": "must be \u003e 5 but found 5",
  "type": "error",
  "context": {
    "actual": 5,
    "minimum": 5
  }
}
```

###### must be <= 5 but found 6 (4000020)

```json
{
  "id": 4000020,
  "text": "must be \u003c= 5 but found 6",
  "type": "error",
  "context": {
    "actual": 6,
    "maximum": 5
  }
}
```

###### must be < 5 but found 5 (4000021)

```json
{
  "id": 4000021,
  "text": "must be \u003c 5 but found 5",
  "type": "error",
  "context": {
    "actual": 5,
    "maximum": 5
  }
}
```

###### 3 not multipleOf 7 (4000022)

```json
{
  "id": 4000022,
  "text": "3 not multipleOf 7",
  "type": "error",
  "context": {
    "actual": 3,
    "base": 7
  }
}
```

###### maximum 3 items allowed, but found 4 items (4000023)

```json
{
  "id": 4000023,
  "text": "maximum 3 items allowed, but found 4 items",
  "type": "error",
  "context": {
    "actual_items": 4,
    "max_items": 3
  }
}
```

###### minimum 3 items allowed, but found 2 items (4000024)

```json
{
  "id": 4000024,
  "text": "minimum 3 items allowed, but found 2 items",
  "type": "error",
  "context": {
    "actual_items": 2,
    "min_items": 3
  }
}
```

###### items at index 0 and 2 are equal (4000025)

```json
{
  "id": 4000025,
  "text": "items at index 0 and 2 are equal",
  "type": "error",
  "context": {
    "index_a": 0,
    "index_b": 2
  }
}
```

###### expected {allowed_types_list}, but got {actual_type} (4000026)

```json
{
  "id": 4000026,
  "text": "expected {allowed_types_list}, but got {actual_type}",
  "type": "error",
  "context": {
    "actual_type": "{actual_type}",
    "allowed_types": ["{allowed_types_list}"]
  }
}
```

###### An account with the same identifier (email, phone, username, ...) exists already. Please sign in to your existing account to link your social profile. (4000027)

```json
{
  "id": 4000027,
  "text": "An account with the same identifier (email, phone, username, ...) exists already. Please sign in to your existing account to link your social profile.",
  "type": "error"
}
```

###### You tried signing in with {credential_identifier_hint} which is already in use by another account. You can sign in using {available_credential_types_list}. You can sign in using one of the following social sign in providers: {Available_oidc_providers_list}. (4000028)

```json
{
  "id": 4000028,
  "text": "You tried signing in with {credential_identifier_hint} which is already in use by another account. You can sign in using {available_credential_types_list}. You can sign in using one of the following social sign in providers: {Available_oidc_providers_list}.",
  "type": "error",
  "context": {
    "available_credential_types": ["{available_credential_types_list}"],
    "available_oidc_providers": ["{available_oidc_providers_list}"],
    "credential_identifier_hint": "{credential_identifier_hint}"
  }
}
```

###### must be equal to constant {expected} (4000029)

```json
{
  "id": 4000029,
  "text": "must be equal to constant {expected}",
  "type": "error",
  "context": {
    "expected": "{expected}"
  }
}
```

###### const failed (4000030)

```json
{
  "id": 4000030,
  "text": "const failed",
  "type": "error"
}
```

###### The password can not be used because it is too similar to the identifier. (4000031)

```json
{
  "id": 4000031,
  "text": "The password can not be used because it is too similar to the identifier.",
  "type": "error"
}
```

###### The password must be at least 6 characters long, but got 5. (4000032)

```json
{
  "id": 4000032,
  "text": "The password must be at least 6 characters long, but got 5.",
  "type": "error",
  "context": {
    "actual_length": 5,
    "min_length": 6
  }
}
```

###### The password must be at most 72 characters long, but got 80. (4000033)

```json
{
  "id": 4000033,
  "text": "The password must be at most 72 characters long, but got 80.",
  "type": "error",
  "context": {
    "actual_length": 80,
    "max_length": 72
  }
}
```

###### The password has been found in data breaches and must no longer be used. (4000034)

```json
{
  "id": 4000034,
  "text": "The password has been found in data breaches and must no longer be used.",
  "type": "error",
  "context": {
    "breaches": 101
  }
}
```

###### This account does not exist or has not setup sign in with code. (4000035)

```json
{
  "id": 4000035,
  "text": "This account does not exist or has not setup sign in with code.",
  "type": "error"
}
```

###### The provided traits do not match the traits previously associated with this flow. (4000036)

```json
{
  "id": 4000036,
  "text": "The provided traits do not match the traits previously associated with this flow.",
  "type": "error"
}
```

###### This account does not exist or has no login method configured. (4000037)

```json
{
  "id": 4000037,
  "text": "This account does not exist or has no login method configured.",
  "type": "error"
}
```

###### Captcha verification failed, please try again. (4000038)

```json
{
  "id": 4000038,
  "text": "Captcha verification failed, please try again.",
  "type": "error"
}
```

###### The new password must be different from the old password. (4000039)

```json
{
  "id": 4000039,
  "text": "The new password must be different from the old password.",
  "type": "error"
}
```

###### The login flow expired 1.00 minutes ago, please try again. (4010001)

```json
{
  "id": 4010001,
  "text": "The login flow expired 1.00 minutes ago, please try again.",
  "type": "error",
  "context": {
    "expired_at": "2020-01-01T00:59:59Z",
    "expired_at_unix": 1577840399
  }
}
```

###### Could not find a strategy to log you in with. Did you fill out the form correctly? (4010002)

```json
{
  "id": 4010002,
  "text": "Could not find a strategy to log you in with. Did you fill out the form correctly?",
  "type": "error"
}
```

###### Could not find a strategy to sign you up with. Did you fill out the form correctly? (4010003)

```json
{
  "id": 4010003,
  "text": "Could not find a strategy to sign you up with. Did you fill out the form correctly?",
  "type": "error"
}
```

###### Could not find a strategy to update your settings. Did you fill out the form correctly? (4010004)

```json
{
  "id": 4010004,
  "text": "Could not find a strategy to update your settings. Did you fill out the form correctly?",
  "type": "error"
}
```

###### Could not find a strategy to recover your account with. Did you fill out the form correctly? (4010005)

```json
{
  "id": 4010005,
  "text": "Could not find a strategy to recover your account with. Did you fill out the form correctly?",
  "type": "error"
}
```

###### Could not find a strategy to verify your account with. Did you fill out the form correctly? (4010006)

```json
{
  "id": 4010006,
  "text": "Could not find a strategy to verify your account with. Did you fill out the form correctly?",
  "type": "error"
}
```

###### The request was already completed successfully and can not be retried. (4010007)

```json
{
  "id": 4010007,
  "text": "The request was already completed successfully and can not be retried.",
  "type": "error"
}
```

###### The login code is invalid or has already been used. Please try again. (4010008)

```json
{
  "id": 4010008,
  "text": "The login code is invalid or has already been used. Please try again.",
  "type": "error"
}
```

###### Linked credentials do not match. (4010009)

```json
{
  "id": 4010009,
  "text": "Linked credentials do not match.",
  "type": "error"
}
```

###### The address you entered does not match any known addresses in the current account. (4010010)

```json
{
  "id": 4010010,
  "text": "The address you entered does not match any known addresses in the current account.",
  "type": "error"
}
```

###### The registration flow expired 1.00 minutes ago, please try again. (4040001)

```json
{
  "id": 4040001,
  "text": "The registration flow expired 1.00 minutes ago, please try again.",
  "type": "error",
  "context": {
    "expired_at": "2020-01-01T00:59:59Z",
    "expired_at_unix": 1577840399
  }
}
```

###### The request was already completed successfully and can not be retried. (4040002)

```json
{
  "id": 4040002,
  "text": "The request was already completed successfully and can not be retried.",
  "type": "error"
}
```

###### The registration code is invalid or has already been used. Please try again. (4040003)

```json
{
  "id": 4040003,
  "text": "The registration code is invalid or has already been used. Please try again.",
  "type": "error"
}
```

###### The settings flow expired 1.00 minutes ago, please try again. (4050001)

```json
{
  "id": 4050001,
  "text": "The settings flow expired 1.00 minutes ago, please try again.",
  "type": "error",
  "context": {
    "expired_at": "2020-01-01T00:59:59Z",
    "expired_at_unix": 1577840399
  }
}
```

###### The request was already completed successfully and can not be retried. (4060001)

```json
{
  "id": 4060001,
  "text": "The request was already completed successfully and can not be retried.",
  "type": "error"
}
```

###### The recovery flow reached a failure state and must be retried. (4060002)

```json
{
  "id": 4060002,
  "text": "The recovery flow reached a failure state and must be retried.",
  "type": "error"
}
```

###### The recovery token is invalid or has already been used. Please retry the flow. (4060004)

```json
{
  "id": 4060004,
  "text": "The recovery token is invalid or has already been used. Please retry the flow.",
  "type": "error"
}
```

###### The recovery flow expired 1.00 minutes ago, please try again. (4060005)

```json
{
  "id": 4060005,
  "text": "The recovery flow expired 1.00 minutes ago, please try again.",
  "type": "error",
  "context": {
    "expired_at": "2020-01-01T00:59:59Z",
    "expired_at_unix": 1577840399
  }
}
```

###### The recovery code is invalid or has already been used. Please try again. (4060006)

```json
{
  "id": 4060006,
  "text": "The recovery code is invalid or has already been used. Please try again.",
  "type": "error"
}
```

###### The verification token is invalid or has already been used. Please retry the flow. (4070001)

```json
{
  "id": 4070001,
  "text": "The verification token is invalid or has already been used. Please retry the flow.",
  "type": "error"
}
```

###### The request was already completed successfully and can not be retried. (4070002)

```json
{
  "id": 4070002,
  "text": "The request was already completed successfully and can not be retried.",
  "type": "error"
}
```

###### The verification flow reached a failure state and must be retried. (4070003)

```json
{
  "id": 4070003,
  "text": "The verification flow reached a failure state and must be retried.",
  "type": "error"
}
```

###### The verification flow expired 1.00 minutes ago, please try again. (4070005)

```json
{
  "id": 4070005,
  "text": "The verification flow expired 1.00 minutes ago, please try again.",
  "type": "error",
  "context": {
    "expired_at": "2020-01-01T00:59:59Z",
    "expired_at_unix": 1577840399
  }
}
```

###### The verification code is invalid or has already been used. Please try again. (4070006)

```json
{
  "id": 4070006,
  "text": "The verification code is invalid or has already been used. Please try again.",
  "type": "error"
}
```

###### {reason} (5000001)

```json
{
  "id": 5000001,
  "text": "{reason}",
  "type": "error",
  "context": {
    "reason": "{reason}"
  }
}
```

<!-- END MESSAGE TABLE -->
