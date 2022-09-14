from rest_framework.response import Response
from rest_framework import mixins, views
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.serializers import serialize
from .models import Station
import json

class StationList(views.APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        code = 'SLEV' if self.request.query_params.get('type', 'sea_level') == 'sea_level' else 'WAVEH'
        stations = Station.objects.using('measurements').filter(code=code).all()
        serialized = serialize('geojson', stations,
                  fields=(
                      'id',
                      'geo',
                      'location_label',
                      'station_code',
                      'station_label',
                      'code',
                      'station_label',
                      'parameter_id',
                  ))
        return Response(json.loads(serialized))