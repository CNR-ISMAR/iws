# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0004_auto_20190127_1440'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='geo',
            field=django.contrib.gis.db.models.fields.PointField(srid=4326, null=True),
        ),
    ]
