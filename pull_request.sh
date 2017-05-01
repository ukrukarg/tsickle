#!/bin/bash

set -e

copybara="/google/data/ro/teams/copybara/copybara"

branch=$(pwd | sed -ne "s|^/google/src/cloud/\(.*\)/google3$|\1|p")
if [[ -z "$branch" ]]; then
  echo "ERROR: must be run from the google3/ dir of a citc client"
  exit 1
fi

cl=$(g4 -F"%change%" changes -c $(g4 -F"%clientName%" info))

echo "Pushing $cl to github branch $branch..."

set -x

exec "$copybara" \
  third_party/javascript/node_modules/tsickle/copy.bara.sky \
  pull_request_use_script_instead \
  --git-destination-fetch "master" \
  --git-destination-push "$branch" \
  "$cl"
