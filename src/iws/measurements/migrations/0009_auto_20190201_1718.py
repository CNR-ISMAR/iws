# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.postgres.fields


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0008_serie_stat_mean'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='serie',
            name='stat_mean',
        ),
        migrations.AddField(
            model_name='serie',
            name='stats_mean',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='serie',
            name='stats_outliers',
            field=django.contrib.postgres.fields.ArrayField(null=True, base_field=models.IntegerField(), size=None),
        ),
    ]
