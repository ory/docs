curl -X POST \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d '{"method":"code","email":"email@example.com"}' \
    "https://$PROJECT_SLUG.projects.oryapis.com/self-service/recovery?flow=<your-flow-id>"
