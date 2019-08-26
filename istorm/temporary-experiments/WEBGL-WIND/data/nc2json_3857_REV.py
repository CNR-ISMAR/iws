# encoding: utf-8

from osgeo import gdal

from datetime import datetime
from datetime import timedelta
import time
import logging
import wget
import os
import netCDF4
import json

# logging.basicConfig(format='%(asctime)s %(message)s',filename='nc2json_3857.log',level=logging.DEBUG)

startTime = datetime.now()

now = datetime.now() - timedelta(days=0)
oggi=now.strftime("%Y%m%d")
oggiT=now.strftime("%Y-%m-%d")

variabili=["wmd-mean","wsh-mean"]

url = "https://iws.ismar.cnr.it/thredds/ncss/tmes/"+"TMES_waves_"+oggi+".nc"+"?var=wmd-mean&var=wsh-mean&disableLLSubset=on&disableProjSubset=on&horizStride=1&time_start="+oggiT+"T00%3A00%3A00Z&time_end="+oggiT+"T23%3A00%3A00Z&timeStride=1&accept=netcdf"

filenc = wget.download(url)

netCDFfilename="TMES_waves_"+oggi+".nc"

if os.path.isfile(netCDFfilename):
  # logging.info("File " + netCDFfilename+ " scaricato...")

  tif1filename="TMES_waves_"+oggi+"-"+variabili[0]+".tif"
  tif2filename="TMES_waves_"+oggi+"-"+variabili[1]+".tif"

  os.system('gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"'+netCDFfilename+'":'+variabili[0]+' '+tif1filename)
  os.system('gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r near -of GTiff NETCDF:"'+netCDFfilename+'":'+variabili[1]+' '+tif2filename)

  if os.path.isfile(tif1filename) & os.path.isfile(tif2filename):
    # logging.info("Riproiezione in " + tif1filename+ " e "+tif2filename)
    

    ds1 = gdal.Open(tif1filename)
    ds2 = gdal.Open(tif2filename)

    since=time.mktime(time.strptime('2010-01-01', "%Y-%m-%d"))

    nx = ds1.RasterXSize
    ny = ds1.RasterYSize

    compParams = [10,3]

    ncfile = netCDF4.Dataset(netCDFfilename, 'r')
    lon = ncfile.variables["lon"][:]
    lat = ncfile.variables["lat"][:]
  
    xmin, xres, xskew, ymin, yskew, yres  = ds1.GetGeoTransform()
    xmax = xmin + (nx * xres)
    ymax = ymin - (ny * yres)

    xmin,ymin,xmax,ymax = [lon.min(),lat.min(),lon.max(),lat.max()]

    lo1 = str(xmin)      
    la1 = str(ymax)      
    lo2 = str(xmax)      
    la2 = str(ymin)      
    dx = str(xres)      
    dy = str(-yres) 

    n_bande= ds1.RasterCount

    for banda in range(1, n_bande):
      band1 = ds1.GetRasterBand(banda)
      array1 = band1.ReadAsArray()
      band2 = ds2.GetRasterBand(banda)
      array2 = band2.ReadAsArray()
      arrays=[array1,array2]
      m=band1.GetMetadata()
      
      ts=datetime.utcfromtimestamp(int(m['NETCDF_DIM_time'])+since).strftime('%Y%m%d-%H%M00')
      time=datetime.utcfromtimestamp(int(m['NETCDF_DIM_time'])+since).strftime('%Y-%m-%dT%H:%M:000Z')

      data = []

      data="[\r\n"
      p=0
      for var in variabili:
        data.append({
          "header": {
            "discipline": 10,
            "gribEdition": 2,
            "refTime": time,
            "parameterCategory": 0,
            "parameterNumber": compParams[p],
            "numberPoints": nx*ny,
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
            valore=arrays[p][valsY][valsX]
            if valore is not None and str(valore) != "-999.0":
              data[p]['data'].append(valore)
            else:
              data[p]['data'].append("NaN")

        p=p+1

    with open("TMES_waves_"+ts + ".json", 'w') as outfile:
      json.dump(data, outfile, indent=2)

    # logging.info("Esportati "+str(n_bande)+ " file json in: "+str(datetime.now() - startTime))
    
    ds1=None
    ds2=None

    os.system("rm "+netCDFfilename)
    os.system("rm "+tif1filename)
    os.system("rm "+tif2filename)
