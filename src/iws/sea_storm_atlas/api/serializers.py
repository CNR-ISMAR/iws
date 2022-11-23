from iws.sea_storm_atlas.models import StormEventEntry, StormEventEffect, CoastalSegment, Origin, Sea, DamageCategory
from dynamic_rest.serializers import DynamicModelSerializer, DynamicRelationField
from rest_framework import serializers


class CostalSegmentSerializer(DynamicModelSerializer):
    class Meta:
        model = CoastalSegment
        fields = (
            'id',
        )


class StormEventEntrySerializer(DynamicModelSerializer):
    class Meta:
        model = StormEventEntry
        fields = (
            'id',
        )


class StormEventEffectSerializer(DynamicModelSerializer):
    class Meta:
        model = StormEventEffect
        fields = (
            'id',
        )

class StormOriginSerializer(DynamicModelSerializer):
    class Meta:
        model = Origin
        fields = (
            'id',
            'name',
        )

class StormSeaSerializer(DynamicModelSerializer):
    class Meta:
        model = Sea
        fields = (
            'id',
            'label',
        )

class DamageCategorySerializer(DynamicModelSerializer):
    class Meta:
        model = DamageCategory
        fields = (
            'id',
            'name',
        )
