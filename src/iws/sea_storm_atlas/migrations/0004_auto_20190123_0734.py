# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0003_auto_20190122_1318'),
    ]

    operations = [
        migrations.AddField(
            model_name='coastalsegment',
            name='cf_risk_sources',
            field=models.CharField(default='W', max_length=1, choices=[('W', 'Wave Storm'), ('T', 'Tide Storm'), ('B', 'Both')]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='cp_procedures',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='ews',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='ews_hazard_type',
            field=models.CharField(default='W', max_length=1, choices=[('W', 'Wave Storm'), ('T', 'Tide Storm'), ('B', 'Both')]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='forecasting_service',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='intervention_procedures',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='network_for_marine_measurement_observation',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='post_event_monitoring_system',
            field=models.BooleanField(null=True),
        ),
    ]
