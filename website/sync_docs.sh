#!/bin/bash

set -x

cd $RAGFLOW_WEBSITE/website
yarn install

if [ "$1" != "dev" ]
then
  # Retrieve the last 2 versions from the main repository and save them to versions.json
  yarn run genversions

  for version in $(cat versions.json | jq -r '.[]'); do
    cd $RAGFLOW_WEBSITE/website
    sh ./sync_version.sh $version
  done
fi

cd $RAGFLOW_WEBSITE/website

# Copy the release notes to the website source
cp -f ./docs/release_notes.md ./src/pages/_changelog.mdx

# Copy the "basics" directory to the website root
cp -rf ./docs/basics ./

sh ./sync_version.sh main
