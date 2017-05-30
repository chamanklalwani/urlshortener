# Create image based on the official Node 6 image from dockerhub
FROM node:boron
MAINTAINER Chaman
LABEL Description="Dockerfile for MEAN based URL Shorten application"

# We need to expose ports for Node.js (3000), MongoDB (27017) and LiveReload (35729)
EXPOSE 3000 27017 35729

# MongoDB will run from a separate official container called 'mongo' (https://hub.docker.com/_/mongo/).
# See the README for more information

# Let's setup our project. We need to create a working directory first.

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]
