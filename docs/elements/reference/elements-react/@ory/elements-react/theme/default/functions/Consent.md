# `<Consent />`

```ts
function Consent(props: {
  children?: ReactNode;
  components?: OryFlowComponentOverrides;
  config: OryClientConfiguration;
  consentChallenge: OAuth2ConsentRequest;
  csrfToken: string;
  formActionUrl: string;
  session: Session;
}): Element;
```

The Consent component allows you to render the consent flow for Ory OAuth2.

It is used to request user consent for accessing their data and resources.
The component takes in the OAuth2 consent request object, the session object,
the Ory client configuration, a CSRF token, and the URL to submit the consent form to.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `children?`: [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L485); `components?`: [`OryFlowComponentOverrides`](../../../type-aliases/OryFlowComponentOverrides.md); `config`: [`OryClientConfiguration`](../../../type-aliases/OryClientConfiguration.md); `consentChallenge`: `OAuth2ConsentRequest`; `csrfToken`: `string`; `formActionUrl`: `string`; `session`: `Session`; \} | The props for the Consent component. |
| `props.children?` | [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L485) | Optional children to render inside the Consent component. If not provided, the default OryConsentCard will be rendered. |
| `props.components?` | [`OryFlowComponentOverrides`](../../../type-aliases/OryFlowComponentOverrides.md) | The components to override the default ones. This allows you to customize the appearance and behavior of the consent flow. |
| `props.config` | [`OryClientConfiguration`](../../../type-aliases/OryClientConfiguration.md) | The Ory client configuration object. This object contains the configuration for the Ory client, such as the base URL |
| `props.consentChallenge` | `OAuth2ConsentRequest` | The OAuth2 consent request object. |
| `props.csrfToken` | `string` | The CSRF token to protect against CSRF attacks. This token is used to prevent cross-site request forgery attacks by ensuring that the request is coming from the same origin as the consent flow. |
| `props.formActionUrl` | `string` | The URL to submit the consent form to. This URL is typically an endpoint on the server that handles the consent request. Make sure that this endpoint handles CSRF protection. During the form submission the Consent component will send along the CSRF token passed in the props. The server should validate this token before processing the consent request. |
| `props.session` | `Session` | The session object. Since the consent flow is used in the context of a logged-in user, the session object is required. It contains information about the user, such as their ID and any associated metadata. This information is used to accept or reject the consent request based on the user's preferences. The session object is typically obtained from the Ory Kratos session API. |

## Returns

[`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/jsx-runtime.d.ts#L6)

the Consent component.
