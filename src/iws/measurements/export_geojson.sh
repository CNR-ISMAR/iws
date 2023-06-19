# ogr2ogr -f GeoJSON /opt/iws/iws/static/measurements/locations.json \
# 	"PG:host=localhost dbname=geonode user=geonode password=geonode" \
#	  -sql "select label as key, geo from measurements_location a where a.geo is not null"

select label as key, st_y(geo) as latitude, st_x(geo) as longitude, label as name from measurements_location a where a.geo is not null
