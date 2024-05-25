import csv
import io
import json
import time
from datetime import datetime

from djoser.views import UserViewSet
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Parameter
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status, permissions
from redis import redis

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
            if row[index].lower() == 'date':
                return index

    def _get_timestamp(self, value):
        # value = 1/2/2020 -> timestamp
        if isinstance(value, int):
            return value
        if isinstance(value, float):
            return value
        return datetime.strptime(value, '%m/%d/%Y').timestamp()

    def _send_to_model(self, tabel):
        points = tabel.points.all()
        data = {
            'tabel_id': tabel.id,
            'name': tabel.name_y,
            'points': [{'x': point.x, 'y': point.y} for point in points],
            'is_ready': False,
        }
        redis.set(tabel.id, json.dumps(data))

        while True:
            data = json.loads(redis.get(tabel.id))
            if data['is_ready']:
                break
            time.sleep(1)

        redis.delete(tabel.id)

        for point in points:
            point.is_anomal = data['points'][point.x]
            point.save()

        tabel.is_check = True
        tabel.save()
        return tabel

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        data_file = request.FILES['file']
        file_wrapper = io.TextIOWrapper(data_file.file, encoding='utf-8')
        reader = csv.reader(file_wrapper)
        header_row = next(reader) 
        index_date = self._get_date_index(header_row)
        count_columns = len(header_row)

        for index_column in range(count_columns):
            if index_column == index_date:
                continue

            tabel = models.Tabel.objects.create(
                user=self.request.user,
                name_x='time',
                name_y=header_row[index_column],
            )

            for row in reader:
                value = row[index_column]
                time = self._get_timestamp(row[index_date])
                if not (value and time):
                    continue

                models.Point.objects.create(
                    tabel=tabel,
                    x=time,
                    y=value,
                    x_real=row[index_date],
                )

        if False:
            tabel = self._send_to_model(tabel)

        serializer = serializers.TabelSerializer(instance=tabel)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Get lite points",
                         manual_parameters=[
                             Parameter('start', in_='path', type='integer'),
                             Parameter('end', in_='path', type='integer'),
                         ],
                         responses={status.HTTP_200_OK: serializers.TabelLiteSerializer})
    def lite(self, request, pk):
        tabel = self.get_object()
        start = request.query_params.get('start', None)
        end = request.query_params.get('end', None)
        if start and end:
            points = tabel.points.filter(x__gte=start, x__lte=end)
        else:
            points = tabel.points.all()

        result_points = []
        count = len(points) // 250
        if count == 0:
            count = 1

        point_result = {
            'x': 0,
            'y': 0,
            'is_anomal': 0,
            'tabel': tabel.id,
        }
        for index in range(len(points)):
            point_result['x'] += points[index].x
            point_result['y'] += points[index].y
            point_result['is_anomal'] = (
                max(point_result['is_anomal'], points[index].is_anomal)
                if points[index].is_anomal else 0
            )
            if index % count == 0 or index == len(points) - 1:
                point_result['x'] /= count
                point_result['y'] /= count
                result_points.append(point_result)
                point_result = {
                    'x': 0,
                    'y': 0,
                    'is_anomal': 0,
                    'tabel': tabel.id,
                }

        data = {'id': tabel.id, 'name_x': tabel.name_x,
                'name_y': tabel.name_y, 'points': result_points}
        serializer = serializers.TabelLiteSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Get points in window",
                         manual_parameters=[
                             Parameter('start', in_='path', type='integer'),
                             Parameter('end', in_='path', type='integer'),
                             Parameter('limit', in_='path', type='integer'),
                             Parameter('page', in_='path', type='integer'),
                         ],
                         responses={status.HTTP_200_OK: serializers.TabelLiteSerializer})
    def window(self, request, pk):
        tabel = self.get_object()
        start = request.query_params.get('start', None)
        end = request.query_params.get('end', None)
        limit = request.query_params.get('limit', None)
        page = request.query_params.get('page', None)
        if start and end:
            points = tabel.points.filter(x__gte=start, x__lte=end)
        else:
            points = tabel.points.all()

        if limit and page:
            points = points[int(page) * int(limit):(int(page) + 1) * int(limit)]

        data = {'id': tabel.id, 'name_x': tabel.name_x, 'name_y': tabel.name_y,
                'points': serializers.PointSerializer(points, many=True).data}
        serializer = serializers.TabelLiteSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Get file",
                         manual_parameters=[
                             Parameter('start', in_='path', type='integer'),
                             Parameter('end', in_='path', type='integer'),
                         ])
    def file(self, request, pk):
        tabel = self.get_object()
        start = request.query_params.get('start', 0)
        end = request.query_params.get('end', 999999999999)
        points = tabel.points.filter(x__gte=start, x__lte=end)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="points.csv"'
        writer = csv.writer(response)
        writer.writerow(['time', tabel.name_x, tabel.name_y, 'is_anomal'])
        for point in points:
            writer.writerow([point.x, point.x_real, point.y, point.is_anomal])
        return response
