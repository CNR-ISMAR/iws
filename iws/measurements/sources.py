import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import pandas as pd
from views import _write
from owslib.sos import SensorObservationService
from owslib.fes import FilterCapabilities
from owslib.ows import OperationsMetadata
from owslib.crs import Crs
from owslib.swe.sensor.sml import SensorML
from owslib.etree import etree
from owslib.swe.observation.sos200 import namespaces
from owslib.util import nspath_eval
import json

SOSURL = "http://vesk.ve.ismar.cnr.it/observations/sos/kvp?"
SOSVERSION = "2.0.0"
SOS_PARAMS = {'http://vocab.nerc.ac.uk/collection/P01/current/GHMZAD01/': 'WAVEH'}

def syncvesk():
    sensors = {}
    service = SensorObservationService(SOSURL,
                                       version=SOSVERSION)
    get_obs = service.get_operation_by_name('GetObservation')
    describe_sensor = service.get_operation_by_name('DescribeSensor')
    sensor_ids = describe_sensor.parameters['procedure']['values']
    for sensor_id in sensor_ids:
        response = service.describe_sensor(outputFormat='http://www.opengis.net/sensorML/1.0.1',
                                     procedure=sensor_id)
        tr = etree.fromstring(response)
        element = tr.find('.//' + nspath_eval('sml:SensorML', namespaces))
        ds = SensorML(element)
        name = ds.members[0].name
        sensors[sensor_id] = name


    offerings = [off.id for off in service.offerings]        
    _observed_properties = list(set(op for off in service.offerings for op in off.observed_properties))
    observed_properties = SOS_PARAMS.keys()
    end_time = datetime.now() # - timedelta(hours=120*10)
    start_time = end_time - timedelta(hours=12)
    temporalFilter = "om:phenomenonTime,{}/{}".format(start_time.isoformat(), end_time.isoformat())
    response_format = 'application/json'
    _namespaces = "xmlns(om,http://www.opengis.net/om/2.0)"
    
    _response = service.get_observation(offerings=offerings,
                                        responseFormat=response_format,
                                        observedProperties=observed_properties,
                                        namespaces=_namespaces,
                                        temporalFilter=temporalFilter)
    response = json.loads(_response)                                         
    for obs in response['observations']:
        location = obs['featureOfInterest']['name']['value']
        _parameter = obs['observableProperty']
        parameter = SOS_PARAMS.get(_parameter)
        timestamp = obs['phenomenonTime']
        network = 'CNR'
        value = float(obs['result']['value'])
        rjson = {
            'location': location,
            'parameter': parameter,
            "timestamp": timestamp,
            'network': network,
            "value": value
        }                    
        _write([rjson])

        
        pass
    pass

ARSO = 'http://www.arso.gov.si/xml/vode/hidro_podatki_zadnji.xml'
ARSO_CODES=['9350', '9400', '9410', '9420']
# ARSO_CODES=['9350',]
ARSO_PARAMS={'znacilna_visina_valov': 'WAVEH',
             'smer_valovanja': 'WAVED',
             'vodostaj': 'SLEV'
             }

def syncarso():
    r = requests.get(ARSO)

    stations = BeautifulSoup(r.text, 'xml')

    for codes in ARSO_CODES:
    
        for p in stations.find_all('postaja', sifra=codes):
            location = p.merilno_mesto.string
            _time = datetime.strptime(p.datum.string, "%Y-%m-%d %H:%M")
            time = _time - timedelta(hours=1)
            for tag, parameter in ARSO_PARAMS.items():
                # parameter = 'SLEV'
                t = p.find(tag)
                if t is not None and t.string is not None:
                    _value = float(t.string)
                    print location, parameter, _value
                    if parameter == 'SLEV':
                        _value = _value / 100.
                        baselevel = float(p.attrs['kota_0'])
                        value = baselevel + _value
                    else:
                        value = _value
                    try:
                        rjson = {
                            'location': location,
                            'parameter': parameter,
                            "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ'),
                            'network': "ARSO",
                            "value": float(value)
                        }
                        _write([rjson])
                    except TypeError as e:
                        print str(e)
                        pass


IOC = "http://www.ioc-sealevelmonitoring.org/bgraph.php?code={}&output=tab&period=7"

def syncioc():
    stations = (
        ('Trieste', 'TR22'),
        ('Venice', 'VE19'),
        ('Ancona', 'AN15'),
        ('S. Benedetto Del Tronto', 'SB36'),
        ('Stari Grad', 'stari'),
        ('Vela Luka', 'vela'),
        ('Sobra', 'sobr'),
        ('Otranto', 'OT15'),
        ('Kerkyra, Corfu', 'corf'),
        ('Crotone', 'CR08'),
        ('Le Castella', 'lcst'),
        ('Itea', 'itea'),
        ('Panormos', 'pano'),
        ('Aigio', 'aigi'),
        ('Katakolo', 'kata'),
        # ('Kyparissia', 'kypa'),
    )

    for s in stations:
        parameter = 'SLEV'
        network = 'IOC'
        location = s[0]
        code = s[1]

        print IOC.format(code)
        r = requests.get(IOC.format(code))
        soup = BeautifulSoup(r.text)
        table = soup.find("table")
        if table is None:
            continue
        rows = table.find_all('tr')
        data = []
        for row in rows[1:]: # skip first row
            td = row.find_all('td')
            _time = datetime.strptime(td[0].text, "%Y-%m-%d %H:%M:%S")
            value = float(td[1].text)
            data.append([_time, value])
        df = pd.DataFrame(data, columns=['timestamp', 'value'])
        df.set_index('timestamp', inplace=True)
        df = df.resample('30Min').nearest()
        df['location'] = location
        df['parameter'] = parameter
        df['network'] = network
        df.reset_index(inplace=True)

        df.timestamp = df.timestamp.dt.strftime('%Y-%m-%dT%H:%M:%SZ')

        rjson = df.to_dict("records")
        _write(rjson)
