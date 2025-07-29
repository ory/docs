# `<OryConfigurationProvider />`

```ts
function OryConfigurationProvider(props: {
  children?: ReactNode
  project?: Partial<AccountExperienceConfiguration>
  sdk?: {
    options?: Partial<ConfigurationParameters>
    url?: string
  }
}): Element
```

The `OryConfigurationProvider` component provides the Ory Elements configuration to its children.

## Parameters

| Parameter            | Type                                                                                                                                                                            | Description                                                                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `props`              | \{ `children?`: `ReactNode`; `project?`: `Partial`\<`AccountExperienceConfiguration`\>; `sdk?`: \{ `options?`: `Partial`\<`ConfigurationParameters`\>; `url?`: `string`; \}; \} | The properties for the OryConfigurationProvider component.                                                                                                             |
| `props.children?`    | `ReactNode`                                                                                                                                                                     | -                                                                                                                                                                      |
| `props.project?`     | `Partial`\<`AccountExperienceConfiguration`\>                                                                                                                                   | This configuration is used to customize the behavior and appearance of Ory Elements.                                                                                   |
| `props.sdk?`         | \{ `options?`: `Partial`\<`ConfigurationParameters`\>; `url?`: `string`; \}                                                                                                     | The Ory SDK configuration to use. If not provided, the SDK URL will be determined automatically based on the environment. Always required for production environments. |
| `props.sdk.options?` | `Partial`\<`ConfigurationParameters`\>                                                                                                                                          | Additional parameters for the Ory SDK configuration. This can include options like headers, credentials, and other settings.                                           |
| `props.sdk.url?`     | `string`                                                                                                                                                                        | The URL the Ory SDK should connect to. This is typically the base URL of your Ory instance.                                                                            |

## Returns

`Element`
