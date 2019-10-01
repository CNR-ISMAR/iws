from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework import status

from .models import Device
from .serializers import DeviceSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.serializers import serialize
import json


class DeviceList(ListCreateAPIView):
    pagination_class = None
    serializer_class =  DeviceSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Device.objects.all()

    def get_queryset(self):
        qs = super(DeviceList, self).get_queryset()
        user = self.request.user
        return qs.filter(user=user)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = self.request.user.pk
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
