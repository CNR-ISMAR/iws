from django.db import models
from django.contrib.gis.db import models as gismodel
from geonode import settings
from ..favorites.models import Favorite

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=190)
    description = models.TextField(blank=True, null=True)
    position = gismodel.PointField(srid=3857, blank=False, null=False)
    favorite = models.ForeignKey(Favorite, null=True, blank=True)
    read = models.BooleanField(default=False)

    def __unicode__(self):
        return self.title