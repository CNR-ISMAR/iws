from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from fcm_django.api.rest_framework import FCMDeviceAuthorizedViewSet


class DeviceList(FCMDeviceAuthorizedViewSet, IsAuthenticated):
    def create(self, request, *args, **kwargs):
        data = request.data
        qs = self.filter_queryset(self.get_queryset()).filter(registration_id=data.get('registration_id', ''))
        if qs.count() == 0:
            data['user'] = self.request.user.pk
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        else:
            serializer = self.get_serializer(qs[0])
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)