FROM node:8.6-slim
WORKDIR /usr/src/app

RUN apt-get update; apt-get install git -y

COPY ./ .
#COPY ./.gitfake .git

RUN npm install -g cross-env

#RUN npm run setup
RUN npm install

# Build client
RUN npm run build

CMD npm run start -p 3001
