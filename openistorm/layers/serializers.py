from rest_framework import serializers
from models import ImageLayer
import datetime
from django.conf import settings
import urllib


class ImageLayerSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    wave_metadata = serializers.SerializerMethodField()
    wave_image = serializers.SerializerMethodField()
    sea_level_mean = serializers.SerializerMethodField()
    sea_level_std = serializers.SerializerMethodField()


    def get_date(self, instance):
        return datetime.datetime.fromtimestamp(instance.timestamp).isoformat()+'.000Z'

    def get_wave_metadata(self, instance):
        return instance.metadata

    def get_wave_image(self, instance):
        return instance.image

    def sea_level_url(self, layerOptions):
        #TODO: manage missing current data!!!!!
        # TODO: quando si avrà una logica integrarla
        layerFileName = 'TMES_sea_level_20190902.nc'
        # TODO: questo tempo va sostituito col timestamp formatato a modino
        time = '2019-02-02T00:00:00.000Z'
        options = {
            'ELEVATION': '0',
            'TIME': time,
            'TRANSPARENT': 'true',
            'LOGSCALE': 'false',
            'SERVICE': 'WMS',
            'VERSION': '1.1.1',
            'REQUEST': 'GetMap',
            'FORMAT': 'image/png',
            'SRS': 'EPSG:4326',
            # 'BBOX': '{bbox-epsg-3857}',
            'WIDTH': '256',
            'HEIGHT': '256',
        }
        options.update(layerOptions)
        return settings.THREDDS_TO_PROXY + '/thredds/wms/tmes/' + layerFileName + '?' + urllib.urlencode(options) + '&BBOX={bbox-epsg-3857}'

    def get_sea_level_mean(self, instance):
        return self.sea_level_url({
            'LAYERS': 'sea_level-mean',
            'STYLES': 'boxfill/rainbow',
            'COLORSCALERANGE': '0.5,-0.5',
            'NUMCOLORBANDS': '20',
        })

    def get_sea_level_std(self, instance):
        return self.sea_level_url({
        'LAYERS': 'sea_level-std',
        'STYLES': 'boxfill/rainbow',
        'COLORSCALERANGE': '0,0.4',
        'NUMCOLORBANDS': '20',
        })


    class Meta:
        model = ImageLayer
        fields = ('dataset','timestamp','date','wave_metadata','wave_image','sea_level_mean','sea_level_std')