# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0007_auto_20190202_1356'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coastalsegment',
            name='cf_risk_sources',
            field=models.CharField(max_length=1, null=True, choices=[('W', 'Wave Storm'), ('T', 'Tide Storm'), ('WT', 'Wave and Tide Storm'), ('M', 'Meteotsunami'), ('WTM', 'Wave and Tide Storm, Meteotsunami')]),
        ),
        migrations.AlterField(
            model_name='coastalsegment',
            name='ews_hazard_type',
            field=models.CharField(max_length=3, null=True, choices=[('W', 'Wave Storm'), ('T', 'Tide Storm'), ('WT', 'Wave and Tide Storm'), ('M', 'Meteotsunami'), ('WTM', 'Wave and Tide Storm, Meteotsunami')]),
        ),
    ]
