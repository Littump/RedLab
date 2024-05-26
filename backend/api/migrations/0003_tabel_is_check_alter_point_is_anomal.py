# Generated by Django 4.2 on 2024-05-24 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_tabel_point'),
    ]

    operations = [
        migrations.AddField(
            model_name='tabel',
            name='is_check',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='point',
            name='is_anomal',
            field=models.FloatField(null=True),
        ),
    ]
