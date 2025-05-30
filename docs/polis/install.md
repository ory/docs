---
id: install
title: Getting Started with Ory Polis
sidebar_label: Installation
---

# Local Development

This guide will help you to setup and run Ory Polis in development mode.

## Clone the repo

```bash
git clone https://github.com/ory/polis.git

cd polis
```

## Install dependencies

Run the following command to install the Node dependencies.

```bash
npm install
```

## Setup environment variables

```bash
cp .env.example .env
```

Please refer to [environment variables](./deploy/env-variables.mdx) to read on setting environment variables.

## Setup the database

Run the following command to create database instances for the local development. Make sure you have Docker installed on your
machine.

```bash
npm run dev-dbs
```

## Start the development server

Start the development server by running the following command.

```bash
npm run dev
```

## Testing Ory Polis in your local environment

The Ory Polis service can be accessed locally using the following URL

```bash
http://localhost:5225
```

You can visit the following URL to see if the Ory Polis was started successfully!

```bash
http://localhost:5225/api/hello
```
