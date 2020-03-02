import json, pytz
from datetime import datetime, timedelta, time as timed
from dateutil import parser
from .models import StationData, Station
from django.db.models import F
from django.db.models import Avg
import pandas as pd
import numpy as np

def find_station(station_id):
    station = Station.objects.using('measurements').filter(id=station_id).first()
    if station:
        return station
    # stations = json.load(file('openistorm/stations/data/stations.json', 'r'));
    # filtered = filter(lambda item : item["map_code"] == map_code and item["map_code"] != "", stations)
    # if len(filtered) > 0:
    #     station = filtered[0]
    #     # ${bb200._sw.lng},${bb200._sw.lat},${bb200._ne.lng},${bb200._ne.lat}
    #     station['x'] = 1
    #     station['y'] = 1
    #     station['bbox'] = str(station.get('longitude')-0.01) + ',' + str(station.get('latitude')-0.01) + ',' + str(station.get('longitude')+0.01) + ',' + str(station.get('latitude')+0.01)
    #     station['width'] = 2
    #     station['height'] = 2
    #     return station
    return False

def setDateToUtc(date):
    if not isinstance(date, datetime):
        date = parser.parse(date)
    return date.replace(tzinfo=pytz.timezone('utc'))

def hourly_avg(qs):
    data = [{"x": v.timestamp.replace(minute=0, second=0, microsecond=0).isoformat()[0:19] + '.000Z', "y": v.value} for v in qs]
    if data:
        df = pd.DataFrame(data)
        df = df.groupby('x', as_index=False).mean()
        return df.to_dict(orient='records')
    return data



def station_timeseries(forecast, station, TIME_FROM, TIME_TO):
    # TODO: group hourly!
    # forecast['results']['COSE'] = [station.id, TIME_FROM, TIME_TO]
    # forecast['results']['sea_level-station'] = forecast['results']['sea_level-mean']
    # return forecast
    TIME_FROM = parser.parse(TIME_FROM) if TIME_FROM is not None else datetime.combine(datetime.now(), timed.min)
    TIME_FROM = setDateToUtc(TIME_FROM)
    TIME_TO = setDateToUtc(parser.parse(TIME_TO)) if TIME_TO is not None else False
    sd = StationData.objects.using('measurements').filter(location_id=station.id, timestamp__lte=TIME_TO, timestamp__gte=TIME_FROM, parameter='SLEV')
    forecast['results']['sea_level-station'] = hourly_avg(sd)
    sd = StationData.objects.using('measurements').filter(location_id=station.id, timestamp__lte=TIME_TO, timestamp__gte=TIME_FROM, parameter='WAVEH')
    forecast['results']['wsh-station'] = hourly_avg(sd)
    forecast['wmp'] = []
    sd = StationData.objects.using('measurements').filter(location_id=station.id, timestamp__lte=TIME_TO, timestamp__gte=TIME_FROM, parameter='WAVED')
    forecast['results']['wmd-station'] = hourly_avg(sd)
    return forecast

def station_info(forecast, station, TIME):
    forecast['data'] = {
        'station_label': station.station_label,
        'id': station.id,
    }
    TIME = parser.parse(TIME) if TIME is not None else datetime.combine(datetime.now(), timed.min)
    TIME = setDateToUtc(TIME)
    TIME_FROM = TIME - timedelta(minutes=30)
    TIME_TO = TIME + timedelta(minutes=30)
    sd = StationData.objects.using('measurements').filter(location_id=station.id, timestamp__lte=TIME_TO, timestamp__gte=TIME_FROM, parameter='SLEV').annotate(avg_value=Avg('value'))
    forecast['sea_level'] = sd[0].avg_value if sd.count() > 0 else None
    sd = StationData.objects.using('measurements').filter(location_id=station.id, timestamp__lte=TIME_TO, timestamp__gte=TIME_FROM, parameter='WAVEH').annotate(avg_value=Avg('value'))
    print([TIME_FROM, TIME_TO])
    print(sd)

    forecast['wsh'] = sd[0].avg_value if sd.count() > 0 else None
    # sd = StationData.objects.using('measurements').filter(location_id=station.id, timestamp__lte=TIME_TO, timestamp__gte=TIME_FROM, parameter='wmp').annotate(avg_value=Avg('value'))
    # forecast['wmp'] = sd[0].avg_value if sd.count() > 0 else None
    forecast['wmp'] = None
    sd = StationData.objects.using('measurements').filter(location_id=station.id, timestamp__lte=TIME_TO, timestamp__gte=TIME_FROM, parameter='WAVED').annotate(avg_value=Avg('value'))
    forecast['wmd'] = sd[0].avg_value if sd.count() > 0 else None
    return forecast