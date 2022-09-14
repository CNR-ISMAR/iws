from django.db import models
from django.contrib.gis.db import models as gismodel
from geonode import settings
from ..favorites.models import Favorite
from django.db.models import signals
from django.db.models.signals import post_save
from django.dispatch import receiver
from ..tasks import fcm_notify


class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=190)
    description = models.TextField(blank=True, null=True)
    type = models.CharField(max_length=190, default='auto')
    position = gismodel.PointField(srid=3857, blank=False, null=False)
    read = models.BooleanField(default=False)
    time = models.DateTimeField(null=True, blank=True)
    favorite = models.ForeignKey(Favorite, null=True, blank=True)

    def __unicode__(self):
        return self.title

@receiver(post_save, sender=Notification)
def post_save_notification(instance, sender, **kwargs):
    print('post_save_notification ' + instance.title)
    try:
        if kwargs.get('created'):
            fcm_notify.delay(str(instance.pk))
    except:
        pass

signals.post_save.connect(receiver=post_save_notification, sender=Notification)
