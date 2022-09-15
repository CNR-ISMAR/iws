# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0006_network'),
    ]

    operations = [
        migrations.AddField(
            model_name='serie',
            name='network',
            field=models.ForeignKey(default=1, to='measurements.Network', on_delete=models.DO_NOTHING),
            preserve_default=False,
        ),
    ]
