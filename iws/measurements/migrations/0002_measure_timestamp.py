# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='measure',
            name='timestamp',
            field=models.DateTimeField(default='2000-01-01'),
            preserve_default=False,
        ),
    ]
