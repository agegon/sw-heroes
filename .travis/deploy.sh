#!/bin/bash

set -ex
echo "Start deploying... Branch: $TRAVIS_BRANCH"

# setup ssh agent, git config and remote
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/travis_rsa
cd public
git init
git config user.name $REMOTE_USER
git config user.email "travis@planecq.com"
rm -f .gitignore
cp ../.travis/deployignore .gitignore

if [ $TRAVIS_BRANCH != "master" ]; then 
  git checkout -b dev
fi

# commit and push files to remote
git add .
git status # debug
git commit -m "Deploy files..."
git remote add deploy "$REMOTE_USER@$REMOTE_HOST:$REMOTE_APP_DIR"

if [ $TRAVIS_BRANCH == "master" ]; then 
  git push -f deploy master
else
  git push -f deploy dev
fi
