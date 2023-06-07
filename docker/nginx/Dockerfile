FROM nginx:1.23.0-alpine

RUN apk add --no-cache openssl inotify-tools

WORKDIR /etc/nginx/

ADD nginx.conf.envsubst nginx.https.available.conf.envsubst ./
ADD geonode.conf.envsubst ./sites-enabled/
ADD iws.seastorms.eu.conf ./sites-enabled/
# ADD www.seastorms.eu.conf ./sites-enabled/

ADD docker-autoreload.sh docker-entrypoint.sh /

RUN mkdir -p /etc/nginx/errorpages
COPY 502.html /etc/nginx/erropages/
COPY seastorms_LOGO.png /etc/nginx/errorpages/

ENTRYPOINT ["/docker-entrypoint.sh"]
RUN chmod +x /docker-autoreload.sh
RUN chmod +x /docker-entrypoint.sh

CMD ["nginx", "-g", "daemon off;"]
