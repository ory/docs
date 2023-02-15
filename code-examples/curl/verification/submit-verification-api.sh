curl -X POST \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d '{"method":"code","email":"email@example.com"}' \
    "https://{project.slug}.projects.oryapis.com/self-service/verification?flow=<your-flow-id>"