# Url Shortening App

Url Shortening app built with Node API along with MongoDB and Angular. For demonstration purposes and a tutorial.

Node provides the RESTful API. Angular provides the frontend and accesses the API. MongoDB stores like a hoarder.

## Installation

1. MongoDB

- MongoDB: (Local Configuration)
    If you have MongoDB installed on your machine, then configure it in `config/database.js`

- MongoDB: (Using mongo image from DockerHub)
    Pull Mongo image from DockerHub and start it

```
docker pull mongo
docker run -p 27017:27017 -d --name db mongo

Change localUrl value to 'db:27017/urlshortener' in 'config/database.js', Where 'db' is the name of mongo container.
```

2. NodeJs Application

1. Clone the repository: `https://github.com/chamanklalwani/urlshortener.git`
2. Build and Run "URL Shortener" app image:

Build the Dockerfile and tag the image as urlshortener:

```
docker build -t urlshortener .
```

Run the docker image 'urlshortener' inside a container:

```
docker run -p 3000:3000 -p 35729:35729 --name urlshortener --link db:db urlshortener
```