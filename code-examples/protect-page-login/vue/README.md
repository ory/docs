# Vue.js Authentication Example

This example demonstrates how to implement authentication in a Vue.js
application using Ory.

## Prerequisites

- Node.js installed on your machine
- An Ory Network account with a project set up
- Your Ory Project ID

## Getting Started

### 1. Install Dependencies

First, install the necessary dependencies by running:

```bash
npm install
```

### 2. Start the Application

You can start the application with:

```bash
npm run dev
```

### 3. Run the Ory Tunnel

To ensure cookies are on the same domain, run the Ory Tunnel with your project
ID:

```bash
ORY_PROJECT_ID=<Project_ID> npm run tunnel
```

Replace `<Project_ID>` with your actual Ory Project ID from the Ory Console.

Now head to http://localhost:3000 to test.
