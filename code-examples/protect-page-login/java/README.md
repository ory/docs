# Java Spring Boot Authentication Example

This example demonstrates how to implement authentication in a Spring Boot
application using Ory.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js (to run Ory CLI via `npx`)
- An Ory Network account with a project set up
- Your Ory Project ID

## Getting Started

### 1. Install Dependencies

The project uses Maven for dependency management. Install dependencies by
running:

```bash
mvn install
```

### 2. Configure Ory SDK URL

Set the Ory SDK URL as an environment variable or in `application.yaml`:

```bash
export ORY_SDK_URL=http://localhost:4000
```

Or update `src/main/resources/application.yaml`:

```yaml
ory:
  sdk:
    url: http://localhost:4000
```

### 3. Start the Application

You can start the application with:

```bash
mvn spring-boot:run
```

The application will run on port 3000 by default.

### 4. Run the Ory Tunnel

To ensure cookies are on the same domain, run the Ory Tunnel with your project
ID:

```bash
npx @ory/cli tunnel --dev http://localhost:3000 --project <project_id>
```

Replace `<Project_ID>` with your actual Ory Project ID from the Ory Console.

Now head to http://localhost:3000 to test.

## Project Structure

- `Application.java` - Main Spring Boot application class
- `SessionInterceptor.java` - Interceptor that validates user sessions using Ory
  `FrontendApi`
- `HomeController.java` - Controller for the protected home page
- `WebConfig.java` - Configuration to register the session interceptor

## Available Commands

- `mvn spring-boot:run` - Start the development server
- `mvn clean package` - Build the application
- `java -jar target/ory-java-example-1.0.0.jar` - Run the packaged application

## Learn More

- [Ory Documentation](https://www.ory.sh/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Maven Documentation](https://maven.apache.org/)

## Going to Production

To deploy this application to production:

1. Build the application: `mvn clean package`
2. Deploy the JAR file to your hosting service (e.g., AWS, Heroku, or any
   Java-compatible platform)
3. Configure a custom domain for your Ory project to match your application
   domain
4. Update `ory.sdk.url` in your production `application.yaml` to point to your
   Ory custom domain
