# Documentation

This repository contains meta-documentation for the ORY Ecosystem. For individual project documentation go to:

- https://github.com/ory/kratos/tree/master/docs
- https://github.com/ory/hydra/tree/master/docs
- https://github.com/ory/oathkeeper/tree/master/docs
- https://github.com/ory/keto/tree/master/docs

## Develop

To change the documentation locally, you need NodeJS installed.
Next, install the dependencies:

```
$ npm
```

### Develop

```
$ npm start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
