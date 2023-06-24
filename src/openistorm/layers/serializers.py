from rest_framework import serializers
from .models import ImageLayer
import datetime
from django.conf import settings
import urllib


class ImageLayerSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    wave_metadata = serializers.SerializerMethodField()
    wave_image = serializers.SerializerMethodField()
    wave_image_background = serializers.SerializerMethodField()
    sea_level_mean = serializers.SerializerMethodField()
    sea_level_std = serializers.SerializerMethodField()
    wsh_mean = serializers.SerializerMethodField()
    wsh_std = serializers.SerializerMethodField()
    info = serializers.SerializerMethodField()


    def get_info(self, instance):
        return instance.info

    def get_date(self, instance):
        # return datetime.datetime.fromtimestamp(instance.timestamp_tz).isoformat()+'.000Z'
        return instance.date

    def get_wave_metadata(self, instance):
        return instance.metadata

    def get_wave_image(self, instance):
        return instance.image

    def get_wave_image_background(self, instance):
        return instance.image_background

    def wsh_url(self, timestamp, layerOptions, legend=False):
        bbox = '&BBOX={bbox-epsg-3857}' if not legend else ''
        wmsdate = datetime.datetime.fromtimestamp(timestamp)
        formatted_date = wmsdate.strftime("%Y%m%d")
        if wmsdate > datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0):
            formatted_date = datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0).strftime("%Y%m%d")
        # layerFileName =  'TMES_waves_'+formatted_date+'.nc'
        # if wmsdate < datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0):
        #     layerFileName = 'history/'+layerFileName
        time = wmsdate.isoformat()+'.000Z'
        options = {
            "ELEVATION": "0",
            "TIME": time,
            "TRANSPARENT": "true",
            "LOGSCALE": "false",
            "SERVICE": "WMS",
            "VERSION": "1.1.1",
            "REQUEST": "GetMap",
            "FORMAT": "image/png",
            "SRS": "EPSG:3857",
            "WIDTH": "256",
            "HEIGHT": "256",
            # "BBOX": "{bbox-epsg-3857}",
        }
        if not legend:
            options.update(layerOptions)
        else:
            options = layerOptions
        return settings.SITEURL + 'thredds/wms/tmes_wv_frmc/TMES_waves_collection_best.ncd' + '?' + urllib.parse.urlencode(options) + bbox

    def get_wsh_mean(self, instance):
        minmax = ('0', '8')
        # return self.wsh_url(instance.timestamp_tz, {
        #         'LAYERS': 'wsh-mean',
        #         'STYLES': 'boxfill/sst_36',
        #         'COLORSCALERANGE': ','.join(minmax),
        #         'NUMCOLORBANDS': '80',
        #     })
        return {
            "url": self.wsh_url(instance.timestamp_tz, {
                'LAYERS': 'wsh-mean',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
            }),
            "legend": self.wsh_url(instance.timestamp_tz, {
                'LAYER': 'wsh-mean',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
                'REQUEST': 'GetLegendGraphic',
                'COLORBARONLY': 'true',
                "WIDTH": "10",
                "HEIGHT": "200",
                "PALETTE": "sst_36",
            }, True),
            'min': minmax[0],
            'max': minmax[1],
        }
    def get_wsh_std(self, instance):
        minmax = ('0', '2')
        # return self.wsh_url(instance.timestamp_tz, {
        #         'LAYERS': 'wsh-std',
        #         'STYLES': 'boxfill/sst_36',
        #         'COLORSCALERANGE': ','.join(minmax),
        #         'NUMCOLORBANDS': '80',
        #     })
        return {
            "url": self.wsh_url(instance.timestamp_tz, {
                'LAYERS': 'wsh-std',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
            }),
            "legend": self.wsh_url(instance.timestamp_tz, {
                'LAYER': 'sea_level-mean',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
                'REQUEST': 'GetLegendGraphic',
                'COLORBARONLY': 'true',
                "WIDTH": "10",
                "HEIGHT": "200",
                "PALETTE": "sst_36",
            }, True),
            'min': minmax[0],
            'max': minmax[1],
        }

    def sea_level_url(self, timestamp, layerOptions, legend=False):
        bbox = '&BBOX={bbox-epsg-3857}' if not legend else ''
        #TODO: manage missing current data!!!!!
        #TODO: quando si avra' una logica integrarla
        wmsdate = datetime.datetime.fromtimestamp(timestamp)
        formatted_date = wmsdate.strftime("%Y%m%d")
        if wmsdate > datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0):
            formatted_date = datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0).strftime("%Y%m%d")
        # layerFileName =  'TMES_sea_level_'+formatted_date+'.nc'
        # if wmsdate < datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0):
        #     layerFileName = 'history/'+layerFileName
        #TODO: questo tempo va sostituito col timestamp formatato a modino
        # time = '2019-02-02T00:00:00.000Z'
        time = wmsdate.isoformat()+'.000Z'
        options = {
            # "LAYERS": "sea_level-mean",
            "ELEVATION": "0",
            "TIME": time,
            "TRANSPARENT": "true",
            # "STYLES": "boxfill%2Frainbow",
            # "COLORSCALERANGE": "-0.6372%2C-0.0154",
            # "NUMCOLORBANDS": "20",
            "LOGSCALE": "false",
            "SERVICE": "WMS",
            "VERSION": "1.1.1",
            "REQUEST": "GetMap",
            "FORMAT": "image/png",
            "SRS": "EPSG:3857",
            "WIDTH": "256",
            "HEIGHT": "256",
            # "BBOX": "{bbox-epsg-3857}",
        }
        if not legend:
            options.update(layerOptions)
        else:
            options = layerOptions
        return settings.SITEURL + 'thredds/wms/tmes_sea_level_frmc/TMES_sea_level_collection_best.ncd' + '?' + urllib.parse.urlencode(options) + bbox

    def get_sea_level_mean(self, instance):
        minmax = ('-1', '1')
        # return self.sea_level_url(instance.timestamp_tz, {
        #         'LAYERS': 'sea_level-mean',
        #         'STYLES': 'boxfill/sst_36',
        #         'COLORSCALERANGE': ','.join(minmax),
        #         'NUMCOLORBANDS': '80',
        #     })
        return {
            "url": self.sea_level_url(instance.timestamp_tz, {
                'LAYERS': 'sea_level-mean',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
            }),
            "legend": self.sea_level_url(instance.timestamp_tz, {
                'LAYER': 'sea_level-mean',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
                'REQUEST': 'GetLegendGraphic',
                'COLORBARONLY': 'true',
                "WIDTH": "10",
                "HEIGHT": "200",
                "PALETTE": "sst_36",
            }, True),
            'min': minmax[0],
            'max': minmax[1],
        }

    def get_sea_level_std(self, instance):
        minmax = ('0', '0.4')
        # return self.sea_level_url(instance.timestamp_tz, {
        #         'LAYERS': 'sea_level-std',
        #         'STYLES': 'boxfill/sst_36',
        #         'COLORSCALERANGE': ','.join(minmax),
        #         'NUMCOLORBANDS': '80',
        #     })
        return {
            "url": self.sea_level_url(instance.timestamp_tz, {
                'LAYERS': 'sea_level-std',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
            }),
            "legend": self.sea_level_url(instance.timestamp_tz, {
                'LAYER': 'sea_level-std',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
                'REQUEST': 'GetLegendGraphic',
                'COLORBARONLY': 'true',
                "WIDTH": "10",
                "HEIGHT": "200",
                "PALETTE": "sst_36",
            }, True),
            'min': minmax[0],
            'max': minmax[1],
        }


    class Meta:
        model = ImageLayer
        fields = ('dataset','timestamp','date','wave_metadata','wave_image','wave_image_background','sea_level_mean','sea_level_std', 'wsh_mean', 'wsh_std', 'info')