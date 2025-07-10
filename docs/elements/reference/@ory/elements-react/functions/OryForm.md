# `<OryForm />`

```ts
function OryForm(props: {
  children?: ReactNode
  onAfterSubmit?: (method: undefined | string | number | boolean) => void
}): Element
```

The OryForm component is the main form container for Ory flows.

It renders the form with the correct action and method, and handles the submission of the form.

## Parameters

| Parameter              | Type                                                                                                                      | Description                                                                                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `props`                | \{ `children?`: `ReactNode`; `onAfterSubmit?`: (`method`: `undefined` \| `string` \| `number` \| `boolean`) => `void`; \} | The props for the OryForm component.                                                                                                                                                                                                                 |
| `props.children?`      | `ReactNode`                                                                                                               | -                                                                                                                                                                                                                                                    |
| `props.onAfterSubmit?` | (`method`: `undefined` \| `string` \| `number` \| `boolean`) => `void`                                                    | A callback function that is called after the form is submitted. It is always called after the form is submitted, unless the form submission is prevented by client side validation or the API response dictated that the client should be redirected |

## Returns

`Element`
