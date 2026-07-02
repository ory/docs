# OryErrorEvent

```ts
type OryErrorEvent =
  | {
      body: SelfServiceFlowExpiredError
      flowType: FlowType
      type: "flow_expired"
    }
  | {
      body: GenericError
      flowType: FlowType
      type: "csrf_error"
    }
  | {
      flowType: FlowType
      type: "flow_not_found"
    }
  | {
      body: ErrorFlowReplaced
      flowType: FlowType
      type: "flow_replaced"
    }
  | {
      consentRequest: OAuth2ConsentRequest
      flowType: FlowType.OAuth2Consent
      type: "consent_error"
    }
```

Discriminated union of infrastructure/flow error events. Uses SDK error types from `@ory/client-fetch`.
