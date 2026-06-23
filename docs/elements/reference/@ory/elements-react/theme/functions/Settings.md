# `<Settings />`

```ts
function Settings(
  props: {
    children?: ReactNode
    components?: OryFlowComponentOverrides
    config: OryClientConfiguration
    flow: SettingsFlow
    onError?: OryErrorHandler
    onSuccess?: OrySuccessHandler
    onValidationError?: OryValidationErrorHandler
    transientPayload?: OryTransientPayload
  } & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "onError">,
): Element
```

The `Settings` component is used to render the settings flow in Ory Elements.

It provides the necessary context and components for the settings flow, allowing you to customize the appearance and behavior of
the settings form.

## Parameters

| Parameter | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Description                           |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `props`   | \{ `children?`: `ReactNode`; `components?`: [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md); `config`: [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md); `flow`: `SettingsFlow`; `onError?`: [`OryErrorHandler`](../../type-aliases/OryErrorHandler.md); `onSuccess?`: [`OrySuccessHandler`](../../type-aliases/OrySuccessHandler.md); `onValidationError?`: [`OryValidationErrorHandler`](../../type-aliases/OryValidationErrorHandler.md); `transientPayload?`: [`OryTransientPayload`](../../type-aliases/OryTransientPayload.md); \} & `Omit`\<`Omit`\<`DetailedHTMLProps`\<`HTMLAttributes`\<`HTMLDivElement`\>, `HTMLDivElement`\>, `"ref"`\>, `"onError"`\> | The props for the Settings component. |

## Returns

`Element`
