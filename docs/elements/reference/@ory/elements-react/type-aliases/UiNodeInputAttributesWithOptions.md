# UiNodeInputAttributesWithOptions

```ts
type UiNodeInputAttributesWithOptions = UiNodeInputAttributes & {
  options?: UiNodeInputAttributesOption[]
}
```

Same as `UiNodeInputAttributes`, but additionally carries the optional `options` field used to render enum traits as a dropdown.
The Kratos server populates this field whenever a JSON schema property declares an `enum`.

## Type declaration

| Name       | Type                                                              |
| ---------- | ----------------------------------------------------------------- |
| `options?` | [`UiNodeInputAttributesOption`](UiNodeInputAttributesOption.md)[] |
