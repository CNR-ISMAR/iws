from logging import getLogger
import requests, json
import pandas as pd
from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponse

from rest_framework import viewsets, permissions, decorators, response

from dynamic_rest.viewsets import DynamicModelViewSet
from dynamic_rest.filters import DynamicFilterBackend, DynamicSortingFilter

from geonode.base.api.filters import DynamicSearchFilter, ExtentFilter
from geonode.base.api.pagination import GeoNodeApiPagination
from geonode.documents.models import DocumentResourceLink
from django.contrib.postgres.aggregates import StringAgg
from django.db.models import Func
from django.contrib.gis.db.models.functions import Transform
import io

from iws.sea_storm_atlas.api import serializers
from iws.sea_storm_atlas import models



logger = getLogger('django')



class SeaViewSet(DynamicModelViewSet):
    queryset = models.Sea.objects.all()
    serializer_class = serializers.StormSeaSerializer
    pagination_class = GeoNodeApiPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    filter_backends = [
        DynamicFilterBackend, DynamicSortingFilter, DynamicSearchFilter,
        ExtentFilter
    ]


class DamageCategoryViewSet(DynamicModelViewSet):
    queryset = models.DamageCategory.objects.all()
    serializer_class = serializers.DamageCategorySerializer
    pagination_class = GeoNodeApiPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    filter_backends = [
        DynamicFilterBackend, DynamicSortingFilter, DynamicSearchFilter,
        ExtentFilter
    ]


class OriginViewSet(DynamicModelViewSet):
    queryset = models.Origin.objects.all()
    serializer_class = serializers.StormOriginSerializer
    pagination_class = GeoNodeApiPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    filter_backends = [
        DynamicFilterBackend, DynamicSortingFilter, DynamicSearchFilter,
        ExtentFilter
    ]


class StormEventViewSet(DynamicModelViewSet):
    queryset = models.StormEventEntry.objects.all()
    serializer_class = serializers.StormEventEntrySerializer
    pagination_class = GeoNodeApiPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    filter_backends = [
        DynamicFilterBackend, DynamicSortingFilter, DynamicSearchFilter,
        ExtentFilter
    ]

    @decorators.action(detail=True, methods=['get'])
    def export(self, request, pk):
        columns = [
            'id',
            'date_start',
            'date_end',
            'is_aggregated',
            'description',
            'coastalsegment__code',
            'coastalsegment__subregion',
            'origin_names',
        ]
        obj = self.get_queryset().filter(id=pk).annotate(
            origin_names=StringAgg('origins__name', delimiter=', ')
        ).values_list(*columns, named=True)

        bio = io.BytesIO()
        writer = pd.ExcelWriter(bio, engine='xlsxwriter')

        index = [i + 1 for i, _ in enumerate(obj)]
        df = pd.DataFrame(data=obj, index=index, columns=columns)
        df['date_start'] = pd.to_datetime(df['date_start'], errors='coerce').dt.strftime("%Y-%m-%d %H:%M:%S")
        df['date_end'] = pd.to_datetime(df['date_end'], errors='coerce').dt.strftime("%Y-%m-%d %H:%M:%S")
        df.to_excel(writer, 'Event')

        columns = [
            'id',
            'date',
            'damage',
            'flooding_level',
            'description',
            'damage_category_names',
            'point',
            # 'lat',
            # 'lon',
        ]

        data = models.StormEventEffect.objects.filter(event_id=pk).annotate(
            damage_category_names=StringAgg('damage_categories__name', delimiter=', '),
            point=Transform('geom', 4236),
        ).values_list(*columns, named=True)

        index = [i + 1 for i, _ in enumerate(data)]

        df = pd.DataFrame(data=data, index=index, columns=columns)
        df['date'] = pd.to_datetime(df['date'], errors='coerce').dt.strftime("%Y-%m-%d %H:%M:%S")

        df['point'] = df['point'].apply(lambda p: f'{p.centroid.y},{p.centroid.x}' if p else None)

        df.to_excel(writer, 'Effects')
        writer.save()
        bio.seek(0)

        response = HttpResponse(bio, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = f'attachment; filename=event-{pk}.xlsx'
        return response


class StormEffectViewSet(DynamicModelViewSet):
    queryset = models.StormEventEffect.objects.all()
    serializer_class = serializers.StormEventEffectSerializer
    pagination_class = GeoNodeApiPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    filter_backends = [
        DynamicFilterBackend, DynamicSortingFilter, DynamicSearchFilter,
        ExtentFilter
    ]

    @decorators.action(detail=True, methods=['post'])
    def clone(self, request, pk):
        obj = self.get_object()
        obj.id = None
        obj.save()
        cloned_serializer = self.get_serializer_class()(obj)
        return response.Response(data=cloned_serializer.data)


class CoastalSegmentViewSet(DynamicModelViewSet):
    queryset = models.CoastalSegment.objects.all()
    serializer_class = serializers.CostalSegmentSerializer
    pagination_class = GeoNodeApiPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    filter_backends = [
        DynamicFilterBackend, DynamicSortingFilter, DynamicSearchFilter,
        ExtentFilter
    ]


class DocumentEffectViewSet(DynamicModelViewSet):
    queryset = DocumentResourceLink.objects.all()
    pagination_class = GeoNodeApiPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [
        DynamicFilterBackend, DynamicSortingFilter, DynamicSearchFilter,
        ExtentFilter
    ]
    serializer_class = serializers.DocumentEffectSerializer

    def get_queryset(self):
        content_type = ContentType.objects.get_for_model(models.StormEventEffect)
        return super().get_queryset().filter(content_type=content_type)

    def perform_create(self, serializer):
        content_type = ContentType.objects.get_for_model(models.StormEventEffect)

        serializer.save(
            content_type=content_type,
        )
