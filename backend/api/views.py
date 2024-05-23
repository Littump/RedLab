from djoser.views import UserViewSet
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status, permissions

from api import serializers, models


class CustomUserViewSet(UserViewSet):

    def get_permissions(self):
        if self.action == 'is_exist':
            return [permissions.AllowAny()]
        return super().get_permissions()        

    @swagger_auto_schema(
        method='POST',
        operation_description="Check if user exists",
        request_body=serializers.UserIsExistRequest,
        responses={status.HTTP_200_OK: serializers.UserIsExistResponse},
    )
    @action(detail=False, methods=['post'])
    def is_exist(self, request):
        serializer = serializers.UserIsExistRequest(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        user_exists = models.User.objects.filter(username=username).exists()
        serializer = serializers.UserIsExistResponse(data={'is_exist': user_exists})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
