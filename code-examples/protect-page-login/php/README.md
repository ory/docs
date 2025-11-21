# Ory Authentication Example with PHP

This example demonstrates a PHP web app page, built using Ory Account
Experience, and protected using the Ory PHP SDK.

For the full step-by-step guide, see:
[Integrate authentication into PHP](https://www.ory.com/docs/getting-started/integrate-auth/php)

## Prerequisites

- PHP 8.1+
- Composer
- Node.js (to run the Ory CLI via `npx`)
- An Ory Network project and the Ory CLI logged in

## Install dependencies

```bash
composer install
```

## Run locally

1. Start the PHP built-in server:

```bash
php -S 127.0.0.1:3000
```

2. In another terminal, start the Ory Tunnel pointing to your local app and
   project:

```bash
npx @ory/cli tunnel --dev http://localhost:3000 --project <project_id>
```

3. Open http://localhost:3000 in your browser. You will be redirected to the Ory
   Account Experience for sign-in, and then returned to the protected page.

## Notes

- The app reads the tunnel port from `TUNNEL_PORT` (defaults to `4000`).
- The middleware uses `toSession` to validate the user session and redirects
  unauthenticated users to the login UI served via the Ory Tunnel.
