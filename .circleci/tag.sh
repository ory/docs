#/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )/../guides"

cat book.json | sed 's/[[:space:]]\+\"text\": \"latest (stable)\"/          \"text\": \"latest (stable)\"\
        },\
        {\
          \"value\": \"https:\/\/www.ory.sh\/docs\/guides\/'"${CIRCLE_TAG}"'\",\
          \"text\": \"'"${CIRCLE_TAG}"'\"/'

foo=cat book.json | sed 's/[[:space:]]\+\"text\": \"latest (stable)\"/          \"text\": \"latest (stable)\"\
        },\
        {\
          \"value\": \"https:\/\/www.ory.sh\/docs\/guides\/'"${CIRCLE_TAG}"'\",\
          \"text\": \"'"${CIRCLE_TAG}"'\"/'

echo $foo

cat book.json | sed 's/[[:space:]]\+\"text\": \"latest (stable)\"/          \"text\": \"latest (stable)\"\
        },\
        {\
          \"value\": \"https:\/\/www.ory.sh\/docs\/guides\/'"${CIRCLE_TAG}"'\",\
          \"text\": \"'"${CIRCLE_TAG}"'\"/' > book.json
