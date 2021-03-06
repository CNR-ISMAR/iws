from __future__ import unicode_literals
from django.contrib.gis.db import models

from geonode.base.models import Region
from geonode.documents.models import Document

class Sea(models.Model):
    label = models.CharField(max_length=100)
    def __unicode__(self):
        return self.label

class CoastalSegment(models.Model):
    geom = models.MultiLineStringField(srid=3035)
    region = models.ForeignKey(Region)
    subregion = models.CharField(max_length=40)
    sea = models.ForeignKey(Sea)    
    seg_name = models.CharField(max_length=100, blank=True, null=True)
    # adm1 = models.CharField(max_length=40, blank=True, null=True)
    # sea = models.CharField(max_length=30, blank=True, null=True)
    code = models.CharField(max_length=5, blank=True, null=True)
    partition = models.CharField(max_length=2, blank=True, null=True)
    ews = models.NullBooleanField()
    HAZARD_CHOICES = (
        ('W', 'Wave Storm'),
        ('T', 'Tide Storm'),
        ('WT', 'Wave and Tide Storm'),
        ('M', 'Meteotsunami'),
        ('WTM', 'Wave and Tide Storm, Meteotsunami'),
    ) 
    ews_hazard_type = models.CharField(max_length=3, choices=HAZARD_CHOICES, null=True)
    forecasting_service = models.NullBooleanField()
    cp_procedures = models.NullBooleanField()
    intervention_procedures = models.NullBooleanField()
    cf_risk_sources = models.CharField(max_length=3, choices=HAZARD_CHOICES, null=True)
    network_for_marine_measurement_observation = models.NullBooleanField()
    post_event_monitoring_system = models.NullBooleanField()
    
    objects = models.GeoManager()
    
    def __unicode__(self):
        return "{} {} ({})".format(self.code, self.partition, self.subregion)
        
    def get_fields(self):
        return [(field.name, field.value_to_string(self)) for field in CoastalSegment._meta.fields]

    class Meta:
        ordering = ['code', 'partition']
    




class StormEvent(models.Model):
    coastalsegment = models.ForeignKey(CoastalSegment,
                                       verbose_name="Coastal segment")
    geom = models.PointField(srid=3035, blank=True, null=True,
                             verbose_name='Event location',
                             help_text='Insert a reference point related to the sea storm events')
    area_code = models.CharField(max_length=5, blank=True, null=True)
    area_partition = models.CharField(max_length=2, blank=True, null=True)
    date_start = models.DateTimeField(auto_now=False)
    date_end = models.DateTimeField(auto_now=False, blank=True, null=True)
    
    flooding_level = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    origin = models.CharField(max_length=255, blank=True, null=True)
    comments = models.TextField(max_length=500)
    is_aggregated = models.BooleanField(default=0)
    evts_total = models.SmallIntegerField(default=1)
    evts_coast_erosion = models.SmallIntegerField(default=0, blank=True, null=True)
    evts_flooding = models.SmallIntegerField(default=0,blank=True, null=True)
    evts_defence_damage = models.SmallIntegerField(default=0,blank=True, null=True)
    evts_infrastructure_damage = models.SmallIntegerField(default=0, blank=True, null=True)
    evts_businesses_damage = models.SmallIntegerField(default=0,blank=True, null=True)
    evts_documents =  models.ManyToManyField(Document, blank=True, null=True) 
    lat = models.CharField(max_length=255, blank=True, null=True)
    lon = models.CharField(max_length=255, blank=True, null=True)
    objects = models.GeoManager()
    def get_boolvalue(self, fieldname):
	return bool(self.fieldname)


