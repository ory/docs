# useResendCode()

```ts
function useResendCode(): {
  resendCode: () => void
  resendCodeNode: undefined | UiNode
}
```

useResendCode provides a callback to trigger a code resend in the current flow.

You may use this hook to implement a "Resend Code" button in your forms.

If the current flow does not support code resending, `resendCodeNode` will be `undefined` and `resendCode` will be a no-op.

Example:

```tsx
const { resendCode, resendCodeNode } = useResendCode();

return (
 {resendCodeNode && (
   <button onClick={resendCode}>Resend Code</button>
 )}
)
```

## Returns

```ts
{
  resendCode: () => void;
  resendCodeNode: undefined | UiNode;
}
```

the callback to trigger a code resend

| Name             | Type                    | Default value  |
| ---------------- | ----------------------- | -------------- |
| `resendCode()`   | () => `void`            | `handleResend` |
| `resendCodeNode` | `undefined` \| `UiNode` | -              |
