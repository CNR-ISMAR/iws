from django.db import models
from django.contrib.gis.db import models as gismodel
# from geonode import settings
from django.conf import settings
from django.contrib.gis.db.models.fields import PointField

class Station(models.Model):
    id = models.IntegerField(editable=False)
    location_label = models.CharField(editable=False)
    station_code = models.CharField(editable=False)
    station_label = models.CharField(editable=False)
    code = models.CharField(editable=False)
    parameter_id = models.IntegerField(editable=False)
    geo = PointField(editable=False, srid=4326)
    class Meta:
        managed = False
        db_table = 'measurements_station_geo'

class StationData(models.Model):
    # SLEV, WSPD & WDIR
    # id = models.IntegerField(editable=False)
    timestamp = models.DateTimeField(editable=False, primary_key=True)
    value = models.FloatField(editable=False)
    value_norm = models.FloatField(editable=False)
    location = models.CharField(editable=False)
    location_id = models.IntegerField(editable=False)
    parameter = models.CharField(editable=False)
    parameter_id = models.IntegerField(editable=False)
    network = models.CharField(editable=False)

    class Meta:
        db_table = 'measurements_grafana_view'
        managed = False