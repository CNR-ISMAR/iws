# Generated by Django 3.2.16 on 2022-11-24 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sea_storm_atlas', '0018_alter_stormevententry_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='stormeventeffect',
            name='flooding_level',
            field=models.DecimalField(decimal_places=2, max_digits=4, null=True),
        ),
    ]
