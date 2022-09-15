import pandas as pd
from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField
from django_pandas.io import read_frame
import numpy as np

class Parameter(models.Model):
    label = models.CharField(max_length=150)
    uri = models.URLField(blank=True, null=True)

    def __unicode__(self):
        return u'{}'.format(self.label)


class Sensor(models.Model):
    label = models.CharField(max_length=150)

    def __unicode__(self):
        return u'{}'.format(self.label)


class Location(models.Model):
    label = models.CharField(max_length=150)
    geo = models.PointField(srid=4326, null=True)

    def __unicode__(self):
        return u'{}'.format(self.label)

class Network(models.Model):
    label = models.CharField(max_length=150)

    def __unicode__(self):
        return u'{}'.format(self.label)


class Serie(models.Model):
    parameter = models.ForeignKey(Parameter)
    sensor = models.ForeignKey(Sensor)
    location = models.ForeignKey(Location)
    network = models.ForeignKey(Network)
    # add below additional fields
    stats_mean =models.FloatField(null=True)
    stats_outliers = ArrayField(models.IntegerField(), null=True)

    def set_mean(self, threshold=5):
        df = read_frame(Measure.objects.filter(serie=self),
                        index_col='timestamp')

        df['pandas'] = df['value'].rolling(window=5, center=True).median().fillna(method='bfill').fillna(method='ffill')

        difference = np.abs(df['value'] - df['pandas'])
        outlier_idx = difference > threshold

        print(df.loc[outlier_idx, 'value'].shape)
        self.stats_mean = df.loc[~outlier_idx, 'value'].mean()
        self.save()
        return self.stats_mean

    def __unicode__(self):
        return u'{} - {} - {}'.format(self.location.label, self.parameter.label, self.sensor.label)


class Measure(models.Model):
    serie = models.ForeignKey(Serie)
    timestamp = models.DateTimeField(db_index=True)
    value = models.FloatField()
