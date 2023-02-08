curl -X POST -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d '{"method":"password","traits.email":"email@example.com","traits.tos":"true","password":"verystrongpassword"}' \
    "https://{project.slug}.projects.oryapis.com/self-service/registration?flow=<your-flow-id>"