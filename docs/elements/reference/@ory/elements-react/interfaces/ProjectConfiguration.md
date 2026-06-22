# ProjectConfiguration

The project configuration for Ory Elements.

This configuration is used to set various URLs and settings for the Ory Elements project.

## Properties

### default_redirect_url

```ts
default_redirect_url: string
```

The default redirect URI as configured in the Ory Kratos configuration

---

### error_ui_url

```ts
error_ui_url: string
```

The URL for the error UI.

---

### hide_ory_branding?

```ts
optional hide_ory_branding: boolean;
```

Whether to hide the Ory branding badge on the account experience card.

Defaults to `false`. Customers on qualifying plans can opt into hiding it.

---

### hide_registration_link?

```ts
optional hide_registration_link: boolean;
```

When true, hides the "Sign up" link on the login card footer even if registration is enabled. Cosmetic only; does not affect the
registration flow itself. Defaults to false.

---

### login_ui_url

```ts
login_ui_url: string
```

The URL for the login UI.

---

### logo_dark_url?

```ts
optional logo_dark_url: string;
```

The URL for the dark logo.

Currently unused.

---

### logo_light_url?

```ts
optional logo_light_url: string;
```

The URL for the light logo on the auth card.

---

### name

```ts
name: string
```

The name of the project displayed on the auth card.

---

### recovery_enabled

```ts
recovery_enabled: boolean
```

Whether recovery is enabled.

Used to determine if the "Forgot Password" link is shown on the password input elements.

---

### recovery_ui_url

```ts
recovery_ui_url: string
```

The URL for the recovery UI.

---

### registration_enabled

```ts
registration_enabled: boolean
```

Whether registration is enabled.

Used to determine if the "Sign Up" link is shown on the login card.

---

### registration_ui_url

```ts
registration_ui_url: string
```

The URL for the registration UI.

---

### settings_ui_url

```ts
settings_ui_url: string
```

The URL for the settings UI.

---

### verification_enabled

```ts
verification_enabled: boolean
```

Whether verification is enabled.

Currently unused.

---

### verification_ui_url

```ts
verification_ui_url: string
```

The URL for the verification UI.

Currently unused.
