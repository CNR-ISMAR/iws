from oauth2_provider.views.generic import ProtectedResourceView
from django.http import HttpResponse

from rest_framework import generics
from django.contrib.auth import get_user_model

from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
# from djcore.djcore.users.models import User

from rest_framework.response import Response
from guardian.shortcuts import assign_perm, get_users_with_perms

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
