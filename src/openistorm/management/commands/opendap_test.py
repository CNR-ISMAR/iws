from django.core.management import BaseCommand
# from django.conf import settings
# import os
# from django.contrib.gis.geos import GEOSGeometry
# import ast
# import json
# from django.contrib.gis.geos import Polygon, MultiPolygon
from openistorm.layers.utils import WmsQuery


# The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):

    # Show this when the user types help
    help = "My test command"

    def handle(self, *args, **options):
        q = WmsQuery('18.562486834444055,40.60442396407557,18.56721978760456,40.608017225183865', 1, 1, 2, 2, '2019-09-16T00:00:00.000Z', '2019-09-16T23:00:00.000Z')
        q.get_values()
        q.get_timeseries()
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
