from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api import views


app_name = 'api'

v1_router = DefaultRouter()
v1_router.register('users', views.CustomUserViewSet, basename=app_name)

urlpatterns = [
    path("auth/", include("djoser.urls.authtoken")),
    path('', include(v1_router.urls)),
]
