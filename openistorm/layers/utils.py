# encoding: utf-8

from osgeo import gdal
from datetime import datetime, timedelta
import time
import logging
import wget
import os
import netCDF4
from PIL import Image
import json
from dateutil import parser
# from django.conf import settings


class NCToImg:

    def __init__(self, time_from=None, time_to=None, dataset='waves', parameters=("wmd-mean", "wsh-mean")):
        now = datetime.now() - timedelta(days=0)

        self.parameters = parameters;
        self.dataset = dataset;

        self.time_from = parser.parse(time_from).strftime("%Y-%m-%d") if time_from is not None else now.strftime(
            "%Y-%m-%d")
        self.time_to = parser.parse(time_to).strftime("%Y-%m-%d") if time_to is not None else now.strftime("%Y-%m-%d")

        self.source_date = parser.parse(time_from).strftime("%Y%m%d") if time_from is not None else now.strftime(
            "%Y%m%d")

        self.nc_filename = "TMES_" + self.dataset + "_" + self.source_date + ".nc"
        self.url = "https://iws.ismar.cnr.it/thredds/ncss/tmes/" \
                   + self.nc_filename \
                   + "?var=wmd-mean&var=wsh-mean&disableLLSubset=on&disableProjSubset=on&horizStride=1&time_start=" \
                   + self.time_from \
                   + "T00%3A00%3A00Z&time_end=" \
                   + self.time_to \
                   + "T23%3A00%3A00Z&timeStride=1&accept=netcdf"

        self.transform()

    def transform(self):
        wget.download(self.url, output=self.nc_filename)

        if os.path.isfile(self.nc_filename):
            # logging.info("File " + self.nc_filename+ " scaricato...")

            tif1filename = "TMES_waves_" + self.source_date + "-" + self.parameters[0] + ".tif"
            tif2filename = "TMES_waves_" + self.source_date + "-" + self.parameters[1] + ".tif"

            os.system(
                'gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"' + self.nc_filename + '":' +
                self.parameters[0] + ' ' + tif1filename)
            os.system(
                'gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"' + self.nc_filename + '":' +
                self.parameters[1] + ' ' + tif2filename)

            if os.path.isfile(tif1filename) & os.path.isfile(tif2filename):
                # logging.info("Riproiezione in " + tif1filename+ " e "+tif2filename)

                ds1 = gdal.Open(tif1filename)
                ds2 = gdal.Open(tif2filename)

                since = time.mktime(time.strptime('2010-01-01', "%Y-%m-%d"))

                nx = ds1.RasterXSize
                ny = ds1.RasterYSize

                compParams = [10, 3]

                ncfile = netCDF4.Dataset(self.nc_filename, 'r')
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

                for banda in range(1, n_bande):
                    band1 = ds1.GetRasterBand(banda)
                    array1 = band1.ReadAsArray()
                    band2 = ds2.GetRasterBand(banda)
                    array2 = band2.ReadAsArray()
                    arrays = [array1, array2]
                    m = band1.GetMetadata()

                    ts = datetime.utcfromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%Y%m%d-%H%M00')
                    json_time = datetime.utcfromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%Y-%m-%dT%H:%M:000Z')

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
                                valore = arrays[p][valsY][valsX]
                                if valore is not None and str(valore) != "-999.0":
                                    data[p]['data'].append(valore)
                                else:
                                    data[p]['data'].append("NaN")

                        p = p + 1

                    tsfile = "TMES_"+ self.dataset + '_' + ts + ".json"
                    with open(tsfile, 'w') as outfile:
                        json.dump(data, outfile, indent=2)
                    self.generate_image_and_meta_from_json(tsfile, self.dataset + '_' + ts)

                    # logging.info("Esportati "+str(n_bande)+ " file json in: "+str(datetime.now() - startTime))

                    ds1 = None
                    ds2 = None

                    os.system("rm " + self.nc_filename)
                    os.system("rm " + tif1filename)
                    os.system("rm " + tif2filename)

    def generate_image_and_meta_from_json(self, input_file, output_name):
        # input_file = self.input_file
        # output_name = self.output_name

        with open(input_file) as json_file:
            data = json.load(json_file)

        u, v = data[0], data[1]
        u['data'] = self.normalize_data(u['data'])
        v['data'] = self.normalize_data(v['data'])
        u['min'] = self.min(u['data'])
        v['min'] = self.min(v['data'])
        u['max'] = self.max(u['data'])
        v['max'] = self.max(v['data'])

        width, height = u['header']['nx'], u['header']['ny']

        pngData = []
        for y in range(0, height):
            for x in range(0, width):
                k = (y * width) + x
                if u['data'][k] is not None and v['data'][k] is not None:
                    pngData.append((
                        int(255 * (u['data'][k] - u['min']) / (u['max'] - u['min'])),
                        int(255 * (v['data'][k] - v['min']) / (v['max'] - v['min'])),
                        0,
                        255,
                    ))
                else:
                    pngData.append((255, 255, 255, 0))
        pngData = tuple(pngData)

        image = Image.new('RGBA', (width, height))
        image.putdata(pngData)
        image.save(output_name + ".png", "PNG")

        json_data = {
            "source": "https://iws.ismar.cnr.it/",
            "date": u['header']['refTime'],
            "width": width,
            "height": height,

            "max_x": v['max'],
            "max_y": u['max'],
            "min_x": v['min'],
            "min_y": u['min'],

            "resolution": 1024,
            "error": False
        }

        with open(output_name + ".json", 'w') as outfile:
            json.dump(json_data, outfile, indent=2)

        os.system("rm " + self.input_file)

    def normalize_data(self, data):
        return list(map(lambda x: None if x == 'NaN' else x, data))

    def min(self, data):
        return min(x for x in data if x is not None)

    def max(self, data):
        return max(x for x in data if x is not None)
