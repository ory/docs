# Ory ReactJS reference Implementation

Starter using Ory + Vite + React + TypeScript + Tailwind

## Motivation

Improve building faster **prototypings** by using Vite, TypeScript, React, TailwindCSS and ORY for authentication.

This starter uses following libraries:

- Vite
- React
  - React Router
- TypeScript
- Tailwind CSS
- ESLint
- Prettier

## Set up

```shell
mv .env.local.example .env.local
export ORY_SDK_URL
yarn
```

## Local development

```shell
yarn start # for starting the react vite app
yarn proxy # for starting the ory proxy for local devlopment
```

### Ory

#### Open TODOS
- Debug FLow.tsx and convert to function component
- Check and add other routes (registration, verification, error...)
- Add ory eslint and prettier guidelines
- Add test setup
- Test flows
- Check test passing
- Add demo ory url to .env.local
- Styling?

#### Open questions

- how would a production setup look like with and without custom domain