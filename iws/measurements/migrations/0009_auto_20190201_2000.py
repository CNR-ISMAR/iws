# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0008_serie_stat_mean'),
    ]

    operations = [
        migrations.RenameField(
            model_name='serie',
            old_name='stat_mean',
            new_name='stats_mean',
        ),
    ]
