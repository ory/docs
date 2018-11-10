#!/bin/bash

set -euo pipefail

cd "$( dirname "${BASH_SOURCE[0]}" )/.."

find docs/ -name \*.md -exec ./website/node_modules/.bin/markdown-link-check -c markdown-link-check.json --quiet {} \;
