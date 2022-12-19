#!/bin/bash
create_payload() {
    unset payload

    # uses both email and pwhash. pwhash can also be 'null'-string
    if [[ -z "$email" && -z "$pwhash" ]]; then
        echo "please supply both an email and password"
        exit 1
    elif [[ -z "$pwhash" || "$pwhash" == "null" ]]; then
        payload=$(jq -n \
            --arg sid "$ORY_SCHEMA_ID" \
            --arg em "$email" \
            '{schema_id: $sid, traits: {email: $em}}')
    else
        payload=$(
            jq -n \
                --arg sid "$ORY_SCHEMA_ID" \
                --arg em "$email" \
                --arg pwhash "$pwhash" \
                '{schema_id: $sid,
                  traits:
                    {email: $em},
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
        curl --request POST -sL \
            --header "Authorization: Bearer $ORY_TOKEN" \
            --header "Content-Type: application/json" \
            --data "$payload" "https://${ORY_SLUG}.projects.oryapis.com/admin/identities"
    fi
}

export ORY_SCHEMA_ID='preset://email'

if [ -z ${AUTH0_PWEXPORT+x} ]; then
    userdata=$(cat ${AUTH0_USERDATA} | jq ".")

    echo "$userdata" | jq -r '.[] | .email' | while read email; do
        create_payload
        create_identity
    done
else
    # add passwords to user data by email
    pw_hashes=$(cat "${AUTH0_PWEXPORT}" | jq -s "." | jq "map({email, passwordHash})")
    auth0_alldata=$(jq 'JOIN(INDEX(inputs[];.email);.[];.email;add)' <(cat "${AUTH0_USERDATA}") <(echo "$pw_hashes") | jq -s ".")

    echo "$auth0_alldata" | jq -r '.[] | .email, .passwordHash' | while read email && read pwhash; do
        create_payload
        create_identity $payload
    done

fi
