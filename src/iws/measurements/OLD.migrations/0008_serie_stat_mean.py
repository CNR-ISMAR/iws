# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0007_serie_network'),
    ]

    operations = [
        migrations.AddField(
            model_name='serie',
            name='stat_mean',
            field=models.FloatField(null=True),
        ),
    ]
