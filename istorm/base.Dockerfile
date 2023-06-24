FROM node:10-alpine

WORKDIR /usr/src

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g cross-env && apk update && apk add mesa-gl alpine-sdk
RUN apk add pkgconfig autoconf automake libtool nasm build-base zlib-dev && npm install
RUN npm run build:docker

#START
CMD npm run start:docker
