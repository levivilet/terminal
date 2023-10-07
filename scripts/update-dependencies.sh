#!/bin/bash

set -e

cd $(dirname "$0")
cd ..

command_exists(){
  command -v "$1" &> /dev/null
}

if ! command_exists "ncu"; then
    echo "npm-check-updates is not installed"
    npm i -g npm-check-updates
else
    echo "ncu is installed"
fi

function updateDependencies {
  echo "updating dependencies..."
  OUTPUT=`ncu -u -x msw -x clean-stack -x @types/node`
  SUB='All dependencies match the latest package versions'
  if [[ "$OUTPUT" == *"$SUB"* ]]; then
    echo "$OUTPUT"
  else
    rm -rf node_modules package-lock.json dist
    npm install
  fi
}

                                                       updateDependencies             &&
cd packages/renderer-process                        && updateDependencies && cd ../.. &&
cd packages/renderer-worker                         && updateDependencies && cd ../.. &&
cd packages/server                                  && updateDependencies && cd ../.. &&
cd packages/terminal-library                        && updateDependencies && cd ../.. &&
cd packages/build                                   && updateDependencies && cd ../.. &&

echo "Great Success!"

sleep 2