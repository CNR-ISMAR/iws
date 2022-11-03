#!/bin/bash
set -e


function create_geonode_user_and_dss_pharos() {
	local dbname=$1
	echo "  Creating user and database '$dbname'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER $dbname;
		ALTER USER $dbname with encrypted password '$DSS_PHAROS_PASSWORD';
	    CREATE DATABASE $dbname;
	    GRANT ALL PRIVILEGES ON DATABASE $dbname TO $dbname;
EOSQL
}

function create_geonode_user_and_seastorm() {
	local dbname=$1
	echo "  Creating user and database '$dbname'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER $dbname;
		ALTER USER $dbname with encrypted password '$SEASTORM_PASSWORD';
	    CREATE DATABASE $dbname;
	    GRANT ALL PRIVILEGES ON DATABASE $dbname TO $dbname;
EOSQL
}


if [ -n "$DSS_PHAROS_NAME" ]; then
	echo "Geonode geodatabase creation requested: $DSS_PHAROS_NAME"
	create_geonode_user_and_dss_pharos $DSS_PHAROS_NAME
	update_geodatabase_with_postgis $DSS_PHAROS_NAME
	echo "Geonode geodatabase created"
fi


if [ -n "$SEASTORM_NAME" ]; then
	echo "Geonode geodatabase creation requested: $SEASTORM_NAME"
	create_geonode_user_and_seastorm $SEASTORM_NAME
	update_geodatabase_with_postgis $SEASTORM_NAME
	echo "Geonode geodatabase created"
fi
