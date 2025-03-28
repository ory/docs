# Ory React Authentication Example

This project demonstrates how to integrate Ory authentication into a React
application built with Vite and TypeScript.

## Project Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Your application will be running at
[http://localhost:5173](http://localhost:5173).

## Connecting to Ory

To get your application running locally with Ory APIs on the same domain, use
the Ory Tunnel - a development tool bundled with Ory CLI:

```bash
# Set your Ory project URL
export ORY_SDK_URL=https://{your-project-slug-here}.projects.oryapis.com

# Run the tunnel connecting to your React app
npx @ory/cli tunnel --dev http://localhost:5173
```

This will make Ory APIs available at `http://localhost:4000`, which is the URL
used as the `baseUrl` in the Ory SDK configuration.

## Making API Calls

The example also demonstrates how to make authenticated API calls to a backend
server. To run the API server:

```bash
# Navigate to the API directory
cd api

# Install dependencies if needed
npm install

# Start the server
node index.js
```

The API server runs on port 8081 and requires the proper session cookies from
Ory to authenticate requests.

## Project Structure

- `src/App.tsx` - Basic authentication example
- `src/AppWithAPI.tsx` - Authentication with API integration example

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
