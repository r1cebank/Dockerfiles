############################################################
# Dockerfile to run yaas
# Based on baseos
############################################################

FROM r1cebank/baseos

# File Author / Maintainer
MAINTAINER Siyuan Gao <siyuangao@gmail.com>

# Bundle app source
COPY . /src

# Environment variables
ENV PORT 3939
ENV INSTANCE 1

# Install app dependencies
RUN cd /src; npm install

CMD ["pm2", "/src/build", "-i", ${INSTANCE}]
