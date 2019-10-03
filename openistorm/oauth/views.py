from oauth2_provider.views.generic import ProtectedResourceView
from django.http import HttpResponse

from rest_framework import generics
from django.contrib.auth import get_user_model

from .serializers import UserSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
# from djcore.djcore.users.models import User

from rest_framework.response import Response
from guardian.shortcuts import assign_perm, get_users_with_perms
from oauth2_provider.views.mixins import OAuthLibMixin
from braces.views import CsrfExemptMixin
from oauth2_provider.settings import oauth2_settings
from rest_framework.views import APIView
from django.db import transaction
from rest_framework import status
import json

class ApiEndpoint(ProtectedResourceView):
    def get(self, request, *args, **kwargs):
        return HttpResponse('Hello, OAuth2!')

class ProfileViewSet(generics.RetrieveUpdateAPIView):

    """
    Updates and retrives user profile
    """

    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        """
        Adding this method since it is sometimes called when using
        django-rest-swagger
        https://github.com/Tivix/django-rest-auth/issues/275
        """
        return get_user_model().objects.none()

    """
    Retrieve a model instance.
    """
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = UserSerializer(instance)
        return Response(serializer.data)

    """
    Update a model instance.
    """
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)

        # print(request.user.get_all_permissions())

        update_data = request.data

        if not request.user.has_perm('auth.change_permission'):
            exclude_from_update = [
                "user_permissions",
                "groups",
                "date_joined",
                "is_active",
                "is_staff",
                "is_superuser",
                "last_login",
                "id",
            ]
            update_data = {k:v for k, v in update_data.items() if k not in exclude_from_update}

        instance = self.get_object()
        serializer = self.get_serializer(instance, data=update_data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)



class UserRegister(CsrfExemptMixin, OAuthLibMixin, APIView):
    permission_classes = (AllowAny,)

    server_class = oauth2_settings.OAUTH2_SERVER_CLASS
    validator_class = oauth2_settings.OAUTH2_VALIDATOR_CLASS
    oauthlib_backend_class = oauth2_settings.OAUTH2_BACKEND_CLASS

    def post(self, request):
        if request.auth is None:
            data = request.data
            #data = data.dict()
            serializer = RegisterSerializer(data=data)
            if serializer.is_valid():
                 try:
                    with transaction.atomic():
                        user = serializer.save()

                        url, headers, body, token_status = self.create_token_response(request)
                        if token_status != 200:
                            raise Exception(json.loads(body))

                    return Response(json.loads(body), status=token_status)
                 except Exception as e:
                     return Response(data={"error": e.args}, status=status.HTTP_400_BAD_REQUEST)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)
