# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0002_measure_timestamp'),
    ]

    operations = [
        migrations.CreateModel(
            name='Serie',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('location', models.ForeignKey(to='measurements.Location')),
                ('parameter', models.ForeignKey(to='measurements.Parameter')),
                ('sensor', models.ForeignKey(to='measurements.Sensor')),
            ],
        ),
        migrations.RemoveField(
            model_name='measure',
            name='location',
        ),
        migrations.RemoveField(
            model_name='measure',
            name='parameter',
        ),
        migrations.RemoveField(
            model_name='measure',
            name='sensor',
        ),
        migrations.AddField(
            model_name='measure',
            name='serie',
            field=models.ForeignKey(default=1, to='measurements.Serie'),
            preserve_default=False,
        ),
    ]
