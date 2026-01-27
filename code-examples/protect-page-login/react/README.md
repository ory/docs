# Ory React Authentication Example

This example demonstrates how to implement authentication in a React.js
application built with Vite and TypeScript using Ory.

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

Your application will be running at
[http://localhost:5173](http://localhost:5173).

### 3. Run the Ory Tunnel

To ensure cookies are on the same domain, run the Ory Tunnel with your project
ID:

```bash
# Set your Ory project URL
export ORY_SDK_URL=https://{your-project-slug-here}.projects.oryapis.com

# Run the tunnel connecting to your React app
npx @ory/cli tunnel --dev http://localhost:5173
```

This will make Ory APIs available at `http://localhost:4000`, which is the URL
used as the `basePath` in the Ory SDK configuration.

## Making API Calls

The example also demonstrates how to make authenticated API calls to a backend
server. To run the API server:

```bash
# Navigate to the API directory
cd src/api

# Install dependencies if needed
npm install

# Start the server
node index.js
```

The API server runs on port 8081 and requires the proper session cookies from
Ory to authenticate requests.

## Project Structure

- `src/App.tsx` - Basic authentication example
- `src/AppWithApi.tsx` - Authentication with API integration example
- `src/api/index.js` - Express.js API server example

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally

## Learn More

- [Ory Documentation](https://www.ory.sh/docs)
- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)

## Going to Production

To deploy this application to production:

1. Build the React app and deploy it to a hosting service (e.g., Vercel or
   Netlify)
2. Deploy the API server (e.g., on Heroku)
3. Configure a custom domain for your Ory project to match your application
   domain

These three components must be hosted on the same top-level domain as they were
on your local machine:

| Component       | Production      | Local          |
| --------------- | --------------- | -------------- |
| Single Page App | www.example.org | localhost:5173 |
| API             | api.example.org | localhost:8081 |
| Ory             | ory.example.org | localhost:4000 |
