from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
# from django.conf import settings


class UserSerializer(serializers.ModelSerializer):

    def get_user_permissions(self, user):
        return user.get_all_permissions()

    class Meta:
        model = get_user_model()
        exclude = ('password',)


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField()
    email = serializers.EmailField()

    def validate(self, data):

        try:
            user = get_user_model().objects.filter(email=data.get('email'))
            if len(user) > 0:
                raise serializers.ValidationError(_("Email already exists"))
        except get_user_model().DoesNotExist:
            pass

        if not data.get('username'):
            raise serializers.ValidationError(_("Empty Username"))

        if not data.get('email'):
            raise serializers.ValidationError(_("Empty Email"))

        if not data.get('password'):
            raise serializers.ValidationError(_("Empty Password"))

        if not data.get('confirm_password'):
            raise serializers.ValidationError(_("Empty Confirm Password"))

        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError(_("Mismatch password"))

        data.popitem('confirm_password')

        return data

    # def create(self, validated_data):
    #
    #     print(validated_data)
    #     return User.objects.create_user(**validated_data)

    def save(self):

        # print(validated_data)
        return get_user_model().objects.create_user(**self.validated_data)

    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'first_name', 'last_name', 'password', 'confirm_password')