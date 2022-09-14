# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0002_coastalsegment_region'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sea',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='code',
            field=models.CharField(max_length=5, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='partition',
            field=models.CharField(max_length=2, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='subregion',
            field=models.CharField(default=1, max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='coastalsegment',
            name='sea',
            field=models.ForeignKey(default=1, to='sea_storm_atlas.Sea'),
            preserve_default=False,
        ),
    ]
