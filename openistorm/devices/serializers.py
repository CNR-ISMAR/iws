from rest_framework import serializers
from models import Device

class DeviceSerializer(serializers.ModelSerializer):
    # @app.task
    class Meta:
        model = Device
        fields = '__all__'

