# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0012_auto_20190203_2059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stormevent',
            name='date_end',
            field=models.DateTimeField(null=True, blank=True),
        ),
    ]
