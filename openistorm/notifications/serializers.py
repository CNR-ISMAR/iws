from rest_framework import serializers
from models import Notification
from django.contrib.gis.geos import Point

class NotificationSerializer(serializers.ModelSerializer):
    longitude = serializers.SerializerMethodField()
    latitude = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    position = Point

    def get_time(self, instance):
        return instance.time.isoformat()[0:19]+'.000Z'

    def get_latitude(self, instance):
        return instance.position.y

    def get_longitude(self, instance):
        return instance.position.x

    class Meta:
        model = Notification
        fields = '__all__'



