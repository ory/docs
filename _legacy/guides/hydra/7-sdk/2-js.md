## JavaScript SDK

<!-- toc -->

### Installation

To install the JavaScript SDK, run:

```
npm install --save ory-hydra-sdk
```

### Configuration

#### Basic configuration

```js
const Hydra = require('ory-hydra-sdk')

// Set this to Hydra's URL
Hydra.ApiClient.instance.basePath = 'http://localhost:4445'

```

### API Usage

Let's use `refreshToken` to request a new access token and make
an authorized API call:

```js
const hydra = new Hydra.OAuth2Api()

// for example, let's fetch all OAuth2 clients
hydra.listOAuth2Clients((error, data, response) => {
  if (error) {
    // a network error occurred.
    throw error
  } else if (response.statusCode < 200 || response.statusCode >= 400) {
    // an application error occurred.
    throw new Error('Consent endpoint gave status code ' + response.statusCode + ', but status code 200 was expected.')
  }

  console.log(response) // a list of OAuth2 clients.
})
```

### API Docs

API docs are available [here](https://github.com/ory/hydra/blob/master/sdk/js/hydra/swagger/README.md).
Please note that those docs are generated and may introduce bugs if code examples are used 1:1. Especially
the package name is not correct.
