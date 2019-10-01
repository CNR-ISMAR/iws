# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0033_auto_20180330_0951'),
        ('documents', '0030_auto_20180302_0430'),
    ]

    operations = [
        migrations.CreateModel(
            name='CoastalSegment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('geom', django.contrib.gis.db.models.fields.MultiLineStringField(srid=3035)),
                ('subregion', models.CharField(max_length=40)),
                ('seg_name', models.CharField(max_length=100, null=True, blank=True)),
                ('code', models.CharField(max_length=5, null=True, blank=True)),
                ('partition', models.CharField(max_length=2, null=True, blank=True)),
                ('ews', models.NullBooleanField()),
                ('ews_hazard_type', models.CharField(max_length=3, null=True, choices=[('W', 'Wave Storm'), ('T', 'Tide Storm'), ('WT', 'Wave and Tide Storm'), ('M', 'Meteotsunami'), ('WTM', 'Wave and Tide Storm, Meteotsunami')])),
                ('forecasting_service', models.NullBooleanField()),
                ('cp_procedures', models.NullBooleanField()),
                ('intervention_procedures', models.NullBooleanField()),
                ('cf_risk_sources', models.CharField(max_length=3, null=True, choices=[('W', 'Wave Storm'), ('T', 'Tide Storm'), ('WT', 'Wave and Tide Storm'), ('M', 'Meteotsunami'), ('WTM', 'Wave and Tide Storm, Meteotsunami')])),
                ('network_for_marine_measurement_observation', models.NullBooleanField()),
                ('post_event_monitoring_system', models.NullBooleanField()),
                ('region', models.ForeignKey(to='base.Region')),
            ],
        ),
        migrations.CreateModel(
            name='Sea',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='StormEvent',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('area_code', models.CharField(max_length=5, null=True, blank=True)),
                ('area_partition', models.CharField(max_length=2, null=True, blank=True)),
                ('date_start', models.DateTimeField()),
                ('date_end', models.DateTimeField(null=True, blank=True)),
                ('flooding_level', models.DecimalField(null=True, max_digits=4, decimal_places=2)),
                ('origin', models.CharField(max_length=255, null=True, blank=True)),
                ('comments', models.TextField(max_length=500)),
                ('is_aggregated', models.BooleanField(default=0)),
                ('evts_total', models.SmallIntegerField(default=1)),
                ('evts_coast_erosion', models.SmallIntegerField(default=0, null=True, blank=True)),
                ('evts_flooding', models.SmallIntegerField(default=0, null=True, blank=True)),
                ('evts_defence_damage', models.SmallIntegerField(default=0, null=True, blank=True)),
                ('evts_infrastructure_damage', models.SmallIntegerField(default=0, null=True, blank=True)),
                ('evts_businesses_damage', models.SmallIntegerField(default=0, null=True, blank=True)),
                ('lat', models.CharField(max_length=255, null=True, blank=True)),
                ('lon', models.CharField(max_length=255, null=True, blank=True)),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=3035, null=True, blank=True)),
                ('coastalsegment', models.ForeignKey(to='sea_storm_atlas.CoastalSegment')),
                ('evts_documents', models.ManyToManyField(to='documents.Document')),
            ],
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='sea',
            field=models.ForeignKey(to='sea_storm_atlas.Sea'),
        ),
    ]
