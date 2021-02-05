# Documentation

This repository contains meta-documentation for the
[ORY Ecosystem](https://www.ory.sh/docs/ecosystem/projects/).  
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

Documentation for
[the Ory Ecosystem](https://www.ory.sh/docs/ecosystem/projects/) lives in
[ory/docs](https://github.com/ory/docs/tree/master/docs/docs/ecosystem).  
Documentation for the individual projects live in their respective `docs`
folder. ([Ory Hydra](https://github.com/ory/hydra/tree/master/docs/docs),
[Ory Kratos](https://github.com/ory/kratos/tree/master/docs/docs),
[Ory Oathkeeper](https://github.com/ory/oathkeeper/tree/master/docs/docs),
[Ory Keto](https://github.com/ory/keto/tree/master/docs/docs))  
If you make changes, please consider making the same changes in the lastest
version of `/versioned_docs`

To test the documentation locally:

Change into the `/docs` folder in your local git environment.

Install dependencies `npm install` Test build the documentation:  
`npm start # test if everything works`

To build the docs:  
`npm run build `


## Categories 

Ory Documentations is structured into several main categories.  
Each of those categories serves a specific purpose. 
The purpose of each category is outline in short here, to help find the correct category for your documentation to live in.

- Introduction
    - The purpose of this category is to introduce the very `basics` of the project and give newcomers a easy way to start. Contains the most basic explanation of the project, an installation guide, a Quickstart/5-Minute Tutorial and Contribution Guidelines. 
- Concepts 
    - The purpose of this category is to give the reader a deep `understanding` of the ideas upon which the project is built. Content in this category has the form of a discursive explanation. The main goal is to `explain`. 
- Guides 
    - The purpose of this category is to solve a specific problem. It has the form of a `series of steps` towards a goal. It is aimed towards more experienced users, who are already familiar with the concepts and tools. 
- Reference
    - The purpose of this category is to provide detailed & in-depth description of the project . It has the form of a `austere and to the point explanation` and is rooted in code, most often these documents are built directly from code without editor interaction. It __does not__ give information on how to do specific things, but describes how to correctly use the APIs ect.
- SDK
    - Same as the above category but for SDKs, also containing simple guides for using SDKs.

## Document Structure

Add a meaningful title and an ID to the top of the document. 
`id` needs to be separated with `-` and lowercase, `title` with space and Uppercase. 
Example:
```
---
id: documentation-id
title: Documentation Title
---
```

## How to add links to other pages

If you would add a link to an outside ressource, just go ahead.

**If you want to add a link to a document in our own documentation, please make
sure to add the filename.**

For example `[XY Guide](./guide/XY.md)` rather than `[XY Guide](./guide/XY)`.

This prevents broken links
([issue](https://github.com/ory/docusaurus-template/issues/38)) when you load
the documentation from an outside link.

## How to add code from Github

Use [CodeFromRemote](https://github.com/ory/docusaurus-template/blob/master/src/theme/CodeFromRemote.js) to import code directly from Github. 

Import at the beginning of your document like so:

```
---
id: documentation id
title: Documentation Title
---

import CodeFromRemote from '@theme/CodeFromRemote'
```

Then at the place you want the code to appear in the document add:

`<CodeFromRemote src="https://github.com/$OWNER/$REPO/blob/$BRANCHNAME/path/to/your.file" />`
