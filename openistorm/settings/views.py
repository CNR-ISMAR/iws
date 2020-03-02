from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework import status

from .models import Setting
from .serializers import SettingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.serializers import serialize
import json


class SettingList(ListCreateAPIView):
    pagination_class = None
    serializer_class =  SettingSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Setting.objects.all()

    def get_queryset(self):
        qs = super(SettingList, self).get_queryset()
        user = self.request.user
        return qs.filter(user=user)

    def create_or_retrieve_and_update_settings(self, data):
        qs = self.filter_queryset(self.get_queryset())
        data['user'] = self.request.user.pk
        if qs.count() == 0:
            data = {"sl_reference": data.get("sl_reference", 0), "sl_notification_threshold": data.get("sl_notification_threshold", 100), "user": data['user']}
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        elif len(data) > 1:
            serializer = self.get_serializer(qs[0], data=data, partial=False)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            serializer = self.get_serializer(qs[0])

        return serializer

    def post(self, request, *args, **kwargs):
        return self.put(request, args, kwargs)

    def put(self, request, *args, **kwargs):
        data = request.data
        serializer = self.create_or_retrieve_and_update_settings(data)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get(self, request, *args, **kwargs):
        serializer = self.create_or_retrieve_and_update_settings({})
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)
