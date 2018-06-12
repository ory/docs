#/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )/../guides"

contents=$(cat book.json | sed 's/[[:space:]]\+\"text\": \"latest (stable)\"/          \"text\": \"latest (stable)\"\
        },\
        {\
          \"value\": \"https:\/\/www.ory.sh\/docs\/guides\/'"${CIRCLE_TAG}"'\",\
          \"text\": \"'"${CIRCLE_TAG}"'\"/')

echo "$contents"

echo "$contents" > book.json
