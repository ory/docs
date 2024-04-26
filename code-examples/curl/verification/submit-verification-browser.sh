curl -X POST \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -b cookies.txt \
    -d '{"method":"code","email":"email@example.com","csrf_token":"your-csrf-token"}' \
    "https://$project_slug.projects.oryapis.com/self-service/verification?flow=<your-flow-id>"