# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0030_auto_20180302_0430'),
        ('sea_storm_atlas', '0010_auto_20190202_1739'),
    ]

    operations = [
        migrations.AddField(
            model_name='stormevent',
            name='evts_documents',
            field=models.ManyToManyField(to='documents.Document'),
        ),
    ]
