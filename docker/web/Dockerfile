FROM amazonlinux:2023

ARG PROJECT_PATH=/srv/task-management.com
COPY . $PROJECT_PATH

# NGINX
RUN yum -y install yum-utils
COPY docker/web/nginx/nginx.repo /etc/yum.repos.d/nginx.repo
RUN yum -y install nginx-1.28.2
COPY docker/web/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

# Node.js
RUN yum -y install tar
RUN touch ~/.bashrc
COPY docker/web/install-npm.sh /tmp/install-npm.sh
RUN chmod 755 /tmp/install-npm.sh
RUN /tmp/install-npm.sh 24.13.1 $PROJECT_PATH