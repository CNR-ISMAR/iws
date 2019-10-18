from django.db import models
from django.contrib.gis.db import models as gismodel
from geonode import settings
from django.contrib.gis.geos import Point

class Favorite(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='favorites')
    title = models.CharField(max_length=190)
    latitude = models.FloatField(blank=True, null=True, verbose_name='Latitude')
    longitude = models.FloatField(blank=True, null=True, verbose_name='Longitude')
    address = models.CharField(max_length=255, blank=True, null=True)
    position = gismodel.PointField(srid=3857, blank=False, null=False)

    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.position = Point(self.longitude, self.latitude)
        super(Favorite, self).save(*args, **kwargs)  # Call the "real" save() method.


