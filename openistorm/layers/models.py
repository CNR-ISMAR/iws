from django.db import models
from django.contrib.gis.db import models as gismodel
# from geonode import settings
from django.conf import settings
import json, datetime, pytz

class ImageLayer(models.Model):
    dataset = models.CharField(max_length=100)
    timestamp = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    update_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    textinfo = models.TextField(max_length=800, blank=True, null=True)


    def url_prefix(self):
        return settings.LAYERDATA_URL + 'waves_' + str(self.timestamp)

    @property
    def image(self):
        return self.url_prefix() + '.png'

    @property
    def image_background(self):
        return self.url_prefix() + '_bg.png'

    @property
    def metadata(self):
        return self.url_prefix() + '.json'

    @property
    def info(self):
        return json.loads(self.textinfo) if self.textinfo else None

    @property
    def date(self):
        # return datetime.datetime.fromtimestamp(self.timestamp).replace(tzinfo=pytz.timezone('Europe/Rome')).isoformat()+'.000Z'
        return datetime.datetime.fromtimestamp(self.timestamp).isoformat()+'.000Z'

    def __unicode__(self):
        return self.dataset + '_' + str(self.timestamp)

    class Meta:
        ordering = ['timestamp']




# class StationData(models.Model):
#     workspace_id = models.UUIDField(editable=False)
#     geom_multipolygon = gismodel.MultiPolygonField(editable=False)
#     score = models.FloatField(editable=False)
#
#     class Meta:
#         db_table = 'measurements_measure_view'
#         managed = False