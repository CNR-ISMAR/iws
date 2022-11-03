# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0033_auto_20180330_0951'),
        ('sea_storm_atlas', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='coastalsegment',
            name='region',
            field=models.ForeignKey(default=1, to='base.Region', on_delete=models.DO_NOTHING),
            preserve_default=False,
        ),
    ]
