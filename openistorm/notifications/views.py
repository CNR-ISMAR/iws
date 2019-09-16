from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import status
from rest_framework.decorators import detail_route
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.serializers import serialize
import json
from django.contrib.gis.geos import Point


# TODO: SOLO TEST, DA ELIMINARE IL CREATE
class NotificationList(ListCreateAPIView):
# class NotificationList(ListAPIView):
    pagination_class = None
    serializer_class =  NotificationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Notification.objects.all()

    def get_queryset(self):
        qs = super(NotificationList, self).get_queryset()
        user = self.request.user
        return qs.filter(user=user)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = self.request.user.pk
        data['position'] = Point(data['longitude'], data['latitude'])
        # print(data)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def create(self, request, *args, **kwargs):
    #     data = request.data
    #     data['user'] = self.request.user.pk
    #     data['position'] = ''
    #     serializer = self.get_serializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class NotificationDetail(RetrieveUpdateDestroyAPIView,GenericViewSet):
    serializer_class =  NotificationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Notification.objects.all()

    @detail_route(methods=['put'])
    def markasread(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.read = True
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # def markasread(self, request, pk=None):
    #     if request.method == 'PUT':
    #         for record in request.data:
    #             serializer_class = LayerSerializer(data=record)
    #             serializer_class.is_valid(raise_exception=True)
    #             serializer_class.update(self.get_object().layer_set.get(pk=record.get('id')), serializer_class.validated_data)
    #     interactions = self.get_object().layer_set.all()
    #     serializer_class = LayerSerializer(interactions, many=True)
    #     return Response(serializer_class.data,status=status.HTTP_200_OK)

    def get_queryset(self):
        qs = super(NotificationDetail, self).get_queryset()
        user = self.request.user
        return qs.filter(user=user)




