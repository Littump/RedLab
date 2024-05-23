from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from api import models

class UserCustomSerializer(UserSerializer):
    class Meta:
        model = models.User
        exclude = ["password"]


class UserСreateCustomSerializer(UserCreateSerializer):
    class Meta:
        model = models.User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
        ]


class UserIsExistRequest(serializers.Serializer):
    username = serializers.CharField(max_length=150)


class UserIsExistResponse(serializers.Serializer):
    is_exist = serializers.BooleanField()
