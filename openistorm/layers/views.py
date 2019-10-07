from rest_framework.response import Response
from rest_framework.generics import  ListAPIView
from rest_framework import views
from django.db.models import Max, Min
from .models import ImageLayer
from .serializers import ImageLayerSerializer
from rest_framework.permissions import AllowAny
import datetime
from dateutil import parser
from collections import OrderedDict
from .utils import WmsQueryNew
import pytz
from ..stations.utils import find_station, station_timeseries, station_info


class ImageLayerList(ListAPIView):
    pagination_class = None
    serializer_class = ImageLayerSerializer
    permission_classes = (AllowAny,)
    queryset = ImageLayer.objects.all()

    def filter_queryset(self, qs):
        qs = super(ImageLayerList, self).get_queryset()
        dataset = self.request.query_params.get('dataset', 'waves')
        fromdate = self.request.query_params.get('from', '')
        todate = self.request.query_params.get('to', '')

        fromdate = parser.parse(fromdate).replace(tzinfo=pytz.timezone('utc')) if fromdate != '' else datetime.datetime.now().replace(tzinfo=pytz.timezone('utc')) - datetime.timedelta(days=1)
        todate = parser.parse(todate).replace(tzinfo=pytz.timezone('utc')) if todate != '' else datetime.datetime.now().replace(tzinfo=pytz.timezone('utc')) + datetime.timedelta(days=2)

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
        wms = WmsQueryNew(BBOX, X, Y, WIDTH, HEIGHT, TIME)
        station = request.query_params.get('station', '')
        forecasts = wms.get_values()
        if station:
            station = find_station(station)
        if type(station) == dict and station['name'] != '':
            forecasts['results']['station'] = station_info(forecasts['results']['station'], station, TIME)
        return Response(forecasts)


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
        station = request.query_params.get('station', '')
        if station:
            station = find_station(station)
            # if station:
                # BBOX = station.get('bbox')
                # X = station.get('x')
                # Y = station.get('y')
                # WIDTH = station.get('width')
                # HEIGHT = station.get('height')
        wms = WmsQueryNew(BBOX, X, Y, WIDTH, HEIGHT, TIME_FROM, TIME_TO)
        forecasts = wms.get_timeseries()

        if type(station) == dict and station['name'] != '':
            # TODO: AGGIUNGI I DATI DALLE STAZIONI
            forecasts = station_timeseries(forecasts, station, TIME_FROM, TIME_TO)

        return Response(forecasts)

class SeaLevelMixMax(views.APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        BBOX = request.query_params.get('bbox')
        X = request.query_params.get('x')
        Y = request.query_params.get('y')
        WIDTH = request.query_params.get('width')
        HEIGHT = request.query_params.get('height')
        TIME_FROM = request.query_params.get('from')
        wms = WmsQueryNew(BBOX, X, Y, WIDTH, HEIGHT, TIME_FROM)
        forecasts = wms.getnextSeaLevelMinMax()
        return Response(forecasts)
