from rest_framework import serializers
from .models import Notification
from django.contrib.gis.geos import Point
import datetime

class NotificationSerializer(serializers.ModelSerializer):
    longitude = serializers.SerializerMethodField()
    latitude = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    position = Point

    def get_time(self, instance):
        return (datetime.datetime.now().replace(minute=0, second=0, microsecond=0) + datetime.timedelta(hours=2)).isoformat()[0:19]+'.000Z'
        # return instance.time.isoformat()[0:19]+'.000Z' if instance.time else None
        return instance.time.isoformat()[0:19]+'.000Z' if instance.time else None

    def get_latitude(self, instance):
        return instance.position.y

    def get_longitude(self, instance):
        return instance.position.x

    class Meta:
        model = Notification
        fields = '__all__'



