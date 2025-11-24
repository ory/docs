#!/bin/bash
set -euo pipefail

if [ -z "${AUTH0_DOMAIN:-}" ] || [ -z "${AUTH0_TOKEN:-}" ] || [ -z "${AUTH0_CONNECTION_ID:-}" ]; then
    echo "Error: Required environment variables not set"
    echo "Please set: AUTH0_DOMAIN, AUTH0_TOKEN, AUTH0_CONNECTION_ID"
    exit 1
fi

job_response=$(
    curl --request POST -s --url "https://${AUTH0_DOMAIN}/api/v2/jobs/users-exports" \
        --header "authorization: Bearer ${AUTH0_TOKEN}" \
        --header "content-type: application/json" \
        --data '{"connection_id": "'"$AUTH0_CONNECTION_ID"'", "format": "json", "fields": [
                {"name": "user_id"},
                {"name": "email"},
                {"name": "email_verified"},
                {"name": "username"},
                {"name": "phone_number"},
                {"name": "phone_verified"},
                {"name": "created_at"},
                {"name": "updated_at"},
                {"name": "identities[0].connection",
                "export_as": "provider" },
                {"name": "app_metadata"},
                {"name": "user_metadata"},
                {"name": "picture"},
                {"name": "name"},
                {"name": "nickname"},
                {"name": "multifactor"},
                {"name": "last_ip"},
                {"name": "last_login"},
                {"name": "logins_count"},
                {"name": "blocked"},
                {"name": "given_name"},
                {"name": "family_name"}
                ]}'
)

job_id=$(echo "$job_response" | jq -r ".id")

if [ -z "$job_id" ] || [ "$job_id" = "null" ]; then
    echo "Error: Failed to create export job"
    echo "$job_response" | jq
    exit 1
fi

echo "Export job created with ID: $job_id"

poll_job_status() {
    jobstatus=$(curl --request GET -s --url "https://${AUTH0_DOMAIN}/api/v2/jobs/${job_id}" --header "authorization: Bearer ${AUTH0_TOKEN}")
    state=$(echo "$jobstatus" | jq -r ".status")
    echo "Job state: ${state}"

    if [[ "$state" == "pending" ]] || [[ "$state" == "processing" ]]; then
        timeleft=$(echo "$jobstatus" | jq -r ".time_left_seconds")
        if [ "$timeleft" = "null" ] || [ -z "$timeleft" ]; then
            sleep 5
            echo "Polling job state..."
        else
            echo "Time left: ${timeleft}s"
            sleep "$timeleft"
        fi
        poll_job_status

    elif [[ "$state" == "completed" ]]; then
        location=$(echo "$jobstatus" | jq -r ".location")
        curl "$location" --silent --output "AUTH0_USERDATA_nd.json.gz"
        gzip -d -c "AUTH0_USERDATA_nd.json.gz" | jq -s "." >"AUTH0_USERDATA.json"
        echo "Finished downloading Auth0 user data to AUTH0_USERDATA.json!"
        
    elif [[ "$state" == "failed" ]]; then
        echo "Error: Export job failed"
        echo "$jobstatus" | jq
        exit 1
        
    else
        echo "Unknown job state: $state"
        echo "$jobstatus" | jq
        exit 1
    fi
}

poll_job_status