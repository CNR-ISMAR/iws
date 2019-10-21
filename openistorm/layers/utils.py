# encoding: utf-8

from osgeo import gdal
from datetime import datetime, timedelta, time as timed
# import datetime
import time, urllib, wget, math, os, netCDF4, json, requests, pytz, xmltodict
# import logging
from PIL import Image
from dateutil import parser
from django.conf import settings
from .models import ImageLayer
import pytz
from django.contrib.auth import get_user_model
from collections import defaultdict
# from operator import itemgetter
# import pydap.client
# import xml.etree.ElementTree as ET

def setDateToUtc(date):
    if not isinstance(date, datetime):
        date = parser.parse(date)
    return date.replace(tzinfo=pytz.timezone('utc'))


class WmsQueryNew:
    def __init__(self, BBOX, X=1, Y=1, WIDTH=2, HEIGHT=2, time_from=None, time_to=None, dataset=('waves', 'sea_level')):
        self.time_from = parser.parse(time_from) if time_from is not None else datetime.combine(datetime.now(), timed.min)
        self.time_from = setDateToUtc(self.time_from)
        self.time_to = setDateToUtc(parser.parse(time_to)) if time_to is not None else False
        self.history = 'history/' if self.time_from < datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0,
                                                      tzinfo=pytz.timezone('utc')) else ''
        self.formatted_date = self.time_from.strftime("%Y%m%d")

        self.setDefaultData(BBOX, X, Y, WIDTH, HEIGHT)

    def setDefaultData(self, BBOX, X=1, Y=1, WIDTH=2, HEIGHT=2):
        self.default_options = {
            "REQUEST": "GetFeatureInfo",
            "ELEVATION": "0",
            "TRANSPARENT": "true",
            "STYLES": "boxfill/rainbow",
            "COLORSCALERANGE": "-50,50",
            "NUMCOLORBANDS": "20",
            "LOGSCALE": "false",
            "SERVICE": "WMS",
            # "VERSION": "1.3.0",
            "VERSION": "1.1.1",
            "FORMAT": "image/png",
            "SRS": "EPSG:4326",
            "CRS": "EPSG:4326",
            "INFO_FORMAT": "text/xml",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               # "url": "https://iws.ismar.cnr.it/thredds/wms/tmes/TMES_sea_level_20190907.nc",
            "BBOX": BBOX,
            "X": X,
            "Y": Y,
            "WIDTH": WIDTH,
            "HEIGHT": HEIGHT,
            # "TIME": "2019-09-17T00:00:00.000Z/2019-09-17T23:00:00.000Z",
            # "QUERY_LAYERS": "sea_level-mean",
            # "LAYERS": "sea_level-mean",
        }

    def setTimeRange(self, dataset='sea_level', preserve_from=False):
        capabilitiesOptions = {
            "service": "WMS",
            "version": "1.3.0",
            "request": "GetCapabilities",
        }
        layerFileName = self.history + 'TMES_' + dataset + '_' + self.formatted_date + '.nc'
        url = settings.THREDDS_URL + 'thredds/wms/tmes/' + layerFileName + '?' + urllib.urlencode(capabilitiesOptions)
        r = requests.get(url=url)
        times = xmltodict.parse(r.content)['WMS_Capabilities']['Capability']['Layer']['Layer']['Layer'][0]['Dimension']['#text'].split(',')
        self.time_to = setDateToUtc(parser.parse(max(times)))
        if not preserve_from:
            self.time_from = setDateToUtc(parser.parse(min(times)))

    def getnextSeaLevelMinMax(self):
        self.setTimeRange('sea_level', True)
        # starts from next hour
        if self.time_to > (self.time_from + timedelta(hours=1)):
            self.time_from = self.time_from + timedelta(hours=1)
        # get max 13 hours
        if self.time_to > (self.time_from + timedelta(hours=13)):
            self.time_to = self.time_from + timedelta(hours=13)

        queryResponse = self.query('sea_level', 'sea_level-mean', self.time_from, self.time_to)['FeatureInfo']

        ### GET MAX MEASURE (MEAN + STD)
        queryResponseStd = self.query('sea_level', 'sea_level-std', self.time_from, self.time_to)['FeatureInfo']
        for key, value in enumerate(queryResponse):
            queryResponse[key] = {
                "time": value["time"],
                "value": float(value["value"]) + float(queryResponseStd[key]["value"])
            }

        ordered = sorted(queryResponse, key=lambda i: (i['value']))
        return {
            'max': ordered[-1] if len(ordered) > 5 else None,
            'min': ordered[0] if len(ordered) > 5 else None
        }

    def get_values(self):
        datasets = {
            'waves': [
                "wmd",
                "wmp",
                "wsh",
            ],
            'sea_level': [
                'sea_level',
            ]
        }
        value_types = ['mean', 'std']
        result = {
            "results": {
                'station': {},
                'mean': {},
                'std': {},
            }
        }
        for value_type in value_types:
            for dataset in datasets.keys():
                for layer in datasets[dataset]:

                    queryResponse = self.query(dataset, layer+'-'+value_type, self.time_from, None, True)
                    try:
                        data = queryResponse['FeatureInfoResponse']['FeatureInfo']
                        result["results"][value_type][layer] = float(data['value']) * 100 if dataset=='sea_level' else float(data['value'])
                    except:
                        print(queryResponse)
                        # raise Exception(json.dumps(queryResponse)+"\n")

        try:
            result['latitude'] = float(queryResponse['FeatureInfoResponse']['latitude'])
            result['longitude'] = float(queryResponse['FeatureInfoResponse']['longitude'])
            result['time'] = data['time']
            result['parameters'] = result["results"]['mean'].keys()
        except:
            print(queryResponse)
            # raise Exception(json.dumps(queryResponse)+"\n")
        return result

    def get_timeseries(self):

        self.setTimeRange()

        datasets = {
            'waves': [
                'wmd-mean',
                'wmd-std',
                'wmp-mean',
                'wmp-std',
                'wsh-mean',
                'wsh-std',
            ],
            'sea_level': [
                'sea_level-mean',
                'sea_level-std',
            ]
        }
        result = {
            'results': {}
        }
        for dataset in datasets.keys():
            for layer in datasets[dataset]:
                layerdata = self.query(dataset, layer, self.time_from, self.time_to, True)
                try:
                    result['results'][layer] = list(
                        {"x": x['time'], "y": float(x['value']) * 100 if dataset == 'sea_level' else float(x['value'])}
                        for x in layerdata['FeatureInfoResponse']['FeatureInfo'])
                except:
                    print(layerdata)

        result['latitude'] = float(layerdata['FeatureInfoResponse']['latitude'])
        result['longitude'] = float(layerdata['FeatureInfoResponse']['longitude'])
        result['from'] = self.time_from.isoformat()[0:19] + '.000Z'
        result['to'] = self.time_to.isoformat()[0:19] + '.000Z'
        return result

    def get_mobile_timeseries(self):

        self.setTimeRange()

        datasets = {
            'waves': [
                'wmd-mean',
                # 'wmd-std',
                'wmp-mean',
                'wmp-std',
                'wsh-mean',
                'wsh-std',
            ],
            'sea_level': [
                'sea_level-mean',
                'sea_level-std',
            ]
        }
        result = {
            'results': {}
        }
        for dataset in datasets.keys():
            for layer in datasets[dataset]:
                layerdata = self.query(dataset, layer, self.time_from, self.time_to, True)
                try:
                    result['results'][layer] = list(
                        {"x": x['time'], "y": float(x['value']) * 100 if dataset == 'sea_level' else float(x['value'])}
                        for x in layerdata['FeatureInfoResponse']['FeatureInfo'])
                except:
                    print(layerdata)

        result['latitude'] = float(layerdata['FeatureInfoResponse']['latitude'])
        result['longitude'] = float(layerdata['FeatureInfoResponse']['longitude'])
        result['from'] = self.time_from.isoformat()[0:19] + '.000Z'
        result['to'] = self.time_to.isoformat()[0:19] + '.000Z'


        result['results'] = {
            'sea_level': list(
                {"x": x['x'], "y": x['y']+result['results']['sea_level-std'][i]['y']}
                for i, x in enumerate(result['results']['sea_level-mean'])
            ),
            # wave_period
            'wmp': list(
                {"x": x['x'], "y": x['y']+result['results']['wmp-std'][i]['y']}
                for i, x in enumerate(result['results']['wmp-mean'])
            ),
            # wave_height
            'wsh': list(
                {"x": x['x'], "y": x['y']+result['results']['wsh-std'][i]['y']}
                for i, x in enumerate(result['results']['wsh-mean'])
            ),
            # wave_direction
            'wmd': list(
                {"x": x['x'], "y": int(x['y']+180) % 360 }
                for i, x in enumerate(result['results']['wmd-mean'])
            ),
        }
        return result

    def get_thresholds(self, threshold, dataset='sea_level', meanlayer='sea_level-mean', stdlayer='sea_level-std', greater_than=True, add_std=True, sub_std=False):

        self.setTimeRange()
        result = {
            'results': []
        }
        meandata = self.query(dataset, meanlayer, self.time_from, self.time_to, True)
        try:
            forecast = list(
                {"x": x['time'], "y": float(x['value']) * 100 if dataset == 'sea_level' else float(x['value'])}
                for x in meandata['FeatureInfoResponse']['FeatureInfo'])
        except:
            print(meandata)
        try:
            stddata = self.query(dataset, stdlayer, self.time_from, self.time_to, True)
            std = list(
                {"x": x['time'], "y": float(x['value']) * 100 if dataset == 'sea_level' else float(x['value'])}
                for x in stddata['FeatureInfoResponse']['FeatureInfo'])
        except:
            print(stddata)

        result['latitude'] = float(meandata['FeatureInfoResponse']['latitude'])
        result['longitude'] = float(meandata['FeatureInfoResponse']['longitude'])
        result['from'] = self.time_from.isoformat()[0:19] + '.000Z'
        result['to'] = self.time_to.isoformat()[0:19] + '.000Z'

        if add_std:
            forecast = list(
                {"x": x['x'], "y": x['y']+std[i]['y']}
                for i, x in enumerate(forecast)
            )
        elif sub_std:
            forecast = list(
                {"x": x['x'], "y": x['y']-std[i]['y']}
                for i, x in enumerate(forecast)
            )

        if greater_than:
            result['results'] = list(filter(lambda x: x['y'] >= threshold, forecast))
        else:
            result['results'] = list(filter(lambda x: x['y'] <= threshold, forecast))

        return result

    def query(self, dataset, layer, time_from, time_to=None, raw=False):
        options = self.default_options
        layerFileName = self.history + 'TMES_' + dataset + '_' + self.formatted_date + '.nc'
        options.update({
            "TIME": time_from.isoformat()[0:19] + '.000Z' if time_to is None else time_from.isoformat()[0:19] + '.000Z' + '/' + time_to.isoformat()[0:19] + '.000Z',
            "QUERY_LAYERS": layer,
        })
        url = settings.THREDDS_URL + 'thredds/wms/tmes/' + layerFileName + '?' + urllib.urlencode(options)
        r = requests.get(url=url)
        queryData = xmltodict.parse(r.content)
        if not raw:
            queryData = queryData['FeatureInfoResponse']
        return queryData

    # def get_values(self):
    #     datasets = {
    #         'waves': [
    #             "wmd",
    #             "wmp",
    #             "wsh",
    #         ],
    #         'sea_level': [
    #             'sea_level',
    #         ]
    #     }
    #     result = {
    #         "results": {}
    #     }
    #     for dataset in datasets.keys():
    #         for layer in datasets[dataset]:
    #             queryResponse = self.query(dataset, layer+'-mean', self.time_from, None, False)['FeatureInfo']
    #             try:
    #                 result["results"][ layer] = {
    #                     "mean": float(queryResponse['value']) * 100 if dataset=='sea_level' else float(queryResponse['value'])
    #                 }
    #             except:
    #                 print(queryResponse)
    #                 raise Exception(json.dumps(queryResponse)+"\n")
    #
    #             queryResponse = self.query(dataset, layer+'-std', self.time_from, None, True)
    #             try:
    #                 std = queryResponse['FeatureInfoResponse']['FeatureInfo']
    #                 result["results"][ layer]["std"] = float(std['value']) * 100 if dataset=='sea_level' else float(std['value'])
    #             except:
    #                 print(queryResponse)
    #                 raise Exception(json.dumps(queryResponse)+"\n")
    #
    #     result['latitude'] = float(queryResponse['FeatureInfoResponse']['latitude'])
    #     result['longitude'] = float(queryResponse['FeatureInfoResponse']['longitude'])
    #     result['time'] = std['time']


class NCToImg:

    def __init__(self, time_from=None, time_to=None, dataset='waves', parameters=("wmd-mean","wsh-mean")):

        if not os.path.exists(settings.LAYERDATA_ROOT):
            os.makedirs(settings.LAYERDATA_ROOT)

        print(settings.LAYERDATA_ROOT)

        now = datetime.utcnow() - timedelta(days=0)

        self.parameters = parameters;
        self.dataset = dataset;

        self.time_from = parser.parse(time_from).strftime("%Y-%m-%d") if time_from is not None else now.strftime("%Y-%m-%d")
        self.time_to = parser.parse(time_to).strftime("%Y-%m-%d") if time_to is not None else (now + timedelta(days=5)).strftime("%Y-%m-%d")

        print("self.time_to "+str(self.time_to))

        self.source_date = parser.parse(time_from).strftime("%Y%m%d") if time_from is not None else now.strftime("%Y%m%d")

        self.nc_filename = "TMES_" + self.dataset + "_" + self.source_date + ".nc"
        self.nc_filepath = os.path.join(settings.LAYERDATA_ROOT,"TMES_" + self.dataset + "_" + self.source_date + ".nc")

        if os.path.isfile(self.nc_filepath):
            os.remove(self.nc_filepath)

        history = 'history/' if datetime.combine(parser.parse(self.time_from), timed.min) < datetime.combine(datetime.today(), timed.min) else ''
        self.url = settings.THREDDS_URL + 'thredds/ncss/tmes/' + history \
                   + self.nc_filename \
                   + "?var=wmd-mean&var=wsh-mean&disableLLSubset=on&disableProjSubset=on&horizStride=1&time_start=" \
                   + self.time_from \
                   + "T00%3A00%3A00Z&time_end=" \
                   + self.time_to \
                   + "T23%3A00%3A00Z&timeStride=1&accept=netcdf"

        # history = 'history/' if parser.parse(time_from) < datetime.now().replace(hour=0, minute=0, second=0, microsecond=0) else ''
        # self.url = settings.THREDDS_URL + 'thredds/ncss/tmes/' + history \
        #            + self.nc_filename \
        #            + "?var=wmd-mean&var=wsh-mean&disableLLSubset=on&disableProjSubset=on&horizStride=1&time_start=" \
        #            + "2015-02-05T00:00:00Z&time_end=" \
        #            + "2015-02-07T00:00:00Z&timeStride=1&accept=netcdf"

        print("\n\n"+self.url+"\n\n")

        if self.dataset == 'waves':
            self.transform_waves()

    def transform_waves(self):
        wget.download(self.url, out=self.nc_filepath, bar=None)

        if os.path.isfile(self.nc_filepath):

            tif1filename = os.path.join(settings.LAYERDATA_ROOT,"TMES_waves_" + self.source_date + "-" + self.parameters[0] + ".tif")
            os.system(
                'gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"' + self.nc_filepath + '":' +
                self.parameters[0] + ' ' + tif1filename)

            tif2filename = os.path.join(settings.LAYERDATA_ROOT,"TMES_waves_" + self.source_date + "-" + self.parameters[1] + ".tif")
            os.system(
                'gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"' + self.nc_filepath + '":' +
                self.parameters[1] + ' ' + tif2filename)

            if os.path.isfile(tif1filename) & os.path.isfile(tif2filename):

                ds1 = gdal.Open(tif1filename)
                ds2 = gdal.Open(tif2filename)


                since = time.mktime(time.strptime('2010-01-01', "%Y-%m-%d")) - 3600

                nx = ds1.RasterXSize
                ny = ds1.RasterYSize

                compParams = [10, 3]

                ncfile = netCDF4.Dataset(self.nc_filepath, 'r')
                lon = ncfile.variables["lon"][:]
                lat = ncfile.variables["lat"][:]

                xmin, xres, xskew, ymin, yskew, yres = ds1.GetGeoTransform()

                xmin, ymin, xmax, ymax = [lon.min(), lat.min(), lon.max(), lat.max()]

                lo1 = str(xmin)
                la1 = str(ymax)
                lo2 = str(xmax)
                la2 = str(ymin)
                dx = str(xres)
                dy = str(-yres)

                n_bande = ds1.RasterCount

                for banda in range(1, n_bande+1):
                    print("BANDA "+str(banda))
                    band1 = ds1.GetRasterBand(banda)
                    array1 = band1.ReadAsArray()
                    band2 = ds2.GetRasterBand(banda)
                    array2 = band2.ReadAsArray()
                    arrays = [array1, array2]
                    m = band1.GetMetadata()

                    ts = datetime.fromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%s')
                    json_time = datetime.fromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%Y-%m-%dT%H:%M.000Z')
                    print("json_time "+str(json_time))

                    data = []

                    p = 0
                    for var in self.parameters:
                        data.append({
                            "header": {
                                "discipline": 10,
                                "gribEdition": 2,
                                "refTime": json_time,
                                "parameterCategory": 0,
                                "parameterNumber": compParams[p],
                                "numberPoints": nx * ny,
                                "gridUnits": "meters",
                                "nx": nx,
                                "ny": ny,
                                "lo1": lo1,
                                "la1": la1,
                                "lo2": lo2,
                                "la2": la2,
                                "dx": dx,
                                "dy": dy,
                                "rotationAngle": 0.0
                            },
                            "data": []
                        })
                        for valsY in range((ny)):
                            for valsX in range((nx)):
                                dir = arrays[0][valsY][valsX]
                                mag = arrays[1][valsY][valsX]
                                if dir is not None and str(dir) != "-999.0" and mag is not None and str(mag) != "-999.0" and str(dir) != "0.0" and str(mag) != "0.0":
                                    dir = 270 - dir
                                    if dir < 0:
                                        dir = dir + 360

                                    phi = dir * math.pi / 180;
                                    # u = mag * math.cos(phi);
                                    # v = mag * math.sin(phi);

                                    if p == 0:
                                        # valore = u
                                        valore = mag * math.cos(phi);
                                    else:
                                        # valore = v
                                        valore = mag * math.sin(phi);

                                    data[p]['data'].append(valore.item())
                                else:
                                    data[p]['data'].append(None)

                        p = p + 1

                    tsfile = "TMES_"+ self.dataset + '_' + ts + ".json"

                    tsfile_path = os.path.join(settings.LAYERDATA_ROOT,tsfile)
                    with open(tsfile_path, 'w') as outfile:
                        json.dump(data, outfile, indent=2)

                    output_prefix = self.dataset + '_' + ts
                    self.generate_wave_image_and_meta_from_json(tsfile_path, os.path.join(settings.LAYERDATA_ROOT,output_prefix))
                    # TODO: save in database
                    image_layer, result = ImageLayer.objects.update_or_create(dataset=self.dataset, timestamp=ts,)

                    os.system("chmod -R 777 " + settings.LAYERDATA_ROOT)

                os.system("rm " + self.nc_filepath)
                os.system("rm " + tif1filename)
                os.system("rm " + tif2filename)
                os.system("chmod -R 777 " + settings.LAYERDATA_ROOT)


    def generate_wave_image_and_meta_from_json(self, input_file, output_name):

        with open(input_file) as json_file:
            data = json.load(json_file)

        u = data[0]
        v = data[1]

        u['data'] = u['data']
        v['data'] = v['data']
        u['min'] = self.min(u['data'])
        v['min'] = self.min(v['data'])
        u['max'] = self.max(u['data'])
        v['max'] = self.max(v['data'])

        bgmin = -1
        bgmax = 8

        width, height = u['header']['nx'], u['header']['ny']

        pngData = []
        pngDataBackground = []

        p = (255, 255, 255, 0)
        opa = 0
        for y in range(0, height):
            for x in range(0, width):
                k = (y * width) + x
                if u['data'][k] is not None and v['data'][k] is not None:
                    p = (
                        int(255 * (u['data'][k] - u['min']) / (u['max'] - u['min'])),
                        int(255 * (v['data'][k] - v['min']) / (v['max'] - v['min'])),
                        0,
                        255,
                    )
                    pngData.append(p)

                    p = (
                        int( 255 * 0.5 * (v['data'][k] - bgmin) / (bgmax - bgmin) ),
                        0,
                        255 - int( 255 * (v['data'][k] - bgmin) / (bgmax - bgmin) ),
                        255,
                    )
                    pngDataBackground.append(p)
                    if k > 0 and v['data'][k-1] is None:
                        pngDataBackground[k-1] = p
                    opa = 0
                else:
                    pngData.append((255, 255, 255, 0))

                    if x % width not in (0,1) and opa < 1:
                        pngDataBackground.append(p)
                        opa = 1
                    else:
                        pngDataBackground.append((255, 255, 255, 0))

        image = Image.new('RGBA', (width, height))
        image.putdata(pngData)
        image.save(output_name + ".png", "PNG")

        imageBackground = Image.new('RGBA', (width, height))
        imageBackground.putdata(pngDataBackground)
        imageBackground.save(output_name + "_bg.png", "PNG")

        json_data = {
            "source": "https://iws.ismar.cnr.it/",
            "date": u['header']['refTime'],
            "width": width,
            "height": height,

            "max_x": u['max'],
            "max_y": v['max'],
            "min_x": u['min'],
            "min_y": v['min'],
            "lo1": u["header"]["lo1"],
            "la1": u["header"]["la1"],
            "lo2": u["header"]["lo2"],
            "la2": u["header"]["la2"],

            "resolution": 1024,
            "error": False
        }

        with open(output_name + ".json", 'w') as outfile:
            json.dump(json_data, outfile, indent=2)

        os.system("rm " + input_file)

    def min(self, data):
        return min(x for x in data if x is not None)

    def max(self, data):
        return max(x for x in data if x is not None)



class ThresholdsExceed:
    def __init__(self):
        self.users = get_user_model().objects.filter(favorites__isnull=False, settings__isnull=False).distinct()
        self.wms_query = False
        self.handle()

    def handle(self):
        from openistorm.notifications.models import Notification
        for user in self.users:
            print(user.email)
            for favorite in user.favorites.all():
                print(favorite.title)

                try:
                    BBOX = str(favorite.longitude - 0.001) + ',' +str(favorite.latitude - 0.001) + ',' +str(favorite.longitude + 0.001) + ',' +str(favorite.latitude + 0.001)

                    if self.wms_query:
                        self.wms_query.setDefaultData(BBOX)
                    else:
                        self.wms_query = WmsQueryNew(BBOX)
                    self.wms_query.setTimeRange('sea_level')
                    thresholds = self.wms_query.get_thresholds(user.settings.sl_notification_threshold)

                    if len(thresholds['results']) > 0:
                        # print(thresholds)
                        user_notification = Notification(
                            user_id=user.id,
                            favorite_id=favorite.id,
                            type='auto',
                            time=thresholds['results'][0]["x"],
                            position=favorite.position,
                            title="Thresholds Exceed "+favorite.title,
                            description="Sea level forecast exceeds your notification threshold at "
                                        + thresholds['results'][0]["x"][12:16]
                                        + ", with a maximum of "
                                        + str( int(max(thresholds['results'], key=lambda x:x['y'])['y']) )
                                        + " cm"
                        )
                        user_notification.save()
                    # print(user_notification.__dict__)
                except:
                    print('ERROR ThresholdsExceed')
                    print('ERROR ThresholdsExceed')
                    print('ERROR ThresholdsExceed')
                    pass
