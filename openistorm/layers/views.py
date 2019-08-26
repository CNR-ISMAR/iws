from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import mixins, views
from rest_framework import status
from django.db.models import Max, Min
from .models import ImageLayer
from .serializers import ImageLayerSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.serializers import serialize
import json
import datetime
from dateutil import parser


class ImageLayerList(ListAPIView):
    serializer_class =  ImageLayerSerializer
    permission_classes = (AllowAny,)
    queryset = ImageLayer.objects.all()

    def filter_queryset(self, qs):
        qs = super(ImageLayerList, self).get_queryset()
        dataset = self.request.query_params.get('dataset', 'waves')
        fromdate = self.request.query_params.get('from', None)
        todate = self.request.query_params.get('to', None)
        fromdate = parser.parse(fromdate).timestamp().strftime('%s') if fromdate is not None else datetime.datetime.now().strftime('%s')
        todate = parser.parse(todate).timestamp().strftime('%s') if todate is not None else (datetime.datetime.now() + datetime.timedelta(days=2)).strftime('%s')
        qs = qs.filter(dataset=dataset, timestamp__range=(fromdate, todate)).all()
        return qs

class ImageLayerBoundaries(views.APIView):
    permission_classes = (AllowAny,)
    def get(self, x):
        boundaries = ImageLayer.objects.aggregate(max=Max('timestamp'), min=Min('timestamp'))
        return Response(boundaries)
