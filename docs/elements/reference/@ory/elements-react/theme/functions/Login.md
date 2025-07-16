# `<Login />`

```ts
function Login(props: {
  children?: ReactNode
  components?: OryFlowComponentOverrides
  config: OryClientConfiguration
  flow: LoginFlow
}): Element
```

The `Login` component is used to render the login flow in Ory Elements.

It provides the necessary context and components for the login flow, allowing you to customize the appearance and behavior of the
login form.

## Parameters

| Parameter           | Type                                                                                                                                                                                                                                  | Description                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `props`             | \{ `children?`: `ReactNode`; `components?`: [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md); `config`: [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md); `flow`: `LoginFlow`; \} | The props for the Login component.                                                                                                       |
| `props.children?`   | `ReactNode`                                                                                                                                                                                                                           | Optional children to render If not provided, the default OrySelfServiceFlowCard will be rendered.                                        |
| `props.components?` | [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md)                                                                                                                                                        | Optional components to override the default ones. This allows you to customize the appearance and behavior of the login flow.            |
| `props.config`      | [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md)                                                                                                                                                                | The Ory client configuration object. This object contains the configuration for the Ory client, such as the base URL and other settings. |
| `props.flow`        | `LoginFlow`                                                                                                                                                                                                                           | The login flow object containing the state and data for the login process.                                                               |

## Returns

`Element`
