from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet
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
        data['title'] = data['title'] if data.get('title') else "Fav "+str(self.get_queryset().count()+1)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class FavoriteDetail(RetrieveUpdateDestroyAPIView,GenericViewSet):
    serializer_class =  FavoriteSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Favorite.objects.all()

    def get_queryset(self):
        qs = super(FavoriteDetail, self).get_queryset()
        user = self.request.user
        return qs.filter(user=user)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     # if instance.is_default == True:
    #     #     return Response("Cannot delete default system category", status=status.HTTP_400_BAD_REQUEST)
    #     self.perform_destroy(instance)

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
        # print(queryset.__dict__)
        serialized = serialize('geojson', queryset,
                  geometry_field='position',
                  fields=('id','title','address'),
                  srid= 'EPSG:3857')
        return Response(json.loads(serialized))





