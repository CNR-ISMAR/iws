from django.db import models
from django.contrib.gis.db import models as gismodel
from geonode import settings
from django.contrib.gis.geos import Point

class Device(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    type = models.CharField(max_length=10) # ANDROID | IOS
    push_key = models.CharField(max_length=512) # FCM KEY

    def __unicode__(self):
        return self.push_key

