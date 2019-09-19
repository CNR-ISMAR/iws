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
# import pydap.client
# import xml.etree.ElementTree as ET



class NCToImg:

    def __init__(self, time_from=None, time_to=None, dataset='waves', parameters=("wmd-mean","wsh-mean")):

        if not os.path.exists(settings.LAYERDATA_ROOT):
            os.makedirs(settings.LAYERDATA_ROOT)

        print(settings.LAYERDATA_ROOT)

        now = datetime.utcnow() - timedelta(days=0)

        self.parameters = parameters;
        self.dataset = dataset;

        self.time_from = parser.parse(time_from).strftime("%Y-%m-%d") if time_from is not None else now.strftime("%Y-%m-%d")
        self.time_to = parser.parse(time_to).strftime("%Y-%m-%d") if time_to is not None else (now + timedelta(days=3)).strftime("%Y-%m-%d")

        self.source_date = parser.parse(time_from).strftime("%Y%m%d") if time_from is not None else now.strftime("%Y%m%d")

        self.nc_filename = "TMES_" + self.dataset + "_" + self.source_date + ".nc"
        self.nc_filepath = os.path.join(settings.LAYERDATA_ROOT,"TMES_" + self.dataset + "_" + self.source_date + ".nc")

        if os.path.isfile(self.nc_filepath):
            os.remove(self.nc_filepath)

        self.url = settings.THREDDS_URL + 'thredds/ncss/tmes/' \
                   + self.nc_filename \
                   + "?var=wmd-mean&var=wsh-mean&disableLLSubset=on&disableProjSubset=on&horizStride=1&time_start=" \
                   + self.time_from \
                   + "T00%3A00%3A00Z&time_end=" \
                   + self.time_to \
                   + "T23%3A00%3A00Z&timeStride=1&accept=netcdf"

        if self.dataset == 'waves':
            self.transform_waves()

    def transform_waves(self):
        wget.download(self.url, out=self.nc_filepath, bar=None)

        if os.path.isfile(self.nc_filepath):
            # logging.info("File " + self.nc_filename+ " scaricato...")

            tif1filename = os.path.join(settings.LAYERDATA_ROOT,"TMES_waves_" + self.source_date + "-" + self.parameters[0] + ".tif")
            os.system(
                'gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"' + self.nc_filepath + '":' +
                self.parameters[0] + ' ' + tif1filename)

            tif2filename = os.path.join(settings.LAYERDATA_ROOT,"TMES_waves_" + self.source_date + "-" + self.parameters[1] + ".tif")
            os.system(
                'gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"' + self.nc_filepath + '":' +
                self.parameters[1] + ' ' + tif2filename)

            if os.path.isfile(tif1filename) & os.path.isfile(tif2filename):
                # logging.info("Riproiezione in " + tif1filename+ " e "+tif2filename)

                ds1 = gdal.Open(tif1filename)
                ds2 = gdal.Open(tif2filename)


                since = time.mktime(time.strptime('2010-01-01', "%Y-%m-%d"))

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
                # print("BANDE TOTALI "+str(n_bande))

                for banda in range(1, n_bande):
                    print("BANDA "+str(banda))
                    band1 = ds1.GetRasterBand(banda)
                    array1 = band1.ReadAsArray()
                    band2 = ds2.GetRasterBand(banda)
                    array2 = band2.ReadAsArray()
                    arrays = [array1, array2]
                    m = band1.GetMetadata()

                    # ts = datetime.utcfromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%Y%m%d-%H%M00')
                    ts = datetime.utcfromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%s')
                    json_time = datetime.utcfromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%Y-%m-%dT%H:%M.000Z')

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
                    # print(image_layer.__dict__)


                    # logging.info("Esportati "+str(n_bande)+ " file json in: "+str(datetime.now() - startTime))

                    os.system("chmod -R 777 " + settings.LAYERDATA_ROOT)
                # ds1 = None
                # ds2 = None
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
                        int( 255 * 0.39 * (v['data'][k]**2 - v['min']**2) / (v['max']**2 - v['min']**2) ),
                        0,
                        255 - int( 255 * 1.2 * (v['data'][k]**2 - v['min']**2) / (v['max']**2 - v['min']**2) ),
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
                # else:
                #     pngData.append((255, 255, 255, 0))
                #
                #     if x % width not in (0,1):
                #         pngDataBackground.append(p)
                #     else:
                #         pngDataBackground.append((255, 255, 255, 0))

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

    # def normalize_data(self, data):
    #     return list(map(lambda x: None if x == 'NaN' else x, data))

    def min(self, data):
        return min(x for x in data if x is not None)

    def max(self, data):
        return max(x for x in data if x is not None)

#     def transform_sealevel(self):
#         wget.download(self.url, out=self.nc_filepath, bar=None)
#
#         if os.path.isfile(self.nc_filepath):
#             # logging.info("File " + self.nc_filename+ " scaricato...")
#
#             tif1filename = os.path.join(settings.LAYERDATA_ROOT,"TMES_waves_" + self.source_date + "-" + self.parameters[0] + ".tif")
#             os.system(
#                 'gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"' + self.nc_filepath + '":' +
#                 self.parameters[0] + ' ' + tif1filename)
#
#             if os.path.isfile(tif1filename):
#                 ds1 = gdal.Open(tif1filename)
#                 since = time.mktime(time.strptime('2010-01-01', "%Y-%m-%d"))
#                 nx = ds1.RasterXSize
#                 ny = ds1.RasterYSize
#                 compParams = [10, 3]
#                 ncfile = netCDF4.Dataset(self.nc_filepath, 'r')
#                 lon = ncfile.variables["lon"][:]
#                 lat = ncfile.variables["lat"][:]
#                 xmin, xres, xskew, ymin, yskew, yres = ds1.GetGeoTransform()
#                 xmin, ymin, xmax, ymax = [lon.min(), lat.min(), lon.max(), lat.max()]
#
#                 lo1 = str(xmin)
#                 la1 = str(ymax)
#                 lo2 = str(xmax)
#                 la2 = str(ymin)
#                 dx = str(xres)
#                 dy = str(-yres)
#
#                 n_bande = ds1.RasterCount
#                 # print("BANDE TOTALI "+str(n_bande))
#
#                 for banda in range(1, n_bande):
#                     print("BANDA "+str(banda))
#                     band1 = ds1.GetRasterBand(banda)
#                     array1 = band1.ReadAsArray()
#                     arrays = [array1]
#                     m = band1.GetMetadata()
#
#                     # ts = datetime.utcfromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%Y%m%d-%H%M00')
#                     ts = datetime.utcfromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%s')
#                     json_time = datetime.utcfromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%Y-%m-%dT%H:%M.000Z')
#
#                     data = []
#
#                     p = 0
#                     for var in self.parameters:
#                         data.append({
#                             "header": {
#                                 "discipline": 10,
#                                 "gribEdition": 2,
#                                 "refTime": json_time,
#                                 "parameterCategory": 0,
#                                 "parameterNumber": compParams[p],
#                                 "numberPoints": nx * ny,
#                                 "gridUnits": "meters",
#                                 "nx": nx,
#                                 "ny": ny,
#                                 "lo1": lo1,
#                                 "la1": la1,
#                                 "lo2": lo2,
#                                 "la2": la2,
#                                 "dx": dx,
#                                 "dy": dy,
#                                 "rotationAngle": 0.0
#                             },
#                             "data": []
#                         })
#                 os.system("chmod -R 777 " + settings.LAYERDATA_ROOT)
#
#
# class NCQuery:
#     def __init__(self, lat, lon, dataset='waves', time_from=None, time_to=None):
#
#         self.lat = lat
#         self.lon = lon
#         self.dataset = dataset
#
#         now = datetime.utcnow() - timedelta(days=0)
#
#         self.dataset = dataset;
#
#         self.time_from = parser.parse(time_from) if time_from is not None else now
#         self.time_to = parser.parse(time_to) if time_to is not None else now
#
#
#         formatted_date = self.time_from.strftime("%Y%m%d")
#         layerFileName =  'TMES_' + self.dataset + '_' +formatted_date+'.nc.ascii'
#         if self.time_from < datetime.utcnow().replace(hour=0, minute=0, second=0):
#             layerFileName = 'history/'+layerFileName
#
#         self.url = settings.THREDDS_URL + 'thredds/dodsC/tmes/' + layerFileName
#
#         r = requests.get(url=self.url)
#
#         print(self.url)
#         print(self.url)
#         print(self.url)
#
#         self.url = 'https://iws.ismar.cnr.it/thredds/dodsC/tmes/TMES_waves_20190917.nc'
#         # self.url = 'https://iws.ismar.cnr.it/thredds/dodsC/tmes/TMES_waves_20190917.nc.dods'
#
#     def get_values(self):
#         # ds = xr.open_dataset(self.url, decode_cf=False)
#         # lat_bnds, lon_bnds = [40, 43], [-96, -89]
#         # ds.sel(lat=slice(*lat_bnds), lon=slice(*lon_bnds))
#         dataset = pydap.client.open_url(self.url)
#         print("PASSO")
#         print("PASSO")
#         print("PASSO")
#         print("PASSO")
#         # print(dataset)
#         print(dataset.keys)
#
#         # lati = 42.394178
#         # loni = 17.180859


class WmsQuery:
    def __init__(self, BBOX, X, Y, WIDTH, HEIGHT, time_from=None, time_to=None):

        self.time_from = parser.parse(time_from) if time_from is not None else False
        self.time_to = parser.parse(time_to) if time_to is not None else False

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
            "INFO_FORMAT": "text/xml",
            # "i": 1,
            # "j": 1,
            # "url": "https://iws.ismar.cnr.it/thredds/wms/tmes/TMES_sea_level_20190907.nc",
            "BBOX": BBOX,
            "X": X,
            "Y": Y,
            "WIDTH": WIDTH,
            "HEIGHT": HEIGHT,
            # "TIME": "2019-09-17T00:00:00.000Z/2019-09-17T23:00:00.000Z",
            # "QUERY_LAYERS": "sea_level-mean",
            # "LAYERS": "sea_level-mean",
        }


    def get_values(self):

        formatted_date = self.time_from.strftime("%Y%m%d")

        result = {
            "results": {}
        }
        options = self.default_options
        time = self.time_from.isoformat()[0:19] + '.000Z'
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
        for dataset in datasets.keys():
            layerFileName = 'TMES_' + dataset + '_' + formatted_date + '.nc'
            if self.time_from < datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0,
                                                          tzinfo=pytz.timezone('utc')):
                layerFileName = 'history/' + layerFileName
            for layer in datasets[dataset]:
                # print("\n\n=======\n\n")
                # print(dataset + ' ' + layer)

                options.update({
                    "TIME": time,
                    "QUERY_LAYERS": layer+"-mean",
                })
                url = settings.THREDDS_URL + 'thredds/wms/tmes/' + layerFileName + '?' + urllib.urlencode(options)
                r = requests.get(url=url)
                layerdata = xmltodict.parse(r.content)
                result["results"][ layer] = {
                    "mean": float(layerdata['FeatureInfoResponse']['FeatureInfo']['value'])
                }

                options.update({
                    "TIME": time,
                    "QUERY_LAYERS": layer+"-std",
                })
                url = settings.THREDDS_URL + 'thredds/wms/tmes/' + layerFileName + '?' + urllib.urlencode(options)
                r = requests.get(url=url)
                layerdata = xmltodict.parse(r.content)
                # print(json.dumps(layerdata))
                result["results"][ layer]["std"] = float(layerdata['FeatureInfoResponse']['FeatureInfo']['value'])

        result['latitude'] = float(layerdata['FeatureInfoResponse']['latitude'])
        result['longitude'] = float(layerdata['FeatureInfoResponse']['longitude'])
        result['time'] = layerdata['FeatureInfoResponse']['FeatureInfo']['time']

        # print("\n\n\n\n"+json.dumps(result)+"\n\n\n\n")
        return result

    def get_timeseries(self):

        formatted_date = self.time_from.strftime("%Y%m%d")

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
        options = self.default_options
        # time_from = self.time_from.isoformat()[0:19] + '.000Z'
        # time_to = self.time_to.isoformat()[0:19] + '.000Z'
        # TODO: ODIO TUTTI
        time_from = datetime.combine(self.time_to, timed.min).replace(hour=1).isoformat()[0:19] + '.000Z'
        time_to = self.time_to.isoformat()[0:19] + '.000Z'

        for dataset in datasets.keys():
            layerFileName = 'TMES_' + dataset + '_' + formatted_date + '.nc'
            if self.time_from < datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0,
                                                          tzinfo=pytz.timezone('utc')):
                layerFileName = 'history/' + layerFileName

            for layer in datasets[dataset]:

                options.update({
                    "TIME": time_from + '/' + time_to,
                    "QUERY_LAYERS": layer,
                })
                url = settings.THREDDS_URL + 'thredds/wms/tmes/' + layerFileName + '?' + urllib.urlencode(options)
                print("\n")
                print(url)
                print("\n")
                r = requests.get(url=url)
                layerdata = xmltodict.parse(r.content)
                print("\n")
                print(layerdata)
                print("\n")
                result['results'][layer] = list({"x": x['time'], "y": float(x['value'])} for x in layerdata['FeatureInfoResponse']['FeatureInfo'])

        result['latitude'] = float(layerdata['FeatureInfoResponse']['latitude'])
        result['longitude'] = float(layerdata['FeatureInfoResponse']['longitude'])
        result['from'] = time_from
        result['to'] = time_to
        # print(json.dumps(result))
        return result