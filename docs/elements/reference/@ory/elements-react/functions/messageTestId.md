# messageTestId()

```ts
function messageTestId(message: {
  id: string | number;
}): {
  data-testid: string;
};
```

Helper function to generate a test id for a UiText message.

## Parameters

| Parameter    | Type                              | Description                                  |
| ------------ | --------------------------------- | -------------------------------------------- |
| `message`    | \{ `id`: `string` \| `number`; \} | the UiText message to generate a test id for |
| `message.id` | `string` \| `number`              | -                                            |

## Returns

```ts
{
  data-testid: string;
}
```

a unique, stable test id for the message

| Name          | Type     |
| ------------- | -------- |
| `data-testid` | `string` |
