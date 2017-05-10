# Build:
# docker build -t urlshorten .
#
# Run:
# docker run -it urlshorten

# Create image based on the official Node 6 image from dockerhub
FROM node:6
MAINTAINER Chaman
LABEL Description="Dockerfile for MEAN based URL Shorten application"

# We need to expose ports for Node.js (3000), MongoDB (27017) and LiveReload (35729)
EXPOSE 3000 27017 35729

# Set development environment as default
ENV NODE_ENV development

# Install Utilities
RUN apt-get update -q  \
 && apt-get install -yqq \
 curl \
 git \
 ssh \
 gcc \
 make \
 build-essential \
 libkrb5-dev \
 sudo \
 apt-utils \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install MEAN application Prerequisites
RUN npm install --quiet -g bower gulp && npm cache clean

# MongoDB will run from a separate official container called 'mongo' (https://hub.docker.com/_/mongo/).
# See the README for more information

# Let's setup our project. We need to create a working directory first, clone the project and configure it

RUN mkdir -p /usr/src/urlshorten/
WORKDIR /usr/src/urlshorten

# Clone urlshortener repository
RUN git clone https://github.com/chamanklalwani/urlshortener.git /usr/src/urlshorten

# Install npm packages
COPY package.json /usr/src/urlshorten/package.json
RUN npm install --quiet && npm cache clean

# Install bower packages
RUN bower install --config.interactive=false --quiet --allow-root

#COPY . /usr/src/urlshorten

# Run MEAN server
CMD npm install && npm start
