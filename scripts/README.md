# Scripts

## inject-sdk-code-samples.mjs

Injects TypeScript and Go SDK code samples into the OpenAPI spec
(`src/static/api.json`) so the API reference shows idiomatic SDK snippets
instead of auto-generated HTTP examples.

### How it works

1. **TypeScript** — parses request interfaces from the generated TS SDK
   (`sdk/clients/client/typescript/api.ts`) and synthesizes a minimal snippet
   using only required parameters.
2. **Go** — reads complete, pre-generated examples directly from the Go SDK docs
   (`sdk/clients/client/go/docs/XxxAPI.md`). No synthesis — these are the exact
   examples OpenAPI Generator produces for the SDK.

Each operation gets an `x-codeSamples` entry with both samples.
`docusaurus-plugin-openapi-docs` reads those and renders them as language tabs
in the API Explorer UI.

### Prerequisites

The script expects the sibling `sdk` repo to be checked out at the same level as
this repo:

```
parent/
├── docs/   ← this repo
└── sdk/    ← github.com/ory/sdk
```

### Initial setup

```bash
# Clone the SDK repo if you don't have it
git clone git@github.com:ory/sdk.git ../sdk
```

### Syncing after an SDK update

Run these three commands in order whenever the SDK is updated:

```bash
# 1. Inject updated code samples into the spec
node scripts/inject-sdk-code-samples.mjs

# 2. Regenerate the MDX files (plugin caches — must clean first)
npm run docusaurus -- clean-api-docs ory
npm run docusaurus -- gen-api-docs ory
```

> The script prints a summary: how many samples were injected and which
> operations had no Go example (currently 3 internal test operations).

### Adding support for a new API tag

If a new tag appears in the spec, add it to both maps at the top of the script:

```js
// scripts/inject-sdk-code-samples.mjs

const TAG_TO_TS_CLASS = {
  // ...
  myNewTag: "MyNewTagApi",
}

const TAG_TO_GO_SERVICE = {
  // ...
  myNewTag: "MyNewTagAPI",
}
```
