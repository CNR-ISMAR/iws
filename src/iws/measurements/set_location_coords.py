from iws.measurements.models import Location
from django.contrib.gis.geos import Point
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import pandas as pd
import re

IOC = "http://www.ioc-sealevelmonitoring.org/station.php?code={}"

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


# IOC stations
for label, code in stations:
    r = requests.get(IOC.format(code))
    # print(r.text)
    soup = BeautifulSoup(r.text)
    for elem in soup(text='Latitude   '):
        lat = float(elem.find_next('td').contents[0])
    for elem in soup(text='Longitude   '):
        lon = float(elem.find_next('td').contents[0])
            
    # print(lon, lat)
    l = Location.objects.get(label=label)
    l.geo = Point(lon, lat)
    l.save()
    print(label, l)

# ARSO
label = 'Koper - kapitanija'
l = Location.objects.get(label=label)
l.geo = Point(13.72915, 45.54839)
l.save()

geo_ptf = Point(12. + 30./60. + 53./3600., 
                45. + 18./60. + 83./3600.)
# ICPSM + CNR
stations = (
    ('Diga_sud_Lido', Point(12.43, 45.42)),
    ('Diga_nord_Malamocco', Point(12.34, 45.33)),
    ('Diga_sud_Chioggia', Point(12.31, 45.23)),
    ('Punta_Salute_Canal_Grande', Point(12.34, 45.43)),
    ('Laguna_nord_Saline', Point(12.47, 45.5)),
    ('Venezia_Misericordia', Point(12.34, 45.45)),
    ('Burano', Point(12.42, 45.48)),
    ('Malamocco_Porto', Point(12.29, 45.34)),
    ('Chioggia_porto', Point(12.28, 45.23)),
    ('Chioggia_Vigo', Point(12.28, 45.22)),
    ('Fusina', Point(12.26, 45.41)),
    ('Punta_Salute_Canale_Giudecca', Point(12.34, 45.43)),
    ('Piattaforma_Acqua_Alta_Siap', geo_ptf),
    ('PTF - Piattaforma Acqua Alta', geo_ptf),
    )

for label, geo in stations:
    print(label)
    l = Location.objects.get(label=label)
    l.geo = geo
    l.save()


    
