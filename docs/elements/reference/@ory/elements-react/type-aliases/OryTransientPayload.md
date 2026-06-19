# OryTransientPayload

```ts
type OryTransientPayload =
  | Record<string, unknown>
| (formValues: FormValues) => Record<string, unknown>;
```

A transient payload value or factory function.

When a static object, it is included as-is in the submission body. When a function, it receives the current form values at
submission time and must return the transient payload object.
