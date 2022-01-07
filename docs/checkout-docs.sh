#!/bin/bash

function checkoutDocs {
  dir=$(dirname "projects/$1")
  project=$(basename $1)
  current=$(pwd)
  echo "\$dir $dir $current"
  mkdir -p "$dir"
  cd "$dir"
  git clone --depth 1 --no-checkout "https://github.com/$1.git"
  cd "$project"
  git checkout master -- docs/docs
  cd "$current"
}

rm -rf projects

# checkoutDocs "ory/oathkeeper"
checkoutDocs "ory/keto"
# checkoutDocs "ory/hydra"
# checkoutDocs "ory/kratos"
# checkoutDocs "ory/docs"
checkoutDocs "ory-corp/oasis"

tree ./projects