############################################################
# Dockerfile to build r1cebank base container images
# Based on ubuntu, with glusterfs, nodejs
############################################################

FROM ubuntu:14.04

MAINTAINER Siyuan Gao <siyuangao@gmail.com>

RUN apt-get update && \
    apt-get install -y python-software-properties software-properties-common
RUN add-apt-repository -y ppa:gluster/glusterfs-3.5 && \
    apt-get update && \
    apt-get install -y git nodejs nginx supervisor glusterfs-client dnsutils

ENV GLUSTER_VOL ranchervol
ENV GLUSTER_VOL_PATH /mnt/${GLUSTER_VOL}
ENV GLUSTER_PEER **ChangeMe**
ENV DEBUG 0

RUN mkdir -p /var/log/supervisor ${GLUSTER_VOL_PATH}
WORKDIR ${GLUSTER_VOL_PATH}

RUN mkdir -p /usr/local/bin
ADD ./bin /usr/local/bin
RUN chmod +x /usr/local/bin/*.sh

CMD ["/usr/local/bin/run.sh"]
