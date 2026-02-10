#!/bin/bash

set -euxo pipefail

PROJECT_PATH=/srv/task-management.com

cd $PROJECT_PATH

# Add the nginx user to the root group for permission access
usermod -aG root nginx

# Start NGINX
# By using -g "daemon off;", NGINX runs in the foreground, preventing the container from exiting automatically
nginx -g "daemon off;"