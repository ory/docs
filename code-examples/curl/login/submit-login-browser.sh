curl -X POST \
    -H 'Content-Type: application/json'\
    -H 'Accept: application/json' \
    -d '{"method":"password","csrf_token":"your-csrf-token","identifier":"email@example.com","password":"verystrongpassword"}' \
    -b cookies.txt \
    -c cookies.txt \
    "https://{project.slug}.projects.oryapis.com/self-service/login?flow=<your-flow-id>"