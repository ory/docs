# getOryComponents()

```ts
function getOryComponents(overrides?: OryFlowComponentOverrides): OryFlowComponents
```

Merges the default Ory components with any provided overrides.

The output of this function is a complete set of components that can be used in Ory flows.

## Parameters

| Parameter    | Type                                                                           | Description                                    |
| ------------ | ------------------------------------------------------------------------------ | ---------------------------------------------- |
| `overrides?` | [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md) | Optional overrides for the default components. |

## Returns

[`OryFlowComponents`](../../type-aliases/OryFlowComponents.md)
