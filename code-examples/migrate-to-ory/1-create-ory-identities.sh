#!/bin/bash
set -euo pipefail

# Check required environment variables
if [[ -z "${ORY_PROJECT_ID:-}" ]] || [[ -z "${ORY_WORKSPACE_ID:-}" ]]; then
    echo "Error: Required environment variables not set"
    echo "Please set: ORY_PROJECT_ID, ORY_WORKSPACE_ID"
    exit 1
fi

if [[ -z "${AUTH0_USERDATA:-}" ]]; then
    echo "Error: AUTH0_USERDATA environment variable not set"
    echo "Please set: AUTH0_USERDATA (path to Auth0 user data JSON file)"
    exit 1
fi

if [[ "${RESERVE_ONLY:-false}" != "true" ]] && [[ -z "${AUTH0_PWEXPORT:-}" ]]; then
    echo "Error: AUTH0_PWEXPORT environment variable not set"
    echo "Please set: AUTH0_PWEXPORT (path to password hashes JSON file)"
    echo "Or set RESERVE_ONLY=true to skip password import"
    exit 1
fi

create_payload() {
    unset payload
    ory_schema_id='preset://email'

    # uses both email and pwhash. pwhash can also be 'null'-string
    if [[ -z "$email" && -z "$pwhash" ]]; then
        echo "please supply both an email and password"
        exit 1
    elif [[ -z "$pwhash" || "$pwhash" == "null" ]]; then
        payload=$(jq -n \
            --arg sid "$ory_schema_id" \
            --arg em "$email" \
            '{schema_id: $sid, traits: {email: $em}, metadata_admin: {origin: "auth0"}}')
    else
        payload=$(
            jq -n \
                --arg sid "$ory_schema_id" \
                --arg em "$email" \
                --arg pwhash "$pwhash" \
                '{schema_id: $sid,
                  traits:
                    {email: $em},
                    metadata_admin: {origin: "auth0"},
                     credentials:
                         {password:
                             {config:
                                 {hashed_password: $pwhash}}}}'
        )
    fi
}

create_identity() {
    if [[ -z "$payload" ]]; then
        echo "please supply a valid payload"
        exit 1
    else
        echo $payload | ory import identities --workspace $ORY_WORKSPACE_ID --project $ORY_PROJECT_ID
    fi
}

if [[ "${RESERVE_ONLY}" == "true" ]]; then
    userdata=$(cat ${AUTH0_USERDATA} | jq ".")

    echo "$userdata" | jq -r '.[] | .email' | while read email; do
        create_payload
        create_identity
    done
else
    # Create an index from passwords file and merge with user data
    auth0_alldata=$(jq --slurpfile pw "${AUTH0_PWEXPORT}" \
        '($pw[0] | INDEX(.email)) as $pw_index | 
         . | map(. + {passwordHash: (if $pw_index[.email] then $pw_index[.email].passwordHash else null end)})' \
        "${AUTH0_USERDATA}")

    echo "$auth0_alldata" | jq -r '.[] | .email, .passwordHash' | while read email && read pwhash; do
        create_payload
        create_identity
    done

fi
