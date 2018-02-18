#!/bin/bash
set -ue

RED='\033[1;31m'
NC='\033[0m'

FATAL="${RED}[fatal]${NC}"

SPLIT='=================================================='

echo ${SPLIT}

if [[ $# -gt 0 && $1 == 'minor' ]]; then
  VERSION_SECTION=minor
elif [[ $# -gt 0 &&  $1 == 'major' ]]; then
  VERSION_SECTION=major
else
  VERSION_SECTION=patch
fi
npm version $VERSION_SECTION

LATEST=$(git describe --abbrev=0 --tags)

git checkout master
git merge $LATEST
git checkout feature
git push origin master feature $LATEST


NODE_ENV=production DEBUG=false npm run build
