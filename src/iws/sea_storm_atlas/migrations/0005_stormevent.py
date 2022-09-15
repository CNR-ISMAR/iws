# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0004_auto_20190123_0734'),
    ]

    operations = [
        migrations.CreateModel(
            name='StormEvent',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('area_code', models.CharField(max_length=5, null=True, blank=True)),
                ('area_partition', models.CharField(max_length=2, null=True, blank=True)),
                ('date_start', models.DateTimeField()),
                ('date_end', models.DateTimeField(null=True)),
                ('flooding_level', models.DecimalField(max_digits=4, decimal_places=2)),
                ('origin', models.CharField(max_length=255, null=True, blank=True)),
                ('comments', models.TextField(max_length=500)),
                ('is_aggregated', models.BooleanField(default=0)),
                ('evts_total', models.SmallIntegerField(default=1)),
                ('evts_coast_erosion', models.SmallIntegerField(default=0)),
                ('evts_flooding', models.SmallIntegerField(default=0)),
                ('evts_defence_damage', models.SmallIntegerField(default=0)),
                ('evts_infrastructure_damage', models.SmallIntegerField(default=0)),
                ('evts_businesses_damage', models.SmallIntegerField(default=0)),
                ('lat', models.CharField(max_length=255, null=True, blank=True)),
                ('lon', models.CharField(max_length=255, null=True, blank=True)),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=3035, null=True, blank=True)),
                ('coastalsegment', models.ForeignKey(to='sea_storm_atlas.CoastalSegment', on_delete=models.DO_NOTHING)),
            ],
        ),
    ]
