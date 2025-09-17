# `<OryCardContent />`

```ts
function OryCardContent(props: { children?: ReactNode }): Element
```

A component that renders the content of the Ory Card. This is the main content of the card, such as the flow's form, with it's
input fields and messages.

You can use this component to build fully custom implementations of the Ory Flows.

However, you most likely want to override the individual components instead.

## Parameters

| Parameter         | Type                            | Description                                                        |
| ----------------- | ------------------------------- | ------------------------------------------------------------------ |
| `props`           | \{ `children?`: `ReactNode`; \} | pass children to render instead of the default Ory Card components |
| `props.children?` | `ReactNode`                     | -                                                                  |

## Returns

`Element`
