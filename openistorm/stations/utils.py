import json

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