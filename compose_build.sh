#|/bin/bash


sudo chown -R afadini:docker /opt/iws/volumes/geoserver-data-dir/data/

docker-compose build --no-cache
