from iws.sea_storm_atlas.models import StormEventEntry, StormEventEffect, CoastalSegment, Origin, Sea, DamageCategory
from dynamic_rest.serializers import DynamicModelSerializer, DynamicRelationField
from rest_framework import serializers


class CostalSegmentSerializer(DynamicModelSerializer):
    ews_hazard_type__name = serializers.SerializerMethodField()
    sea = DynamicRelationField('StormSeaSerializer', embed=True)

    class Meta:
        model = CoastalSegment
        fields = (
            'id',
            'region',
            'subregion',
            'sea',
            'seg_name',
            'code',
            'partition',
            'ews',
            'ews_hazard_type',
            'ews_hazard_type__name',
            'forecasting_service',
            'cp_procedures',
            'intervention_procedures',
            'cf_risk_sources',
            'network_for_marine_measurement_observation',
            'post_event_monitoring_system',
            'geom',
        )

        deferred_fields = ('geom',)

    def get_ews_hazard_type__name(self, obj):
        return obj.get_ews_hazard_type_display()


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
