from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.serializers import serialize
import json
from .serializers import StormEventSerializer

# STORM ATLAS:
from iws.sea_storm_atlas.models import StormEvent

# STORM ATLAS:
class StormEventListGeoJson(ListAPIView):
    pagination_class = None
    serializer_class =  StormEventSerializer
    permission_classes = (AllowAny,)
    queryset = StormEvent.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serialized = serialize(
            'geojson', queryset,
            geometry_field='geom',
            fields=('date_start', 'date_end', 'origin', 'comments', 'geom')
        )
        return Response(json.loads(serialized))

class StormEventList(ListAPIView):
    pagination_class = None
    serializer_class =   StormEventSerializer
    permission_classes = (IsAuthenticated,)
    queryset = StormEvent.objects.all()