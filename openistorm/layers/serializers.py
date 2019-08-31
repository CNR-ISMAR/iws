from rest_framework import serializers
from models import ImageLayer
import datetime

class ImageLayerSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    metadata = serializers.SerializerMethodField()
    # image = serializers.SerializerMethodField()
    def get_date(self, instance):
        return datetime.datetime.fromtimestamp(instance.timestamp).isoformat()+':000Z'
    def get_metadata(self, instance):
        return datetime.datetime.fromtimestamp(instance.timestamp).isoformat()+':000Z'
    # def get_image(self, instance):
    #     return datetime.datetime.fromtimestamp(instance.timestamp).isoformat()+':000Z'
    class Meta:
        model = ImageLayer
        fields = ('dataset','timestamp','date','metadata','image',)

