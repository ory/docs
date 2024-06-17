curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"method":"password","identifier":"email@example.com","password":"verystrongpassword"}' \
    "https://$PROJECT_SLUG.projects.oryapis.com/self-service/login?flow=<your-flow-id>"
