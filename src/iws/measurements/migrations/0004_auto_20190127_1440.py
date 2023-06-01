# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0003_auto_20190127_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='measure',
            name='timestamp',
            field=models.DateTimeField(db_index=True),
        ),
    ]
