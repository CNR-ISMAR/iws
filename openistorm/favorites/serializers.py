from rest_framework import serializers
from models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    # @app.task
    class Meta:
        model = Favorite
        fields = '__all__'

