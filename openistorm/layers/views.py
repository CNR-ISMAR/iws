from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
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
from collections import OrderedDict
from .utils import WmsQuery, WmsQueryNew
import pytz


class ImageLayerList(ListAPIView):
    pagination_class = None
    serializer_class = ImageLayerSerializer
    permission_classes = (AllowAny,)
    queryset = ImageLayer.objects.all()

    def filter_queryset(self, qs):
        qs = super(ImageLayerList, self).get_queryset()
        dataset = self.request.query_params.get('dataset', 'waves')
        # TODO: sistemare quaNDO AVREMO UN SERVIZIO FUNZIONANTE
        # fromdate = '2018-10-28T23:00:00.000Z'
        fromdate = self.request.query_params.get('from', '')
        todate = self.request.query_params.get('to', '')

        fromdate = parser.parse(fromdate).replace(tzinfo=pytz.timezone('utc')) if fromdate != '' else datetime.datetime.now().replace(tzinfo=pytz.timezone('utc')) - datetime.timedelta(days=1)
        todate = parser.parse(todate).replace(tzinfo=pytz.timezone('utc')) if todate != '' else datetime.datetime.now().replace(tzinfo=pytz.timezone('utc')) + datetime.timedelta(days=2)

        # print("\n\n")
        # print(fromdate)
        # print("\n\n")

        fromdate = datetime.datetime.combine(fromdate, datetime.time.min).strftime('%s')
        todate = datetime.datetime.combine(todate, datetime.time.max).strftime('%s')

        qs = qs.filter(dataset=dataset, timestamp__range=(fromdate, todate)).all()
        return qs

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        boundaries = ImageLayer.objects.aggregate(max=Max('timestamp'), min=Min('timestamp'))
        if queryset.count() == 0:
            queryset = ImageLayer.objects.filter(timestamp__range=((boundaries['max']-(3600*40)), boundaries['max']))


        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        results = OrderedDict((x['date'], x) for x in serializer.data)

        now = datetime.datetime.now().replace(minute=0, second=0, microsecond=0).isoformat()+'.000Z'

        keys = list(results.keys())
        if now in results:
            current = now
        elif len(keys) > 0:
            current = keys[0]
        else:
            current = None
        # current = now if now in results else keys[0] if len(keys) > 0 else None

        return Response({
            'min': datetime.datetime.fromtimestamp(boundaries['min']).isoformat()+'.000Z',
            'max': datetime.datetime.fromtimestamp(boundaries['max']).isoformat()+'.000Z',
            # 'max': boundaries['min'],
            'from': keys[0] if len(keys) > 0 else None,
            'to': keys[-1] if len(keys) > 0 else None,
            'current': current,
            "results": results
        })


class ImageLayerBoundaries(views.APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        boundaries = ImageLayer.objects.aggregate(max=Max('timestamp'), min=Min('timestamp'))
        boundaries = {
            'min': datetime.datetime.fromtimestamp(boundaries['min']).isoformat()+'.000Z',
            'max': datetime.datetime.fromtimestamp(boundaries['max']).isoformat()+'.000Z',
        }
        return Response(boundaries)

class Info(views.APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        BBOX = request.query_params.get('bbox')
        X = request.query_params.get('x')
        Y = request.query_params.get('y')
        WIDTH = request.query_params.get('width')
        HEIGHT = request.query_params.get('height')
        TIME = request.query_params.get('time')
        wms = WmsQuery(BBOX, X, Y, WIDTH, HEIGHT, TIME)
        return Response(wms.get_values())

class TimeSeries(views.APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        BBOX = request.query_params.get('bbox')
        X = request.query_params.get('x')
        Y = request.query_params.get('y')
        WIDTH = request.query_params.get('width')
        HEIGHT = request.query_params.get('height')
        TIME_FROM = request.query_params.get('from')
        TIME_TO = request.query_params.get('to')
        wms = WmsQuery(BBOX, X, Y, WIDTH, HEIGHT, TIME_FROM, TIME_TO)
        return Response(wms.get_timeseries())

class SeaLevelMixMax(views.APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        BBOX = request.query_params.get('bbox')
        X = request.query_params.get('x')
        Y = request.query_params.get('y')
        WIDTH = request.query_params.get('width')
        HEIGHT = request.query_params.get('height')
        TIME_FROM = request.query_params.get('from')
        # TIME_TO = request.query_params.get('to')
        wms = WmsQueryNew(BBOX, X, Y, WIDTH, HEIGHT, TIME_FROM)
        return Response(wms.getnextSeaLevelMinMax())
        # return Response(wms.get_timeseries())