# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.postgres.fields
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
                ('geo', django.contrib.gis.db.models.fields.PointField(srid=4326, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Measure',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('timestamp', models.DateTimeField(db_index=True)),
                ('value', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Network',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=150)),
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
        migrations.CreateModel(
            name='Serie',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('stats_mean', models.FloatField(null=True)),
                ('stats_outliers', django.contrib.postgres.fields.ArrayField(null=True, base_field=models.IntegerField(), size=None)),
                ('location', models.ForeignKey(to='measurements.Location')),
                ('network', models.ForeignKey(to='measurements.Network')),
                ('parameter', models.ForeignKey(to='measurements.Parameter')),
                ('sensor', models.ForeignKey(to='measurements.Sensor')),
            ],
        ),
        migrations.AddField(
            model_name='measure',
            name='serie',
            field=models.ForeignKey(to='measurements.Serie'),
        ),
    ]
