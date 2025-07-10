# `<Verification />`

```ts
function Verification(props: {
  children?: ReactNode
  components?: OryFlowComponentOverrides
  config: OryClientConfiguration
  flow: VerificationFlow
}): Element
```

The `Verification` component is used to render the verification flow in Ory Elements.

It provides the necessary context and components for the verification flow, allowing you to customize the appearance and behavior
of the verification form.

## Parameters

| Parameter           | Type                                                                                                                                                                                                                                         | Description                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `props`             | \{ `children?`: `ReactNode`; `components?`: [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md); `config`: [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md); `flow`: `VerificationFlow`; \} | The props for the Verification component.                                                                                                |
| `props.children?`   | `ReactNode`                                                                                                                                                                                                                                  | Optional children to render If not provided, the default OrySelfServiceFlowCard will be rendered.                                        |
| `props.components?` | [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md)                                                                                                                                                               | Optional components to override the default ones. This allows you to customize the appearance and behavior of the verification flow.     |
| `props.config`      | [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md)                                                                                                                                                                       | The Ory client configuration object. This object contains the configuration for the Ory client, such as the base URL and other settings. |
| `props.flow`        | `VerificationFlow`                                                                                                                                                                                                                           | The verification flow object containing the state and data for the verification process.                                                 |

## Returns

`Element`
