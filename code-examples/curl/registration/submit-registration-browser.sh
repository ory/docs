curl -X POST \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d '{"method":"password","csrf_token":"your-csrf-token","traits.email":"email@example.com","password":"verystrongpassword","traits.tos":"true","transient_payload.consents":"newsletter,usage_stats"}' \
    -b cookies.txt \
    -c cookies.txt \
    "https://$PROJECT_SLUG.projects.oryapis.com/self-service/registration?flow=<your-flow-id>"
