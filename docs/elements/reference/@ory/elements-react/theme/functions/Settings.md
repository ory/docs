# `<Settings />`

```ts
function Settings(
  props: {
    children?: ReactNode
    components?: OryFlowComponentOverrides
    config: OryClientConfiguration
    flow: SettingsFlow
  } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">,
): Element
```

The `Settings` component is used to render the settings flow in Ory Elements.

It provides the necessary context and components for the settings flow, allowing you to customize the appearance and behavior of
the settings form.

## Parameters

| Parameter | Type                                                                                                                                                                                                                                                                                                                                        | Description                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `props`   | \{ `children?`: `ReactNode`; `components?`: [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md); `config`: [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md); `flow`: `SettingsFlow`; \} & `Omit`\<`DetailedHTMLProps`\<`HTMLAttributes`\<`HTMLDivElement`\>, `HTMLDivElement`\>, `"ref"`\> | The props for the Settings component. |

## Returns

`Element`
