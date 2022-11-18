# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2017 OSGeo
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

# Django settings for the GeoNode project.
import os
import ast
import dj_database_url

try:
    from urllib.parse import urlparse, urlunparse
    from urllib.request import urlopen, Request
except ImportError:
    from urllib2 import urlopen, Request
    from urlparse import urlparse, urlunparse
# Load more settings from a file called local_settings.py if it exists
try:
    from iws.local_settings import *
#    from geonode.local_settings import *
except ImportError:
    from geonode.settings import *
except ModuleNotFoundError:
    from geonode.settings import *

#
# General Django development settings
#
PROJECT_NAME = 'iws'

# add trailing slash to site url. geoserver url will be relative to this
if not SITEURL.endswith('/'):
    SITEURL = '{}/'.format(SITEURL)

SITENAME = os.getenv("SITENAME", 'iws')

# Defines the directory that contains the settings file as the LOCAL_ROOT
# It is used for relative settings elsewhere.
LOCAL_ROOT = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.abspath(os.path.dirname(os.path.basename(__file__)))

WSGI_APPLICATION = "{}.wsgi.application".format(PROJECT_NAME)

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = os.getenv('LANGUAGE_CODE', "en")

if PROJECT_NAME not in INSTALLED_APPS:
    INSTALLED_APPS += (PROJECT_NAME,)


INSTALLED_APPS = INSTALLED_APPS + (
    'fcm_django',
    'openistorm',
    'leaflet',
    'django_media_fixtures',
    PROJECT_NAME + '.sea_storm_atlas',
    PROJECT_NAME + ".measurements",
    PROJECT_NAME + '.tmes',
    PROJECT_NAME + ".dashboards",
    PROJECT_NAME + ".polls",
)


# Location of url mappings
ROOT_URLCONF = os.getenv('ROOT_URLCONF', '{}.urls'.format(PROJECT_NAME))

# Additional directories which hold static files
# - Give priority to local geonode-project ones
STATICFILES_DIRS = [os.path.join(LOCAL_ROOT, "static"), ] + STATICFILES_DIRS

# Location of locale files
LOCALE_PATHS = (
    os.path.join(LOCAL_ROOT, 'locale'),
    ) + LOCALE_PATHS

TEMPLATES[0]['DIRS'].insert(0, os.path.join(LOCAL_ROOT, "templates"))
loaders = TEMPLATES[0]['OPTIONS'].get('loaders') or ['django.template.loaders.filesystem.Loader','django.template.loaders.app_directories.Loader']
# loaders.insert(0, 'apptemplates.Loader')
TEMPLATES[0]['OPTIONS']['loaders'] = loaders
TEMPLATES[0].pop('APP_DIRS', None)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d '
                      '%(thread)d %(message)s'
        },
        'simple': {
            'format': '%(message)s',
        },
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'console': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler',
        }
    },
    "loggers": {
        "django": {
            "handlers": ["console"], "level": "ERROR", },
        "geonode": {
            "handlers": ["console"], "level": "INFO", },
        "geoserver-restconfig.catalog": {
            "handlers": ["console"], "level": "ERROR", },
        "owslib": {
            "handlers": ["console"], "level": "ERROR", },
        "pycsw": {
            "handlers": ["console"], "level": "ERROR", },
        "celery": {
            "handlers": ["console"], "level": "DEBUG", },
        "mapstore2_adapter.plugins.serializers": {
            "handlers": ["console"], "level": "DEBUG", },
        "geonode_logstash.logstash": {
            "handlers": ["console"], "level": "DEBUG", },
    },
}

CENTRALIZED_DASHBOARD_ENABLED = ast.literal_eval(os.getenv('CENTRALIZED_DASHBOARD_ENABLED', 'False'))
if CENTRALIZED_DASHBOARD_ENABLED and USER_ANALYTICS_ENABLED and 'geonode_logstash' not in INSTALLED_APPS:
    INSTALLED_APPS += ('geonode_logstash',)

    CELERY_BEAT_SCHEDULE['dispatch_metrics'] = {
        'task': 'geonode_logstash.tasks.dispatch_metrics',
        'schedule': 3600.0,
    }

LDAP_ENABLED = ast.literal_eval(os.getenv('LDAP_ENABLED', 'False'))
if LDAP_ENABLED and 'geonode_ldap' not in INSTALLED_APPS:
    INSTALLED_APPS += ('geonode_ldap',)

# Add your specific LDAP configuration after this comment:
# https://docs.geonode.org/en/master/advanced/contrib/#configuration




# Project specific configurations
CORS_ORIGIN_ALLOW_ALL = True
UPLOADER['SUPPORTED_CRS'] += ['EPSG:900913',]
PROXY_ALLOWED_HOSTS += ('nominatim.openstreetmap.org',)

# MEDIA FIXTURES
MEDIA_FIXTURES_FILES_DIRS = [
    os.path.join(LOCAL_ROOT, "media_fixtures"),
]


# STORM ATLAS
STORM_ATLAS_MAP_ID = os.getenv('STORM_ATLAS_MAP_ID', 1)

DATABASES['seastorm'] = DATABASES['default'].copy()
DATABASES['seastorm']['name'] = os.getenv('SEASTORM_NAME')
DATABASES['seastorm']['user'] = os.getenv('SEASTORM_NAME')
DATABASES['seastorm']['password'] = os.getenv('SEASTORM_PASSWORD')

DATABASES['dss_pharos_db'] = DATABASES['default'].copy()
DATABASES['dss_pharos_db']['name'] = os.getenv('DSS_PHAROS_NAME')
DATABASES['dss_pharos_db']['user'] = os.getenv('DSS_PHAROS_NAME')
DATABASES['dss_pharos_db']['password'] = os.getenv('DSS_PHAROS_PASSWORD')

# MEASUREMENTS
MEASUREMENTS_DATABASE_URL = os.getenv('MEASUREMENTS_DATABASE_URL')
DATABASES['measurements'] = dj_database_url.parse(
    MEASUREMENTS_DATABASE_URL,
    conn_max_age=GEONODE_DB_CONN_MAX_AGE)


# FORECASTS
THREDDS_URL = os.getenv('THREDDS_URL', "https://iws.ismar.cnr.it/")


# SOCIAL
INSTALLED_APPS += (
#     'allauth.socialaccount.providers.linkedin_oauth2',
#     'allauth.socialaccount.providers.facebook',
     'allauth.socialaccount.providers.google',
)

SOCIALACCOUNT_PROVIDERS = {
    'linkedin_oauth2': {
        'SCOPE': [
            'r_emailaddress',
            'r_basicprofile',
        ],
        'PROFILE_FIELDS': [
            'emailAddress',
            'firstName',
            'headline',
            'id',
            'industry',
            'lastName',
            'pictureUrl',
            'positions',
            'publicProfileUrl',
            'location',
            'specialties',
            'summary',
        ]
    },
    'facebook': {
        'METHOD': 'oauth2',
        'SCOPE': [
            'email',
            'public_profile',
        ],
        'FIELDS': [
            'id',
            'email',
            'name',
            'first_name',
            'last_name',
            'verified',
            'locale',
            'timezone',
            'link',
            'gender',
        ]
    },
}

SOCIALACCOUNT_PROFILE_EXTRACTORS = {
    "facebook": "geonode.people.profileextractors.FacebookExtractor",
    "linkedin_oauth2": "geonode.people.profileextractors.LinkedInExtractor",
}

# NOTIFICATIONS

# notification settings
NOTIFICATION_ENABLED = True

# notifications backends
_EMAIL_BACKEND = "pinax.notifications.backends.email.EmailBackend"
PINAX_NOTIFICATIONS_BACKENDS = [
    ("email", _EMAIL_BACKEND),
]

# Queue non-blocking notifications.
PINAX_NOTIFICATIONS_QUEUE_ALL = False
PINAX_NOTIFICATIONS_LOCK_WAIT_TIMEOUT = -1

# pinax.notifications
# or notification
NOTIFICATIONS_MODULE = 'pinax.notifications'


FCM_DJANGO_SETTINGS = {
        "FCM_SERVER_KEY": os.getenv('FCM_SERVER_KEY', 'NO KEY..'),
        # "DELETE_INACTIVE_DEVICES": False
}

WEBPACK_LOADER = {
  'DEFAULT': {
    'STATS_FILE': os.path.join(PROJECT_ROOT, 'frontend', 'webpack-stats.json')
  }
}
