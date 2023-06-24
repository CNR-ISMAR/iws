FROM gresci/iwsistorm

ENV HTTP_PROXY=http://172.22.10.116:80
ENV HTTPS_PROXY=http://172.22.10.116:80

ENV http_proxy=${HTTP_PROXY}
ENV https_proxy=${HTTPS_PROXY}

RUN npm config set registry=http://registry.npmjs.org/
RUN npm config set strict-ssl false

EXPOSE 3000
#START
CMD npm run start:docker
