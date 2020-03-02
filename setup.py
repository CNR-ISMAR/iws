# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2018 OSGeo
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
#########################################################################

import os
from distutils.core import setup

try: # for pip >= 10
    from pip._internal.req import parse_requirements
    from pip._internal.download import PipSession
except ImportError: # for pip <= 9.0.3
    from pip.req import parse_requirements
    from pip.download import PipSession
from distutils.core import setup

from setuptools import find_packages

# Parse requirements.txt to get the list of dependencies
# inst_req = parse_requirements('requirements.txt',
#                               session=PipSession())
# REQUIREMENTS = [str(r.req) for r in inst_req]

# print(REQUIREMENTS)

def read(*rnames):
    return open(os.path.join(os.path.dirname(__file__), *rnames)).read()

setup(
    name="iws",
    version="0.1",
    author="",
    author_email="",
    description="iws, based on GeoNode",
    long_description=(read('README.rst')),
    # Full list of classifiers can be found at:
    # http://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        'Development Status :: 1 - Planning',
    ],
    license="BSD",
    keywords="iws geonode django",
    url='https://github.com/CNR-ISMAR/iws',
    packages=['iws',],
    include_package_data=True,
    zip_safe=False,
    dependency_links=[
        'git+https://github.com/GeoNode/geonode.git@2.8.x#egg=geonode',
        'git+https://github.com/voronind/awesome-slugify.git',
    ],
    install_requires=[
        # 'GeoNode==2.8',
        'django-ckeditor==5.3.1',
        'django-bootstrap-breadcrumbs==0.9.1',
        'django-rest-swagger==2.2.0',
        'django-extensions',
        'pandas==0.24.2',
        'django-pandas==0.6.0',
        'django-revproxy==0.9.15',
        'oauth2-provider==0.0',
        'netCDF4==1.5.1.2',
        'wget==3.2',
        'numpy==1.16.4',
        'fcm-django==0.2.21',
        '#pydap==3.2.2',
        '#sea storm atlas',
        'django-daterange-filter',
        'django-searchable-select',
        'django-grappelli==2.7.3',
       'celery==4.1.0',
       'Django==1.8.19',
        'six==1.10.0',
        'django-cuser==2017.3.16',
        'django-model-utils==3.1.1',
        'django-autocomplete-light==2.3.3',
        'pyshp==1.2.12',
       'django-celery-beat==1.1.1',
       'django-celery-monitor==1.1.2',
       'django-celery-results==1.0.1',
       'amqp==2.4.2',
       'kombu==4.1.0',
        'Shapely>=1.5.13,<1.6.dev0',
        'OWSLib==0.15.0',
        'proj==0.1.0',
        'pyproj==1.9.5.1',
        'inflection==0.3.1',
        'oauthlib==2.0.1',
        'python-dateutil==2.6.1',
        'pycsw==2.0.3',
        'django-ckeditor==5.3.1',
        'django-bootstrap-breadcrumbs==0.9.1',
        'django-rest-swagger==2.2.0',
        'pygdal==2.1.2.3',
        'pandas==0.24.2',
        'django-pandas==0.6.0',
        'django-revproxy==0.9.15'
    ],
)
