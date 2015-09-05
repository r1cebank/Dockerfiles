############################################################
# Dockerfile to build r1cebank base container images
# Based on nodejs
############################################################

FROM centos:centos6

# File Author / Maintainer
MAINTAINER Siyuan Gao <siyuangao@gmail.com>

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm, install app dependencies, and remove extraneous files
RUN yum install -y npm \
 && yum install -y git \
 && rm -rf /var/cache/yum \
 && rm -rf /usr/lib/locale \
 && rm -rf /usr/share/locale

#Installing gulp
RUN npm install -g gulp

CMD ["/bin/bash", "--login"]
