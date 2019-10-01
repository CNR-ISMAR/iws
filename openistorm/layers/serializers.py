from rest_framework import serializers
from models import ImageLayer
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


    def get_date(self, instance):
        return datetime.datetime.fromtimestamp(instance.timestamp).isoformat()+'.000Z'

    def get_wave_metadata(self, instance):
        return instance.metadata

    def get_wave_image(self, instance):
        return instance.image

    def get_wave_image_background(self, instance):
        return instance.image_background

    def sea_level_url(self, timestamp, layerOptions):
        #TODO: manage missing current data!!!!!
        #TODO: quando si avra' una logica integrarla
        wmsdate = datetime.datetime.fromtimestamp(timestamp) + datetime.timedelta(hours=1)
        formatted_date = wmsdate.strftime("%Y%m%d")
        if "201502" in formatted_date:
            formatted_date = "20150205"
        layerFileName =  'TMES_sea_level_'+formatted_date+'.nc'
        if wmsdate < datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0):
            layerFileName = 'history/'+layerFileName
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
            # "BBOX": "{bbox-epsg-3857}",
            "WIDTH": "256",
            "HEIGHT": "256",
        }
        options.update(layerOptions)
        # return settings.THREDDS_TO_PROXY + '/thredds/wms/tmes/' + layerFileName + '?' + urllib.urlencode(options) + '&BBOX={bbox-epsg-3857}'
        return settings.PROXY_URL + '/thredds/wms/tmes/' + layerFileName + '?' + urllib.urlencode(options) + '&BBOX={bbox-epsg-3857}'

    def get_sea_level_mean(self, instance):
        minmax = ('-1', '1')
        return {
            "url": self.sea_level_url(instance.timestamp, {
                'LAYERS': 'sea_level-mean',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
            }),
            "legend": self.sea_level_url(instance.timestamp, {
                'LAYERS': 'sea_level-mean',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
                'REQUEST': 'GetLegendGraphic',
                'COLORBARONLY': 'false',
                "WIDTH": "10",
                "HEIGHT": "200",
                "PALETTE": "sst_36",
            }),
            'min': minmax[0],
            'max': minmax[1],
        }

    def get_sea_level_std(self, instance):
        minmax = ('0', '1')
        return {
            "url": self.sea_level_url(instance.timestamp, {
                'LAYERS': 'sea_level-std',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '20',
            }),
            "legend": self.sea_level_url(instance.timestamp, {
                'LAYER': 'sea_level-std',
                'STYLES': 'boxfill/sst_36',
                'COLORSCALERANGE': ','.join(minmax),
                'NUMCOLORBANDS': '80',
                'REQUEST': 'GetLegendGraphic',
                'COLORBARONLY': 'false',
                "WIDTH": "10",
                "HEIGHT": "200",
                "PALETTE": "sst_36",
            }),
            'min': minmax[0],
            'max': minmax[1],
        }


    class Meta:
        model = ImageLayer
        fields = ('dataset','timestamp','date','wave_metadata','wave_image','wave_image_background','sea_level_mean','sea_level_std')