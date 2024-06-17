curl -X POST -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d '{"method":"password","traits.email":"email@example.com","traits.tos":"true","password":"verystrongpassword","transient_payload.consents":"newsletter,usage_stats"}' \
    "https://$PROJECT_SLUG.projects.oryapis.com/self-service/registration?flow=<your-flow-id>"
