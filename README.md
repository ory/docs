# Documentation

This repository contains meta-documentation for the
[ORY Ecosystem](https://www.ory.sh/docs/ecosystem/projects/).  
You can find the source files for each project's documentation here:

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
If you make changes, please consider making the same changes in the latest
version of `/versioned_docs`

To test the documentation locally:
(Assuming you already installed NodeJS)

1. Clone this repository.

3. Enter the `/docs` folder in your local git environment.

3. Install dependencies by running: 
`npm install`.

4. Run the Docs webserver and test the documentation by running:
`npm start`

5. Build the docs and verify by running:  
`npm run build `

## Formatting documentation

All documentation (as well as any other files) must be formatted using [Ory's prettier styles](https://github.com/ory/prettier-styles)

To format all for documentation relevant files simply run the following command from the repositories main directory:

```
cd docs
npm install
npm run format
git commit -a -m "styles: format"
git push
```

## Categories

Ory Documentations is structured into several main categories.  
Each of those categories serves a specific purpose.
The purpose of each category is outlined in short here, to help find the correct category for your documentation to live in.

- Introduction
    - The purpose of this category is to introduce the very `basics` of the project and give newcomers an easy way to start. Contains the most basic explanation of the project, an installation guide, a Quickstart/5-Minute Tutorial and Contribution Guidelines.
- Concepts
    - The purpose of this category is to give the reader a deep `understanding` of the ideas upon which the project is built. Content in this category has the form of a discursive explanation. The main goal is to `explain`.
- Guides
    - The purpose of this category is to solve a specific problem. It has the form of a `series of steps` towards a goal. It is aimed towards more experienced users, who are already familiar with the concepts and tools.
- Reference
    - The purpose of this category is to provide a detailed & in-depth description of the project. It has the form of an `austere and to the point explanation` and is rooted in code, most often these documents are built directly from code without editor interaction. It __does not__ give information on how to do specific things, but describes how to correctly use the APIs etc.
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

If you would add a link to an outside resource, just go ahead.

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

```
<CodeFromRemote
  lang="js" # the language of the code you want to add e.g. jsx,tsx,ts,go,yaml,yml,js,html,pug
  link="https://github.com/ory/kratos-selfservice-ui-node/blob/master/src/middleware/simple.ts"
  src="https://raw.githubusercontent.com/ory/kratos-selfservice-ui-node/master/src/middleware/simple.ts"
/>
```

# CLI Docs

## Fixing Ory CLI docs

If you find an error in the Ory CLI documentation here are some pointers on how to fix it:

The code that generates the CLI docs (for Kratos) comes from here:   
https://github.com/ory/kratos/blob/master/cmd/clidoc/main.go

`cmd/clidoc/main.go` is the general path for all Ory projects.

The command to generate the CLI docs can be found here:  
https://github.com/ory/x/blob/master/clidoc/generate.go#L96
