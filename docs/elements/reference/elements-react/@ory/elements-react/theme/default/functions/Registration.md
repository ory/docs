# `<Registration />`

```ts
function Registration(props: {
  children?: ReactNode;
  components?: OryFlowComponentOverrides;
  config: OryClientConfiguration;
  flow: RegistrationFlow;
}): Element;
```

The `Registration` component is used to render the registration flow in Ory Elements.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `children?`: [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L485); `components?`: [`OryFlowComponentOverrides`](../../../type-aliases/OryFlowComponentOverrides.md); `config`: [`OryClientConfiguration`](../../../type-aliases/OryClientConfiguration.md); `flow`: `RegistrationFlow`; \} | The props for the Registration component. |
| `props.children?` | [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L485) | Optional children to render If not provided, the default OrySelfServiceFlowCard will be rendered. |
| `props.components?` | [`OryFlowComponentOverrides`](../../../type-aliases/OryFlowComponentOverrides.md) | Optional components to override the default ones. This allows you to customize the appearance and behavior of the registration flow. |
| `props.config` | [`OryClientConfiguration`](../../../type-aliases/OryClientConfiguration.md) | The Ory client configuration object. This object contains the configuration for the Ory client, such as the base URL and other settings. |
| `props.flow` | `RegistrationFlow` | The registration flow object containing the state and data for the registration process. |

## Returns

[`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/jsx-runtime.d.ts#L6)
