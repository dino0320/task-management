#!/bin/bash

set -euxo pipefail

PROJECT_PATH=/srv/task-management.com

cd $PROJECT_PATH

# Install npm packages
if [ "$APP_ENV" = "local" ]; then
  # nvm is not loaded so load it
  source ~/.bashrc
  npm ci

if [ $IS_NPM_BUILT -eq 1 ]; then
  nest build
fi
fi

# Start NGINX
# By using -g "daemon off;", NGINX runs in the foreground, preventing the container from exiting automatically
nginx -g "daemon off;"