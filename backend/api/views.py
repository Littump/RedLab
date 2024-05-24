import csv
import io

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


class TabelViewSet(ModelViewSet):
    queryset = models.Tabel.objects.all()
    serializer_class = serializers.TabelSerializer
    http_method_names = ['get', 'post', 'delete']

    def _get_date_index(self, row):
        for index in range(len(row)):
            if row[index] == 'date':
                return index

    def create(self, request, *args, **kwargs):
        data_file = request.FILES['file']
        file_wrapper = io.TextIOWrapper(data_file.file, encoding='utf-8')
        reader = csv.reader(file_wrapper)
        index_date = self._get_date_index(reader[0])
        count_columns = len(reader[0])

        for index_column in range(count_columns):
            if index_column == index_date:
                continue

            tabel = models.Tabel.objects.create(
                user=self.request.user,
                name_x='time',
                name_y=reader[0][index_column],
            )

            for row in reader[1:]:
                value = row[index_column]
                time = row[index_date]
                if not (value and time):
                    continue

                models.Point.objects.create(
                    tabel=tabel,
                    x=time,
                    y=value,
                )

        # TODO send in redis

        serializer = serializers.TabelSerializer(tabel)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
