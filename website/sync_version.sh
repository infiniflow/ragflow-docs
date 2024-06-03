#!/bin/bash

set -x

version=$1

# Does not switch branch and proceed regardless. 
if [ ! -z "$version" ]; then
  echo $version
  cd $RAGFLOW_MAIN
  git checkout $version
fi

prefixPath="docs"
if [ ! -z "$version" ] && [ "$version" != "main" ]; then
  cd $RAGFLOW_WEBSITE/website
  prefixPath="versioned_docs/version-$version"
  cp ./versioned_sidebars/default.json ./versioned_sidebars/version-$version-sidebars.json
fi

cd $RAGFLOW_WEBSITE/website
rm -rf ./$prefixPath
mkdir -p ./$prefixPath
rsync -avh --delete $RAGFLOW_MAIN/docs/ $RAGFLOW_WEBSITE/website/$prefixPath/
# node ./scripts/flaturl ./$prefixPath ./$prefixPath
# cp -r variables ./$prefixPath/variables
# rsync -avh --delete $RAGFLOW_MAIN/docs/variable.json $RAGFLOW_WEBSITE/website/$prefixPath/variables/variable.json
# rsync -avh --delete $RAGFLOW_MAIN/docs/fragments/ $RAGFLOW_WEBSITE/website/$prefixPath/fragments
