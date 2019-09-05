from rest_framework import serializers
# STORM ATLAS:
from iws.sea_storm_atlas.models import StormEvent

class StormEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = StormEvent
        fields = ('date_start', 'date_end',  'origin',   'comments',   'geom')