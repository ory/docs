# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To get your application that runs locally and Ory APIs on the same domain, use Ory Tunnel - a development tool bundled with Ory CLI.
It's like a microservice - an authentication API server on your domain!

```shell-session
export ORY_SDK_URL=https://{your-project-slug-here}.projects.oryapis.com
npx @ory/cli tunnel --dev http://localhost:3000
```

Ory APIs are now mirrored on `http://localhost:4000`. Use that URL as the `baseUrl` for the `@ory/client` SDK (see code above).
The `--dev` flag disables security checks for easier integration and should not be used when deploying the Tunnel
to a staging environment.
