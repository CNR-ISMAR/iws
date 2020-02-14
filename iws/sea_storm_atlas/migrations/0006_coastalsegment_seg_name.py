# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0005_stormevent'),
    ]

    operations = [
        migrations.AddField(
            model_name='coastalsegment',
            name='seg_name',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
    ]
