# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0008_auto_20190202_1410'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stormevent',
            name='flooding_level',
            field=models.DecimalField(null=True, max_digits=4, decimal_places=2),
        ),
    ]
