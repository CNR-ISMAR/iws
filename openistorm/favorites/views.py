from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import status

from .models import Favorite
from .serializers import FavoriteSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt

class FavoriteList(ListCreateAPIView):
    serializer_class =  FavoriteSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Favorite.objects.all()

    def get_queryset(self):
        qs = super(FavoriteList, self).get_queryset()
        user = self.request.user
        return qs.filter(user=user)

    @csrf_exempt
    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = self.request.user.pk
        data['position'] = ''
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)





