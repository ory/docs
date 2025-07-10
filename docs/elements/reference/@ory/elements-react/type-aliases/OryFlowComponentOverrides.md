# OryFlowComponentOverrides

```ts
type OryFlowComponentOverrides = {
  [P in keyof OryFlowComponents]?: OryFlowComponents[P] extends object
    ? { [K in keyof OryFlowComponents[P]]?: OryFlowComponents[P][K] }
    : OryFlowComponents[P]
}
```

Makes the components in OryFlowComponents optional, so that you can override only the components you want to change.
