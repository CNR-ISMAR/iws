#!/bin/bash
set -x
#install script  for patching and finalize installation
#set INITIAL_PATH with parent directory where geonode project is located (our is in /opt/iws)


INITIAL_PATH='/opt/'

#set VENV_PATH with virtualenv path (our is in opt/VirtEnv/iws
VENV_PATH='/opt/VirtEnv/iws/'

cd "$INITIAL_PATH"
#pip install -e iws/
cd "$INITIAL_PATH"iws/install
patch "$VENV_PATH"local/lib/python2.7/site-packages/django/contrib/gis/geos/libgeos.py libgeos_patch.py

cd ..

GDAL_VERSION=`gdal-config --version`
PYGDAL_VERSION="$(pip install pygdal==$GDAL_VERSION 2>&1 | grep -oP '(?<=: )(.*)(?=\))' | grep -oh $GDAL_VERSION\.[0-9])"
pip install pygdal==$PYGDAL_VERSION

pip uninstall psycopg2
pip install --no-binary psycopg2 psycopg2==2.7.3.1

pip uninstall djangorestframework
pip install djangorestframework==3.5.4

#make available python wheels installed for all users of group
sudo chown -R $USER:www-data "$VENV_PATH"
find "$VENV_PATH"lib/python2.7/site-packages/ -type d -exec chmod a+rwx {} \;
