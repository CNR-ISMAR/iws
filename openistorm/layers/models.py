from django.db import models
from django.contrib.gis.db import models as gismodel
from geonode import settings

class ImageLayer(models.Model):
    dataset = models.CharField(max_length=100)
    timestamp = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __unicode__(self):
        return self.dataset + '_' + str(self.timestamp)

    class Meta:
        ordering = ['timestamp']


