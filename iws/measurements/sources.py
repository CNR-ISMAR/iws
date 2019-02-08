import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import pandas as pd
from views import _write


ARSO = 'http://www.arso.gov.si/xml/vode/hidro_podatki_zadnji.xml'


def syncarso():
    r = requests.get(ARSO)

    stations = BeautifulSoup(r.text, 'xml')
    for p in stations.find_all('postaja', sifra='9350'):
        location = p.merilno_mesto.string
        parameter = 'SLEV'
        _time = datetime.strptime(p.datum.string, "%Y-%m-%d %H:%M")
        time = _time - timedelta(hours=1)

        try:
            _value = float(p.vodostaj.string) / 100.
            baselevel = float(p.attrs['kota_0'])
            value = baselevel + _value
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
