curl -X POST \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d '{"method":"password","csrf_token":"your-csrf-token","traits.email":"email@example.com","password":"verystrongpassword","traits.tos":"true"}' \
    -b cookies.txt \
    "https://{project.slug}.projects.oryapis.com/self-service/registration?flow=<your-flow-id>"