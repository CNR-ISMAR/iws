from rest_framework.response import Response
from rest_framework import mixins, views
from rest_framework.permissions import IsAuthenticated, AllowAny
import json
class Stations(views.APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        if self.request.query_params.get('type', 'sea_level') == 'sea_level':
            gj = json.load(file('openistorm/stations/data/sea_level.geojson', 'r'));
        else:
            gj = json.load(file('openistorm/stations/data/waves.geojson', 'r'));
        return Response(gj)