FROM python:2.7.14-stretch
MAINTAINER GeoNode development team

RUN mkdir -p /usr/src/iws
RUN mkdir -p /usr/src/geonode

WORKDIR /usr/src/iws

# This section is borrowed from the official Django image but adds GDAL and others
RUN apt-get update && apt-get install -y \
		gcc \
		gettext \
		postgresql-client libpq-dev \
		sqlite3 \
                python-gdal python-psycopg2 \
                python-imaging python-lxml \
                python-dev libgdal-dev \
                python-ldap \
                libmemcached-dev libsasl2-dev zlib1g-dev \
                python-pylibmc \
                uwsgi uwsgi-plugin-python \
	--no-install-recommends && rm -rf /var/lib/apt/lists/*


RUN ln -s /usr/bin/invoke /usr/local/bin/invoke
COPY wait-for-databases.sh /usr/bin/wait-for-databases
RUN chmod +x /usr/bin/wait-for-databases

# Upgrade pip
RUN pip install --upgrade pip



#install app
COPY . /usr/src/iws
#COPY ./srcgeonode /usr/src/geonode
RUN pip install celery==4.2.1
RUN pip install docker==3.7.0
RUN pip install django-autocomplete-light==2.3.3
RUN pip install invoke
RUN pip install -r requirements.txt
RUN pip install -e .


# To understand the next section (the need for requirements.txt and setup.py)
# Please read: https://packaging.python.org/requirements/

# python-gdal does not seem to work, let's install manually the version that is
# compatible with the provided libgdal-dev
# superseded by pygdal
#RUN pip install GDAL==2.1.3 --global-option=build_ext --global-option="-I/usr/include/gdal"
RUN GDAL_VERSION=`gdal-config --version` && echo $GDAL_VERSION \
    && PYGDAL_VERSION="$(pip install pygdal==$GDAL_VERSION 2>&1 | grep -oP '(?<=: )(.*)(?=\))' | grep -oh $GDAL_VERSION\.[0-9])" \
    && pip install pygdal==$PYGDAL_VERSION

# fix for known bug in system-wide packages
RUN ln -fs /usr/lib/python2.7/plat-x86_64-linux-gnu/_sysconfigdata*.py /usr/lib/python2.7/

#COPY . /usr/src/iws

ADD install/libgeos_patch.py /libgeos_patch.py
RUN patch /usr/local/lib/python2.7/site-packages/django/contrib/gis/geos/libgeos.py /libgeos_patch.py


RUN chmod +x /usr/src/iws/tasks.py \
    && chmod +x /usr/src/iws/entrypoint.sh

# app-specific requirements
#RUN pip install --upgrade --no-cache-dir --src /usr/src -r requirements.txt
#RUN pip install --upgrade -e .


RUN pip uninstall -y psycopg2
RUN pip install --no-binary psycopg2 psycopg2==2.7.3.1

RUN pip uninstall -y djangorestframework
RUN pip install djangorestframework==3.5.4

#ADD install/libgeos_patch.py /libgeos_patch.py
#RUN patch /usr/local/lib/python2.7/site-packages/django/contrib/gis/geos/libgeos.py /libgeos_patch.py

#ENTRYPOINT ["/usr/src/iws/entrypoint.sh"]
