from rest_framework import serializers
from models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    # longitude = serializers.SerializerMethodField()
    # latitude = serializers.SerializerMethodField()

    # def get_latitude(self, instance):
    #     return instance.position.x
    #
    # def get_longitude(self, instance):
    #     return instance.position.y

    class Meta:
        model = Favorite
        fields = '__all__'

