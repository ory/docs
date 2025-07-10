# OryClientConfiguration

The configuration for Ory Elements.

This configuration is used to customize the behavior and appearance of Ory Elements.

By setting UI urls, you can override the default URLs for the login, registration, recovery, and verification flows.

You can also set the name of the application, the logo URL, and the SDK configuration. By default, the name and logo are displayed
in the card's header.

## Properties

### intl?

```ts
optional intl: IntlConfig;
```

The internationalization configuration. This configuration is used to set the locale and any additional options used for the i18n
library. The locale is used to determine the language of the UI. The default locale is "en".

---

### project

```ts
project: AccountExperienceConfiguration
```

The configuration for the project.

---

### sdk?

```ts
optional sdk: {
  options?: Partial<ConfigurationParameters>;
  url?: string;
};
```

The SDK configuration. This configuration is used to set the URL of the Ory SDK and any additional options used for the SDK
client.

| Name       | Type                                   | Description                                                                                                                  |
| ---------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `options?` | `Partial`\<`ConfigurationParameters`\> | Additional parameters for the Ory SDK configuration. This can include options like headers, credentials, and other settings. |
| `url?`     | `string`                               | The URL the Ory SDK should connect to. This is typically the base URL of your Ory instance.                                  |
