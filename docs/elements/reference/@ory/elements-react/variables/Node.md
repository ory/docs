# `<Node />`

```ts
const Node: (__namedParameters: NodeProps) => ReactNode & {
  Button: (__namedParameters: ButtonRendererProps) => Element
  Checkbox: (__namedParameters: CheckboxRendererProps) => Element
  ConsentCheckbox: (__namedParameters: { node: UiNodeInput }) => Element
  Image: (__namedParameters: ImageRendererProps) => Element
  Input: (__namedParameters: TextBasedInputProps) => Element
  SsoButton: (__namedParameters: SsoButtonProps) => Element
  Text: (__namedParameters: TextRendererProps) => Element
}
```

Use this component to render any UiNode. It will automatically pick the correct sub-component based on the node type and use any
custom components provided via the ComponentsContext.

Make sure to use this component instead of the custom component directly, to make sure it's integrated properly with the form
system.

## Type declaration

| Name                | Type                                                                                               | Default value             |
| ------------------- | -------------------------------------------------------------------------------------------------- | ------------------------- |
| `Button()`          | (`__namedParameters`: `ButtonRendererProps`) => `Element`                                          | `ButtonRenderer`          |
| `Checkbox()`        | (`__namedParameters`: `CheckboxRendererProps`) => `Element`                                        | `CheckboxRenderer`        |
| `ConsentCheckbox()` | (`__namedParameters`: \{ `node`: [`UiNodeInput`](../type-aliases/UiNodeInput.md); \}) => `Element` | `ConsentCheckboxRenderer` |
| `Image()`           | (`__namedParameters`: `ImageRendererProps`) => `Element`                                           | `ImageRenderer`           |
| `Input()`           | (`__namedParameters`: `TextBasedInputProps`) => `Element`                                          | `InputRenderer`           |
| `SsoButton()`       | (`__namedParameters`: `SsoButtonProps`) => `Element`                                               | `SSOButtonRenderer`       |
| `Text()`            | (`__namedParameters`: `TextRendererProps`) => `Element`                                            | `TextRenderer`            |

## Param

NodeProps containing the UiNode to render

## Returns

A ReactNode rendering the appropriate component for the given UiNode
