from rest_framework import serializers
from models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    longitude = serializers.SerializerMethodField()
    latitude = serializers.SerializerMethodField()

    def get_latitude(self, instance):
        return instance.position.y

    def get_longitude(self, instance):
        return instance.position.x

    class Meta:
        model = Notification
        fields = '__all__'



