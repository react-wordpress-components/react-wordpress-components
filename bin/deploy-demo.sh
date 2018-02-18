#!/usr/bin/env bash
set -e

if [ $TRAVIS_BRANCH != "master" ]; then
  echo "TRAVIS_BRANCH=$TRAVIS_BRANCH"
  echo 'Not deploying from travis CI.'
  exit 0
fi


cd dist/demo

git init
git config user.name 'wreact'
git config user.email "wreact@users.noreply.github.com"
git remote add origin git@github.com:wreact/wreact.git

git checkout -b gh-pages
git add .
git commit -m "Deploy [made in travis]"
git push -f origin gh-pages
