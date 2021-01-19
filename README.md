# Documentation

This repository contains meta-documentation for the ORY Ecosystem. For individual project documentation go to:

- https://github.com/ory/kratos/tree/master/docs
- https://github.com/ory/hydra/tree/master/docs
- https://github.com/ory/oathkeeper/tree/master/docs
- https://github.com/ory/keto/tree/master/docs


# Contributing Documentation

For the ecosystem documents go to ory/docs.  
For the individual projects docs go to ory/$project/docs   ($project = hydra,kratos,oathkeeper or keto)
To test the docs locally:  
```
cd kratos/docs # for example for kratos
npm i	# install dependencies
npm start # test if everything works
```
To build the docs:

`npm run build `

## How to add links to other pages

If you would add a link to an outside ressource, just go ahead. 

**If you want to add a link to a document in our own documentation, please make sure to add the filename.**

For example `[XY Guide](./guide/XY.md)` rather than `[XY Guide](./guide/XY)`. 

This prevents this bug that occurs when you load the documentation from an outside link. Docusaurus then treats `./guide/XY` as `./guide/XY/`, which results in a broken link.  
