from django.core.management import BaseCommand
# from django.conf import settings
# import os
# from django.contrib.gis.geos import GEOSGeometry
# import ast
# import json
# from django.contrib.gis.geos import Polygon, MultiPolygon
from openistorm.layers.utils import NCToImg
from django.test.runner import DiscoverRunner


# The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):

    # Show this when the user types help
    help = "My test command"

    @classmethod
    def add_arguments(cls, parser):
        DiscoverRunner.add_arguments(parser)
        parser.add_argument('--date', help='Set a custom import date')

    def handle(self, *args, **options):
        NCToImg(options.get('date', None))
        print('IMPORT DONE')
        return None