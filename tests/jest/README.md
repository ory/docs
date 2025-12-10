# Jest integration tests for identity get-started examples

This suite runs integration tests against a small Express application that
wires the identity “get started” JavaScript examples (configure, sign-up,
sign-in, sign-out, session).

## Requirements

- A reachable Ory Network project or tunnel endpoint.
- Node.js (same version you use for the docs repo).

Required environment variables:

- `ORY_SDK_URL` – Base URL of your Ory project or tunnel
  (for example `http://localhost:4000` when using `ory tunnel`).

If `ORY_SDK_URL` is **not** set, the integration tests will be skipped
automatically and the Jest run will still pass.

## Running the tests

1. Install dependencies for the small Express app:

   ```bash
   cd tests/jest/apps/identity-get-started
   npm install
   cd ../../../..
   ```

2. Export the Ory SDK URL:

   ```bash
   export ORY_SDK_URL=http://localhost:4000
   ```

   Make sure this URL points to a working Ory project (for example via
   `ory tunnel`).

3. Run the Jest integration tests from the repo root:

   ```bash
   npm run test:integration
   ```

The relevant integration test files live under:

- `tests/jest/integration/identity-signup-signin.test.ts`
- `tests/jest/integration/identity-logout-session.test.ts`


