FROM geonode/postgis:13

# rename the init script so that it can be run as first
RUN mv /docker-entrypoint-initdb.d/geonode.sh /docker-entrypoint-initdb.d/001-geonode.sh 

# then add to the directory all our custom files
COPY --chmod=+x ./init /docker-entrypoint-initdb.d/
