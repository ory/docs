curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"method":"password","identifier":"email@example.com","password":"verystrongpassword"}' \
    "https://{project.slug}.projects.oryapis.com/self-service/login?flow=<your-flow-id>"