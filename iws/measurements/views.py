import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Parameter, Location, Sensor, Serie, Network, Measure


@csrf_exempt
def write(request):
    rjson = json.loads(request.body)
    _write(rjson)
    return JsonResponse(rjson, safe=False)

def _write(rjson):
    for r in rjson:
        _location = r['location']
        location, created = Location.objects.get_or_create(label=_location)

        _parameter = r['parameter']
        parameter, created = Parameter.objects.get_or_create(label=_parameter)

        _sensor = r.get('sensor', 'Default')
        sensor, created = Sensor.objects.get_or_create(label=_sensor)

        _network = r.get('network')
        network, created = Network.objects.get_or_create(label=_network)

        serie, created = Serie.objects.get_or_create(parameter=parameter,
                                                     sensor=sensor,
                                                     location=location,
                                                     network=network)

        timestamp = r.get('timestamp')
        value = r.get('value')
        measure, created = Measure.objects.get_or_create(serie=serie,
                                                         timestamp=timestamp,
                                                         value=value)
