# Documentation

This repository contains meta-documentation for the [ORY Ecosystem](https://www.ory.sh/docs/ecosystem/projects/).  
You can find the source files for each projects documentation here:

- [Ory Kratos](https://github.com/ory/kratos/tree/master/docs)
- [Ory Hydra](https://github.com/ory/hydra/tree/master/docs)
- [Ory Oathkeeper](https://github.com/ory/oathkeeper/tree/master/docs)
- [Ory Keto](https://github.com/ory/keto/tree/master/docs)

Other Ory Projects documentation:  
- [Ory Kubernetes Helm Charts](https://github.com/ory/k8s/tree/master/docs/helm)
- [Ory Dockertest](https://github.com/ory/dockertest/blob/v3/README.md)
- [Ory SDKs](https://github.com/ory/sdk/blob/master/README.md)

# Contributing Documentation

Documentation for [the Ory Ecosystem](https://www.ory.sh/docs/ecosystem/projects/) lives in [ory/docs](https://github.com/ory/docs/tree/master/docs/docs/ecosystem).  
Documentation for the individual projects live in their respective `docs` folder. ([Ory Hydra](https://github.com/ory/hydra/tree/master/docs/docs), [Ory Kratos](https://github.com/ory/kratos/tree/master/docs/docs), [Ory Oathkeeper](https://github.com/ory/oathkeeper/tree/master/docs/docs), [Ory Keto](https://github.com/ory/keto/tree/master/docs/docs))  
If you make changes, please consider making the same changes in the lastest version of `/versioned_docs`

To test the documentation locally:  

Change into the `/docs` folder in your local git environment. 

Install dependencies
`
npm install
`
Test build the documentation:  
`
npm start # test if everything works
`

To build the docs:  
`npm run build `

## How to add links to other pages

If you would add a link to an outside ressource, just go ahead. 

**If you want to add a link to a document in our own documentation, please make sure to add the filename.**

For example `[XY Guide](./guide/XY.md)` rather than `[XY Guide](./guide/XY)`. 

This prevents broken links ([issue](https://github.com/ory/docusaurus-template/issues/38)) when you load the documentation from an outside link.   