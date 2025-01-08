#!/bin/bash
job_response=$(
    curl --request POST -s --url "https://${AUTH0_DOMAIN}/api/v2/jobs/users-exports" \
        --header "authorization: Bearer ${AUTH0_TOKEN}" \
        --header "content-type: application/json" \
        --data '{"connection_id": "'$AUTH0_CONNECTION_ID'", "format": "json", "fields": [
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

poll_job_status() {
    jobstatus=$(curl --request GET -s --url "https://${AUTH0_DOMAIN}/api/v2/jobs/${job_id}" --header "authorization: Bearer ${AUTH0_TOKEN}")
    state=$(echo $jobstatus | jq -r ".status")
    echo "jobstate: ${state}"

    if [[ $state == "pending" ]] || [[ $state == "processing" ]]; then
        echo "${jobstatus}" | jq ".time_left_seconds" | read timeleft
        if [ -z $timeleft]; then
            sleep 1
            echo "polling job state"
        else
            sleep $timeleft
            echo "time left: ${timeleft}s"
        fi
        poll_job_status

    elif [[ $state == "completed" ]]; then
        location=$(echo $jobstatus | jq -r ".location")
        curl "$location" --silent --output "AUTH0_USERDATA_nd.json.gz"
        gzip -d -c "AUTH0_USERDATA_nd.json.gz" | jq -s "." >"AUTH0_USERDATA.json"
        echo "Finished downloading Auth0 user data!"
    fi
}
poll_job_status
