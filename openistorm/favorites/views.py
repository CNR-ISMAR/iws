from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework import status

from .models import Favorite
from .serializers import FavoriteSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.serializers import serialize
import json


class FavoriteList(ListCreateAPIView):
    pagination_class = None
    serializer_class =  FavoriteSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Favorite.objects.all()

    def get_queryset(self):
        qs = super(FavoriteList, self).get_queryset()
        user = self.request.user
        return qs.filter(user=user)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = self.request.user.pk
        data['position'] = ''
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class FavoriteListGeoJson(ListAPIView):
    pagination_class = None
    serializer_class =  FavoriteSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Favorite.objects.all()

    def get_queryset(self):
        qs = super(FavoriteListGeoJson, self).get_queryset()
        user = self.request.user
        return qs.filter(user=user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serialized = serialize('geojson', queryset,
                  geometry_field='position',
                  fields=('id','title','address', 'position'))
        return Response(json.loads(serialized))





