# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0005_auto_20190128_1525'),
    ]

    operations = [
        migrations.CreateModel(
            name='Network',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=150)),
            ],
        ),
    ]
