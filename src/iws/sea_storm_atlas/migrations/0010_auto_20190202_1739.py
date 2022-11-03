# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0009_auto_20190202_1624'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stormevent',
            name='evts_businesses_damage',
            field=models.SmallIntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='stormevent',
            name='evts_coast_erosion',
            field=models.SmallIntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='stormevent',
            name='evts_defence_damage',
            field=models.SmallIntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='stormevent',
            name='evts_flooding',
            field=models.SmallIntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='stormevent',
            name='evts_infrastructure_damage',
            field=models.SmallIntegerField(default=0, null=True),
        ),
    ]
