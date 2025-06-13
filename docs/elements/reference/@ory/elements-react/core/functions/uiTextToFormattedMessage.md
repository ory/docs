# uiTextToFormattedMessage()

```ts
function uiTextToFormattedMessage(uiText: Omit<UiText, "type">, intl: IntlShape): string
```

Converts a UiText to a FormattedMessage. The UiText contains the id of the message and the context. The context is used to inject
values into the message from Ory, e.g. a timestamp. For example a UI Node from Ory might look like this:

```json
{
  "type": "input",
  "group": "default",
  "attributes": {
    "name": "traits.email",
    "type": "email",
    "required": true,
    "autocomplete": "email",
    "disabled": false,
    "node_type": "input"
  },
  "messages": [],
  "meta": {
    "label": {
      "id": 1070002,
      "text": "E-Mail",
      "type": "info",
      "context": {
        "title": "E-Mail"
      }
    }
  }
}
```

The context has the key "title" which matches the formatter template name "{title}" An example translation file would look like
this:

```json
{
  "identities.messages.1070002": "{title}"
}
```

The formatter would then take the meta.label.id and look for the translation with the key matching the id. It would then replace
the template "{title}" with the value from the context with the key "title".

## Parameters

| Parameter | Type                         | Description                                                                    |
| --------- | ---------------------------- | ------------------------------------------------------------------------------ |
| `uiText`  | `Omit`\<`UiText`, `"type"`\> | The UiText is part of the UiNode object sent by Kratos when performing a flow. |
| `intl`    | `IntlShape`                  | The intl object from react-intl                                                |

## Returns

`string`
