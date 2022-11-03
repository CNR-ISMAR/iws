# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=150)),
                ('geo', django.contrib.gis.db.models.fields.PointField(srid=4326)),
            ],
        ),
        migrations.CreateModel(
            name='Measure',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.FloatField()),
                ('location', models.ForeignKey(to='measurements.Location', on_delete=models.DO_NOTHING)),
            ],
        ),
        migrations.CreateModel(
            name='Parameter',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=150)),
                ('uri', models.URLField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sensor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=150)),
            ],
        ),
        migrations.AddField(
            model_name='measure',
            name='parameter',
            field=models.ForeignKey(to='measurements.Parameter', on_delete=models.DO_NOTHING),
        ),
        migrations.AddField(
            model_name='measure',
            name='sensor',
            field=models.ForeignKey(to='measurements.Sensor', on_delete=models.DO_NOTHING),
        ),
    ]
