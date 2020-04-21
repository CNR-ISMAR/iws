FROM node:8.6-slim

ARG HTTP_PROXY
ARG HTTPS_PROXY


WORKDIR /usr/src

#RUN apt-get update; apt-get install git nano -y

COPY . /usr/src/app
WORKDIR /usr/src/app
#COPY ./.gitfake .git

RUN npm install -g cross-env

#RUN npm run setup
RUN npm install

RUN npm run build:docker

RUN  npm config set proxy ${HTTP_PROXY}
RUN  npm config set proxy ${HTTPS_PROXY}


#START
CMD npm run start:docker
