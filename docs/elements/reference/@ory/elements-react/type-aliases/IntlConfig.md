# IntlConfig

```ts
type IntlConfig = {
  customTranslations?: Partial<LocaleMap>
  locale: Locale
}
```

The configuration for internationalization (i18n) in Ory Elements.

This configuration is used to set the locale and can be used to provide custom translations. The locale is used to determine the
language of the UI.

## Properties

### customTranslations?

```ts
optional customTranslations: Partial<LocaleMap>;
```

Provide custom translations for the UI.

---

### locale

```ts
locale: Locale
```

The locale to use for internationalization.

#### Default Value

```ts
"en"
```
