# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0014_auto_20190205_0134'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stormevent',
            name='evts_documents',
            field=models.ManyToManyField(to='documents.Document', null=True, blank=True),
        ),
    ]
