from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    def get_user_permissions(self, user):
        return user.get_all_permissions()

    class Meta:
        model = User
        exclude = ('password',)