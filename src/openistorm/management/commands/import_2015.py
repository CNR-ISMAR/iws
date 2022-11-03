from django.core.management import BaseCommand
# from django.conf import settings
# import os
# from django.contrib.gis.geos import GEOSGeometry
# import ast
# import json
# from django.contrib.gis.geos import Polygon, MultiPolygon
from openistorm.layers.utils import NCToImg


# The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):

    # Show this when the user types help
    help = "My test command"

    def handle(self, *args, **options):
        NCToImg('2015, Feb 4', '2015, Feb 4')
        NCToImg('2015, Feb 5', '2015, Feb 5')
        print('TEST')
        return None
        # GridFeature.objects.all().delete()
        # feature_collection = open(os.path.join(settings.RESOURCE_ROOT, 'SR_GRID/SR_GRID.geojson'), 'r')
        # jsonData = json.load(feature_collection)
        # for geom in jsonData['features']:
        #     # print(geom)
        #     shape = GEOSGeometry(json.dumps(geom['geometry']))
        #     if shape and isinstance(shape, Polygon):
        #         shape = MultiPolygon([shape])
        #     featureData = {
        #         'geom_multipolygon': shape,
        #         # 'center': shape.centroid,
        #         # 'bbox_x1': geom['geometry']['properties']['right'],
        #         # 'bbox_y1': geom['geometry']['properties']['top'],
        #         # 'bbox_x0': geom['geometry']['properties']['left'],
        #         # 'bbox_y1': geom['geometry']['properties']['bottom'],
        #     }
        #     feature = GridFeature.objects.create(**featureData)
        #
        # self.stdout.write("Doing All The Things!")
