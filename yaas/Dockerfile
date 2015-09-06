############################################################
# Dockerfile to run yaas
# Based on baseos
############################################################

FROM r1cebank/baseos:latest

# File Author / Maintainer
MAINTAINER Siyuan Gao <siyuangao@gmail.com>

# Bundle app source
COPY . /src

# Environment variables
ENV PORT 3939
ENV INSTANCE 1

# Install app dependencies
RUN cd /src; npm install

ENV NODE_ENV production
WORKDIR /src

CMD pm2 start /build -i ${INSTANCE} --no-daemon && pm2 logs
