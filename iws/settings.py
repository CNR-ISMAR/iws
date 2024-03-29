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
# Load more settings from a file called local_settings.py if it exists
try:
    from iws.local_settings import *
except ImportError:
    from geonode.settings import *
# from iws.local_settings import *

#
# General Django development settings
#
PROJECT_NAME = 'iws'
SITENAME = os.getenv("SITENAME", '{{ project_name }}')

# Defines the directory that contains the settings file as the LOCAL_ROOT
# It is used for relative settings elsewhere.
LOCAL_ROOT = os.path.abspath(os.path.dirname(__file__))

WSGI_APPLICATION = "{}.wsgi.application".format(PROJECT_NAME)

# ALLOWED_HOSTS = ['localhost', 'django', 'django:8000', 'twister', '192.168.1.78','150.178.42.78', 'iws.ismar.cnr.it', 'pharos4mpas.tools4msp.eu'] if os.getenv('ALLOWED_HOSTS') is None \
#     else re.split(r' *[,|:|;] *', os.getenv('ALLOWED_HOSTS'))

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '[]').replace("'", '').replace("[", '').replace("]", '').split(',') + ['localhost', 'localhost:3000', 'django', 'django:8000', 'twister', '192.168.1.78','150.178.42.78', 'iws.inkode.it', 'cyber.goats.se', 'iws.ismar.cnr.it', 'pharos4mpas.tools4msp.eu', 'web.tools4msp.eu', '*']

PROXY_ALLOWED_HOSTS += ('nominatim.openstreetmap.org',)

# AUTH_IP_WHITELIST property limits access to users/groups REST endpoints
# to only whitelisted IP addresses.
#
# Empty list means 'allow all'
#
# If you need to limit 'api' REST calls to only some specific IPs
# fill the list like below:
#
# AUTH_IP_WHITELIST = ['192.168.1.158', '192.168.1.159']
AUTH_IP_WHITELIST = []

MANAGERS = ADMINS = os.getenv('ADMINS', [])
TIME_ZONE = os.getenv('TIME_ZONE', "Europe/Rome")
USE_TZ = True

INSTALLED_APPS = INSTALLED_APPS + (PROJECT_NAME,
                                   PROJECT_NAME + '.sea_storm_atlas',
                                   PROJECT_NAME + '.measurements',
                                   PROJECT_NAME + '.tmes',
                                   PROJECT_NAME + '.dashboards',
                                   # 'rest_framework',
                                   'rest_framework_swagger',
                                   # 'django_extensions',
                                   'grappelli',
                                   # 'django_extensions',
                                   'celery',
                                   'openistorm',
                                   'fcm_django',
                                   'django_celery_beat',
                                   'django_celery_results',
                                   # 'fcm_django',
                                   # 'ckeditor',
                                   # 'ckeditor_uploader',
                                   # 'django_bootstrap_breadcrumbs'
                                   # 'django.contrib.admin',
                                   )

# Location of url mappings
ROOT_URLCONF = os.getenv('ROOT_URLCONF', '{}.urls'.format(PROJECT_NAME))

MEDIA_ROOT = os.getenv('MEDIA_ROOT', os.path.join(LOCAL_ROOT, "uploaded"))

STATIC_ROOT = os.getenv('STATIC_ROOT',
                        os.path.join(LOCAL_ROOT, "static_root")
                        )

# Additional directories which hold static files
STATICFILES_DIRS.append(
    os.path.join(LOCAL_ROOT, "static"),
)


# Location of locale files
LOCALE_PATHS = (
    os.path.join(LOCAL_ROOT, 'locale'),
    ) + LOCALE_PATHS

TEMPLATES[0]['DIRS'].insert(0, os.path.join(LOCAL_ROOT, "templates"))
loaders = TEMPLATES[0]['OPTIONS'].get('loaders') or ['django.template.loaders.filesystem.Loader','django.template.loaders.app_directories.Loader']
# loaders.insert(0, 'apptemplates.Loader')
TEMPLATES[0]['OPTIONS']['loaders'] = loaders
TEMPLATES[0].pop('APP_DIRS', None)

CLIENT_RESULTS_LIMIT = 20
API_LIMIT_PER_PAGE = 1000
FREETEXT_KEYWORDS_READONLY = False
RESOURCE_PUBLISHING = False
ADMIN_MODERATE_UPLOADS = False
GROUP_PRIVATE_RESOURCES = False
GROUP_MANDATORY_RESOURCES = True
MODIFY_TOPICCATEGORY = True
USER_MESSAGES_ALLOW_MULTIPLE_RECIPIENTS = True
DISPLAY_WMS_LINKS = True

# prevent signing up by default
ACCOUNT_OPEN_SIGNUP = True
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'optional'
ACCOUNT_EMAIL_CONFIRMATION_EMAIL = True
ACCOUNT_EMAIL_CONFIRMATION_REQUIRED = True
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_APPROVAL_REQUIRED = True

SOCIALACCOUNT_ADAPTER = 'geonode.people.adapters.SocialAccountAdapter'

SOCIALACCOUNT_AUTO_SIGNUP = False

# Uncomment this to enable Linkedin and Facebook login
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

# MAPs and Backgrounds

# Default preview library
LAYER_PREVIEW_LIBRARY = 'geoext'

# LAYER_PREVIEW_LIBRARY = 'leaflet'
LEAFLET_CONFIG = {
    'TILES': [
        # Find tiles at:
        # http://leaflet-extras.github.io/leaflet-providers/preview/

        # Map Quest
        ('Map Quest',
         'http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
         'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> '
         '&mdash; Map data &copy; '
         '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'),
        # Stamen toner lite.
        # ('Watercolor',
        #  'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
        #  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, \
        #  <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; \
        #  <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, \
        #  <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'),
        # ('Toner Lite',
        #  'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
        #  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, \
        #  <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; \
        #  <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, \
        #  <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'),
    ],
    'PLUGINS': {
        'esri-leaflet': {
            'js': 'lib/js/esri-leaflet.js',
            'auto-include': True,
        },
        'leaflet-fullscreen': {
            'css': 'lib/css/leaflet.fullscreen.css',
            'js': 'lib/js/Leaflet.fullscreen.min.js',
            'auto-include': True,
        },
    },
    'SRID': 3857,
    'RESET_VIEW': False
}


# default map projection
# Note: If set to EPSG:4326, then only EPSG:4326 basemaps will work.
DEFAULT_MAP_CRS = "EPSG:3857"

# Where should newly created maps be focused?
DEFAULT_MAP_CENTER = (0, 0)

# How tightly zoomed should newly created maps be?
# 0 = entire world;
# maximum zoom is between 12 and 15 (for Google Maps, coverage varies by area)
DEFAULT_MAP_ZOOM = 0

ALT_OSM_BASEMAPS = os.environ.get('ALT_OSM_BASEMAPS', False)
CARTODB_BASEMAPS = os.environ.get('CARTODB_BASEMAPS', False)
STAMEN_BASEMAPS = os.environ.get('STAMEN_BASEMAPS', False)
THUNDERFOREST_BASEMAPS = os.environ.get('THUNDERFOREST_BASEMAPS', False)
MAPBOX_ACCESS_TOKEN = os.environ.get('MAPBOX_ACCESS_TOKEN', '')
BING_API_KEY = os.environ.get('BING_API_KEY', None)
GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY', 'AIzaSyBqnOPpXk5uRuUNyxwOwB08B9DhTzmg6Gc')

MAP_BASELAYERS = [{

    "source": {"ptype": "gxp_olsource"},
    "type": "OpenLayers.Layer",
    "args": ["No background"],
    "name": "background",
    "visibility": False,
    "fixed": True,
    "group":"background"
}, {
    "source": {"ptype": "gxp_olsource"},
    "type": "OpenLayers.Layer.XYZ",
    "title": "UNESCO",
    "args": ["UNESCO", "http://en.unesco.org/tiles/${z}/${x}/${y}.png"],
    "wrapDateLine": True,
    "name": "background",
    "attribution": "&copy; UNESCO",
    "visibility": False,
    "fixed": True,
    "group":"background"
}, {
    "source": {"ptype": "gxp_olsource"},
    "type": "OpenLayers.Layer.XYZ",
    "title": "UNESCO GEODATA",
    "args": ["UNESCO GEODATA", "http://en.unesco.org/tiles/geodata/${z}/${x}/${y}.png"],
    "name": "background",
    "attribution": "&copy; UNESCO",
    "visibility": False,
    "wrapDateLine": True,
    "fixed": True,
    "group":"background"
}, {
    "source": {"ptype": "gxp_olsource"},
    "type": "OpenLayers.Layer.XYZ",
    "title": "Humanitarian OpenStreetMap",
    "args": ["Humanitarian OpenStreetMap", "http://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png"],
    "name": "background",
    "attribution": "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>, Tiles courtesy of <a href='http://hot.openstreetmap.org/' target='_blank'>Humanitarian OpenStreetMap Team</a>",
    "visibility": False,
    "wrapDateLine": True,
    "fixed": True,
    "group":"background"
# }, {
#     "source": {"ptype": "gxp_olsource"},
#     "type": "OpenLayers.Layer.XYZ",
#     "title": "MapBox Satellite Streets",
#     "args": ["MapBox Satellite Streets", "http://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/${z}/${x}/${y}?access_token="+MAPBOX_ACCESS_TOKEN],
#     "name": "background",
#     "attribution": "&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <a href='https://www.mapbox.com/feedback/' target='_blank'>Improve this map</a>",
#     "visibility": False,
#     "wrapDateLine": True,
#     "fixed": True,
#     "group":"background"

# }, {
#     "source": {"ptype": "gxp_olsource"},
#     "type": "OpenLayers.Layer.XYZ",
#     "title": "MapBox Streets",
#     "args": ["MapBox Streets", "http://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/${z}/${x}/${y}?access_token="+MAPBOX_ACCESS_TOKEN],
#     "name": "background",
#     "attribution": "&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <a href='https://www.mapbox.com/feedback/' target='_blank'>Improve this map</a>",
#     "visibility": False,
#     "wrapDateLine": True,
#     "fixed": True,
#     "group":"background"
}, {
    "source": {"ptype": "gxp_osmsource"},
    "type": "OpenLayers.Layer.OSM",
    "title": "OpenStreetMap",
    "name": "mapnik",
    "attribution": "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
    "visibility": True,
    "wrapDateLine": True,
    "fixed": True,
    "group": "background"
}, {

        "source": {
          "ptype":"gxp_googlesource",
          "otherParams": "sensor=false&key={0}".format(GOOGLE_API_KEY)
          },
        "group":"background",
        "name":"SATELLITE",
        "visibility": False,
        "fixed": True,
}, {
        "source": {
          "ptype":"gxp_googlesource",
          "otherParams": "sensor=false&key={0}".format(GOOGLE_API_KEY)
          },
        "group":"background",
        "name":"HYBRID",
        "visibility": False,
        "fixed": True,
}, {

        "source": {
          "ptype":"gxp_googlesource",
          "otherParams": "sensor=false&key={0}".format(GOOGLE_API_KEY)
          },
        "group":"background",
        "name":"ROADMAP",
        "visibility": False,
        "fixed": True,
}, {

    "source": {"ptype": "gxp_olsource"},
    "type": "OpenLayers.Layer.XYZ",
    "title": "Google Map tiles",
    "args": ["Google Map Tiles", "https://mt2.google.com/vt/lyrs=m&x=${x}&y=${y}&z=${z}"],
    "name": "Google Map",
    "attribution": "&copy; Google",
    "visibility": True,
    "wrapDateLine": True,
    "fixed": True,
    "group":"background"

},{

	"source":{
		"ptype":"gxp_olsource",
		},
	"type": "OpenLayers.Layer.WMS",
	"args": ["Ortofoto 2012 MATTM", "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/ortofoto_colore_12.map",
              {"layers":"OI.ORTOIMMAGINI.2012.32", "type":"jpg"}],
	"visibility": False,
	"fixed": True,
	"group": "background"

}]

if 'geonode.geoserver' in INSTALLED_APPS:
    LOCAL_GEOSERVER = {
        "source": {
            "ptype": "gxp_wmscsource",
            "url": OGC_SERVER['default']['PUBLIC_LOCATION'] + "wms",
            "restUrl": "/gs/rest"
        }
    }
    baselayers = MAP_BASELAYERS
    MAP_BASELAYERS = [LOCAL_GEOSERVER]
    MAP_BASELAYERS.extend(baselayers)

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

CORS_ORIGIN_ALLOW_ALL = True

MONITORING_ENABLED = False
# add following lines to your local settings to enable monitoring
if MONITORING_ENABLED:
    INSTALLED_APPS += ('geonode.contrib.monitoring',)
    MIDDLEWARE_CLASSES += ('geonode.contrib.monitoring.middleware.MonitoringMiddleware',)
    MONITORING_CONFIG = None
    MONITORING_HOST_NAME = 'localhost'
    MONITORING_SERVICE_NAME = 'local-geonode'
    MONITORING_HOST_NAME = SITE_HOST_NAME

#INSTALLED_APPS += ('geonode.contrib.ows_api',)

X_FRAME_OPTIONS = 'allow-from https://iws.seastorms.eu'

GEOIP_PATH = os.path.join(os.path.dirname(__file__), '..', 'GeoLiteCity.dat')

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
        'null': {
            'level': 'INFO',
            'class': 'django.utils.log.NullHandler',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'mail_admins': {
            'level': 'INFO', 'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler',
        }
    },
    "loggers": {
        "django": {
            "handlers": ["console"], "level": "INFO", },
        "geonode": {
            "handlers": ["console"], "level": "INFO", },
        "gsconfig.catalog": {
            "handlers": ["console"], "level": "INFO", },
        "owslib": {
            "handlers": ["console"], "level": "INFO", },
        "pycsw": {
            "handlers": ["console"], "level": "INFO", },
        "iws": {
            "handlers": ["console"], "level": "DEBUG", },
        },
    }
REST_FRAMEWORK = {
    'COERCE_DECIMAL_TO_STRING': False,
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'oauth2_provider.ext.rest_framework.OAuth2Authentication',
    ],

    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),

    # 'DEFAULT_PARSER_CLASSES': (
    #     'rest_framework.parsers.JSONParser',
    # ),

    'EXCEPTION_HANDLER' : 'rest_framework.views.exception_handler',

    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 30,
}
OAUTH2_PROVIDER = {
    'SCOPES': {
        'read': 'read',
        'write': 'write',
    },
    'OAUTH2_BACKEND_CLASS': 'oauth2_provider.oauth2_backends.JSONOAuthLibCore',
    # 'OAUTH2_BACKEND_CLASS': 'oauth2_provider.oauth2_backends.OAuthLibCore',
    'ACCESS_TOKEN_EXPIRE_SECONDS': 3600 * 24 * 2,
    'REFRESH_TOKEN_EXPIRE_SECONDS': 3600 * 24 * 60,
    #REFRESH_TOKEN_EXPIRE_SECONDS
    # 'APPLICATION_MODEL': 'djcore.djcore.oauth.models.Application'
}

THREDDS_URL = "https://iws.ismar.cnr.it/"
LAYERDATA_ROOT = os.path.join(PROJECT_ROOT, 'storage', 'layerdata')
SITE_URL = os.getenv('SITE_URL', 'https://iws.ismar.cnr.it')
SITE_HOST = os.getenv('SITE_HOST', 'iws.ismar.cnr.it')
PROXY_URL=os.getenv('PROXY_URL', 'http://iws.seastorms.eu')
NODE_PROXY_URL=os.getenv('NODE_PROXY_URL', 'https://iws.ismar.cnr.it')
# PROXY_URL='http://iws.inkode.it:3000'
LAYERDATA_URL = SITE_URL+'/layerdata/'
USE_X_FORWARDED_HOST = True
THREDDS_TO_PROXY = os.getenv('THREDDS_TO_PROXY', 'https://iws.ismar.cnr.it')
FCM_DJANGO_SETTINGS = {
        "FCM_SERVER_KEY": os.getenv('FCM_SERVER_KEY', 'NO KEY..'),
        # "DELETE_INACTIVE_DEVICES": False
}
SERIALIZATION_MODULES = {
        "favorites_geojson": "openistorm.favorites.gj_serializers",
}
GRAPPELLI_ADMIN_TITLE = ''

ASYNC_SIGNALS_BROKER_URL="amqp://guest:guest@rabbitmq:5672/"
