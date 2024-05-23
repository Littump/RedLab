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
        exclude = ["password"]
