cd /opt/
pip install -e iws/
cd /opt/iws/install
patch /opt/VirtEnv/iws/local/lib/python2.7/site-packages/django/contrib/gis/geos/libgeos.py libgeos_patch.py

pip uninstall psycopg2
pip install --no-binary psycopg2 psycopg2==2.7.3.1

pip uninstall djangorestframework
pip install djangorestframework==3.5.4

sudo chown -R menegon:www-data /opt/VirtEnv/iws
find /opt/VirtEnv/iws/lib/python2.7/site-packages/ -type d -exec chmod a+rwx {} \;
