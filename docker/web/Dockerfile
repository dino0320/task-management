FROM amazonlinux:2023
WORKDIR /srv/task-management.com

# Install Nginx and Node.js

# Install packages and remove cache
COPY docker/web/nginx/nginx.repo /etc/yum.repos.d/nginx.repo
RUN yum -y update && \
    yum -y install yum-utils nginx-1.28.2 \
    tar && \
    yum clean all && rm -rf /var/cache/yum

# Copy configurations and scripts
COPY docker/web/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY docker/web/install-npm.sh /tmp/install-npm.sh

# Prepare logs and directories
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Install Node.js
RUN touch ~/.bashrc && chmod 755 /tmp/install-npm.sh && /tmp/install-npm.sh 24.13.1