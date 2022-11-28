from logging import getLogger
import requests, json
from django.contrib.contenttypes.models import ContentType

from rest_framework import viewsets, permissions, decorators, response

from dynamic_rest.viewsets import DynamicModelViewSet
from dynamic_rest.filters import DynamicFilterBackend, DynamicSortingFilter

from geonode.base.api.filters import DynamicSearchFilter, ExtentFilter
from geonode.base.api.pagination import GeoNodeApiPagination
from geonode.documents.models import DocumentResourceLink


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
