# encoding: utf-8

from osgeo import gdal

from datetime import datetime
from datetime import timedelta
import time
import logging
import wget
import os
import netCDF4

logging.basicConfig(format='%(asctime)s %(message)s', filename='nc2json_3857.log', level=logging.DEBUG)

startTime = datetime.now()

now = datetime.now() - timedelta(days=0)
oggi = now.strftime("%Y%m%d")
oggiT = now.strftime("%Y-%m-%d")

variabili = ["wmd-mean", "wsh-mean"]

url = "https://iws.ismar.cnr.it/thredds/ncss/tmes/" + "TMES_waves_" + oggi + ".nc" + "?var=wmd-mean&var=wsh-mean&disableLLSubset=on&disableProjSubset=on&horizStride=1&time_start=" + oggiT + "T00%3A00%3A00Z&time_end=" + oggiT + "T23%3A00%3A00Z&timeStride=1&accept=netcdf"

filenc = wget.download(url)

netCDFfilename = "TMES_waves_" + oggi + ".nc"

if os.path.isfile(netCDFfilename):
    logging.info("File " + netCDFfilename + " scaricato...")

    tif1filename = "TMES_waves_" + oggi + "-" + variabili[0] + ".tif"
    tif2filename = "TMES_waves_" + oggi + "-" + variabili[1] + ".tif"

    os.system(
        'gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"' + netCDFfilename + '":' + variabili[
            0] + ' ' + tif1filename)
    os.system(
        'gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"' + netCDFfilename + '":' + variabili[
            1] + ' ' + tif2filename)

    if os.path.isfile(tif1filename) & os.path.isfile(tif2filename):
        logging.info("Riproiezione in " + tif1filename + " e " + tif2filename)

        ds1 = gdal.Open(tif1filename)
        ds2 = gdal.Open(tif2filename)

        since = time.mktime(time.strptime('2010-01-01', "%Y-%m-%d"))

        nx = ds1.RasterXSize
        ny = ds1.RasterYSize

        compParams = [10, 3]

        ncfile = netCDF4.Dataset(netCDFfilename, 'r')
        lon = ncfile.variables["lon"][:]
        lat = ncfile.variables["lat"][:]

        xmin, xres, xskew, ymin, yskew, yres = ds1.GetGeoTransform()
        xmax = xmin + (nx * xres)
        ymax = ymin - (ny * yres)

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
            time = datetime.utcfromtimestamp(int(m['NETCDF_DIM_time']) + since).strftime('%Y-%m-%dT%H:%M:000Z')

            outJson = open("TMES_waves_" + ts + ".json", 'w')
            print "Saving " + "TMES_waves_" + ts + ".json"
            # logging.info("Salvatagggio di TMES_waves_"+ts+".json")

            js = "[\r\n"
            p = 0
            for var in variabili:
                js += "{\r\n"
                js += "\t\"header\":{\r\n"
                js += "\t\"discipline\": 10,\r\n"
                js += "\t\"gribEdition\":2,\r\n"

                js += "\t\"refTime\":\"" + time + "\",\r\n"
                js += "\t\"parameterCategory\":0,\r\n"
                js += "\t\"parameterNumber\":" + str(compParams[p]) + ",\r\n"
                js += "\t\"numberPoints\":" + str(nx * ny) + ",\r\n"
                js += "\t\"gridUnits\":\"meters\",\r\n"
                js += "\t\"nx\":" + str(nx) + ",\r\n"
                js += "\t\"ny\":" + str(ny) + ",\r\n"
                js += "\t\"lo1\":" + str(lo1) + ",\r\n"
                js += "\t\"la1\":" + str(la1) + ",\r\n"
                js += "\t\"lo2\":" + str(lo2) + ",\r\n"
                js += "\t\"la2\":" + str(la2) + ",\r\n"
                js += "\t\"dx\":" + str(dx) + ",\r\n"
                js += "\t\"dy\":" + str(dy) + ",\r\n"
                js += "\t\"rotationAngle\":0.0\r\n"
                js += "\t},\r\n"
                js += "\t\"data\":[\r\n"

                for valsY in range((ny)):
                    for valsX in range((nx)):
                        # valore=array1[ny-valsY-1][valsX]
                        valore = arrays[p][valsY][valsX]
                        if valore is not None and str(valore) != "-999.0":
                            js += "\t\t" + str(valore) + ",\r\n"
                        else:
                            js += "\t\t\"" + "NaN" + "\",\r\n"

                js = js[:-3] + "\r\n"

                js += "\t]\r\n"
                js += "},\r\n"

                p = p + 1

            js = js[:-3] + "\r\n"
            js += "]\r\n"

            outJson.write(js)
            outJson.close()

        logging.info("Esportati " + str(n_bande) + " file json in: " + str(datetime.now() - startTime))

        ds1 = None
        ds2 = None

        os.system("rm " + netCDFfilename)
        os.system("rm " + tif1filename)
        os.system("rm " + tif2filename)