from django.db import models
from django.contrib.gis.db import models as gismodel
# from geonode import settings
from django.conf import settings




class StationData(models.Model):
    # SLEV, WSPD & WDIR
    id = models.IntegerField(editable=False)
    timestamp = models.DateTimeField(editable=False)
    value = models.FloatField(editable=False)
    value_norm = models.value_norm(editable=False)
    location = models.CharField(editable=False)
    parameter = models.CharField(editable=False)
    network = models.CharField(editable=False)

    class Meta:
        db_table = 'measurements_measure_view'
        managed = False