curl -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -c cookies.txt \
    -b cookies.txt \
    "https://$project_slug.projects.oryapis.com/self-service/logout?token=J6yIQf7ABx1BBiPOj036dJKSQmKwGnX6"