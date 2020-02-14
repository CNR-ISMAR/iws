import json, pytz
from datetime import datetime, timedelta, time as timed
from dateutil import parser
from .models import StationData
from django.db.models import F
from django.db.models import Avg

def find_station(map_code):
    stations = json.load(file('openistorm/stations/data/stations.json', 'r'));
    filtered = filter(lambda item : item["map_code"] == map_code and item["map_code"] != "", stations)
    if len(filtered) > 0:
        station = filtered[0]
        # ${bb200._sw.lng},${bb200._sw.lat},${bb200._ne.lng},${bb200._ne.lat}
        station['x'] = 1
        station['y'] = 1
        station['bbox'] = str(station.get('longitude')-0.01) + ',' + str(station.get('latitude')-0.01) + ',' + str(station.get('longitude')+0.01) + ',' + str(station.get('latitude')+0.01)
        station['width'] = 2
        station['height'] = 2
        return station
    return False

def setDateToUtc(date):
    if not isinstance(date, datetime):
        date = parser.parse(date)
    return date.replace(tzinfo=pytz.timezone('utc'))

def station_timeseries(forecast, station, TIME_FROM, TIME_TO):
    # forecast['results']['sea_level-station'] = forecast['results']['sea_level-mean']
    # return forecast
    TIME_FROM = parser.parse(TIME_FROM) if TIME_FROM is not None else datetime.combine(datetime.now(), timed.min)
    TIME_FROM = setDateToUtc(TIME_FROM)
    TIME_TO = setDateToUtc(parser.parse(TIME_TO)) if TIME_TO is not None else False
    sd = StationData.objects.filter(location=station['name'], timestamp__lte=TIME_FROM, timestamp__gte=TIME_TO, parameter='SLEV')
    forecast['results']['sea_level-station'] = [{"x": v.timestamp.isoformat()[0:19] + '.000Z', "y": v.value} for v in sd]
    sd = StationData.objects.filter(location=station['name'], timestamp__lte=TIME_FROM, timestamp__gte=TIME_TO, parameter='wsh')
    forecast['results']['wsh-station'] = [{"x": v.timestamp.isoformat()[0:19] + '.000Z', "y": v.value} for v in sd]
    sd = StationData.objects.filter(location=station['name'], timestamp__lte=TIME_FROM, timestamp__gte=TIME_TO, parameter='wmp')
    forecast['results']['wmp-station'] = [{"x": v.timestamp.isoformat()[0:19] + '.000Z', "y": v.value} for v in sd]
    sd = StationData.objects.filter(location=station['name'], timestamp__lte=TIME_FROM, timestamp__gte=TIME_TO, parameter='wmd')
    forecast['results']['wmd-station'] = [{"x": v.timestamp.isoformat()[0:19] + '.000Z', "y": v.value} for v in sd]
    # forecast['results']['sea_level-station'] = forecast['results']['sea_level-mean']
    return forecast

def station_info(forecast, station, TIME):
    TIME = parser.parse(TIME) if TIME is not None else datetime.combine(datetime.now(), timed.min)
    TIME = setDateToUtc(TIME)
    TIME_FROM = TIME - timedelta(minutes=15)
    TIME_TO = TIME + timedelta(minutes=15)
    sd = StationData.objects.filter(location=station['name'], timestamp__lte=TIME_FROM, timestamp__gte=TIME_TO, parameter='SLEV').annotate(avg_value=Avg('value'))
    forecast['sea_level'] = sd[0].avg_value if sd.count() > 0 else None
    sd = StationData.objects.filter(location=station['name'], timestamp__lte=TIME_FROM, timestamp__gte=TIME_TO, parameter='wsh').annotate(avg_value=Avg('value'))
    forecast['wsh'] = sd[0].avg_value if sd.count() > 0 else None
    sd = StationData.objects.filter(location=station['name'], timestamp__lte=TIME_FROM, timestamp__gte=TIME_TO, parameter='wmp').annotate(avg_value=Avg('value'))
    forecast['wmp'] = sd[0].avg_value if sd.count() > 0 else None
    sd = StationData.objects.filter(location=station['name'], timestamp__lte=TIME_FROM, timestamp__gte=TIME_TO, parameter='wmd').annotate(avg_value=Avg('value'))
    forecast['wmd'] = sd[0].avg_value if sd.count() > 0 else None
    return forecast