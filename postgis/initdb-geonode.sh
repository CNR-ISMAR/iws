#!/bin/bash
set -e

function create_geonode_user_and_database() {
	local db=$1
	echo "  Creating user and database '$db'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER $db;
		ALTER USER $db with encrypted password '$GEONODE_DATABASE_PASSWORD';
	    CREATE DATABASE $db;
	    GRANT ALL PRIVILEGES ON DATABASE $db TO $db;
EOSQL
}

function create_geonode_user_and_geodatabase() {
	local dbname=$1
	echo "  Creating user and database '$dbname'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER $dbname;
		ALTER USER $dbname with encrypted password '$GEONODE_GEODATABASE_PASSWORD';
	    CREATE DATABASE $dbname;
	    GRANT ALL PRIVILEGES ON DATABASE $dbname TO $dbname;
EOSQL
}

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

function update_geodatabase_with_postgis() {
	local db=$1
#	echo "  Updating geodatabase '$geonode_data' with extension"
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	echo $db
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$db" <<-EOSQL
		CREATE EXTENSION postgis;
EOSQL
}

if [ -n "$GEONODE_DATABASE" ]; then
	echo "Geonode database creation requested: $GEONODE_DATABASE"
	create_geonode_user_and_database $GEONODE_DATABASE
	update_geodatabase_with_postgis $GEONODE_DATABASE
	echo "Geonode database created"
fi

if [ -n "$GEONODE_GEODATABASE" ]; then
	echo "Geonode geodatabase creation requested: $GEONODE_GEODATABASE"
	create_geonode_user_and_geodatabase $GEONODE_GEODATABASE
	update_geodatabase_with_postgis $GEONODE_GEODATABASE
	echo "Geonode geodatabase created"
fi


if [ -n "$DSS_PHAROS" ]; then
	echo "Geonode geodatabase creation requested: $DSS_PHAROS"
	create_geonode_user_and_dss_pharos $DSS_PHAROS
	update_geodatabase_with_postgis $DSS_PHAROS
	echo "Geonode geodatabase created"
fi


if [ -n "$SEASTORM" ]; then
	echo "Geonode geodatabase creation requested: $SEASTORM"
	create_geonode_user_and_seastorm $SEASTORM
	update_geodatabase_with_postgis $SEASTORM
	echo "Geonode geodatabase created"
fi
