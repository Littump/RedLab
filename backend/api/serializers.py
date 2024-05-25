from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from api import models
from rest_framework.fields import SerializerMethodField

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


class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Point
        fields = "__all__"


class TabelSerializer(serializers.ModelSerializer):
    points = SerializerMethodField(read_only=True)

    class Meta:
        model = models.Tabel
        exclude = ["user", "is_check"]

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return models.Tabel.objects.create(**validated_data)

    def get_points(self, obj):
        return PointSerializer(obj.points.all(), many=True).data
