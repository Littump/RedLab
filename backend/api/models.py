from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ...


class Tabel(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tabels",
    )
    name_x = models.CharField(max_length=255, blank=True)
    name_y = models.CharField(max_length=255, blank=True)
    is_check = models.BooleanField(default=False)


class Point(models.Model):
    tabel = models.ForeignKey(
        Tabel,
        on_delete=models.CASCADE,
        related_name="points",
    )

    x = models.FloatField()
    y = models.FloatField()
    is_anomal = models.FloatField(null=True)
