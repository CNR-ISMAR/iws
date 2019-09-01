from rest_framework import serializers
from models import ImageLayer
import datetime

class ImageLayerSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    wave_metadata = serializers.SerializerMethodField()
    wave_image = serializers.SerializerMethodField()
    sea_level_mean = serializers.SerializerMethodField()
    sea_level_avg = serializers.SerializerMethodField()

    def get_date(self, instance):
        return datetime.datetime.fromtimestamp(instance.timestamp).isoformat()+'.000Z'

    def get_wave_metadata(self, instance):
        return instance.metadata

    def get_wave_image(self, instance):
        return instance.image

    def get_sea_level_mean(self, instance):
        return instance.image

    def get_sea_level_avg(self, instance):
        return instance.image

    # TODO: add get_sea_level_mean, get_sea_level_avg, on view: manage missing current data!!!

    class Meta:
        model = ImageLayer
        fields = ('dataset','timestamp','date','wave_metadata','wave_image',)

      # "sea_level_mean": "WMS TILE URL",
      # "sea_level_avg": "WMS TILE URL"